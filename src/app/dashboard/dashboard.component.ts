import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TypesocieteService } from './typesociete.service';
import Swal from 'sweetalert2'
import { Subscription } from 'rxjs/internal/Subscription';
import { interval } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  closeResult: string;
  token : String;
  localUser : any;
  listTypeSociete:any =[];
  TypeSociete:any =[];
  ngForm : NgForm= null;
  private updateSubscription: Subscription;
  delete: any;
  totalLenght:number;
  page:number=1;
  updateTypeSociete:any;
  noupdateTypeSociete:any;
  modifieru:any;
  constructor(
    private modalService: NgbModal,
    private typesociete: TypesocieteService,
    private router: Router,


    ) { }

  ngOnInit(): void {
    this.localUser = JSON.parse(localStorage.getItem('userData'));
    this.getTypeSociet();
    this.totalLenght=this.listTypeSociete.length
    if(this.localUser.data.roles[0]==="ADMIN"){
      this.router.navigate(['/typeentite'])

    }
    this.updateSubscription = interval(100).subscribe(
      (val) => {       
        this.localUser = JSON.parse(localStorage.getItem('userData'));
        if(this.localUser==null){
          this.router.navigate(['/login'])

        }
     


         });
    
    
  }

  trier(event){
     
    this.typesociete.getTypeSociet(event.target.attributes[1].nodeValue,this.localUser.data.token)
                       .subscribe(data => {this.TypeSociete = data;
                        this.listTypeSociete=this.TypeSociete.collection
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
    this.noupdateTypeSociete=typeSociete;
    this.updateTypeSociete=typeSociete;
    this.getTypeSociet();

  }

  register(registerForm: NgForm){
    this.typesociete.registerTypeSocite(registerForm.value, this.localUser.data.token).subscribe(data => {
      
      console.log("ttttttt",data)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Votre travail a été enregistré',
        showConfirmButton: false,
        timer: 1500
      })
      this.getTypeSociet();

    }, 
    error => console.log(error));

    
    }



    getTypeSociet() {
      this.typesociete.getTypeSociete(this.localUser.data.token)
                         .subscribe(data => {this.TypeSociete = data;
                          this.listTypeSociete=this.TypeSociete.collection
                          })
                          
                          
    }

      keyPressAlphabitique(event) {

        var inp = String.fromCharCode(event.keyCode);
    
        if (/[a-z A-Z ]/.test(inp)) {
          return true;
        } else {
          event.preventDefault();
          return false;
        }
      }
      deleteTypeSociete(typeSociete){

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
            console.log(typeSociete);
        this.typesociete.deleteTypeSociete(typeSociete.id, this.localUser.data.token)
                         .subscribe(data=>
                          this.getTypeSociet()

                         );
//
            Swal.fire(
              'Supprimé!',
              'Le Type Societ a été supprimé.',
              'success'
            )
            this.getTypeSociet();
            this.getTypeSociet();

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
            console.log(this.noupdateTypeSociete.id);
            this.typesociete.updateTypeSociete(this.noupdateTypeSociete.id, this.modifieru,this.localUser.data.token).subscribe(
              resp =>{
                console.log('data -->',resp)
              }
              
            );
           
            Swal.fire(
              'modifier!',
              'Le Type Societe a été mis à jour.',
              'success'
            )
            this.getTypeSociet();
            this.getTypeSociet();
          }
        })
       

      // reload  this.updateSubscription = interval(1000).subscribe(
      // (val) => { 
      //    });
      
      }
      
}
