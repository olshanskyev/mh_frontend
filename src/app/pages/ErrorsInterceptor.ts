import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';
import { Toaster } from '../pages/Toaster';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

    toaster: Toaster;

    constructor(toastrService: NbToastrService) {
      this.toaster = new Toaster(toastrService);
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
      ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((err: any) => {
                if (err.status <= 0) { // connection refused
                  this.toaster.showToast(this.toaster.types[4],
                    'Error', 'Server communication error. Connection refused');
                } /* else { // all errors
                  this.toaster.showToast(this.toaster.types[4], 'Error', `${err.error}. Error code: ${err.status}`);
                }*/
                return next.handle(req);
            }),
            retry(0));

    }

}
