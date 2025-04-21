// src/app/store/scan-data.store.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Interfaz (puede estar aquí o en un archivo de interfaces separado)
export interface ScanData {
  qrCode: string;
  latitude: number;
  longitude: number;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ScanDataStore { // Nombre de clase actualizado (opcional)

  private scanDataSubject = new BehaviorSubject<ScanData | null>(null);
  public scanData$: Observable<ScanData | null> = this.scanDataSubject.asObservable();

  constructor() { }

  updateScanData(data: ScanData): void {
    console.log('Store: Actualizando ScanData', data);
    this.scanDataSubject.next(data);
  }

  getCurrentScanData(): ScanData | null {
    return this.scanDataSubject.getValue();
  }
}