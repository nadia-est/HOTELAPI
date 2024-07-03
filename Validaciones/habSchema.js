import { z } from "zod";

const habSchema = z.object({
  Nombre: z.string().min(1, { message: "El campo es obligatorio" }),
  descripcion: z.string().min(1, { message: "El campo es obligatorio" }),
  categoria: z.string().min(1, { message: "El campo es obligatorio" }),
  precio: z.number(),
  imagen:z.string().url(),
  acceso_spa: z.string(),
  acceso_gym: z.string(),
  servicio_habitacion: z.string(),
});

function validarHab(object){
return habSchema.safeParse(object);


}

function validarHabParcial(object){
return habSchema.partial().safeParse(object)
}

export { validarHab, validarHabParcial };