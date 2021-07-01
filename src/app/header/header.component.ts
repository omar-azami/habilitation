import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SocieteService } from '../home/societe.service';
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
  admicnct:any;
  role : any;
  profil:any;
  userData = new BehaviorSubject<any>(null);

  constructor(private router: Router,
    private societe: SocieteService,
    private loginService : LoginService

    ) {

  }

  ngOnInit(): void {
    this.localUser = JSON.parse(localStorage.getItem('userData'));
    this.admicnct = JSON.parse(localStorage.getItem('admicnct'));
    this.role = this.localUser.data.roles[0];

  }
  open(){
    this.userData.next(null)
    localStorage.removeItem('userData')
    localStorage.removeItem('admicnct')
    
    this.router.navigate(['/login'])
  
  }
  socie:any;
  societecnct:any;
  serachEntite(serachForm){
    console.log("serachForm",serachForm.value.search)
    if(serachForm.value.search!==null){
    this.societe.getSocietParNom(serachForm.value.search ,this.localUser.data.token)
    .subscribe(data => {this.socie = data;
     this.socie=this.socie.data;
     localStorage.setItem('admicnct', JSON.stringify(this.socie))
      this.societecnct = JSON.parse(localStorage.getItem('admicnct'));
      if(this.societecnct.id=null){
        localStorage.removeItem('admicnct');

      }
     window.location.reload();

    

     })
    }else{
      console.log("serachFormm",serachForm.value.search)

      localStorage.removeItem('admicnct');
      window.location.reload();

     }

  }

  
  // this.role=localUser.data.roles[0];
  //   this.profil=this.localUser.data.profilName;
 
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
}
