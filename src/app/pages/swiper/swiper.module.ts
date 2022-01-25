import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MisComponentesModule } from './../../components/mis-componentes.module';

import { SwiperPageRoutingModule } from './swiper-routing.module';
import { SwiperModule } from 'swiper/angular';
import { SwiperPage } from './swiper.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    SwiperPageRoutingModule,
    MisComponentesModule
  ],
  declarations: [SwiperPage]
})
export class SwiperPageModule {}
