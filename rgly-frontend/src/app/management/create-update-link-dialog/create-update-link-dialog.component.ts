import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Link} from "../../service/models/link.model";
import {RglyService} from "../../service/rgly.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-create-update-link-dialog',
  templateUrl: './create-update-link-dialog.component.html',
  styleUrls: ['./create-update-link-dialog.component.scss']
})

export class CreateUpdateLinkDialogComponent implements OnInit {
  title: string;
  isLoading = false;
  create = false;
  constructor(
    public dialogRef: MatDialogRef<CreateUpdateLinkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public link: Link, private rglyService: RglyService) {
    if (link.linkName.length>0){
      this.title = 'Modificar Link'
    } else {
      this.title = 'Criar Link'
      this.create = true;
    }
    link.aliasName
    link.linkName
    link.url
  }

  getAliasName(): string{
    return this.link.aliasName;
  }
  getLinkName(): string{
    if (this.link.linkName.length > 0){
      return this.link.linkName;
    }
    this.link.linkName = this.createRandomLinkName(4)
    return this.link.linkName
  }
  getUrl(): string{
    return this.link.url;
  }
  ngOnInit(): void {
  }
  createRandomLinkName(length: number): string{
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  close() {
    this.dialogRef.close();
  }

  save(form: NgForm) {
    this.link.linkName = form.controls['linkName'].value
    this.link.aliasName = form.controls['aliasName'].value
    this.link.url = form.controls['url'].value
    console.log(this.link)
    const saveLink = this.rglyService.saveLink(this.link)
    this.isLoading = true
    saveLink.subscribe(value => {this.dialogRef.close()}, error => {
      this.isLoading = false;
      form.controls['linkName'].setErrors({'incorrect': true});
    })
  }
}
