import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../login/login.service';
import { SocieteService } from './societe.service';
import Swal from 'sweetalert2'
import { Subscription } from 'rxjs/internal/Subscription';
import { TypesocieteService } from '../dashboard/typesociete.service';
import { BehaviorSubject, interval } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listTypeSociete:any =[];
  TypeSociete:any =[];
  closeResult: string;
  token : String;
  localUser : any;
  listSociete:any =[];
  listSociete2:any =[];
  Societe:any =[];
  Societe2:any =[];
  ngForm : NgForm= null;
  delete: any;
  totalLenght:number;
  page:number=1;
  updateSociete:any;
  noupdateSociete:any;
  typeSociete:any;
  str1:string;
  str2:string;
  detadelete:any;
  updateeSociete:any;
  modifieru:any;
  typechoisie:any;
  detaRegester:any;
  type:any;
  index: number;
  indx: number;
  societeAd = new BehaviorSubject<any>(null);
  societecnct:any;
  private updateSubscription: Subscription;

  constructor(
    private modalService: NgbModal,
    private societe: SocieteService,
    private typesociete: TypesocieteService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.localUser = JSON.parse(localStorage.getItem('userData'));
    this.totalLenght=this.listSociete.length;
    this.updateSubscription = interval(100).subscribe(
      (val) => {       
        this.societecnct = JSON.parse(localStorage.getItem('admicnct'));
        this.localUser = JSON.parse(localStorage.getItem('userData'));
        if(this.localUser==null){
          this.router.navigate(['/login'])

        }
     


         });

    this.getSociete();
    this.getTypeSociet();

  }
  trier(event){

    console.log("token// ",this.localUser.data.token);
    console.log("trie par// ",event.target.attributes[1].nodeValue);
    this.societe.getSociet(event.target.attributes[1].nodeValue,this.localUser.data.token)
    .subscribe(data => {this.Societe = data;
     this.listSociete=this.Societe.collection;

     })
  }
  keyPressAlphabitique(event) {

    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z ]/.test(inp)) {
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

  modifier(contentt, societe) {
    this.modalService.open(contentt, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.updateeSociete=societe;
    console.log("mod1",societe)
    for (let order of this.listTypeSociete) {
      if (societe.typeSocieteDTO.id === order.id) {
          this.listTypeSociete.splice(this.listTypeSociete.indexOf(order), 1);
          break;
      }
  }
this.type=societe.typeSocieteDTO.id;
  console.log("liiiiste type societe    :   ",this.listTypeSociete)
  }
  
  

  register(registerForm: NgForm){
    registerForm.value.typeSocieteDTO=this.typeSociete

    this.societe.registerSocite(registerForm.value, this.localUser.data.token).subscribe(data => {
      this.detaRegester=data;
      this.str1=this.detaRegester.statut;
       this.index = this.str1.localeCompare( "SUCCESS");  

      if(this.index==0){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'La societe a été enregistré',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'La societe a été  deja enregistré',
          showConfirmButton: false,
          timer: 2000
        })
      }
      console.log(this.detaRegester)
      
      this.getSociete();

    }, 
    error => console.log(error));

    }


    getSociete() {
      this.societe.getSociete(this.localUser.data.token)
                         .subscribe(data => {this.Societe = data;
                          this.listSociete=this.Societe.collection;

                          })
                          
                          
    }

    getTypeSociet() {
      this.typesociete.getTypeSociete(this.localUser.data.token)
                         .subscribe(data => {this.TypeSociete = data;
                          this.listTypeSociete=this.TypeSociete.collection

                          })
                          
                          
    }
    typeSocieteChange(id) {
      console.log("id  :  ",id);
      this.societe.getTypeSocieteeById(id, this.localUser.data.token)
                         .subscribe(data => {this.typeSociete = data;
                          this.typeSociete=this.typeSociete.data;

                          })
  }

  




  deleteSociete(societe){
   
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
        this.societe.deleteSociete(societe.id, this.localUser.data.token)
                         .subscribe(data =>{
                          this.detadelete=data;
                          this.str2=this.detadelete.statut;
                          console.log('data -->',this.str2)
                        
                      this.indx = this.str2.localeCompare( "SUCCES");  

                      console.log("index  : ",this.indx)

      if(this.indx==0){
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
            this.getSociete();
            this.getSociete();
          }
                        
          );
          }
        })
        
      }


      typeSocieteeChange(id){
        console.log("id  :  ",id);
        this.societe.getTypeSocieteeById(id, this.localUser.data.token)
                             .subscribe(data => {this.typeSociete = data;
                              this.type=this.typeSociete.data;

                              })
    
      }

      detail(societe){
        this.societeAd=societe.id;
        console.log("societeAd:  ",this.societeAd)
        localStorage.setItem('admicnct', JSON.stringify(societe))
        this.societecnct = JSON.parse(localStorage.getItem('admicnct'));
        console.log("societecnct 2:  ",this.societecnct)



      }

      modifiersociete(modifierForm){
      modifierForm.value.typeSocieteDTO=this.typeSociete.data
      console.log("aji",modifierForm.value)

        this.modifieru=modifierForm.value;
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

            console.log(this.modifieru);
            console.log(this.updateeSociete.id);
            this.societe.updateSociete(this.updateeSociete.id, this.modifieru,this.localUser.data.token).subscribe(
              resp =>{
                console.log('data -->',resp)
                
              }
              
            );
           
            Swal.fire(
              'modifier!',
              'Le Type Societe a été mis à jour.',
              'success'
            )
            
          }
          // this.updateSubscription = interval(100).subscribe(
          //   (val) => { 
      
          //      });

               this.getSociete();
               this.getSociete();

        })
       
        this.getSociete();
        this.getSociete();

      
      }

}
