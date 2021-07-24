import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { CountryHomeComponent } from 'src/app/components/country-home/country-home.component';
import { SingleCountryComponent } from 'src/app/components/single-country/single-country.component';
import { IpAddressComponent } from 'src/app/components/ip-address/ip-address.component';
import { AuthGuard } from 'src/app/shared-folder/auth-guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: RegisterComponent },
      {
        path: 'countries',
        canActivate: [AuthGuard],
        component: CountryHomeComponent,
      },
      {
        path: 'country',
        component: SingleCountryComponent,
      },
      { path: 'ip-address', component: IpAddressComponent },
      // {
      //   path: '404',
      //   pathMatch: 'full',
      //   component: ,
      // },

      // { path: Path.WILDCARD, redirectTo: Path.PAGENOTFOUND },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
