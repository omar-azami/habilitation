import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeentiteService {

  constructor(private http: HttpClient) { }

  API = 'http://localhost:1111';
  public getSociete(idSociete:number, token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }   
    return this.http.get(this.API + '/admin/show/type-entite/societe/id/'+idSociete , httpOptions);
    
  }
  public getTypeEntiteSocieteAll( token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }   
    return this.http.get(this.API + '/admin/show/type-entite/all' , httpOptions);
    
  }

  public getTypeEntiteById(id:number, token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }   
    return this.http.get(this.API + '/admin/show/typeEntiteById/id/'+id , httpOptions);
    
  }
  public registerTypeEntite(typeEntite: any, token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }   
    return this.http.post(this.API + '/admin/add/type-entite', typeEntite, httpOptions);
  }

  public updateTypeEntite(idtypeEntite:number , idSociete:number, typeEntite: any, token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }   
    return this.http.patch(this.API + '/admin/update/type-entite/'+idtypeEntite+'/'+idSociete, typeEntite, httpOptions);
  }

  public deleteTypeSociete(id: number,societe:number, token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }   
    return this.http.delete(this.API + '/admin/delete/type-entite/'+id+'/'+societe, httpOptions);
  }

}
