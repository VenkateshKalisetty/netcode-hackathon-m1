import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'name', 'accessLevel'];
  dataSource: IUser[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getUsersData();
  }

  getUsersData(): void {
    this.userService.getUsersData().subscribe(
      (res) => {
        const user = this.authService.getUser();
        if (user && user.accessLevel === 'admin') {
          this.displayedColumns.push('upgrade');
        }
        this.dataSource = res;
      },
      (err) => {
        console.log(err);
        this.snackBar.open(err.error.msg, '', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom'
        });
      }
    );
  }

  upgradeLevel(user: IUser): void {
    this.userService.ugradeUserAccessLevel(user.id).subscribe(
      (res) => {
        const index = this.dataSource.findIndex((v) => v.id === user.id);
        this.dataSource[index].accessLevel = 'admin';
        this.dataSource = this.dataSource.slice();
      },
      (err) => {
        console.log(err);
        this.snackBar.open(err.error.msg, '', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom'
        });
      }
    );
  }

  logout(): void {
    this.authService.removeToken();
    this.router.navigate(['signin']);
  }
}

export interface IUser {
  id: number;
  name: string;
  accessLevel: string;
}
