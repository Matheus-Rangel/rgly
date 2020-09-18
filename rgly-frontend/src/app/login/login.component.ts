import {Component, OnDestroy, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthState, RglyService} from "../service/rgly.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent{
  isLoading : boolean = false;
  constructor(private rglyService: RglyService, private router: Router) {}

  login(form: NgForm){
    const authStateUpdate = this.rglyService.authenticate(form.controls['username'].value, form.controls['password'].value)
    this.isLoading = true
    authStateUpdate.subscribe(value => {
      this.isLoading = false;
      if(value.authFailed){
        form.controls['username'].setErrors({'incorrect': true})
        form.controls['password'].setErrors({'incorrect': true})
      }
      if(value.isAuthenticated){
        this.router.navigate(['management'])
      }
    })
  }
}
