import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DarkModeService } from 'angular-dark-mode';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/Auth-services/auth.service';
declare var $:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  
  darkMode$: Observable<boolean> = this.darkModeService.darkMode$;
  darkModeStatus:boolean;
  ip:boolean;

  constructor(
    private darkModeService: DarkModeService,
    private AuthSer : AuthService,
    private route:Router
  ) { }

  ngOnInit(): void {  
  
   
    this.darkModeService.darkMode$.subscribe((res)=>{
      this.darkModeStatus = res
    }
    )
  }

  openModal(){
   $('exampleModal').modal('show')
  }
  /**
   * @description 
   * @param 
   */


  onToggle(): void {
    this.darkModeService.toggle();    
  }

  /**
   * !deper
   * ?ndjd
   * @param
   * @description
   */

  logOut(){
    this.AuthSer.logOut()
    this.AuthSer.logged = false;
  }


}
