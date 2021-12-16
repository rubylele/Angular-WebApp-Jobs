import { Ad } from '../../models/ad';
import { Component, OnInit } from '@angular/core';
import { AdsService } from 'src/app/services/ads.service';
import { AuthService, Roles } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css'],
})
export class AdsComponent implements OnInit {
  ads: Ad[];
  roles = Roles;

  constructor(public adsService: AdsService, public authService: AuthService) {
    this.adsService.adsSubject.subscribe((ads) => {
      console.log('updating component', ads);
      this.ads = ads;
    });
  }

  ngOnInit(): void {
    this.adsService.getAds();
  }
}
