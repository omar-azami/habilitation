import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocieteService {

  constructor(private http: HttpClient) { }

  API = 'http://localhost:1111';

  public registerSocite(SociteData: any, token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }   
    return this.http.post(this.API + '/admin/add/societesa', SociteData, httpOptions);
  }

  public getSociet(nom: String, token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }   
    return this.http.get(this.API + '/admin/show/societe/'+nom, httpOptions);
  }
  public getSociete( token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }   
    return this.http.get(this.API + '/admin/show/societe', httpOptions);
  }

  public deleteSociete(id: number, token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }   
    return this.http.delete(this.API + '/admin/delete/societe/' + id, httpOptions);
  }

  public updateSociete(id: number, societe: any, token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }   
    return this.http.patch(this.API + '/admin/patch/societe/'+id ,societe, httpOptions);
  }

  public getTypeSocieteeById(id: number, token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }   
    return this.http.get(this.API + '/admin/show/typeSociete/id/'+id, httpOptions);
  }

  public getSocieteById(id: number, token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }   
    return this.http.get(this.API + '/admin/show/societe/id/'+id, httpOptions);
  }
}



