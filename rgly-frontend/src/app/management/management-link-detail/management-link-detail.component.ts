import {Component, Input, OnInit} from '@angular/core';
import {Link} from "../../service/models/link.model";
import {RglyService} from "../../service/rgly.service";

@Component({
  selector: 'app-management-link-detail',
  templateUrl: './management-link-detail.component.html',
  styleUrls: ['./management-link-detail.component.scss']
})
export class ManagementLinkDetailComponent implements OnInit {
  link: Link;
  date: Date;
  constructor(private rglyService: RglyService) { }

  ngOnInit(): void {
    this.link = this.rglyService.getSelectedLink();
    if(this.link){
      this.date = new Date(this.link.createdDate);
    }
    this.rglyService.getSelectLinkUpdate().subscribe(value => {
      this.link = {...value};
      this.date = new Date(this.link.createdDate);
      console.log(this.link)
    });
  }

  edit() {
    this.rglyService.saveDialog(this.link);
  }
  delete(){
    this.rglyService.deleteLink(this.link);
    this.link = null;
  }
}
