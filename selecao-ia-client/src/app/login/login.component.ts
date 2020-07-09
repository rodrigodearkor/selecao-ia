import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  error: string;

  form: FormGroup;
  loginInvalid: boolean;
  formSubmitAttempt: boolean;
  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '';

    this.form = this.fb.group({
      username: ['evandir', Validators.required],
      password: ['123456', Validators.required],
    });

    if (await this.authService.checkAuthenticated()) {
      await this.router.navigate([this.returnUrl]);
    }
  }

  async onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    this.error = '';

    if(this.form.valid) {
      try {

        const username = this.form.get('username').value; 
        const password = this.form.get('password').value;
        
        await this.authService.login(username, password).toPromise();

      } catch(err) {
        this.loginInvalid = true;
        this.error = err.message;
      }

    } else {
      this.formSubmitAttempt = true;
    }
  }
}
