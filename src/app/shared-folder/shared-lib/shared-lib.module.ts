import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    ToastrModule.forRoot(
      {
        maxOpened: 1,
        preventDuplicates: true,
        autoDismiss: true,
        closeButton: true,
        tapToDismiss: false,
        timeOut: 3000
      }
    ),
    NgxLoadingModule.forRoot({})
 
  ],
  exports: [
    HttpClientModule,
    ToastrModule,
    MatCardModule,
    MatButtonModule,
    NgxPaginationModule,
    FormsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    NgxLoadingModule,
]
})
export class SharedLibModule { }
