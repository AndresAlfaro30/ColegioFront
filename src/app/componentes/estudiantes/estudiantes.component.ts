import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { documentoI } from 'src/app/entidades/Docs';
import { estudiantesI } from 'src/app/entidades/Estudiantes';
import { DocumentosService } from 'src/app/servicios/docs/documentos.service';
import { EstudianteService } from 'src/app/servicios/estudiante/estudiante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss']
})
export class EstudiantesComponent implements OnInit {
  registroForm = new FormGroup({
    idProfesor: new FormControl('', Validators.required),
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    tipoIdentificacion: new FormControl('', Validators.required),
    numeroIdentificacion: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required),
    celular: new FormControl('', Validators.required),
    edad: new FormControl('', Validators.required),
  })

  public estudiantesRespuesta!: estudiantesI[];
  public documentos!: documentoI[];
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  editarV = false;
  

  editarForm = new FormGroup({
    idEstudiante: new FormControl('', Validators.required),
  })
  constructor(private estudianteService: EstudianteService, private documentosService: DocumentosService) { }

  ngOnInit(): void {
    this.consultarEstudiantes();
    this.obtenerTiposDoc();
    this.cancelar();
  }
  consultarEstudiantes(){
    this.estudianteService.getEstudiantes().subscribe(data => {
      console.log(data);
      if (data.resultado.codigo == 200) {


        this.estudiantesRespuesta = data.datos;


      } else (Swal.fire(
        'Error!',
        data.datos.toString(),
        'error'
      ))


    });
  }
  

  editar(estudiante:estudiantesI){

    this.registroForm = new FormGroup({
      idEstudiantes: new FormControl(estudiante.idEstudiante, Validators.required),
      nombres: new FormControl(estudiante.nombres, Validators.required),
      apellidos: new FormControl(estudiante.apellidos, Validators.required),
      tipoIdentificacion: new FormControl(estudiante.tipoIdentificacion, Validators.required),
      numeroIdentificacion: new FormControl(estudiante.numeroIdentificacion, Validators.required),
      correo: new FormControl(estudiante.correo, Validators.required),
      celular: new FormControl(estudiante.celular, Validators.required),
      edad: new FormControl(estudiante.edad, Validators.required),
    })
    this.editarV = true;
  }

  cancelar(){
    this.registroForm = new FormGroup({
      idEstudiantes: new FormControl('', Validators.required),
      nombres: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      tipoIdentificacion: new FormControl('', Validators.required),
      numeroIdentificacion: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      celular: new FormControl('', Validators.required),
      materia: new FormControl('', Validators.required),
      edad: new FormControl('', Validators.required),
    })
    this.editarV = false;
  }

  eliminar(estudianteEditar:estudiantesI){
    Swal.fire({
      title: '¿Estas seguro de eliminar el estudiante?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        

        this.estudianteService.deleteEstudiantes(estudianteEditar).subscribe(data => {

          if (data.resultado.codigo == 200) {
            Swal.fire(
              'eliminado!',
              data.resultado.descripcion.toString(),
              'success'
            ).then(function () {
            });
          } else (Swal.fire(
            'Error!',
            data.datos.toString(),
            'error'
          ))

        });
        
      }
    })
  }

  obtenerTiposDoc(){
    this.documentosService.getDocs().subscribe(data => {
      if (data.resultado.codigo == 200) {
        this.documentos = data.datos;
      }
    })
  }

  registro(form: estudiantesI) {
    this.estudianteService.registro(form).subscribe(data => {
      console.log(data);
      if (data.resultado.codigo == 200) {

        Swal.fire(
          'Exito!',
          data.resultado.descripcion.toString(),
          'success'
        ).then( () => {
          this.consultarEstudiantes()
        });


      } else (Swal.fire(
        'Error!',
        data.resultado.descripcion.toString(),
        'error'
      ))


    });
  }
}
