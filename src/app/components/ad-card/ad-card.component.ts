import { Component, Input, OnInit, Output } from '@angular/core';
import { Ad, CandidateState } from 'src/app/models/ad';
import { User } from 'src/app/models/user';
import { AdsService } from 'src/app/services/ads.service';
import { AuthService, Roles } from 'src/app/services/auth.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.css'],
})
export class AdCardComponent implements OnInit {
  @Input() ad: Ad;
  candidates: User[] = [];
  roles = Roles;

  constructor(
    private adsService: AdsService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    let users = this.authService.users;
    for (let userKey in Object.keys(this.ad.appliedUsers)) {
      let user = users[userKey];
      if (user === undefined) continue;

      this.candidates.push(user);
    }
  }

  Like(): void {
    this.adsService.like(this.ad);
  }

  candidate(): void {
    this.adsService.addCandidate(this.ad);
  }

  // tslint:disable-next-line:typedef
  acceptCandidate(id: number) {
    this.ad.appliedUsers[id] = CandidateState.ACCEPTED;
    this.adsService.updateAd(this.ad);
  }

  // tslint:disable-next-line:typedef
  rejectCandidate(id: number) {
    this.ad.appliedUsers[id] = CandidateState.REJECTED;
    this.adsService.updateAd(this.ad);
  }
}
