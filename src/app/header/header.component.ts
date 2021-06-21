import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  localUser : any;
  role : any;
  profil:any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.localUser = JSON.parse(localStorage.getItem('userData'));
    this.role = this.localUser.data.roles[0];

  }
  
  // this.role=localUser.data.roles[0];
  //   this.profil=this.localUser.data.profilName;
 
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
}
