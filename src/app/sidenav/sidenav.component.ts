import { Component, Input, OnInit } from '@angular/core';
import { interval, Observable, Subject, Subscription } from 'rxjs';
import { StorgeService } from './storge.service';
import storageAvailable from 'storage-available'
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  localUser:any;
  societecnct:any;
  private updateSubscription: Subscription;
  roleUser:any;
  constructor(    private router: Router,
    ) { }
test:string="";

deletestorage(){
  localStorage.removeItem('admicnct');

  this.test="";
  this.router.navigate(['/home'])
}
  ngOnInit(): void {

if(storageAvailable('localStorage') ){


        this.updateSubscription = interval(100).subscribe(
        (val) => {       
          this.societecnct = JSON.parse(localStorage.getItem('admicnct'));
          this.localUser = JSON.parse(localStorage.getItem('userData'));
          if(this.societecnct!=null)
          {
              this.test="test";
          }
          //   this.test="";

          this.roleUser=this.localUser.data.roles[0]

           });
          }

    

  }
 
  
}
