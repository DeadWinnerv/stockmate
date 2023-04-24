import { HttpInterceptor } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
  constructor(private injector: Injector) {}
  intercept(req: any, next: any) {
    let authservice = this.injector.get(AuthService);
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authservice.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
