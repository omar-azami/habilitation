import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TypesocieteService {

  constructor(private http: HttpClient) { }

  API = 'http://localhost:1111';

  public registerTypeSocite(TypeSociteData: any, token : String) { // token
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }   
        return this.http.post(this.API + '/admin/add/typeSociete', TypeSociteData,httpOptions).pipe(map(res => true));
  }

  public getTypeSociet(nom: String, token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }
    
    return this.http.get(this.API + '/admin/show/typeSociete/'+nom, httpOptions);
  }

  public getTypeSociete(token:String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }
  
    return this.http.get(this.API + '/admin/show/typeSociete',httpOptions);
  }

  public deleteTypeSociete(id: number, token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  } 
    return this.http.delete(this.API + '/admin/delete/typeSociete/' + id,httpOptions);
  }

  public updateTypeSociete(id: number, typeSocite: any,token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }
    return this.http.patch(this.API + '/admin/update/typeSociete/'+id ,typeSocite, httpOptions);
  }

}
