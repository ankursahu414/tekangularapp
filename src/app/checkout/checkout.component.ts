import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  isloggedin:any
  constructor() { 
    this.isloggedin = localStorage['token']?true:false
  }

  ngOnInit(): void {
  }

}
