import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { CountryHomeComponent } from 'src/app/components/country-home/country-home.component';
import { SingleCountryComponent } from 'src/app/components/single-country/single-country.component';
import { IpAddressComponent } from 'src/app/components/ip-address/ip-address.component';
import { SharedLibModule } from 'src/app/shared-folder/shared-lib/shared-lib.module';
import { SerachFilterPipe } from 'src/app/shared-folder/shared-pipe/serach-filter.pipe';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    CountryHomeComponent,
    SingleCountryComponent,
    IpAddressComponent,
    SerachFilterPipe,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedLibModule
  ],
  exports:[
    NavbarComponent
  ]
})
export class MainModule { }
