import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnkurService } from '../ankur.service';

@Component({
  selector: 'app-cakedetails',
  templateUrl: './cakedetails.component.html',
  styleUrls: ['./cakedetails.component.css']
})
export class CakedetailsComponent implements OnInit {
  cakeid:any
  cake:any={}
  isadding:any = false
  constructor(private route:ActivatedRoute, private ankur:AnkurService, private router:Router) { 
    this.cakeid = this.route.snapshot.params["cakeid"]
    var url = "https://apifromashu.herokuapp.com/api/cake/"+ this.cakeid
    this.ankur.getCakedetails(url).subscribe({
      next:(response:any)=>{
        console.log("response from cakedetails api", response)
        this.cake =response.data
      },
      error:(error)=>{
        console.log("Error from cake details api", error)
      }
    })
  }
  addcaketocart(){
    if(localStorage["token"]){
      this.isadding = true
      let myheaders = new HttpHeaders()
      myheaders = myheaders.append("authtoken", localStorage["token"])
      var url="https://apifromashu.herokuapp.com/api/addcaketocart"
      var options = {
        headers:myheaders
      }
      var body = {
        cakeid:this.cake.cakeid,
        name:this.cake.name,
        weight:this.cake.weight,
        price:this.cake.price,
        image:this.cake.image
        }
      this.ankur.addtocart(url, body, options).subscribe({
        next: (response:any)=>{
          console.log("Response from addtocart api", response)
          if(response.data){
            this.router.navigate(["/cart"])
          }
        },
        error:(error:any)=>{
          console.log("Error from addtocart api", error)
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
