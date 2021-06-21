import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(private http: HttpClient) { }

  API = 'http://localhost:1111';

  public registerProfil(profil: any, token : String) { // token
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }   
        return this.http.post(this.API + '/admin/add/profil', profil ,httpOptions).pipe(map(res => true));
  }

  public getProfil( token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }
    
    return this.http.get(this.API + '/admin/show/profil', httpOptions);
  }

  public getprofilBySociete(societe:number ,token:String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }
  
    return this.http.get(this.API + '/admin/show/profil/societe/id/'+societe,httpOptions);
  }

  public deleteProfil(id: number, societe:number,token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  } 
    return this.http.delete(this.API + '/admin/delete/profil/'+id+'/'+societe ,httpOptions);
  }

  public updateProfil(id: number , societe:number, localite: any,token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }
    return this.http.patch(this.API + '/admin/delete/profil/'+id+'/'+societe ,httpOptions);

  }

}
