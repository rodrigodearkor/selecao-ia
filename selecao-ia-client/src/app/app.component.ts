import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from './user-common/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Seleção IA';
  isAuthenticated: boolean = false;
  user: User;

  constructor(public authService: AuthService) {

    this.authService.isAuthenticated.subscribe(
      (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    );

    this.authService.user.subscribe(
      (user: User) => {
        this.user = user;
      }
    );
  }
  
  async ngOnInit() {
    this.isAuthenticated = await this.authService.checkAuthenticated();
  }
  
  logout() {
    this.authService.logout('/login');
  }
}
