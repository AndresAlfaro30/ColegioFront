import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { estudiantesI } from 'src/app/entidades/Estudiantes';
import { ResponseEstudiantessI } from 'src/app/entidades/ResponseEstudiantes';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  url = 'http://localhost:8081/v1.0/estudiante/'
  constructor(private http: HttpClient) {}

  public getEstudiantes():Observable<ResponseEstudiantessI>{
    return this.http.get<ResponseEstudiantessI>(this.url+"obtener");
  }

  public deleteEstudiantes(form:estudiantesI) :Observable<ResponseEstudiantessI>{ 
    return this.http.post<ResponseEstudiantessI>(this.url +"eliminar",form);
  }

  
  public registro(form:estudiantesI) :Observable<ResponseEstudiantessI>{ 
    return this.http.post<ResponseEstudiantessI>(this.url +"registrar",form);
  }
}
