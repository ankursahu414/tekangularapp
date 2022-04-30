import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcakeComponent } from './addcake/addcake.component';
import { AddressComponent } from './address/address.component';
import { CakedetailsComponent } from './cakedetails/cakedetails.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ForgotComponent } from './forgot/forgot.component';
import { FormsComponent } from './forms/forms.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PaymentComponent } from './payment/payment.component';
import { SearchComponent } from './search/search.component';
import { YourordersComponent } from './yourorders/yourorders.component';

const routes: Routes = [
  {path:"login" , component:LoginComponent},
  {path:"signup", component:FormsComponent},
  {path:"", component:HomeComponent},
  {path:"search", component:SearchComponent},
  {path:"cart", component:CartComponent},
  {path:"addcake", component:AddcakeComponent},
  {path:"yourorders", component:YourordersComponent},
  {path:"forgot", component:ForgotComponent},
  {path:"detail/:cakeid",component:CakedetailsComponent},
  {path:"checkout", component:CheckoutComponent, children:[
    {path:'',component:AddressComponent},
    {path:"address", component:AddressComponent},
    {path:"payment", component:PaymentComponent}
  ]},
  {path:"**", component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
