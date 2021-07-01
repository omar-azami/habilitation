import { Component, Input, OnInit } from '@angular/core';
import { interval, Observable, Subject, Subscription } from 'rxjs';
import { StorgeService } from './storge.service';
import storageAvailable from 'storage-available'
import { Router } from '@angular/router';
import { PagemenuService } from '../pagemenu/pagemenu.service';
import { AffectationprofilService } from '../affectationprofil/affectationprofil.service';

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
  constructor(    
    private router: Router,
    private pagemenuService:PagemenuService,
    private utilisateutService: AffectationprofilService,

    ) { }
test:string="";
menu:any
deletestorage(){
  localStorage.removeItem('admicnct');

  this.test="";
  this.router.navigate(['/home'])
}
testt(){
  this.menu="testt"
}
retour(){
  this.menu=""

}
tit:number
listAplication2:any=[];
list:any=[]
l:number
listAplication:any=[];
idSociete:any
listUtilisateur:any=[];
i:number;
profilUtilisateur:any
lenght:number;
lenght2:number;
one:number
getProfilParUtilisateur(){
  this.one=0
  this.i=0
  this.l=0
  this.lenght=0
  this.tit=0
  this.list=[]
  if(this.localUser.data.roles[0]==="UTILISATEUR")
 {
     this.idSociete=this.localUser.data.idSociete;

     this.utilisateutService.getUtilisateurParSociete(this.idSociete,this.localUser.data.token)
     .subscribe(data => {this.listUtilisateur = data;
      this.listUtilisateur=this.listUtilisateur.collection;
      
      console.log(" liste utilisateur ",this.list)
      this.profilUtilisateur=this.localUser.data.profil.id
     
      for (let order of this.listUtilisateur) {
 
        // console.log("order.profil",order.profil.id)
        // console.log("this.profilUtilisateur",this.profilUtilisateur)

       if (this.profilUtilisateur - order.profil.id!=0) {
          //  this.list.splice(this.list.indexOf(order), 1);
          console.log("this.profilUtilisateur",order.profil.id)
        this.list[this.l]=order
        this.l=this.l+1
       }
      }
      this.lenght2=this.list.length

      for (let k = 0; k < this.lenght2; k++) {
        if(this.list[k]!=null){
              this.listUtilisateur.splice(this.listUtilisateur.indexOf(this.list[k]), 1);
            }
        
            }

      console.log("data liste  ",this.listUtilisateur)                         
      this.listAplication=[]
      this.listAplication2=[]

      for (let order of this.listUtilisateur) {
        if(this.one==0){
          this.listAplication2[0]=order.menu.application.nom
         this.listAplication[0]=order.menu.application.id

         this.lenght=this.lenght+1
         this.one=this.one+1
         console.log("listAplication2",this.listAplication2)
         console.log("listAplication",this.listAplication)
        }
        
        this.tit=0

       for (let k = 0; k < this.lenght; k++) {
 
         if(order.menu.application.id==this.listAplication[k]){
           this.tit=1
         }
       }
       if(this.tit==0){
         this.listAplication2[this.lenght]=order.menu.application.nom
         this.listAplication[this.lenght]=order.menu.application.id
         this.lenght=this.lenght+1
         console.log("listAplication2",this.listAplication2)
         console.log("listAplication",this.listAplication)
       }
       this.lenght=this.listAplication2.length
 
      }
    
    })                         
     }
     
   
}



  ngOnInit(): void {
    this.localUser = JSON.parse(localStorage.getItem('userData'));

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

          if(this.localUser!=null){
          this.roleUser=this.localUser.data.roles[0]
        }
           });
          }

          this.getProfilParUtilisateur()

  }
 

  applicationn:any
  application(type){
    this.applicationn="tit"
    console.log(type)
  }
  
}
