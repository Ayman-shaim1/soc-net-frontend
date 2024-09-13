import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../envirenment';

export function AuthInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  // Bypass the interceptor for authentication routes
  console.log(environment.apiurl);
  const excludedUrls = [
    environment.apiurl + '/Auth/login',
    environment.apiurl + '/Auth/register',
  ]; // Add routes that shouldn't include the token
  console.log(req.url);
  if (excludedUrls.some((url) => req.url.includes(url))) {
    return next(req);
  }

  const auth = inject(AuthService);
  const router = inject(Router);
  const token = auth.getUser().token;

  if (!token) {
    return next(req);
  }

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  const newReq = req.clone({
    headers,
  });

  return next(newReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // If a 401 Unauthorized error is caught, log the user out
      if (error.status === 401) {
        auth.logout(); // Call your logout function
        router.navigate(['/login']); // Redirect to login
      }
      return throwError(() => new Error(error.message));
    })
  );
}
