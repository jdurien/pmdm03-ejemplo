import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CamaraService } from './../../servicios/camara.service';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore,{
  Pagination
} from 'swiper';

SwiperCore.use([Pagination])  /*no hace falta es para la parte de abajo de las fotos*/
@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.page.html',
  styleUrls: ['./swiper.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SwiperPage implements OnInit {
  @ViewChild('swiper') swiper: SwiperComponent;
   
  constructor(public usarCamara: CamaraService) { }

  config: SwiperOptions ={
    slidesPerView: 2,
    spaceBetween: 50,
    pagination: true
  };

 

  ngAfterContentChecked() {
    if (this.swiper){
      this.swiper.updateSwiper({}); 
    }
      
  }
  ngOnInit() {
  }

}

