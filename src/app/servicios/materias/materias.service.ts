import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseMateriasI } from 'src/app/entidades/ResponseMaterias';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  url = 'http://localhost:8081/v1.0/materia/'
  constructor(private http: HttpClient) { }

  public getMaterias():Observable<ResponseMateriasI>{
    return this.http.get<ResponseMateriasI>(this.url+"obtener");
  }
}
