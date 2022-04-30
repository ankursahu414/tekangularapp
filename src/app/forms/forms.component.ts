import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { AnkurService } from '../ankur.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import {FormBuilder, FormGroup, Validators} from "@angular/forms"

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  userdetails:any={


  }
  signupForm:any
  users:any=[]
  // responseError:any
  signup(){
    if(this.signupForm.valid){
      var temp = {...this.signupForm.value}
      this.users.push(temp)
      var url="https://apifromashu.herokuapp.com/api/register"
      this.ankurservice.signup(url, temp).subscribe({
        next: (response:any)=>{
          console.log("Response from signup api", response)
          if(response.message == "User Already Exists"){
            this.toastr.error('User Already Exists')
          }
          if(response.message == "User Registered"){
            this.toastr.success('User Registered')
          }
          if(response.message == "Please Provide Details"){
            this.toastr.error('Invalid Credentials')
          }
        },
        error:(error)=>{
          console.log("Error from Signup api", error)
        }
      })
    }
    else{
      this.toastr.error('Invalid Credetials')
    }
  }
  deleteUser(index:any){
    this.users.splice(index, 1)
    this.toastr.success('Deleted')
  }
  constructor(private formbuilder:FormBuilder ,private toastr: ToastrService, private http:HttpClient, private ankurservice:AnkurService) { 
      this.signupForm=this.formbuilder.group({
        email:['',[Validators.required,Validators.email]],
        name:['',[Validators.required]],
        password:['',[Validators.required]]
      })
  }

  ngOnInit(): void {

  }

}
