import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  form: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    public router: Router,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid) {
      this.authService.signin(this.form.value).subscribe(
        (res) => {
          this.authService.setLocalStorage(res);
          this.router.navigate(['users']);
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
  }
}
