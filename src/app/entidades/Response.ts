import { profesoresI } from "./Profesores";
import { ResultadoI } from "./Resultado";

export interface ResponseI{
    resultado: ResultadoI;
    datos: profesoresI[];
}