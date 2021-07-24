import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IpAddressService {

  apiKey = 'at_yVdegIzKlyJWVZ7sZtFHYVT3zILtg'

  constructor(
    private http:HttpClient
  ) { }

  getIpData(ip:any):Observable<any>{
    return this.http.get(`https://geo.ipify.org/api/v1?apiKey=${this.apiKey}&ipAddress=${ip}`).pipe(
      map((res)=>{
        return res   
      })
    )
  }


}
