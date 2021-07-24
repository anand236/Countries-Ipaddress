import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DarkModeService } from 'angular-dark-mode';
import { CountryService } from '../../services/country-service/country.service';

@Component({
  selector: 'app-single-country',
  templateUrl: './single-country.component.html',
  styleUrls: ['./single-country.component.css']
})
export class SingleCountryComponent implements OnInit {



  countryData: any;
  singleCountryName: any;
  hoveredOuntry: string;
  lat: any;
  lng: any;
  darkModeStatus: boolean;

  constructor(
    private countryService: CountryService,
    private activatedRoute: ActivatedRoute,
    private route:Router,
    private darkMode:DarkModeService
    
  ) { }

  ngOnInit(): void {

    this.darkMode.darkMode$.subscribe((res)=>{
      this.darkModeStatus = res
    })

    sessionStorage.removeItem('loginNotify')

    this.activatedRoute.queryParams.subscribe((res) => {
      this.singleCountryName = res.name 
           
      this.countryService.getCountryByName(res.name).subscribe((res) => {
       
        for(let i=0;i<res.length;i++){
        //  this.lat = res[i].latlng[0];
        // this.lng = res[i].latlng[1]  OR
        // array destructuring
        [this.lat, this.lng] = res[i].latlng 

        }
       
        this.countryData = res
        
      })
    })

  }

  backNav(){
    this.route.navigate(['/countries'])
    sessionStorage.setItem('backClicked',JSON.stringify('back'))
  }


  borderSelected(border){
    this.countryService.getCountryByCode(border).subscribe((res)=>{
      this.hoveredOuntry = res['name']
      this.route.navigate(['/country'], {queryParams: {
        name : res['name']
      }})
      
    })    
  }


  countryName(border){
    this.countryService.getCountryByCode(border).subscribe((res)=>{
      this.hoveredOuntry = res['name']
    }) 
  }

  ipAddress(){
    this.route.navigate(['/ip-address'], {queryParams:{
      lat:this.lat,
      lng:this.lng
    }})
  }
  
}
