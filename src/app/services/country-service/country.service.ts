import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  apiUrl = environment.apiUrl
  constructor(
    private http:HttpClient
  ) { }

  getCountries():Observable<any>{
   return this.http.get(`${this.apiUrl}/all`).pipe(
     map((res)=>res)
   )
  }

  getCountryByName(name):Observable<any>{
    return this.http.get(`https://restcountries.eu/rest/v2/name/${name}`).pipe(
      map((res)=>res)
    )
  }

  getCountryByRegion(region):Observable<any>{
    return this.http.get(`https://restcountries.eu/rest/v2/region/${region}`).pipe(
      map((res)=>res)
    )
  }

  getCountryByCode(code):Observable<any>{
    return this.http.get(`https://restcountries.eu/rest/v2/alpha/${code}`).pipe(
      map((res)=>res)
    )
  }

}
