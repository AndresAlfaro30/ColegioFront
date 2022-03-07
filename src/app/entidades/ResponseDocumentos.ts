import { documentoI } from "./Docs";
import { materiaI } from "./Materias";
import { profesoresI } from "./Profesores";
import { ResultadoI } from "./Resultado";

export interface ResponseDocsI{
    resultado: ResultadoI;
    datos: documentoI[];
}