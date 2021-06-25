import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { UtilisateurService } from './utilisateur.service';
import { ProfilService } from '../profil/profil.service';
import { EntiteService } from '../entite/entite.service';
@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {

  closeResult: string;
  ngForm : NgForm= null;
  localUser:any;
  totalLenght:any
  page:number=1;
  private updateSubscription: Subscription;
  societecnct:any;
  idCnct:any;
  cnct:any;
  role:any;
  listUtilisateur:any=[];
  idSociete:any;
  listeEntite:any;





  constructor(
    private modalService: NgbModal,
    private router: Router,
    private utilisateutService: UtilisateurService,
    private profilService : ProfilService,
    private entiteService: EntiteService
    

    ) { }

  ngOnInit(): void {
    this.localUser = JSON.parse(localStorage.getItem('userData'));
    this.totalLenght=this.listUtilisateur.length;

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
         this.getUtilisateur();
         this.getProfil();
         this.getEntite();
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


  trier(event){
  
  }
  keyPressAlphabitique(event) {

    var inp = String.fromCharCode(event.keyCode);

    if (/[a-z A-Z]/.test(inp)) {
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


  updateUtilisateur:any
  modifier(contentt, utilisateur) {
    this.modalService.open(contentt, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.updateUtilisateur=utilisateur
//     this.updateeTypeEntite=typeEntite;
// console.log("updateeTypeEntite",this.updateeTypeEntite)
//    this.typeenti=this.societeChoisie
//    for (let order of this.typeenti) {

//     if (typeEntite.id === order.id) {
//         this.typeenti.splice(this.typeenti.indexOf(order), 1);
//         break;
//     }
//    }

  }


  getUtilisateur(){
                       if(this.localUser.data.roles[0]==="ADMIN")
                      {
                          this.idSociete=this.localUser.data.idSociete;
                          this.utilisateutService.getUtilisateurParSociete(this.idSociete,this.localUser.data.token)
                          .subscribe(data => {this.listUtilisateur = data;
                           this.listUtilisateur=this.listUtilisateur.collection;
                           console.log("data liste utilisateur ",this.listUtilisateur)})                         
                          }
                        if(this.localUser.data.roles[0]==="MODERATEUR")
                        {
                        
                        this.societecnct = JSON.parse(localStorage.getItem('admicnct'));              
                         if(this.societecnct==null)
                            {
                              this.utilisateutService.getAllUtilisateur(this.localUser.data.token)
                              .subscribe(data => {this.listUtilisateur = data;
                               this.listUtilisateur=this.listUtilisateur.collection;
                               console.log("data liste utilisateur ",this.listUtilisateur)})
                            }
                            if(this.societecnct!=null)
                              {
                               this.idSociete=this.societecnct.id
                               this.utilisateutService.getUtilisateurParSociete(this.idSociete,this.localUser.data.token)
                               .subscribe(data => {this.listUtilisateur = data;
                               this.listUtilisateur=this.listUtilisateur.collection;
                               console.log("data liste utilisateur ",this.listUtilisateur)})
                              }
                          }
  }
  
  listeProfil:any
  getProfil(){
    if(this.localUser.data.roles[0]==="ADMIN")
    {
      this.idSociete=this.localUser.data.idSociete;
      this.profilService.getprofilBySociete(this.idSociete, this.localUser.data.token)
       .subscribe(data => {this.listeProfil=data;
        this.listeProfil=this.listeProfil.collection
        console.log("listeProfil",this.listeProfil)

      })
     
    }
    if(this.localUser.data.roles[0]==="MODERATEUR")
    {
    
    this.societecnct = JSON.parse(localStorage.getItem('admicnct'));


       
        if(this.societecnct!=null)
        {
        

          this.idSociete=this.societecnct.id;
      this.profilService.getprofilBySociete(this.idSociete, this.localUser.data.token)
       .subscribe(data => {this.listeProfil=data;
        this.listeProfil=this.listeProfil.collection

     })
        }
    }
  }
  getEntite(){
    if(this.localUser.data.roles[0]==="ADMIN")
    {
      this.idSociete=this.localUser.data.idSociete;
      this.entiteService.getSociete(this.idSociete, this.localUser.data.token)
       .subscribe(data => {this.listeEntite=data;
        this.listeEntite=this.listeEntite.collection

      })
     
    }
    if(this.localUser.data.roles[0]==="MODERATEUR")
    {
    
    this.societecnct = JSON.parse(localStorage.getItem('admicnct'));


       
        if(this.societecnct!=null)
        {
        

          this.idSociete=this.societecnct.id;
      this.entiteService.getSociete(this.idSociete, this.localUser.data.token)
       .subscribe(data => {this.listeEntite=data;
        this.listeEntite=this.listeEntite.collection

     })
        }
    }
  }
  societeAct:any;
  register(registerForm){
    this.localUser = JSON.parse(localStorage.getItem('userData'));

    this.societecnct = JSON.parse(localStorage.getItem('admicnct'));
    this.role=this.localUser.data.roles[0]
    registerForm.value.entiteDTO=this.entite
    registerForm.value.profilDTO=this.profil
    registerForm.value.roleDTOList=this.rolesh
    
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
      this.utilisateutService.registerUtilisateur(registerForm.value, this.localUser.data.token).subscribe(data => {
        
         this.getUtilisateur();

        
  
      }, 
      error => console.log(error));
    this.getUtilisateur();


  }





  modifierFoorm:any;
  str:any;
  datadelete:any
  index:any
  modifierUtilisateur(modifierForm){
    
    
    modifierForm.value.societeDTO=this.updateUtilisateur.societeDTO;


    this.localUser = JSON.parse(localStorage.getItem('userData'));

    this.societecnct = JSON.parse(localStorage.getItem('admicnct'));
    this.role=this.localUser.data.roles[0]
    modifierForm.value.entiteDTO=this.entite
    modifierForm.value.profilDTO=this.profil
    modifierForm.value.roleDTOList=this.rolesh
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

        console.log("modifierForm",this.modifierFoorm)

        console.log("updateeTypeEntite societeDTO id ",this.updateUtilisateur.societeDTO.id) ;
        
        if(this.role==="ADMIN")
          {     
            this.utilisateutService.updateUtilisateurParAdmin(this.updateUtilisateur.id, this.updateUtilisateur.societeDTO.id , this.modifierFoorm , this.localUser.data.token).subscribe
            (data =>{
              console.log('data -->',data)
    
                            this.datadelete=data;
                            this.str=this.datadelete.statut;
                            console.log('data -->',this.str)
                          
                        this.index = this.str.localeCompare( "SUCCESS");  
    
                        console.log("index  : ",this.index)
    
              if(this.index==0){
              Swal.fire(
                'Modifier!',
                'L utilisateur a été modifié.',
                'success'
              )}
              else{
                Swal.fire(
                'Modifier!',
                'vous peut pas modifier.',
                'error'
              )
    
              }
              this.getUtilisateur();
              this.getUtilisateur();
    
            }
                          
            );
          }
        if(this.role==="MODERATEUR")
        {    
          this.utilisateutService.updateUtilisateurParModerateur(this.updateUtilisateur.id, this.updateUtilisateur.societeDTO.id , this.modifierFoorm , this.localUser.data.token).subscribe
        (data =>{
          console.log('data -->',data)

                        this.datadelete=data;
                        this.str=this.datadelete.statut;
                        console.log('data -->',this.str)
                      
                    this.index = this.str.localeCompare( "SUCCESS");  

                    console.log("index  : ",this.index)

          if(this.index==0){
          Swal.fire(
            'Modifié!',
            'L utilisateur a été modifié.',
            'success'
          )}
          else{
            Swal.fire(
            'Modifié!',
            'vous peut pas modifier .',
            'error'
          )

          }
          this.getUtilisateur();
          this.getUtilisateur();

        }
                      
        );
         }
        
          
       
        
        
      }
      // this.updateSubscription = interval(100).subscribe(
      //   (val) => { 
  
      //      });

      this.getUtilisateur();
      this.getUtilisateur();

    })
   

    this.getUtilisateur();


    this.getUtilisateur();




  }



  deleteUtilisateur(utilisateur){
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
    this.utilisateutService.deleteUtilisateur(utilisateur.id,utilisateur.societeDTO.id, this.localUser.data.token)
                     .subscribe(data =>{
                      this.datadelete=data;
                      this.str=this.datadelete.statut;
                      console.log('data -->',this.str)
                    
                  this.index = this.str.localeCompare( "SUCCES");  

                  console.log("index  : ",this.index)
                  this.getUtilisateur();


  if(this.index==0){
        Swal.fire(
          'Supprimé!',
          'L utilisateur a été supprimé.',
          'success'
        )}
        else{
          Swal.fire(
          'Supprimé!',
          'vous peut pas uttilisateur , supprimer les champs reliés à cette utilisateur.',
          'error'
        )

        }
        this.getUtilisateur();
        this.getUtilisateur();
      }
                    
      );
      }
    })
  }



  entite:any
  entiteChange(entiteID){
    for (let order of this.listeEntite) {

          if (entiteID == order.id) {
            this.entite=order
            
            break;
          }
       }
  }
  profil:any
  profilChange(profilID){
    for (let orde of this.listeProfil) {

      if (profilID == orde.id) {
        this.profil=orde

          break;
      }
   }
  }
  rolesh:any=[]
  getRole(roleLibelle){
    this.utilisateutService.getRoles(roleLibelle,this.localUser.data.token)
             .subscribe(data => {    this.rolesh[0] = data;
              this.rolesh[0]=this.rolesh[0].data;


              })

  }
}
