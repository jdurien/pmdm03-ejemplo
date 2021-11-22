import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-geolocalizacion',
  templateUrl: './geolocalizacion.page.html',
  styleUrls: ['./geolocalizacion.page.scss'],
})
export class GeolocalizacionPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  private async printCurrentPosition() {
    
    const coordinates = await Geolocation.getCurrentPosition();

    console.log('Current position:', coordinates);
  }

  public onClick() {
    this.printCurrentPosition();
  }
}
