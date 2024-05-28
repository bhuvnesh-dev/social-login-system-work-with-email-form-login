import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  forgot_password = new FormGroup({
    email: new FormControl(''),
  });
  public toastButtons = [
    {
      text: 'Dismiss',
      role: 'cancel',
    },
  ];
  openToast: boolean = false;
  toastMessage: string = '';
  spinner: boolean = false;
  isSubmitted: boolean = false;
  constructor(
    private navCtrl: NavController,
    private router: Router,
    private storage: Storage
  ) {
    storage.create();
  }
  onSubmit() {
    this.spinner = true;
    this.openToast = false;
    this.isSubmitted = true;
    if (this.forgot_password.status === 'VALID') {
      this.isSubmitted = false;
      const email = {
        email: this.forgot_password.value.email,
      };
      console.log(email, 'email');
      // To check email and send a verification link this email id
      this.router.navigate(['verification']);
    } else {
      this.spinner = false;
      this.toastMessage = 'Please enter a correct email !';
      this.openToast = true;
    }
  }
  ngOnInit() {}
  onBack() {
    this.openToast = false;
    this.navCtrl.back();
  }
}
