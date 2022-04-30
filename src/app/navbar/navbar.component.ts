import { Component, OnInit } from '@angular/core';
import { AnkurService } from '../ankur.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { faSearch, faShoppingCart, faSignOut,faSignIn } from '@fortawesome/free-solid-svg-icons';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers:[]
})
export class NavbarComponent implements OnInit {
  projecttitle:any = "Ankur's Cake Gallery"
  isloggedin:any
  searchtext:any
  fasearch:any=faSearch
  faShoppingCart:any=faShoppingCart
  faSignOut:any=faSignOut
  faSignIn:any=faSignIn
  length:any
  cartitems:any
  totalprice:any
  constructor(private ankangular:AnkurService, private toastr: ToastrService, private router:Router) { 
    this.isloggedin=localStorage["token"]?true:false
    if(this.isloggedin){
      var url = "https://apifromashu.herokuapp.com/api/cakecart"
      let myheaders = new HttpHeaders()
      myheaders = myheaders.append("authtoken", localStorage["token"])
      var options = {
        headers:myheaders
      }
      var body = {}
      this.ankangular.getcartitems(url, body, options).subscribe({
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
          this.ankangular.getcartdetails(cartdetails)
          this.length=response.data?.length
          console.log(this.length)
        },
        error:(error)=>{
          console.log("Error from cart items api", error)
        }
      })
    }
  }
  isadmin:any=false
  adminUsers:any=["ankursahu414@gmail.com"]
  ngDoCheck(){
    this.length=this.ankangular.length
    if(localStorage["token"]){
      this.isloggedin = true
      if(this.adminUsers.includes(localStorage["loggedinuser"])){
        this.isadmin=true
      }
    }
    else{
      this.isloggedin = false
      this.isadmin=false
    }
  }

  logout(){
    localStorage.clear()
    this.toastr.success('Logged Out')
    window.location.href='/'
    this.ankangular.your_address=false
  }
  search()
  {
    if(this.searchtext)
    this.router.navigate(["/search"], {queryParams:{q:this.searchtext}})
  }
  ngOnInit(): void {
  }

}
