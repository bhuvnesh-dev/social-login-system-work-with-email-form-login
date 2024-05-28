import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonSpinner, IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { SignInWithApple } from '@awesome-cordova-plugins/sign-in-with-apple/ngx';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ReactiveFormsModule
  ],
  providers: [IonSpinner, SignInWithApple, Storage, HttpClient],
  declarations: [LoginPage]
})
export class LoginPageModule {}
