import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInput, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Device } from '@capacitor/device';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import {
  SignInWithApple,
  AppleSignInResponse,
  AppleSignInErrorResponse,
  ASAuthorizationAppleIDRequest,
} from '@awesome-cordova-plugins/sign-in-with-apple/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPassword = false;
  isIOS = false;
  @ViewChild('input') input!: IonInput;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
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
  agreeWithTerms: boolean = false;
  passwordVisibility = false;
  isSubmitted = false;
  constructor(
    public storage: Storage,
    public router: Router,
    private navCtrl: NavController,
    private signInWithApple: SignInWithApple
  ) {}
  async ngOnInit() {
    this.storage.get('Token').then((res) => {
      if (!res) {
      }
    });
    const info = await Device.getInfo();
    if (info.platform === 'ios') {
      console.log('why not');
      this.isIOS = true;
    }
    console.log(info);
  }
  handleCheckbox(value: boolean) {
    this.agreeWithTerms = value;
  }

  async onSubmit() {
    this.openToast = false;
    this.spinner = true;
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      this.isSubmitted = false;
      const userData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      console.log(userData, 'userData');
    } else {
      this.toastMessage = 'Please enter email and password for login';
      setTimeout(() => {
        this.spinner = false;
        this.openToast = true;
      }, 300);
    }
  }
  onBack() {
    this.navCtrl.back();
  }
  forgotPassword() {
    this.openToast = false;
    this.router.navigate(['forgot-password']);
  }
  async facebookLogin() {
    this.openToast = false;
  }
  togglePassword(visible: boolean) {
    this.passwordVisibility = visible;
    const togglePassword = document.querySelector('#password');
    const type =
      togglePassword?.getAttribute('type') === 'password' ? 'text' : 'password';
    togglePassword?.setAttribute('type', type);
    if (this.passwordVisibility) {
    }
  }
  toggleShow() {
    this.showPassword = !this.showPassword;
    this.input.type = this.showPassword ? 'text' : 'password';
  }
  async googleLogin() {
    const user = await GoogleAuth.signIn();
    if (user) {
      this.spinner = true;
      const userData = {
        full_name: user.givenName + user.familyName,
        first_name: user.givenName,
        last_name: user.familyName,
        email: user.email,
        google_id: user.id,
        user_type: 'social_app',
      };
      console.log(userData, 'userData');
    }
  }
  openRegisterPage() {
    this.openToast = false;
    this.router.navigate(['register']);
  }

  async appleLogin() {
    this.signInWithApple
      .signin({
        requestedScopes: [
          ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName,
          ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail,
        ],
      })
      .then((res: AppleSignInResponse) => {
        // https://developer.apple.com/documentation/signinwithapplerestapi/verifying_a_user
        console.log('Send token to apple for verification: ' + res);
        if (res) {
          this.spinner = true;
          const userData = {
            full_name: `${res?.fullName?.givenName} ${res?.fullName?.familyName}`,
            first_name: res?.fullName?.givenName
              ? res?.fullName?.givenName
              : res?.user,
            last_name: res?.fullName?.familyName,
            email: res?.email,
            google_id: res?.user,
            user_type: 'social_app',
          };
          console.log('userData before data===>>>>', userData);
        }
        console.log(res);
      })
      .catch((error: AppleSignInErrorResponse) => {
        console.log(error.code + ' ' + error.localizedDescription);
        console.error(error);
      });
  }
}
