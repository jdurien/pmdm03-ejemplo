import { Component, OnInit } from '@angular/core';
import { CamaraService } from 'src/app/servicios/camara.service';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements OnInit { 

  constructor(public usarCamara: CamaraService) { }

  ngOnInit() {
  }

  public takePicture() {
    this.usarCamara.sacarFoto();
  }

}
