import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDocsI } from 'src/app/entidades/ResponseDocumentos';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {
  url = 'http://localhost:8081/v1.0/documentos/'
  constructor(private http: HttpClient) { }

  public getDocs():Observable<ResponseDocsI>{
    return this.http.get<ResponseDocsI>(this.url+"obtener");
  }
}
