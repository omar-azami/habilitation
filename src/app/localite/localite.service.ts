import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocaliteService {

  constructor(private http: HttpClient) { }

  API = 'http://localhost:1111';

  public registerLocalite(localite: any, token : String) { // token
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }   
        return this.http.post(this.API + '/admin/add/localite', localite,httpOptions).pipe(map(res => true));
  }

  public getLocaliteParField(nom: String, token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }
    
    return this.http.get(this.API + '/admin/show/localite/'+nom, httpOptions);
  }

  public getLocalite(token:String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }
  
    return this.http.get(this.API + '/admin/show/localite',httpOptions);
  }

  public deleteLocalite(id: number, token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  } 
    return this.http.delete(this.API + '/admin/delete/localite/' + id,httpOptions);
  }

  public updateLocalite(id: number, localite: any,token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }
    return this.http.patch(this.API + '/admin/patch/localite/'+id ,localite, httpOptions);
  }
  public getLocaliteParId(id: number, token : String) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = { headers: headers_object  }
    
    return this.http.get(this.API + '/admin/show/localite/id/'+id, httpOptions);
  }

}

