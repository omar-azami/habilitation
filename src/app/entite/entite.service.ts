import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntiteService {

  constructor(private http: HttpClient) { }

  API = 'http://localhost:1111';
  public getSociete(idSociete:number, token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }   
    return this.http.get(this.API + '/admin/show/entite/societe/id/'+idSociete , httpOptions);
    
  }
  public getTypeEntiteSocieteAll( token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }   
    return this.http.get(this.API + '/admin/show/entite/all' , httpOptions);
    
  }

  public getEntiteById(id:number, token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }   
    return this.http.get(this.API + '/admin/show/entiteById/id/'+id , httpOptions);
    
  }
  public registerEntite(typeEntite: any, token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }   
    return this.http.post(this.API + '/admin/add/entite', typeEntite, httpOptions);
  }

  public updateEntite(idtypeEntite:number , idSociete:number, entite: any, token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }   
    return this.http.patch(this.API + '/admin/update/entite/'+idtypeEntite+'/'+idSociete, entite, httpOptions);//888
  }

  public deleteEntite(id: number,societe:number, token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }   
    return this.http.delete(this.API + '/admin/delete/entite/'+id+'/'+societe, httpOptions);
  }

}
