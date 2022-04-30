import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnkurService } from '../ankur.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchitems:any=[]
  constructor(private route:ActivatedRoute,private ankur:AnkurService, private router:Router, private spinner:NgxUiLoaderService) {
    this.spinner.start()
    this.route.queryParams.subscribe((query:any)=>{
      var searchtext = query["q"]
      var url ="https://apifromashu.herokuapp.com/api/searchcakes?q="+searchtext
      this.ankur.searchcakes(url).subscribe({
        next:(response:any)=>{
          console.log("Response from search cakes api", response)
          this.searchitems=response.data
          this.spinner.stop()
        },
        error:(error)=>{
          console.log("error from search cakes api", error)
          this.spinner.stop()
         }
       })
    })
   }

  ngOnInit(): void {
  }

}
