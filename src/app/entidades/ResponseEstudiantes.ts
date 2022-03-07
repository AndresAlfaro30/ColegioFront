import { estudiantesI } from "./Estudiantes";
import { ResultadoI } from "./Resultado";

export interface ResponseEstudiantessI{
    resultado: ResultadoI;
    datos: estudiantesI[];
}