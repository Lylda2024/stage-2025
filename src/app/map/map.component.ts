import { Component, AfterViewInit, OnDestroy, Input } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit, OnDestroy {
  private map!: L.Map;
  private resizeObserver!: ResizeObserver;
  private marker?: L.Marker; // Marqueur pour la dégradation

  // Input pour recevoir les données de dégradation
  @Input() set degradation(degradation: any) {
    if (degradation && degradation.latitude && degradation.longitude) {
      this.addDegradationMarker(degradation);
    } else if (this.marker) {
      this.map.removeLayer(this.marker); // Supprime le marqueur si pas de dégradation valide
    }
  }

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

    L.control.zoom({ position: 'topright' }).addTo(this.map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
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

  private addDegradationMarker(degradation: any): void {
    // Supprime l'ancien marqueur s'il existe
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    // Crée un nouveau marqueur avec une icône personnalisée
    const customIcon = L.icon({
      iconUrl: 'assets/markers/degradation.png', // Chemin vers votre icône
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });

    // Ajoute le marqueur à la carte
    this.marker = L.marker([degradation.latitude, degradation.longitude], {
      icon: customIcon,
    }).addTo(this.map);

    // Ajoute un popup avec les informations
    this.marker.bindPopup(this.createPopupContent(degradation));

    // Centre la carte sur la dégradation avec un zoom plus rapproché
    this.map.setView([degradation.latitude, degradation.longitude], 15);
  }

  private createPopupContent(degradation: any): string {
    return `
      <div class="popup-content">
        <h4>${degradation.zone || 'Localisation non spécifiée'}</h4>
        <p><strong>Type:</strong> ${degradation.typePb || 'Non spécifié'}</p>
        <p><strong>Problème:</strong> ${
          degradation.problemes || 'Non spécifié'
        }</p>
        <p><strong>Date:</strong> ${
          degradation.dateSignalisation
            ? new Date(degradation.dateSignalisation).toLocaleDateString()
            : 'Non spécifiée'
        }</p>
        <p><strong>État:</strong> ${degradation.etat || 'Non spécifié'}</p>
      </div>
    `;
  }
}
