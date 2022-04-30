import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnkurService } from '../ankur.service';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { faMinus, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartitems:any = []
  totalprice:any = 0
  faPlus:any=faPlus
  faRemove:any=faTrash
  faMinus:any=faMinus
  isloggedin:any
  constructor(private ankur:AnkurService, private router:Router, private spinner:NgxUiLoaderService) {
    this.spinner.start()
    this.isloggedin=localStorage["token"]?true:false
    var url = "https://apifromashu.herokuapp.com/api/cakecart"
    let myheaders = new HttpHeaders()
    myheaders = myheaders.append("authtoken", localStorage["token"])
    var options = {
      headers:myheaders
    }
    var body = {}
    this.ankur.getcartitems(url, body, options).subscribe({
      next: (response:any)=>{
        console.log("Response from cart items api", response)
        this.cartitems = response.data
        this.cartitems.forEach((each:any) => {
          this.totalprice = this.totalprice+each.price*each.quantity
        });
        let cartdetails:any={
          cartitems:this.cartitems,
          totalprice:this.totalprice,
        }
        this.ankur.getcartdetails(cartdetails)
        this.spinner.stop()
      },
      error:(error)=>{
        console.log("Error from cart items api", error)
        this.spinner.stop()
      }
    })
   }
   checkout(){
     let x = localStorage.getItem('chktdtls')
     if(x==null){
       this.router.navigate(['/checkout'])
     }
     else{
       this.router.navigate(['/checkout/payment'])
     }
   }
   removecakefromcart(i:any){
    if(localStorage["token"]){
      this.spinner.start()
      let myheaders = new HttpHeaders()
      myheaders = myheaders.append("authtoken", localStorage["token"])
      var url="https://apifromashu.herokuapp.com/api/removecakefromcart"
      var options = {
        headers:myheaders
      }
      var body = {
        cakeid:this.cartitems[i].cakeid
        }
      this.ankur.removefromcart(url, body, options).subscribe({
        next: (response:any)=>{
          console.log("Response from remove from cart api", response)
          if(response.message){
            this.totalprice = this.totalprice-this.cartitems[i].quantity*this.cartitems[i].price
            this.cartitems.splice(i,1)
            this.ankur.length = this.ankur.length-1
            console.log(this.cartitems)
            this.spinner.stop()
          }
        },
        error:(error:any)=>{
          console.log("Error from remove from cart api", error)
          this.spinner.stop()
        }
      })
    }
    else{
      this.router.navigate(["/login"])
    }

  }
  removeonecakefromcart(i:any){
    if(localStorage["token"]){
      this.spinner.start()
      let myheaders = new HttpHeaders()
      myheaders = myheaders.append("authtoken", localStorage["token"])
      var url="https://apifromashu.herokuapp.com/api/removeonecakefromcart"
      var options = {
        headers:myheaders
      }
      var body = {
        cakeid:this.cartitems[i].cakeid
        }
      this.ankur.removefromcart(url, body, options).subscribe({
        next: (response:any)=>{
          console.log("Response from remove one cake from cart api", response)
          if(response.message){
            this.spinner.stop()
            this.totalprice = this.totalprice-this.cartitems[i].price
            if(this.cartitems[i].quantity==1){
               this.cartitems.splice(i,1)
               this.ankur.length = this.ankur.length-1
              }
            else{
              this.cartitems[i].quantity= this.cartitems[i].quantity - 1
            }
            console.log(this.cartitems)
          }
          this.spinner.stop()
        },
        error:(error:any)=>{
          console.log("Error from remove from cart api", error)
          this.spinner.stop()
        }
      })
    }
    else{
      this.router.navigate(["/login"])
    }
  }
  addonecaketocart(i:any){
    if(localStorage["token"]){
      this.spinner.start()
      let myheaders = new HttpHeaders()
      myheaders = myheaders.append("authtoken", localStorage["token"])
      var url="https://apifromashu.herokuapp.com/api/addcaketocart"
      var options = {
        headers:myheaders
      }
      var body = {
        cakeid:this.cartitems[i].cakeid,
        name:this.cartitems[i].name,
        weight:this.cartitems[i].weight,
        price:this.cartitems[i].price,
        image:this.cartitems[i].image
        }
      this.ankur.addtocart(url, body, options).subscribe({
        next: (response:any)=>{
          console.log("Response from addtocart api", response)
          if(response.message){
            this.totalprice = this.totalprice+this.cartitems[i].price  
            this.cartitems[i].quantity= this.cartitems[i].quantity + 1
            console.log(this.cartitems)
          }
          this.spinner.stop()
        },
        error:(error:any)=>{
          console.log("Error from addtocart api", error)
          this.spinner.stop()
        }
      })
    }
    else{
      this.router.navigate(["/login"])
    }
  }

  ngOnInit(): void {
  }

}
