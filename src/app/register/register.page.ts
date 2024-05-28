// import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInput, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  showPassword = false;
  @ViewChild('input') input!: IonInput;
  openToast: boolean = false;
  toastMessage: string = '';
  public toastButtons = [
    {
      text: 'Dismiss',
      role: 'cancel',
    },
  ];
  registerForm = new FormGroup({
    email: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    password: new FormControl(''),
  });
  passwordVisibility = false;
  spinner: boolean = false;
  isSubmitted = false;
  constructor(
    public storage: Storage,
    public router: Router,
    private navCtrl: NavController
  ) {
    storage.create();
  }

  ngOnInit() {}

  onSubmit() {
    this.openToast = false;
    this.spinner = true;
    this.isSubmitted = true;
    if (this.registerForm.status === 'VALID') {
      this.isSubmitted = false;

      const userData = {
        first_name: this.registerForm.value.first_name,
        last_name: this.registerForm.value.last_name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        user_type: 'social_app',
      };
      console.log(userData, 'userData');
    }
  }
  doLogin() {
    let user = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };
    console.log(user, 'user');
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
    this.input.type = this.showPassword ? 'text' : 'password';
  }

  openLoginPage() {
    this.openToast = false;
    this.router.navigate(['login']);
  }
  onBack() {
    this.openToast = false;
    this.navCtrl.back();
  }
}
