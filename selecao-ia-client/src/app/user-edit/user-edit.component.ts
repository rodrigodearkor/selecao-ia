import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-common/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user-common/user.model';
import { map } from 'rxjs/operators';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  user: User;

  loading: boolean = false;
  error: string;

  form: FormGroup;
  loginInvalid: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      id: [{ value: null, disabled: true }],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      login: ['', Validators.required],
      password: [{ value: '', disabled: true }],
      admin: [false],
    });

    this.activatedRoute.paramMap
      .pipe(map(() => window.history.state.user))
      .subscribe((user: User) => {
        if (!user) {
          this.router.navigate(['/']);
        }

        this.user = user;

        if (this.canUpdatePassword()) {
          this.form.setControl(
            'password',
            new FormControl({ value: null, disabled: false }, [])
          );
        }

        this.form.setValue({ ...user, password: null });
      });
  }

  canUpdatePassword(): boolean {
    const loggedUser = this.authService.user.value;
    return this.user?.id == loggedUser.id || loggedUser.admin;
  }

  onSubmit() {

    this.loginInvalid = false;
    this.error = '';

    const user = this.form.getRawValue();
    this.userService.updateUser(user).subscribe(
      () => {
      this.router.navigate(['/']);
      this._snackBar.open('Usuário alterado com sucesso', "X", {
        duration: 2000,
      });
      },
      err => {
        this.loginInvalid = true;
        this.error = err.message;
      }
    );
  }
}
