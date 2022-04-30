import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-cake',
  templateUrl: './cake.component.html',
  styleUrls: ['./cake.component.css']
})
export class CakeComponent implements OnInit {
  @Input() cakedata:any

  constructor(private router:Router, private spinner: NgxUiLoaderService) { }

  showCakedetails(){
    this.spinner.start()
    this.router.navigate(['/detail', this.cakedata.cakeid])
    this.spinner.stop()
  }

  ngOnInit(): void {
  }

}
