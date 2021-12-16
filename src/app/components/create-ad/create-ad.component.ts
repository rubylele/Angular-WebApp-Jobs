import { AdsService } from 'src/app/services/ads.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdCategory, AdType } from 'src/app/models/ad';

@Component({
  selector: 'create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.css'],
})

export class CreateAdComponent implements OnInit {
  adTypes = Object.values(AdType);
  adCategory = Object.values(AdCategory);

  createAd = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    type: new FormControl(''),
    category: new FormControl(''),
  });
  constructor(private adsService: AdsService) {}

  ngOnInit(): void {}

  onSubmit() {
    let { title, description, type, category } = this.createAd.value;
    this.adsService.createAd(title, description, type, category);
  }
}
