import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AnkurService } from '../ankur.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  usercheckoutdetails:any;
  totalprice:any;
  cakes:any;
  cartdetails:any
  orderdetails:any={};
  constructor(private ankur:AnkurService,private http:HttpClient, private toastr:ToastrService) { 
    this.usercheckoutdetails=this.ankur.sendusercheckoutdetails();
    this.cartdetails=this.ankur.sendcartdetails()
    this.cakes=this.cartdetails.cartitems
    this.totalprice=this.cartdetails.totalprice
  }
placeorder(){
  let myheaders = new HttpHeaders()
  myheaders = myheaders.append("authtoken", localStorage["token"])
  var url="https://apifromashu.herokuapp.com/api/addcakeorder"
  var options = {
    headers:myheaders
  }
  var body = {
    cakes:this.cakes,
    price:this.totalprice,
    name:this.usercheckoutdetails.name,
    address:this.usercheckoutdetails.address,
    city:this.usercheckoutdetails.city,
    pincode:this.usercheckoutdetails.pincode,
    phone:this.usercheckoutdetails.phone
    }
  this.ankur.placeorder(url, body, options).subscribe({
    next: (response:any)=>{
      console.log("Response from cake order api", response);
      if(response.messageg=='order placed'){
      this.toastr.success("Order Placed")
      this.orderdetails = response.order;
      }
    },
    error:(error:any)=>{
      console.log("Error from place order api", error);
    }
  })
}
  ngOnInit(): void {
  }

}
