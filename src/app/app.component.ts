import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DarkModeService } from 'angular-dark-mode';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUrl: string;

  

  constructor(
    private route:Router
  ) {}
  ngOnInit(): void {
    // this.route.navigate(['']);
    
  }

  
  
  
}
