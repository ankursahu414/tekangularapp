import { Component, OnInit } from '@angular/core';
import { AnkurService } from '../ankur.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userdetails:any = {

  }
  length:any
  cartitems:any
  totalprice:any
  constructor(private ankurservice:AnkurService, private toastr:ToastrService, private router:Router) { }
  login(){
    var url="https://apifromashu.herokuapp.com/api/login"
    this.ankurservice.login(url, this.userdetails).subscribe({
      next: (response:any)=>{
        console.log("Response from login api", response)
        if(response.token){
          this.toastr.success('Log In successful');
          localStorage["token"] = response.token
          localStorage["loggedinuser"]=response.email
          this.ankurservice.loggedinuser=response.email
          var url = "https://apifromashu.herokuapp.com/api/cakecart"
          let myheaders = new HttpHeaders()
          myheaders = myheaders.append("authtoken", localStorage["token"])
          var options = {
            headers:myheaders
          }
          var body = {}
          this.ankurservice.getcartitems(url, body, options).subscribe({
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
              this.ankurservice.getcartdetails(cartdetails)
              this.length=response.data?.length
              console.log(this.length)
            },
            error:(error)=>{
              console.log("Error from cart items api", error)
            }
          })
          this.router.navigate(["/"])
        }
        else{
        this.toastr.error('Invalid Credentials');
        }
      },
      error:(error)=>{
        console.log("Error from login api", error)
      }
    })
  }

  ngOnInit(): void {
  }

}
