import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagemenuService {
  API = 'http://localhost:1111';

  constructor(private http: HttpClient) { 
      
    }
    
    public getMenuParSociete(societeId:any, token : String) {
      var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
      const httpOptions = { headers: headers_object  }   
      return this.http.get(this.API + '/utilisateurshow/profilMenu/BySociete/'+societeId , httpOptions);}
  }

