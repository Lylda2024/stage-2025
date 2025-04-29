import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit, OnDestroy {
  private map!: L.Map;
  private resizeObserver!: ResizeObserver;

  ngAfterViewInit(): void {
    this.initMap();
    this.setupResizeObserver();
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap(): void {
    const bounds = L.latLngBounds(
      [4.0, -8.6], // Sud-Ouest de la CI
      [10.7, -2.5] // Nord-Est de la CI
    );

    this.map = L.map('map', {
      center: [7.5, -5.5], // Centre de la CI
      zoom: 6,
      zoomControl: false,
      preferCanvas: true,
      maxBounds: bounds,
      maxBoundsViscosity: 1.0,
    });

    L.control
      .zoom({
        position: 'topright',
      })
      .addTo(this.map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      detectRetina: true,
    }).addTo(this.map);

    setTimeout(() => this.map.invalidateSize(), 200);
  }

  private setupResizeObserver(): void {
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
      this.resizeObserver = new ResizeObserver(() => {
        this.map.invalidateSize();
      });
      this.resizeObserver.observe(mapContainer);
    }
  }
}
