import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {RglyService} from "./rgly.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private rgylService: RglyService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.rgylService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', "Bearer " + authToken)
    });
    return next.handle(authRequest);
  }
}
