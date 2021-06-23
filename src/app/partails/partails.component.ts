import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-partails',
  templateUrl: './partails.component.html',
  styleUrls: ['./partails.component.scss']
})
export class PartailsComponent implements OnInit {

  constructor() { }
  title = 'admin-panel-layout';
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  ngOnInit(): void {
    
  }

}
