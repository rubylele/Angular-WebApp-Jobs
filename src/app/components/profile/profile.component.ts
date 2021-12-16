import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AdsService } from 'src/app/services/ads.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  isEditMode = false;
  editForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl(''),
    repeat_password: new FormControl(''),
  });
  constructor(
    public authService: AuthService,
    private adsService: AdsService
  ) {}

  onEdit() {
    this.isEditMode = true;
  }
  onCancelForm() {
    this.isEditMode = false;
  }
  onSubmitForm() {
    const { name, password, repeat_password } = this.editForm.value;
    console.log('on submit');
    if (password !== repeat_password) {
      return;
    }
    this.authService.updateUserData(name, password);

    console.log('after authService.updateUserData');
  }

  deleteAccount() {
    let loggedInUser = this.authService.loggedInUser.id;

    this.authService.deleteAccount();
    this.adsService.deleteAds(loggedInUser);
  }
}
