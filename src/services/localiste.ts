import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LocaliteService } from '../services/localite.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  private map: any;

  incidents = [
    { localite: 'Abidjan', typeAnomalie: 'Voix dégradée' },
    { localite: 'Bouaké', typeAnomalie: 'Coupure fréquente' },
    // ...
  ];

  constructor(private localiteService: LocaliteService) {}

  ngOnInit(): void {
    this.initMap();
    this.addMarkers();
  }

  private initMap(): void {
    this.map = L.map('map').setView([7.5, -5], 6); // Centré sur la Côte d’Ivoire
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
  }

  private addMarkers(): void {
    for (const incident of this.incidents) {
      const coords = this.localiteService.getCoords(incident.localite);
      if (coords) {
        L.marker([coords.lat, coords.lon])
          .addTo(this.map)
          .bindPopup(`<b>${incident.typeAnomalie}</b><br>${incident.localite}`);
      }
    }
  }
}
