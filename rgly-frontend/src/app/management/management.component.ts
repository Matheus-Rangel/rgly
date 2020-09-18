import {Component, OnChanges, OnDestroy, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthState, RglyService} from "../service/rgly.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Link} from "../service/models/link.model";
import {CreateUpdateLinkDialogComponent} from "./create-update-link-dialog/create-update-link-dialog.component";
import {LinkRequest} from "../service/models/link-request.model.js";
import {Subscription} from "rxjs";

@Component({
  templateUrl: 'management.component.html',
  styleUrls: ['management.component.scss']
})
export class ManagementComponent implements OnInit, OnDestroy{
  authState: AuthState;
  saveDialogSubscription: Subscription;
  constructor(private rglyService: RglyService, private router: Router, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.authState = this.rglyService.getAuthState();
    if (!this.authState.isAuthenticated) {
      this.router.navigate(['authenticate']);
    }
    this.saveDialogSubscription = this.rglyService.saveDialogObservable().subscribe(value => {
      this.openDialog(value)
    })
  }
  openDialog(link: LinkRequest){
    const dialogRef = this.dialog.open(CreateUpdateLinkDialogComponent,{
      width: '20rem',
      data: link
    })
    dialogRef.afterClosed().subscribe(() => this.rglyService.getLinks());
  }

  ngOnDestroy(): void {
    this.saveDialogSubscription.unsubscribe();
  }
}
