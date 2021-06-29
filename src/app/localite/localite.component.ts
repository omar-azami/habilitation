import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { TypesocieteService } from '../dashboard/typesociete.service';
import { LocaliteService } from './localite.service';

@Component({
  selector: 'app-localite',
  templateUrl: './localite.component.html',
  styleUrls: ['./localite.component.scss']
})
export class LocaliteComponent implements OnInit {
  closeResult: string;
  token : String;
  localUser : any;
  listLocalite:any =[];
  Localite:any =[];
  ngForm : NgForm= null;
  private updateSubscription: Subscription;
  delete: any;
  totalLenght:number;
  page:number=1;
  updateLocalite:any;
  noupdatelistLocalite:any;
  modifieru:any;
  constructor(
    private modalService: NgbModal,
    private typesociete: TypesocieteService,
    private localiteService: LocaliteService, 
    

    ) { }

  ngOnInit(): void {
    this.localUser = JSON.parse(localStorage.getItem('userData'));
    this.getLocalite();
    this.totalLenght=this.listLocalite.length
    
    
  }

  trier(event){
     
    this.typesociete.getTypeSociet(event.target.attributes[1].nodeValue,this.localUser.data.token)
                       .subscribe(data => {this.Localite = data;
                        this.listLocalite=this.Localite.collection
                        })
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

  modifier(contentt, typeSociete) {
    this.modalService.open(contentt, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.noupdatelistLocalite=typeSociete;
    this.updateLocalite=typeSociete;
    this.getLocalite();

  }

  register(registerForm: NgForm){
    this.localiteService.registerLocalite(registerForm.value, this.localUser.data.token).subscribe(data => {
      
      console.log("ttttttt",data)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Votre travail a été enregistré',
        showConfirmButton: false,
        timer: 1500
      })
      this.getLocalite();

    }, 
    error => console.log(error));
    this.getLocalite();

    
    }



   

    getLocalite() {
      this.localiteService.getLocalite(this.localUser.data.token)
                         .subscribe(data => {this.Localite = data;
                          this.listLocalite=this.Localite.collection
                          for (let order of this.listLocalite) {

                            if (order.nom.includes("ADMIN")) {
                                this.listLocalite.splice(this.listLocalite.indexOf(order), 1);
                                 }
                          
                          }
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
      datadelete:any;
      index:any;
      str:any;
      deleteLocalite(Localite){

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
            console.log(Localite);
        this.localiteService.deleteLocalite(Localite.id, this.localUser.data.token)
                         .subscribe(data =>{
                          this.datadelete=data;
                          this.str=this.datadelete.statut;
                          console.log('data -->',this.str)
                        
                      this.index = this.str.localeCompare( "SUCCESS");  

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
            this.getLocalite();
            this.getLocalite();

          }
                        
          );
            
            this.getLocalite();
            this.getLocalite();

          }
        })
        
      }
      modifierTypesociete(modifierForm){
      
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
            console.log(this.noupdatelistLocalite.id);
            this.localiteService.updateLocalite(this.noupdatelistLocalite.id, this.modifieru,this.localUser.data.token).subscribe(
              resp =>{
                console.log('data -->',resp)
              }
              
            );
           
            Swal.fire(
              'modifier!',
              'Le Type Societe a été mis à jour.',
              'success'
            )
            this.getLocalite();
            this.getLocalite();
          }
        })
       

      // reload  this.updateSubscription = interval(1000).subscribe(
      // (val) => { 
      //    });
      
      }
      
}