import { Component, OnInit } from '@angular/core';
import {RglyService} from "../../service/rgly.service";
import {Link} from "../../service/models/link.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-management-link-list',
  templateUrl: './management-link-list.component.html',
  styleUrls: ['./management-link-list.component.scss']
})
export class ManagementLinkListComponent implements OnInit {
  linkList: Link[] = [];
  filteredList: Link[] = [];
  linkListSub: Subscription;
  searchValue: string;
  constructor(private rglyService: RglyService) { }

  ngOnInit(): void {
    this.linkListSub = this.rglyService.getLinks().subscribe(value => {
      console.log(value)
      this.linkList = value
      if(this.searchValue){
        this.filteredList = value.filter(link => link.aliasName.includes(this.searchValue))
      }
      this.filteredList = this.linkList
    });
  }

  filterList(event: KeyboardEvent): void {
    const {value} = <HTMLInputElement> event.target;
    this.searchValue = value;
    if(value){
      this.filteredList = this.linkList.filter(link => link.aliasName.includes(value));
    }else{
      this.filteredList = this.linkList;
    }
  }

  refresh() {
    this.rglyService.getLinks();
  }
}
