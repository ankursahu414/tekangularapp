import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AnkurService } from '../ankur.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-yourorders',
  templateUrl: './yourorders.component.html',
  styleUrls: ['./yourorders.component.css']
})
export class YourordersComponent implements OnInit {
  previousorders:any={};
  length:any
  constructor(private ankur:AnkurService, private http:HttpClient, private spinner:NgxUiLoaderService) {
    this.spinner.start()
    var url = "https://apifromashu.herokuapp.com/api/cakeorders"
    let myheaders = new HttpHeaders()
    myheaders = myheaders.append("authtoken", localStorage["token"])
    var options = {
      headers:myheaders
    }
    var body = {}
    this.ankur.getpreviousorders(url, body, options).subscribe({
      next: (response:any)=>{
        console.log("Response from previous orders api", response)
        this.previousorders = response.cakeorders
        this.spinner.stop()
        this.previousorders = this.previousorders.reverse()
        this.length=this.previousorders.length
      },
      error:(error:any)=>{
        console.log("Error from cart items api", error)
        this.spinner.stop()
      }
    })
   }

  ngOnInit(): void {
  }

}
