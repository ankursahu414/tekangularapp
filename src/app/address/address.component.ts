import { Component, OnInit } from '@angular/core';
import { AnkurService } from '../ankur.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  userdetails:any = {}
  constructor(private ankur:AnkurService) { }

  addAddress(){
    this.ankur.getusercheckoutdetails(this.userdetails)
  }
  ngOnInit(): void {
  }

}
