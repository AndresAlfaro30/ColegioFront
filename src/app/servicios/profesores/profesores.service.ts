import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { ResponseProfesoresI } from 'src/app/entidades/ResponseProfesores';
import { profesoresI } from 'src/app/entidades/Profesores';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {
  url = 'http://localhost:8081/v1.0/profesor/'
  constructor(private http: HttpClient) {}

  public getProfesores():Observable<ResponseProfesoresI>{
    return this.http.get<ResponseProfesoresI>(this.url+"obtener");
  }

  public deleteProfesores(form:profesoresI) :Observable<ResponseProfesoresI>{ 
    return this.http.post<ResponseProfesoresI>(this.url +"eliminar",form);
  }

  
  public registro(form:profesoresI) :Observable<ResponseProfesoresI>{ 
    return this.http.post<ResponseProfesoresI>(this.url +"registrar",form);
  }
}
