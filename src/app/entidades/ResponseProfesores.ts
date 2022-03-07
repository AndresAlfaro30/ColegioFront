import { profesoresI } from "./Profesores";
import { ResultadoI } from "./Resultado";

export interface ResponseProfesoresI{
    resultado: ResultadoI;
    datos: profesoresI[];
}