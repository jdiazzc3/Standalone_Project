import { Component, OnInit, OnDestroy } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Geolocation } from '@capacitor/geolocation';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class Tab5Page implements OnInit, OnDestroy {
  scanResult: string | null = null;
  latitude: number | null = null;
  longitude: number | null = null;

  constructor() {}

  async ngOnInit() {
    // Puedes pedir permisos aquí si quieres
    await Geolocation.requestPermissions();
      
  }

  ngOnDestroy() {}

  async scanQRCode() {
    try {
      const result = await BarcodeScanner.scan();
      console.log('QR Code Result:', result);

      if (result?.barcodes?.length > 0) {
        this.scanResult = result.barcodes[0].rawValue || 'No se pudo leer';
      }

      const position = await Geolocation.getCurrentPosition();
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    } catch (error) {
      console.error('Error escaneando QR o obteniendo ubicación:', error);
    }
  }
}
