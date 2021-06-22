import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { SocieteService } from '../home/societe.service';
import { ApplicationService } from './application.service';
@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
  ngForm : NgForm= null;
  idCnct:any;
  detaRegester:any;
  str1:string;
  
    closeResult: string;
    localUser : any;
    totalLenght:number;
    listTypeentite:any =[];
    page:number=1;
    private updateSubscription: Subscription;
    societecnct:any;
    cnct:any;
    societeChoisie:any;
    societeProfilChoisie:any;
    idSociete:number;
    index:any;
    societeAct:any;
    listSociete:any;
    role:any;
    societechoiParAdmin:any;
    societ:any;
    updateeProfil:any
    typeProfilDependDeAdmin:any;
    profi:any
    array:any=[];
    // this.societeService.getSociet(this.admin, this.localUser)
    // .subscribe(data => {;
  
    //  })
  
    
    constructor(
      private modalService: NgbModal,
      private router: Router,
      private societe:SocieteService,
      private profilService:ApplicationService,
      
      
    
      
  
      ) { }
  
    ngOnInit(): void {
      this.localUser = JSON.parse(localStorage.getItem('userData'));
      this.totalLenght=this.listTypeentite.length;
      this.updateSubscription = interval(100).subscribe(
        (val) => {       
          this.societecnct = JSON.parse(localStorage.getItem('admicnct'));
          
          this.localUser = JSON.parse(localStorage.getItem('userData'));
          this.role = this.localUser.data.roles[0];
  
          if(this.localUser==null){
            this.router.navigate(['/login'])
  
          }
          if(this.societecnct!=null)
          {
            this.idCnct=this.societecnct.id
          }
          this.connecte();
  
           });
           
           this.getAllProfil();
           this.getSociete();
  
    }
    getAllProfil(){
      if(this.localUser.data.roles[0]==="ADMIN")
      {
        this.idSociete=this.localUser.data.idSociete;
        this.profilService.getprofilBySociete(this.idSociete, this.localUser.data.token)
         .subscribe(data => {this.societeChoisie=data;
          this.societeChoisie=this.societeChoisie.collection
        })
       
      }
      if(this.localUser.data.roles[0]==="MODERATEUR")
      {
      
      this.societecnct = JSON.parse(localStorage.getItem('admicnct'));
  
  
         if(this.societecnct==null)
          {
            this.profilService.getProfil( this.localUser.data.token)
         .subscribe(data => {this.societeChoisie=data;
          this.societeChoisie=this.societeChoisie.collection
  
       })
          }
          if(this.societecnct!=null)
          {
          
  
            this.idSociete=this.societecnct.id;
        this.profilService.getprofilBySociete(this.idSociete, this.localUser.data.token)
         .subscribe(data => {this.societeChoisie=data;
          this.societeChoisie=this.societeChoisie.collection
  
       })
          }
      }
  
    }
  
    
    trier(event){
    
    }
  
  
  
    connecte(){
      this.localUser = JSON.parse(localStorage.getItem('userData'));
      this.societecnct = JSON.parse(localStorage.getItem('admicnct'));
      if(this.localUser.data.roles[0]==="ADMIN")
      {
        this.cnct="nonAfficher"
  
       
      }
      if(this.localUser.data.roles[0]==="MODERATEUR")
      {
  
         if(this.societecnct==null)
          {
            this.cnct="Afficher"
          }
          if(this.societecnct!=null)
          {
            this.cnct="nonAfficher"
  
  
    
          }
      }
  
    }
  
  
  
  
  
    keyPressAlphabitique(event) {
  
      var inp = String.fromCharCode(event.keyCode);
  
      if (/[a-zA-Z]/.test(inp)) {
        return true;
      } else {
        event.preventDefault();
        return false;
      }
    }
  
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }
    open(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  
  
  
  
    register(registerForm: NgForm){
  
      this.localUser = JSON.parse(localStorage.getItem('userData'));
  
      this.societecnct = JSON.parse(localStorage.getItem('admicnct'));
      this.role=this.localUser.data.roles[0]
      console.log("societechoiParAdmin :",registerForm.value)
  
      if(this.role==="ADMIN")
      {      this.societeAct=this.localUser.data.societee 
        registerForm.value.societeDTO=this.societeAct
      }
      if(this.role==="MODERATEUR")
      {    this.societecnct = JSON.parse(localStorage.getItem('admicnct'));
      registerForm.value.societeDTO=this.societecnct
    }
        console.log("registerFormmm: ",registerForm.value)
        this.profilService.registerProfil(registerForm.value, this.localUser.data.token).subscribe(data => {
          
          this.getAllProfil();
          this.getAllProfil();
  
          
    
        }, 
        error => console.log(error));
        this.getAllProfil();
        this.getAllProfil();
  
      }
  
  
  
  
      getSociete() {
        this.societe.getSociete(this.localUser.data.token)
                           .subscribe(data => {this.listSociete = data;
                            this.listSociete=this.listSociete.collection;
  
                            })
                            
                            
      }
    
    
  
      societeaffecter(id){
        this.societe.getSocieteById(id, this.localUser.data.token)
        .subscribe(data => {this.societechoiParAdmin = data;
         this.societechoiParAdmin=this.societechoiParAdmin.data;
         this.societ=this.societechoiParAdmin;
         console.log("aaaaaa",this.societ) ;
  
         })
         console.log("aaaaaa2",this.societ) ;
  
      }
      boucletypeMere:any;
      typeentit:any
      i:number;
      lenght:number;
      modifier(contentt, profil) {
        this.modalService.open(contentt, {
          centered: true,
          backdrop: 'static',
          size: 'lg'
        });
        this.updateeProfil=profil;
  
       this.profi=this.societeChoisie
       
  
       this.getAllProfil();
      
      }
  
      modifierFoorm:any;
      str:any;
      modifierProfil(modifierForm){
        modifierForm.value.societeDTO=this.updateeProfil.societeDTO;
        this.modifierFoorm=modifierForm.value
        Swal.fire({
          title: 'Êtes-vous sûr?',
          text: "Vous ne pourrez pas revenir en arrière !",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'modifier'
        }).then((result) => {
          if (result.isConfirmed) {
  
            console.log("updateeTypeEntite id",this.updateeProfil.id);
            console.log("updateeTypeEntite societeDTO id",this.updateeProfil.societeDTO.id);
            console.log("modifierForm",this.modifierFoorm)
  
            
            this.profilService.updateProfil(this.updateeProfil.id, this.updateeProfil.societeDTO.id , this.modifierFoorm , this.localUser.data.token).subscribe(
              data =>{
                console.log('data -->',data)
                this.datadelete=data;
                            this.str=this.datadelete.statut;
                            console.log('data -->',this.str)
                          
                        this.index = this.str.localeCompare( "SUCCESS");  
  
                        console.log("index  : ",this.index)
  
        if(this.index==0){
              Swal.fire(
                'Modifier!',
                'Le profil est modifier.',
                'success'
              )}
              else{
                Swal.fire(
                'Modifier!',
                'Ce profil est deja enregestrer.',
                'error'
              )
  
              }
              }
              
            );
           
            
            
          }
          this.getAllProfil();
          this.getAllProfil();
  
          // this.updateSubscription = interval(100).subscribe(
          //   (val) => { 
      
          //      });
        }
        )
       
  
  
  
        this.getAllProfil();
  
  
  
  
      }
  
      datadelete:any;;
      str2:any
      deleteProfil(profil){
        Swal.fire({
          title: 'Êtes-vous sûr?',
          text: "Vous ne pourrez pas revenir en arrière !",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Oui , supprimer!'
        }).then((result) => {
          if (result.isConfirmed) {
        this.profilService.deleteProfil(profil.id,profil.societeDTO.id, this.localUser.data.token)
                         .subscribe(data =>{
                          this.datadelete=data;
                          this.str2=this.datadelete.statut;
                          console.log('data -->',this.str2)
                        
                      this.index = this.str2.localeCompare( "SUCCESS");  
  
                      console.log("index  : ",this.index)
                      this.getAllProfil();
  
  
      if(this.index==0){
            Swal.fire(
              'Supprimé!',
              'Le profil a été supprimé.',
              'success'
            )}
            else{
              Swal.fire(
              'Supprimé!',
              'vous peut pas supprimer , supprimer les champs reliés à le profil.',
              'error'
            )
  
            }
            this.getAllProfil();
            this.getAllProfil();
          }
                        
          );
          }
        })
      }
  }