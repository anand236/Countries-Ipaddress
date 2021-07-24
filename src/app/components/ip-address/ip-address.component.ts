import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DarkModeService } from 'angular-dark-mode';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { map } from 'rxjs/operators';
import { IpAddressService } from '../../services/ip-service/ip-address.service';
declare const L: any;

const PrimaryWhite = '#ffffff'

@Component({
  selector: 'app-ip-address',
  templateUrl: './ip-address.component.html',
  styleUrls: ['./ip-address.component.css']
})
export class IpAddressComponent implements OnInit {

  ipForm: FormGroup;
  showError: boolean = false;
  accessToken = 'pk.eyJ1IjoiYW5hbmQtY2hvdWRoYXJ5IiwiYSI6ImNrcWdtZmZqajAybzIydnFqaHN2bHdnMXcifQ.ybdZUJWkKnOdp0g82lc1Ng'
  myMap: any;
  country: any;
  region: any;
  timezone: any;
  isp: any;
  ip: any;
  postalCode: any;
  latitude: any;
  longitude: any;
  latitudeRoute: any;
  longitudeRoute: any;
  showIp: boolean = false;
  darkModeStatus: boolean;



  public loading = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = PrimaryWhite;


  constructor(
    private fb: FormBuilder,
    private ipService: IpAddressService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private darkModeService: DarkModeService,
  ) { }

  ngOnInit(): void {

    this.darkModeService.darkMode$.subscribe((res)=>{
      console.log(res);
      this.darkModeStatus = res
      
    })


    if (this.route.url == '/ip-address') {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.getLocation();
      }, 2000)

    }
    else {
      this.loading = true;
      this.activatedRoute.queryParams.pipe(
        map((res) => {
          return res
        })
      ).subscribe((res) => {
        this.latitudeRoute = res.lat,
          this.longitudeRoute = res.lng

        setTimeout(() => {
          this.loading = false
          this.mapLayer(this.latitudeRoute, this.longitudeRoute)

        }, 2000)
      })

    }




    this.ipForm = this.fb.group({
      ip: ['', [Validators.required,
      Validators.pattern(`^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$`)]]
    })

  }

  findIp(ipAddress: any) {

    if (this.ipForm.valid) {

      this.ipService.getIpData(ipAddress.ip).subscribe((res) => {
        setTimeout(()=>{
          this.showIp = true
        },2000)
        this.country = res.location.country;
        this.region = res.location.region;
        this.timezone = res.location.timezone;
        this.isp = res.isp;
        this.ip = res.ip;
        this.postalCode = res.location.postalCode;
        this.latitude = res.location.lat;
        this.longitude = res.location.lng

        this.route.navigate(['/ip-address'], {
          queryParams: {
            lat: this.latitude,
            lng: this.longitude
          }
        })

        this.myMap.remove();
        this.loading = true;
        setTimeout(() => {
          this.loading = false
          this.mapLayer(this.latitude, this.longitude)
        }, 2000)
      })
    }
    else {
      this.showError = true;
    }
  }

  mapLayer(lat: any, lng: any) {
    this.myMap = L.map('mapid').setView([lat, lng], 13);

    L.marker([lat, lng]).addTo(this.myMap);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.myMap);
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.mapLayer(
          position.coords.latitude,
          position.coords.longitude
        );
      });
    }
  }

}
