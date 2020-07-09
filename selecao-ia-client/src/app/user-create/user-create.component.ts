import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { UserService } from '../user-common/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  loading: boolean = false;
  error: string;

  form: FormGroup;
  loginInvalid: boolean;
  formSubmitAttempt: boolean;
  
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  async ngOnInit() {

    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      login: ['', Validators.required],
      password: ['', [Validators.required]],
      admin: [false],
    });

  }

  async onSubmit(ngForm: NgForm) {
    
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    this.error = '';
    
    if(this.form.valid) {

      this.loading  = true; 

      const newUser = this.form.getRawValue();

      this.userService.createUser(newUser).subscribe(
        _ => {
          
          this._snackBar.open('Usuário salvo com sucesso', "X", {
            duration: 2000,
          });
  
          ngForm.resetForm();

        },
        err => {
          this.loginInvalid = true;
          this.error = err.message;
        }, 
        () => {
          this.loading  = false; 
        }
      );
    }
    
  }

}
