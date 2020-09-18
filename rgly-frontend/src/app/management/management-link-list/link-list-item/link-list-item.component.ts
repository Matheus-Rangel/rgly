import {Component, Input, OnInit} from '@angular/core';
import {Link} from "../../../service/models/link.model";
import {RglyService} from "../../../service/rgly.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-link-list-item',
  templateUrl: './link-list-item.component.html',
  styleUrls: ['./link-list-item.component.scss']
})
export class LinkListItemComponent implements OnInit {
  @Input()
  link: Link;
  date: Date;
  active = false;
  selectedLinkSub: Subscription;
  constructor(private rglyService: RglyService) { }

  ngOnInit(): void {
    this.active = this.rglyService.getSelectedLink().linkName == this.link.linkName;
    this.date = new Date(this.link.createdDate);
    this.selectedLinkSub = this.rglyService.getSelectLinkUpdate().subscribe(value => this.active = value.linkName == this.link.linkName)
  }

  selectLink() {
    this.rglyService.selectLink(this.link)
  }
}
