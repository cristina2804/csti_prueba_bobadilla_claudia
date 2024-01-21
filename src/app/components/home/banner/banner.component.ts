import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {

  images: string[] = [
    'https://static.interbankbenefit.pe/public/web/images/evento/banner/canje_rappi_destop_banner_benefit.png', 
    'https://static.interbankbenefit.pe/public/web/images/evento/banner/restaurantes_destop_banner_benefit_01.01_31.01.png', 
    'https://static.interbankbenefit.pe/public/web/images/evento/banner/canjemixto_destop_banner_benefit.gif', 
    'https://static.interbankbenefit.pe/public/web/images/evento/banner/banner_boton_millas_destop.png'];
  activeSlide = 0;
  isPaused = false;
  // private timer: any;

  selectSlide(index: number) {
    this.activeSlide = index;
    this.isPaused = true;
    // if (this.timer) {
    //   clearTimeout(this.timer);
    // }
  }

  ngOnDestroy() {
    // if (this.timer) {
    //   clearTimeout(this.timer);
    // }
  }

}
