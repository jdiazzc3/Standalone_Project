import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';
import { i } from '@angular/core/weak_ref.d-Bp6cSy-X';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  imports: [IonicModule],
  standalone: true,
})
export class Tab4Page implements OnInit {
  map: any;

  async ngOnInit() {
    try {
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true
      });
  
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
  
      this.initMap(lat, lng);
    } catch (error) {
      console.error('Error obteniendo la ubicación:', error);
      // Puedes setear una ubicación por defecto si falla
      this.initMap(4.60971, -74.08175); // Bogotá, por ejemplo
    }
  }
  
  initMap(lat: number, lng: number) {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
  
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
    });
  
    setTimeout(() => {
      this.map = L.map('map').setView([lat, lng], 15);
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © OpenStreetMap contributors'
      }).addTo(this.map);
  
      L.marker([lat, lng]).addTo(this.map)
        .bindPopup('¡Estás aquí!')
        .openPopup();
    }, 300);
  }
  
}
