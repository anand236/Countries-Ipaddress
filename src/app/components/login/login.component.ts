import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared-folder/user';
import { AuthService } from '../../services/Auth-services/auth.service';

const PrimaryWhite = '#ffffff';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  submitted: boolean;

  public config = { animationType: ngxLoadingAnimationTypes.none, backdropBorderRadius: '3px' };
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = PrimaryWhite;
  public loadingTemplate: TemplateRef<any>;
  public loading = false;
  fireBaseError: any;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private AuthService: AuthService,
    private toaster: ToastrService,

  ) { }

  ngOnInit(): void {
    this.AuthService.errorAuthTextObservable.subscribe((res)=>{
      this.fireBaseError = res.message
      
    })
    this.form();
    
  }

  form():void {
    this.loginForm = this.fb.group({
      mail: ['',[ Validators.required,
        Validators.pattern(
          '^[a-zA-Z0-9._%+*-]+(@[a-zA-Z0-9.-]{2,60})+\\.[a-zA-Z]{2,4}$'
        )]
      ],
      password: ['', Validators.required]

    })
  }

  submit(userDetails: User): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.loading = true;
      this.AuthService.signIn(userDetails).subscribe((res) => {
        this.loading = false;
        if (this.AuthService.logged == true) {
          const userName = JSON.parse(localStorage.getItem('user-details')).displayName
            this.toaster.success(userName ,'welcome')
           sessionStorage.setItem('loggedIn','true')
          this.route.navigate(['/countries'])
        }
      })
    }
  }

  resetPassword(){
    if(this.loginForm.get('mail').invalid){
      this.toaster.info('Please enter your mail')
    }
    else{
      this.AuthService.resetFunction(this.loginForm.value.mail).then(()=>{
        this.toaster.success(`Password reset request sent to ${this.loginForm.value.mail}`)
      })
    }
    
  }
}
