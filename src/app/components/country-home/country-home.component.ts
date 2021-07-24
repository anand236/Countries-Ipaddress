import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { DarkModeService } from 'angular-dark-mode';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { CountryService } from '../../services/country-service/country.service';

import { SerachFilterPipe } from '../../shared-folder/shared-pipe/serach-filter.pipe'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/Auth-services/auth.service';

const PrimaryWhite = '#ffffff';
@Component({
  selector: 'app-country-home',
  templateUrl: './country-home.component.html',
  styleUrls: ['./country-home.component.css']
})
export class CountryHomeComponent implements OnInit {
  countryData: Object;
  darkModeStatus: boolean;


  public loading = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = PrimaryWhite;


  totalUserData: number;
  page: any = 1;


  searchByRegion = ['Select All Regions', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  pageTrue: boolean;
  selectedRegion = 'Select All Regions';
  searchBy = ['Search By', 'capital', 'alpha3Code', 'population', 'name']

  searchedText = '';
  sessionRegion: any;
  sessionPage: any;
  findPlaceBy: any;
  selectedDropdown = 'Search By'
  showSearchError = false;
  filterPipeLength: SerachFilterPipe;
  userName: string;

  constructor(
    private countryService: CountryService,
    private route: Router,
    private darkModeService: DarkModeService,
    private authSer: AuthService
  ) {


  }

  ngOnInit(): void {

    this.userName = JSON.parse(localStorage.getItem('user-details')).displayName
    // this.tost()

    this.loading = true;

    if (!sessionStorage.getItem('region')) {
      this.getAllCountry()
    }
    else {
      this.sessionRegion = JSON.parse(sessionStorage.getItem('region'))
      this.sessionPage = JSON.parse(sessionStorage.getItem('page'))
      this.regionSelected(this.sessionRegion, this.sessionPage)
    }



    // for dark mode coorection conditionally
    this.darkModeService.darkMode$.subscribe((res) => {
      this.darkModeStatus = res
    })

  }



  getAllCountry() {
    this.countryService.getCountries().subscribe((res) => {
      this.countryData = res
      this.totalUserData = res.length
      this.loading = false;
    })
  }



  goToSingleCountry(name, i) {
    this.loading = true
    setTimeout(() => {
      this.loading = false
      this.route.navigate(['/country'], {
        queryParams: {
          name: name,
          // region: this.selectedRegion
        }
      });
    }, 1000)
  }



  onPageChange(page) {
    this.page = page
    sessionStorage.setItem('page', JSON.stringify(this.page))
  }



  regionSelected(region, page) {
    sessionStorage.setItem('region', JSON.stringify(region))
    this.selectedRegion = region

    if (region == 'Select All Regions') {
      this.countryService.getCountries().subscribe((res) => {
        this.countryData = (res)
        this.totalUserData = Object.keys(res).length
        this.onPageChange(page)
        this.loading = false;
      })
    }
    else {
      this.countryService.getCountryByRegion(region).subscribe((res) => {
        this.countryData = res
        this.totalUserData = Object.keys(res).length
        this.onPageChange(page)
        this.loading = false
      })
    }
  }



  searchingText(event) {
    this.searchedText = event.target.value
  }

  searchByFunction(event) {
    this.findPlaceBy = event
  }


}
