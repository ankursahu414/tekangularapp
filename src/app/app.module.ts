import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CakeComponent } from './cake/cake.component';
import { FormsComponent } from './forms/forms.component';
import { CakelistComponent } from './cakelist/cakelist.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderModule } from  'ngx-ui-loader';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ForgotComponent } from './forgot/forgot.component';
import { SearchComponent } from './search/search.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AddcakeComponent } from './addcake/addcake.component';
import { CakedetailsComponent } from './cakedetails/cakedetails.component';
import { CartComponent } from './cart/cart.component';
import { HighlightDirective } from './highlight.directive';
import { CheckoutComponent } from './checkout/checkout.component';
import { AddressComponent } from './address/address.component';
import { PaymentComponent } from './payment/payment.component';
import { YourordersComponent } from './yourorders/yourorders.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarouselComponent,
    CakeComponent,
    FormsComponent,
    CakelistComponent,
    LoginComponent,
    HomeComponent,
    ForgotComponent,
    SearchComponent,
    PagenotfoundComponent,
    AddcakeComponent,
    CakedetailsComponent,
    CartComponent,
    HighlightDirective,
    CheckoutComponent,
    AddressComponent,
    PaymentComponent,
    YourordersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    NgxUiLoaderModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
