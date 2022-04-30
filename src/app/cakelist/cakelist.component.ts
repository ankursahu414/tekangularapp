import { Component, OnInit, Input } from '@angular/core';
import { AnkurService } from '../ankur.service';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cakelist',
  templateUrl: './cakelist.component.html',
  styleUrls: ['./cakelist.component.css']
})
export class CakelistComponent implements OnInit {
  asc(){
    alert(this.ankurangular.PORT)
    this.cakes = this.ankurangular.asc(this.cakes)
  }
  desc(){
    this.cakes = this.ankurangular.desc(this.cakes)
  }

  constructor(private ankurangular:AnkurService, private http:HttpClient,private spinner: NgxUiLoaderService) { 
    this.spinner.start()
    var url = "https://apifromashu.herokuapp.com/api/allcakes"
    this.http.get(url).subscribe({
      next:(response:any)=>{
        console.log("Response from all cakes api", response)
        this.cakes=response.data
        this.spinner.stop()
      },
      error:(error)=>{
        console.log("error from all cakes api", error)
        this.spinner.stop()
      }
    })
  }
  cakes:any=[
    // {name:"cake1" , price:432, image:"assets/cake1.jpg", special:true},
    // {name:"cake2" , price:132, image:"assets/cake2.jpg"},
    // {name:"cake3" , price:562, image:"assets/cake3.jpg"},
    // {name:"cake4" , price:432, image:"assets/cake4.jpg", special:true},
    // {name:"cake5" , price:132, image:"assets/cake5.jpg"},
    // {name:"cake6" , price:562, image:"assets/cake6.jpg"},
    // {name:"cake7" , price:432, image:"assets/cake7.jpg", special:true},
    // {name:"cake8" , price:132, image:"assets/cake8.jpg"},
    // {name:"cake9" , price:562, image:"assets/cake9.jpg"},
    // {name:"cake10" , price:562, image:"assets/cake10.jpg", special:true}
  ]
  ngOnInit(): void {
    // this.ngxService.start(); // start foreground loading with 'default' id
 
    // // Stop the foreground loading after 5s
    // setTimeout(() => {
    //   this.ngxService.stop(); // stop foreground loading with 'default' id
    // }, 2000);
 
    // // OR
    // this.ngxService.startBackground('do-background-things');
    // // Do something here...
    // this.ngxService.stopBackground('do-background-things');
  }

}
