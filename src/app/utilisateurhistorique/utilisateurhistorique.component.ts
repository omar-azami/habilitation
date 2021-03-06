import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-utilisateurhistorique',
  templateUrl: './utilisateurhistorique.component.html',
  styleUrls: ['./utilisateurhistorique.component.scss']
})
export class UtilisateurhistoriqueComponent implements OnInit {

  closeResult: string;
  ngForm : NgForm= null;
  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    

    ) { }

  ngOnInit(): void {
  }

  trier(event){
  
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

}
