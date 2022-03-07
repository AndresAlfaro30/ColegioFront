import { materiaI } from "./Materias";
import { profesoresI } from "./Profesores";
import { ResultadoI } from "./Resultado";

export interface ResponseMateriasI{
    resultado: ResultadoI;
    datos: materiaI[];
}