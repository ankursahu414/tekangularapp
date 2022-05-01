import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AnkurService } from '../ankur.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-addcake',
  templateUrl: './addcake.component.html',
  styleUrls: ['./addcake.component.css']
})
export class AddcakeComponent implements OnInit {
  file:any;
  imageUrl:any
  body:any={}
  getFile(event:any){
    this.file=event.target.files[0]
  }
  upload(){
    var url="https://apifromashu.herokuapp.com/api/upload"
    var formdata=new FormData()
    formdata.append("file",this.file)
    let myheaders = new HttpHeaders()
    myheaders = myheaders.append("authtoken", localStorage["token"])
    var options = {
      headers:myheaders
    }
    var body = {}
    this.ankur.uploadimage(url, formdata, options).subscribe({
      next: (response:any)=>{
        console.log("Response from image url api", response)
        this.imageUrl = response.imageUrl
        this.toastr.success('Image uploaded')
      },
      error:(error:any)=>{
        console.log("Error from image url api", error)
      }
    })
  }
  addcake(){
    var url="https://apifromashu.herokuapp.com/api/addcake"
    let myheaders = new HttpHeaders()
    myheaders = myheaders.append("authtoken", localStorage["token"])
    var options = {
      headers:myheaders
    }
    var body= this.body
    body.image = this.imageUrl
    this.ankur.uploadcake(url, body, options).subscribe({
      next: (response:any)=>{
        console.log("Response from add cake api", response)
        if(response.errorMessage){
          this.toastr.error('Error in adding cake')
        }
        if(response.message){
          this.toastr.success('Cake Added')
        }
      },
      error:(error:any)=>{
        console.log("Error from add cake api", error)
      }
    })
  }
  constructor(private ankur:AnkurService,private http:HttpClient,private toastr:ToastrService) { }

  ngOnInit(): void {
  }

}
