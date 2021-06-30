import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { interval, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ApplicationService } from '../application/application.service';
import { SocieteService } from '../home/societe.service';
import { MenuService } from './menu.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
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
  societeEntiteChoisie:any;
  idSociete:number;
  index:any;
  societeAct:any;
  listSociete:any;
  role:any;
  societechoiParAdmin:any;
  entiteMereChoisie:any;
  societ:any;
  updateeTypeEntite:any
  typeEntiteDependDeAdmin:any;
  typeenti:any;
  localite:any
  array:any=[];
  array2:any=[];
  array3:any=[];
  // this.societeService.getSociet(this.admin, this.localUser)
  // .subscribe(data => {;

  //  })

  
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private societe:SocieteService,
    private entiteService:MenuService,
    private typeEntiteeService:ApplicationService,
    
    
  
    

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
         
         this.getAllsocieteMenu();
         this.getSociete();
         this.gettypeEEntite();
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


  typeEntiteAJoute:any;
  typeEntiteChange(type){
    console.log("id  :" ,type)
    this.typeEntiteeService.getapplicationById(type,this.localUser.data.token)
             .subscribe(data => {    this.typeEntiteAJoute = data;
              this.typeEntiteAJoute=this.typeEntiteAJoute.data;

              console.log("localiteAjoute",this.typeEntiteAJoute)

              })
    
  }
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


type:any;
  geType(type){
    this.type=type
    console.log(type)
  }
  rad:any
  radio(value){
    console.log("value",value)
    this.rad=value
  }
  
  register(registerForm: NgForm){




    this.localUser = JSON.parse(localStorage.getItem('userData'));

    this.societecnct = JSON.parse(localStorage.getItem('admicnct'));
    this.role=this.localUser.data.roles[0]
    registerForm.value.menuPereDTO=this.entiteMereChoisie
    registerForm.value.type=this.type
    registerForm.value.applicationDTO=this.typeEntiteAJoute
    // registerForm.value.type=this.typeEntiteAJoute

    
    console.log("societechoiParAdmin :",registerForm.value)
    // registerForm.value.applicationDTO ==undefined 
    // registerForm.value.menuPereDTO== undefined ||
    




    if(this.role==="ADMIN")
    {      this.societeAct=this.localUser.data.societee 
      registerForm.value.societeDTO=this.societeAct
    }
    if(this.role==="MODERATEUR")
    {    this.societecnct = JSON.parse(localStorage.getItem('admicnct'));
    registerForm.value.societeDTO=this.societecnct
  }

  if((
    registerForm.value.description== null||
    registerForm.value.lien== null ||
    
    registerForm.value.nom== "" ||
    registerForm.value.ordre== null ||
    registerForm.value.parametres== null ||
    registerForm.value.type== undefined)||(registerForm.value.applicationDTO ==undefined 
      && registerForm.value.menuPereDTO== undefined )){
      
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Vous avez oublié un champs',
        showConfirmButton: false,
        timer: 1500
      })
      return 0
    }
    if(registerForm.value.applicationDTO ==undefined ){
      registerForm.value.applicationDTO ==registerForm.value.menuPereDTO.applicationDTO
    }
      console.log("registerFormmm: ",registerForm.value)
      this.entiteService.registerEntite(registerForm.value, this.localUser.data.token).subscribe(data => {
        this.detaRegester=data;
        this.str1=this.detaRegester.statut;
         this.index = this.str1.localeCompare( "SUCCESS");  
         this.getAllsocieteMenu();

        
  
      }, 
      error => console.log(error));
    this.getAllsocieteMenu();

    }




    getSociete() {
      this.societe.getSociete(this.localUser.data.token)
                         .subscribe(data => {this.listSociete = data;
                          this.listSociete=this.listSociete.collection;

                          })
                          
                          
    }
    typeSocieteChange(type){
             console.log("id  :  ",type);
             
             this.entiteService.getEntiteById(type,this.localUser.data.token)
             .subscribe(data => {this.entiteMereChoisie = data;
              this.entiteMereChoisie=this.entiteMereChoisie.data;
              console.log("menuPereDTO",this.entiteMereChoisie)

              })

    }
    typeSocieteeChange(idssociete){
      console.log("id ",idssociete);
      this.societeaffecter(idssociete)
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
    j:number
    lenght:number;
    modifier(contentt, typeEntite) {
      this.modalService.open(contentt, {
        centered: true,
        backdrop: 'static',
        size: 'lg'
      });
      this.updateeTypeEntite=typeEntite;
console.log("updateeTypeEntite",this.updateeTypeEntite)
     this.typeenti=this.societeChoisie
     for (let order of this.typeenti) {

      if (typeEntite.id === order.id) {
          this.typeenti.splice(this.typeenti.indexOf(order), 1);
          break;
      }
     }

     this.getAllsocieteMenu();
     this.typeentit=this.societeChoisie
     this.i=0;
     this.j=0;
     
     this.array=[]
   for (let order of this.typeenti) {
    this.boucletypeMere=order;
    this.array3[this.j]=order;
    
    
    this.j=this.j+1;
      while (this.boucletypeMere) {

        
        // console.log("order",this.boucletypeMere)
          // console.log("order2",typeEntite)

         if(this.boucletypeMere.id==typeEntite.id){
          this.array[this.i]=order;
          this.i=this.i+1;

          // this.typeenti.splice(this.typeenti.indexOf(this.boucletypeMere), 1);
          // this.typeenti.splice(this.typeenti.indexOf(order), 1);

         }
         this.boucletypeMere=this.boucletypeMere.entiteMereDTO;
      }
     

    }
    this.i=0;
    this.j=0;
    this.lenght=this.array.length
        this.array2=this.array3
    this.lenght=this.array.length
    for (let k = 0; k < this.lenght; k++) {
if(this.array[k]){
      this.array2.splice(this.array2.indexOf(this.array[k]), 1);
    }
    }
    }

    modifierFoorm:any;
    str:any;
    modifierEntite(modifierForm){
      modifierForm.value.entiteMereDTO=this.typeentiteChoisie;
      modifierForm.value.typeEntiteDTO=this.typeEntiteAJoute
      
      modifierForm.value.societeDTO=this.updateeTypeEntite.societeDTO;
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

          console.log("updateeTypeEntite id",this.updateeTypeEntite.id);
          console.log("modifierForm",this.modifierFoorm)

          console.log("updateeTypeEntite societeDTO id ",this.updateeTypeEntite.societeDTO.id) ;
          
          this.entiteService.updateEntite(this.updateeTypeEntite.id, this.updateeTypeEntite.applicationDTO.id, this.updateeTypeEntite.applicationDTO.societeDTO.id , this.modifierFoorm , this.localUser.data.token).subscribe
          (data =>{
            console.log('data -->',data)

                          this.datadelete=data;
                          this.str=this.datadelete.statut;
                          console.log('data -->',this.str)
                        
                      this.index = this.str.localeCompare( "SUCCES");  

                      console.log("index  : ",this.index)

            if(this.index==0){
            Swal.fire(
              'Supprimé!',
              'La societe a été supprimé.',
              'success'
            )}
            else{
              Swal.fire(
              'Supprimé!',
              'vous peut pas supprimer , supprimer les champs reliés à la société.',
              'error'
            )

            }
            this.getAllsocieteMenu();
            this.getAllsocieteMenu();

          }
                        
          );
            
         
          
          
        }
        // this.updateSubscription = interval(100).subscribe(
        //   (val) => { 
    
        //      });

        this.getAllsocieteMenu();
        this.getAllsocieteMenu();

      })
     

      this.getAllsocieteMenu();


      this.getAllsocieteMenu();




    }
    typeentite:any;
    typeentiteChoisie:any;
    typeEntitChange(type){
      this.getAllsocieteMenu();

      console.log("console log",type)
      this.typeentite=this.societeChoisie

      for (let order of this.typeentite) {

       if (type == order.id) {
        this.typeentiteChoisie=order
        console.log("console log2",order)

       }

      }
    }
    datadelete:any;;
    str2:any
    deleteEntite(typeEntite){
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
      this.entiteService.deleteEntite(typeEntite.id,typeEntite.societeDTO.id, this.localUser.data.token)
                       .subscribe(data =>{
                        this.datadelete=data;
                        this.str2=this.datadelete.statut;
                        console.log('data -->',this.str2)
                      
                    this.index = this.str2.localeCompare( "SUCCES");  

                    console.log("index  : ",this.index)
                    this.getAllsocieteMenu();


    if(this.index==0){
          Swal.fire(
            'Supprimé!',
            'La societe a été supprimé.',
            'success'
          )}
          else{
            Swal.fire(
            'Supprimé!',
            'vous peut pas supprimer , supprimer les champs reliés à la Type Entite.',
            'error'
          )

          }
          this.getAllsocieteMenu();
          this.getAllsocieteMenu();
        }
                      
        );
        }
      })
    }
}