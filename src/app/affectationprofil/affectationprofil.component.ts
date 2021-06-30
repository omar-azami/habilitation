import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { ProfilService } from '../profil/profil.service';
import { EntiteService } from '../entite/entite.service';
import { AffectationprofilService } from './affectationprofil.service';
import { MenuService } from '../menu/menu.service';
import { ApplicationService } from '../application/application.service';
@Component({
  selector: 'app-affectationprofil',
  templateUrl: './affectationprofil.component.html',
  styleUrls: ['./affectationprofil.component.scss']
})
export class AffectationprofilComponent implements OnInit {
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
    private utilisateutService: AffectationprofilService,
    private profilService : ProfilService,
    private entiteService: EntiteService,
    private menuService: MenuService,
    private typeEntiteeService:ApplicationService,

    

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
         this.getProfil();
         this.getAllsocieteMenu();
         this.gettypeEEntite();
  }
  entiteMereChoisie:any
  typeSocieteChange(type){
    console.log("id  :  ",type);
    
    this.menuService.getEntiteById(type,this.localUser.data.token)
    .subscribe(data => {this.entiteMereChoisie = data;
     this.entiteMereChoisie=this.entiteMereChoisie.data;
     console.log("menuPereDTO",this.entiteMereChoisie)

     })

}
societeChoisie:any
getAllsocieteMenu(){
  if(this.localUser.data.roles[0]==="ADMIN")
  {
    this.idSociete=this.localUser.data.idSociete;
    this.entiteService.getSociete(this.idSociete, this.localUser.data.token)
     .subscribe(data => {this.societeChoisie=data;
      this.societeChoisie=this.societeChoisie.collection
    })
   
  }
  if(this.localUser.data.roles[0]==="MODERATEUR")
  {
  
  this.societecnct = JSON.parse(localStorage.getItem('admicnct'));


     if(this.societecnct==null)
      {
        this.entiteService.getTypeEntiteSocieteAll( this.localUser.data.token)
     .subscribe(data => {this.societeChoisie=data;
      this.societeChoisie=this.societeChoisie.collection
      console.log("menu",this.societeChoisie)

   })
      }
      if(this.societecnct!=null)
      {
      

        this.idSociete=this.societecnct.id;
    this.entiteService.getSociete(this.idSociete, this.localUser.data.token)
     .subscribe(data => {this.societeChoisie=data;
      this.societeChoisie=this.societeChoisie.collection

   })
      }
  }

}

typeEEntite:any;
gettypeEEntite(){
  if(this.localUser.data.roles[0]==="ADMIN")
    {
      this.idSociete=this.localUser.data.idSociete;
      this.typeEntiteeService.getprofilBySociete(this.idSociete, this.localUser.data.token)
       .subscribe(data => {this.typeEEntite=data;
        this.typeEEntite=this.typeEEntite.collection
      })
     
    }
    if(this.localUser.data.roles[0]==="MODERATEUR")
    {
    
    this.societecnct = JSON.parse(localStorage.getItem('admicnct'));


       if(this.societecnct==null)
        {
          this.typeEntiteeService.getProfil( this.localUser.data.token)
       .subscribe(data => {this.typeEEntite=data;
        this.typeEEntite=this.typeEEntite.collection

     })
        }
        if(this.societecnct!=null)
        {
        

          this.idSociete=this.societecnct.id;
      this.typeEntiteeService.getprofilBySociete(this.idSociete, this.localUser.data.token)
       .subscribe(data => {this.typeEEntite=data;
        this.typeEEntite=this.typeEEntite.collection

     })
        }
    }
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


  rad:any
  radio(value){
    console.log("value",value)
    this.rad=value
  }


  typeEntiteAJoute:any;
  typeEntiteChange(type){
    console.log("id  :" ,type)
    this.typeEntiteeService.getapplicationById(type,this.localUser.data.token)
             .subscribe(data => {    this.typeEntiteAJoute = data;
              this.typeEntiteAJoute=this.typeEntiteAJoute.data;

              console.log("localiteAjoute",this.typeEntiteAJoute)

              })
    
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
        

        
  
      }, 
      error => console.log(error));


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
       
        }
                      
        );
         }
        
          
       
        
        
      }
      // this.updateSubscription = interval(100).subscribe(
      //   (val) => { 
  
      //      });


    })
   

   



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
