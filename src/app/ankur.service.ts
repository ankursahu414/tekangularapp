import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnkurService {

  PORT = 8080
  loggedinuser:any
  cartkey:string='crtdtls'
  userkey:string='chktdtls'
  length:any
  cartdetails:any={}
  usercheckoutdetails:any={}
  your_address:any=false
  signup(url:any, body:any){
    console.log();
    return this.http.post(url,body)
  }
  login(url:any, body:any){
    return this.http.post(url, body)
  }
  forgot(url:any, body:any){
    return this.http.post(url, body)
  }
  getCakedetails(url:any){
    return this.http.get(url)
  }
  addtocart(url:any, body:any, options:any){
    return this.http.post(url, body, options)
  }
  removefromcart(url:any, body:any, options:any){
    return this.http.post(url, body, options)
  }
  getcartitems(url:any, body:any, options:any){
    return this.http.post(url, body, options)
  }
  searchcakes(url:any){
    return this.http.get(url)
  }
  asc(data:any){
    data.sort((obj1:any,obj2:any)=>{
      return obj1.price-obj2.price
    })
    return data
  }
  desc(data:any){
    data.sort((obj1:any,obj2:any)=>{
      return obj2.price-obj1.price
    })
    return data
  }
  getcartdetails(cartdetails:any){
    console.log(cartdetails);
    this.length=cartdetails.cartitems.length
    localStorage.setItem(this.cartkey, JSON.stringify(cartdetails))
  }
  sendcartdetails(){
    let x = localStorage.getItem(this.cartkey)
    if(x==null){
      this.cartdetails={}
    }
    else{
      this.cartdetails = JSON.parse(x)
    }
    
    return this.cartdetails
  }
  getusercheckoutdetails(usercheckoutdetails:any){
    console.log(usercheckoutdetails);
    localStorage.setItem(this.userkey, JSON.stringify(usercheckoutdetails))
    this.your_address=true
  }
  sendusercheckoutdetails(){
    let x = localStorage.getItem(this.userkey)
    if(x==null){
      this.usercheckoutdetails={}
    }
    else{
      this.usercheckoutdetails = JSON.parse(x)
    }
    return this.usercheckoutdetails
  }
  placeorder(url:any, body:any, options:any){
    return this.http.post(url,body,options)
  }
  uploadimage(url:any, body:any, options:any){
    return this.http.post(url,body,options)
  }
  uploadcake(url:any, body:any, options:any){
    return this.http.post(url,body,options)
  }
  getpreviousorders(url:any, body:any, options:any){
    return this.http.post(url, body, options)
  }
  constructor(private http:HttpClient) { }
}
