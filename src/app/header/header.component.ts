import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../login/login.service';

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
  userData = new BehaviorSubject<any>(null);

  constructor(private router: Router) {
     loginService : LoginService
  }

  ngOnInit(): void {
    this.localUser = JSON.parse(localStorage.getItem('userData'));
    this.role = this.localUser.data.roles[0];

  }
  open(){
    this.userData.next(null)
    localStorage.removeItem('userData')
    localStorage.removeItem('admicnct')
    
    this.router.navigate(['/login'])
  
  }
  // this.role=localUser.data.roles[0];
  //   this.profil=this.localUser.data.profilName;
 
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
}
