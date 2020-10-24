import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TOKEN_NAME } from '../constants';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    let newHeaders = req.headers;
    if (token) {
      newHeaders = newHeaders.append('authorization', `Bearer ${token}`);
    }
    const authReq = req.clone({ headers: newHeaders });
    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.authService.removeToken();
          this.router.navigate(['signin']);
        }
        return throwError(err);
      })
    );
  }
}
