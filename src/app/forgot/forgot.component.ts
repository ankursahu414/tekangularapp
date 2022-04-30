import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AnkurService } from '../ankur.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  userdetails:any={

  }
  constructor(private ankurservice:AnkurService, private toastr:ToastrService) { }
  forgot(){
    var url="https://apifromashu.herokuapp.com/api/recoverpassword"
    this.ankurservice.forgot(url, this.userdetails).subscribe({
      next: (response:any)=>{
        console.log("Response from recover api", response)
      },
      error:(error:any)=>{
        console.log("Error from recover api", error)
      }
    })
  }
  ngOnInit(): void {
  }

}
