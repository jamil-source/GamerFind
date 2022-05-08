import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerloadingService } from '../services/spinnerloading.service';
import { delay, finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private spinnerLoadingService: SpinnerloadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerLoadingService.onRequest();
    return next.handle(request).pipe(
      finalize(() => {
        this.spinnerLoadingService.inactiveRequest();
      })
    );
  }
}
