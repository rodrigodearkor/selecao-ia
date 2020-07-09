import { Component, OnInit } from '@angular/core';
import { User } from '../user-common/user.model';
import { UserService } from '../user-common/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  columnsToDisplay = ['id', 'login', 'name', 'admin', 'actions'];

  users: User[] = [];

  constructor(
    public userService: UserService,
    public router: Router,
    private _snackBar: MatSnackBar
  ) { }
  
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    })
  }

  edit(user) {
     this.router.navigate([`/user/${user.id}`], { state: { user }} );
  }

  delete(userId) {
    if (window.confirm('Deseja realmente excluir')){
      this.userService.deleteUser(userId).subscribe(
      // next
        _ => {
        this.loadUsers()
      }, 
      // error
      error => {
        this._snackBar.open(error?.message || '', "X", {
          duration: 2000,
        });
      })
    }
  }

}
