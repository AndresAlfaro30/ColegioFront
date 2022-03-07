import { Component } from '@angular/core';
import { ProfesoresService } from './servicios/profesores/profesores.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Colegio';
  profesores = true;

  profesoresCambio(){
    this.profesores = true;
  }
  estudiantesCambio(){
    this.profesores = false;
  }
  constructor(private profesorService: ProfesoresService){
    
  }
}




