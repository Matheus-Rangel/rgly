import {Component, Input, OnInit} from '@angular/core';
import {AuthState, RglyService} from "../../service/rgly.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-management-toolbar',
  templateUrl: './management-toolbar.component.html',
  styleUrls: ['./management-toolbar.component.scss']
})
export class ManagementToolbarComponent implements OnInit {
  @Input()
  authState: AuthState;

  constructor(private rglyService: RglyService, private router: Router) { }

  ngOnInit(): void {
  }
  createLink(): void {
    this.rglyService.saveDialog({
      linkName: '',
      url: '',
      aliasName: '',
    });
  }
  upperFirstLetter(value: string){
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  logout() {
    this.rglyService.logout()
    this.router.navigate(['authenticate'])
  }
}
