import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AffectationprofilService {

  constructor(private http: HttpClient) { }

  API = 'http://localhost:1111';
  public getUtilisateurParSociete(idSociete:number, token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }   
    return this.http.get(this.API + '/user/show/utilisateur/societe/id/'+idSociete , httpOptions);
    
  }
  public getAllUtilisateur( token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }   
    return this.http.get(this.API + '/user/show/utilisateur' , httpOptions);
    
  }

 
  public registerUtilisateur(utilisateur: any, token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }   
    return this.http.post(this.API + '/user/add/utilisateur', utilisateur, httpOptions);
  }

  public updateUtilisateurParAdmin(idtypeEntite:number , idSociete:number, entite: any, token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }   
    return this.http.patch(this.API + '/user/update/utilisateurPourAdmin/'+idtypeEntite+'/'+idSociete, entite, httpOptions);//888
  }

  public updateUtilisateurParModerateur(idUtilisateur:number , idSociete:number, entite: any, token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }   
    return this.http.patch(this.API + '/user/update/utilisateurPourModerateur/'+idUtilisateur  +'/'+idSociete, entite, httpOptions);//888
  }

  public deleteUtilisateur(id: number,societe:number, token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }   
    return this.http.delete(this.API + '/user/delete/utilisateur/'+id+'/'+societe, httpOptions);
  }
  public getRoles(role:string, token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }   
    return this.http.get(this.API + '/user/show/role/'+role , httpOptions);
    
  }

}
