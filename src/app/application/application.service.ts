import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }

  API = 'http://localhost:1111';

  public registerProfil(profil: any, token : String) { // token
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }   
        return this.http.post(this.API + '/admin/add/application', profil ,httpOptions).pipe(map(res => true));
  }

  public getProfil( token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }
    
    return this.http.get(this.API + '/admin/show/applications', httpOptions);
  }

  public getprofilBySociete(societe:number ,token:String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }
  
    return this.http.get(this.API + '/admin/show/application/societe/id/'+societe,httpOptions);
  }
  public getapplicationById(id:number ,token:String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }
  
    return this.http.get(this.API + '/admin/show/application/BYID/'+id,httpOptions);
  }
  
  public deleteProfil(id: number, societe:number,token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  } 
    return this.http.delete(this.API + '/admin/delete/application/'+id+'/'+societe ,httpOptions);
  }

  public updateProfil(id: number , societe:number, profil: any,token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }
    return this.http.patch(this.API + '/admin/patch/application/'+id+'/'+societe ,profil ,httpOptions);

  }

}
