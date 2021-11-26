import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-geolocalizacion',
  templateUrl: './geolocalizacion.page.html',
  styleUrls: ['./geolocalizacion.page.scss'],
})
export class GeolocalizacionPage implements OnInit {
  public map: google.maps.Map;

  constructor() { }

  ngOnInit() {
    this.initMap();
  }

  private async obtenerPosicion() {
    
    const coordinates = await Geolocation.getCurrentPosition();

    console.log('Current position:', coordinates);

    return coordinates;
  }

  public onClick() {
    this.obtenerPosicion();
  }

  public async initMap() {

    let coordenadas = await this.obtenerPosicion();
    console.log("Posición acctual:", coordenadas);

    // Obtenemos la latitud y la longitud
    const posicion = {
      lat: coordenadas.coords.latitude,
      lng: coordenadas.coords.longitude
    };

    // Mostramos el mapa centrado en la posición almacenada
    const map = new google.maps.Map(document.getElementById("map") as HTMLElement,
      {
        zoom: 6,
        center: posicion
      }
    );

    // Mostramos el marcador en la misma posición
    const marker = new google.maps.Marker({
      position: posicion,
      map: map,
    });
  }
}
