import { Component, OnInit, OnDestroy } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Geolocation } from '@capacitor/geolocation';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScanData, ScanDataStore } from '../store/location/scan-result.store';

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

  constructor(private scanDataStore: ScanDataStore) {}

  async ngOnInit() {
    // Puedes pedir permisos aquí si quieres
    await Geolocation.requestPermissions();
      
  }

  ngOnDestroy() {}

  async scanQRCode() {
    try {
      const result = await BarcodeScanner.scan();
      console.log('QR Code Result:', result);
      let qrValue: string | null = null;

      if (result?.barcodes?.length > 0) {
        qrValue = result.barcodes[0].rawValue || 'No se pudo leer';
        this.scanResult = qrValue; // Actualiza la propiedad scanResult si deseas mostrarla en la UI
        const position = await Geolocation.getCurrentPosition();
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      }

      const position = await Geolocation.getCurrentPosition();
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      // Solo guarda en el store si se obtuvieron tanto el código QR como las coordenadas
      if (qrValue !== null && this.latitude !== null && this.longitude !== null) {
        const scanData: ScanData = {
          qrCode: qrValue,
          latitude: this.latitude,
          longitude: this.longitude,
          timestamp: new Date(),
        };
        this.scanDataStore.updateScanData(scanData);
        console.log('Datos guardados en el store:', scanData);
      } else {
        console.warn('No se pudieron obtener todos los datos necesarios para guardar.');
      }
    } catch (error) {
      console.error('Error escaneando QR o obteniendo ubicación:', error);
    }
  }
}
