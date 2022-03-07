import { Component, OnInit } from '@angular/core';
import { profesoresI } from 'src/app/entidades/Profesores';
import { ProfesoresService } from 'src/app/servicios/profesores/profesores.service';
import Swal from 'sweetalert2';
import { faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MateriasService } from 'src/app/servicios/materias/materias.service';
import { materiaI } from 'src/app/entidades/Materias';
import { DocumentosService } from 'src/app/servicios/docs/documentos.service';
import { documentoI } from 'src/app/entidades/Docs';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.scss']
})
export class ProfesoresComponent implements OnInit {

  registroForm = new FormGroup({
    idProfesor: new FormControl('', Validators.required),
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    tipoIdentificacion: new FormControl('', Validators.required),
    numeroIdentificacion: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required),
    celular: new FormControl('', Validators.required),
    materia: new FormControl('', Validators.required),
    edad: new FormControl('', Validators.required),
  })

  public profesoresRespuesta!: profesoresI[];
  public materias!: materiaI[];
  public documentos!: documentoI[];
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  editarV = false;
  

  editarForm = new FormGroup({
    idProfesor: new FormControl('', Validators.required),
  })

  constructor(private profesorService: ProfesoresService, private materiasService: MateriasService, private documentosService: DocumentosService) {
    
  }

  ngOnInit(): void {
    this.consultarProfesores();
    this.obtenerMaterias();
    this.obtenerTiposDoc();
    this.cancelar();
  }

  consultarProfesores(){
    this.profesorService.getProfesores().subscribe(data => {
      console.log(data);
      if (data.resultado.codigo == 200) {


        this.profesoresRespuesta = data.datos;


      } else (Swal.fire(
        'Error!',
        data.datos.toString(),
        'error'
      ))


    });
  }
  

  editar(profesor:profesoresI){

    this.registroForm = new FormGroup({
      idProfesor: new FormControl(profesor.idProfesor, Validators.required),
      nombres: new FormControl(profesor.nombres, Validators.required),
      apellidos: new FormControl(profesor.apellidos, Validators.required),
      tipoIdentificacion: new FormControl(profesor.tipoIdentificacion, Validators.required),
      numeroIdentificacion: new FormControl(profesor.numeroIdentificacion, Validators.required),
      correo: new FormControl(profesor.correo, Validators.required),
      celular: new FormControl(profesor.celular, Validators.required),
      materia: new FormControl(profesor.materia, Validators.required),
      edad: new FormControl(profesor.edad, Validators.required),
    })
    this.editarV = true;
  }

  cancelar(){
    this.registroForm = new FormGroup({
      idProfesor: new FormControl('', Validators.required),
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

  eliminar(profesorEditar:profesoresI){
    Swal.fire({
      title: '¿Estas seguro de eliminar el profesor?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        

        this.profesorService.deleteProfesores(profesorEditar).subscribe(data => {

          if (data.resultado.codigo == 200) {
            Swal.fire(
              'eliminado!',
              data.resultado.descripcion.toString(),
              'success'
            ).then(function () {
              window.location.href = "/";
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

  obtenerMaterias(){
    this.materiasService.getMaterias().subscribe(data => {
      if (data.resultado.codigo == 200) {
        this.materias = data.datos;
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

  registro(form: profesoresI) {
    this.profesorService.registro(form).subscribe(data => {
      console.log(data);
      if (data.resultado.codigo == 200) {

        Swal.fire(
          'Exito!',
          data.resultado.descripcion.toString(),
          'success'
        ).then(function () {
          window.location.href = "/";
        });


      } else (Swal.fire(
        'Error!',
        data.resultado.descripcion.toString(),
        'error'
      ))


    });
  }
}
