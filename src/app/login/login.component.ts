import { Component, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  closeResult: string;
  ngForm : NgForm;
  localUser : any;
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private loginService: LoginService
    
    ) {
    
   }

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
  register(registerForm: NgForm){
    console.log("token  : ", registerForm.value);
    let data = {
      ...registerForm.value,
      returnSecureToken: true
    }
    this.loginService.signIn(data)
    .subscribe((response: any) => this.router.navigate(['/home']))
  }

}
