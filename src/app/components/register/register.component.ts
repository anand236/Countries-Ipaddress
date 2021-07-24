import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DarkModeService } from 'angular-dark-mode';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { User } from 'src/app/shared-folder/user';
import { AuthService } from '../../services/Auth-services/auth.service';

const PrimaryWhite = '#ffffff';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean;
  registerPage: any;
  fireBaseError: any;

  registerDetails: User;
  public loading = false;

  public config = { animationType: ngxLoadingAnimationTypes.none, backdropBorderRadius: '3px' };
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = PrimaryWhite;
  public loadingTemplate: TemplateRef<any>;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private fireBaseConnect: AuthService,
    private darkModeService: DarkModeService

  ) { }

  ngOnInit(): void {
    this.fireBaseConnect.errorAuthTextObservable.subscribe((res) => {
      this.fireBaseError = res.message
    })
    this.form();

  }

  form() {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      mail: ['',[ Validators.required,
        Validators.pattern(
          '^[a-zA-Z0-9._%+*-]+(@[a-zA-Z0-9.-]{2,60})+\\.[a-zA-Z]{2,4}$'
        )]
      ],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
    },
      {
        validators: this.checkPassword
      })
  }

  checkPassword(control: AbstractControl) {

    const pass = control.get("password");
    const cpass = control.get("cpassword")

    if (pass.pristine || cpass.pristine) {
      return null
    }
    return pass && cpass && pass.value != cpass.value ? { misMatch: true } : null;

  }

  submit(userDetails: User) {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.loading = true;
      this.fireBaseConnect.createUser(userDetails).subscribe((res) => {
        this.loading = false;
        if (this.fireBaseConnect.logged == true) {
          this.route.navigate(['/countries'])
        }

      },
        (error) => {
          this.loading = false;
        })

    }
  }

  clicked(){
    console.log('j');
    
  }


}
