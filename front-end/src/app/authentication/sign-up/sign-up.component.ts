import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  form: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    accessLevel: new FormControl('user'),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        '^(?=.*\\d)(?=.*\\W)(?=.*[a-zA-Z])(?=.*[a-zA-Z]).{8,}$'
      ),
    ]),
  });

  constructor(
    public router: Router,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid) {
      this.authService.signup(this.form.value).subscribe(
        (res) => {
          this.snackBar.open('User created.', '', {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom'
          });
          this.router.navigate(['signin']);
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
