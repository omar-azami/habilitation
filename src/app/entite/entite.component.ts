import { Component, OnInit, Type } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { interval, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { SocieteService } from '../home/societe.service';
import { LocaliteService } from '../localite/localite.service';
import { TypeentiteService } from '../typeentite/typeentite.service';
import { EntiteService } from './entite.service';
@Component({
  selector: 'app-entite',
  templateUrl: './entite.component.html',
  styleUrls: ['./entite.component.scss']
})
export class EntiteComponent implements OnInit {

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
    private entiteService:EntiteService,
    private  localiteService: LocaliteService,
    private typeEntiteeService:TypeentiteService,
    
    
  
    

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
         
         this.getAllsocieteEntite();
         this.getSociete();
         this.getLocalite();
         this.gettypeEEntite();
  }


  getLocalite() {
    this.localiteService.getLocalite(this.localUser.data.token)
                       .subscribe(data => {this.localite = data;
                        this.localite=this.localite.collection
                        
                        console.log("localite ",this.localite)
                        })
                        
                        
  }

  localiteAjoute:any;
  localiteChange(type){
    this.localiteService.getLocaliteParId(type,this.localUser.data.token)
             .subscribe(data => {    this.localiteAjoute = data;
              this.localiteAjoute=this.localiteAjoute.data;

              console.log("localiteAjoute",this.localiteAjoute)

              })
  }
  typeEEntite:any;
gettypeEEntite(){
  if(this.localUser.data.roles[0]==="ADMIN")
    {
      this.idSociete=this.localUser.data.idSociete;
      this.typeEntiteeService.getSociete(this.idSociete, this.localUser.data.token)
       .subscribe(data => {this.typeEEntite=data;
        this.typeEEntite=this.typeEEntite.collection
      })
     
    }
    if(this.localUser.data.roles[0]==="MODERATEUR")
    {
    
    this.societecnct = JSON.parse(localStorage.getItem('admicnct'));


       if(this.societecnct==null)
        {
          this.typeEntiteeService.getTypeEntiteSocieteAll( this.localUser.data.token)
       .subscribe(data => {this.typeEEntite=data;
        this.typeEEntite=this.typeEEntite.collection

     })
        }
        if(this.societecnct!=null)
        {
        

          this.idSociete=this.societecnct.id;
      this.typeEntiteeService.getSociete(this.idSociete, this.localUser.data.token)
       .subscribe(data => {this.typeEEntite=data;
        this.typeEEntite=this.typeEEntite.collection

     })
        }
    }
}


  typeEntiteAJoute:any;
  typeEntiteChange(type){
    console.log("id  :" ,type)
    this.typeEntiteeService.getTypeEntiteById(type,this.localUser.data.token)
             .subscribe(data => {    this.typeEntiteAJoute = data;
              this.typeEntiteAJoute=this.typeEntiteAJoute.data;

              console.log("localiteAjoute",this.typeEntiteAJoute)

              })
    
  }
  getAllsocieteEntite(){
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




  register(registerForm: NgForm){

    this.localUser = JSON.parse(localStorage.getItem('userData'));

    this.societecnct = JSON.parse(localStorage.getItem('admicnct'));
    this.role=this.localUser.data.roles[0]
    registerForm.value.entiteMereDTO=this.entiteMereChoisie
    registerForm.value.localiteDTO=this.localiteAjoute
    registerForm.value.typeEntiteDTO=this.typeEntiteAJoute
    
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
      this.entiteService.registerEntite(registerForm.value, this.localUser.data.token).subscribe(data => {
        this.detaRegester=data;
        this.str1=this.detaRegester.statut;
         this.index = this.str1.localeCompare( "SUCCESS");  
         this.getAllsocieteEntite();

        
  
      }, 
      error => console.log(error));
    this.getAllsocieteEntite();

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

     this.getAllsocieteEntite();
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
      modifierForm.value.localiteDTO=this.localiteAjoute
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
          
          this.entiteService.updateEntite(this.updateeTypeEntite.id, this.updateeTypeEntite.societeDTO.id , this.modifierFoorm , this.localUser.data.token).subscribe
          (data =>{
            console.log('data -->',data)

                          this.datadelete=data;
                          this.str=this.datadelete.statut;
                          console.log('data -->',this.str)
                        
                      this.index = this.str.localeCompare( "SUCCES");  

                      console.log("index  : ",this.index)

            if(this.index==0){
            Swal.fire(
              'Modifiéé!',
              'L entité a été modifié.',
              'success'
            )}
            else{
              Swal.fire(
              'Modifié!',
              'vous peut pas modifié , supprimer ou modifier les champs reliés à l entité.',
              'error'
            )

            }
            this.getAllsocieteEntite();
            this.getAllsocieteEntite();

          }
                        
          );
            
         
          
          
        }
        // this.updateSubscription = interval(100).subscribe(
        //   (val) => { 
    
        //      });

        this.getAllsocieteEntite();
        this.getAllsocieteEntite();

      })
     

      this.getAllsocieteEntite();


      this.getAllsocieteEntite();




    }
    typeentite:any;
    typeentiteChoisie:any;
    typeEntitChange(type){
      this.getAllsocieteEntite();

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
                    this.getAllsocieteEntite();


    if(this.index==0){
          Swal.fire(
            'Supprimé!',
            'L entité a été supprimé.',
            'success'
          )}
          else{
            Swal.fire(
            'Supprimé!',
            'vous peut pas supprimer , supprimer les champs reliés à l entité.',
            'error'
          )

          }
          this.getAllsocieteEntite();
          this.getAllsocieteEntite();
        }
                      
        );
        }
      })
    }
}