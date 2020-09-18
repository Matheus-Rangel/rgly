import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {RglyService} from "../service/rgly.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  template: '',
})
export class RedirectComponent implements OnInit{
  link = ''
  constructor(private route: ActivatedRoute, private router: Router, private rglyService: RglyService) {
    this.link = route.snapshot.paramMap.get('link');
  }
  ngOnInit() {
    const url = this.getUrl(this.link)
  }
  private getUrl(link: string){
    return this.rglyService.getUrl(link).subscribe(response => {
      console.log(response)
      window.location.href = response.url;
    },error => {
      console.log(error)
      this.router.navigate(['404']);
    });
  }
}
