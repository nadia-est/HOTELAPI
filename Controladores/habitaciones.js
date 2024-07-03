
import { validarHab, validarHabParcial } from "../Validaciones/habSchema.js"; 

import { db } from "../Model/conexionDb.js";

async function getAllHabs(req,res){

  const [resHabitaciones] =await db.query("SELECT * FROM `habitaciones`")
res.json({resultado: resHabitaciones})
  //res.status(200).json({info:{status:200, message:"ok"},data: habitaciones});

}

async function getCatHab(req, res){

 const cat = req.params.categoria;
  console.log('Categoria recibida:', cat);

 const [resCategoria]= await db.query("SELECT * FROM `habitaciones` WHERE categoria=?",cat)

   if(resCategoria.length===0){
    res.json({ info: { status: 404, message: "No tenemos esta categoria de habitacion" }});

  }else{ 
    res.json({ info: { status: 200, message: "OK" }, data: resCategoria });
  }
  
}


async function getById(req, res){

  const habitacionId= req.params.habitacionid;
  const habID = parseInt(habitacionId);

  console.log("Valor de habID:", habID);
  const [resHabitacion]= await db.query("SELECT * FROM `habitaciones` WHERE id =?", habID)

  if (resHabitacion.length === 0) {
    res.status(404).json({ error: 'Habitación no encontrada' });
  } else {
    res.json({ resultado: resHabitacion});
    } 
  }
  

async function postNewHab(req,res){
 
const habValidada= validarHab(req.body)
if(!habValidada.success){
 return res.status(400).json({ info: { status: 400, message: "validation errors" }, errors: habValidada.error.issues,})
}

const nuevaHab=habValidada.data
 
try{const [resultadoValidacion]= await db.query("INSERT INTO `habitaciones`(`Nombre`, `descripcion`, `categoria`, `precio`, `imagen`, `acceso_spa`, `acceso_gym`, `servicio_habitacion`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[ nuevaHab.Nombre,
        nuevaHab.descripcion,
        nuevaHab.categoria,
        nuevaHab.precio,
        nuevaHab.imagen,
        nuevaHab.acceso_spa,
        nuevaHab.acceso_gym,
        nuevaHab.servicio_habitacion,]);
res.status(201).json({info: { status: 201, message: "Habitación creada exitosamente" },data: resultadoValidacion,});

}

catch(error){
  {res.status(500).json({info: { status: 500, message: "Error al crear la habitación" },error: error.message,})}
}
console.log(req.body)
}


async function putParcialHab(req, res){

const habValidada= validarHab(req.body)

if(!habValidada.success){
 return res.status(400).json({ info: { status: 400, message: "validation errors" }, errors: habValidada.error.issues,})
};

console.log("Valor de habitacionid:", req.params.habitacionid);

  const habitacionId= req.params.habitacionid;


  const habID = parseInt(habitacionId);

  const [resHabitacion]= await db.query("SELECT * FROM `habitaciones` WHERE id = ?",habID)

if(resHabitacion=== -1){
  return res.json({ info: { status: 404, message: "habitacion no encontrada" }});
}
  const updateHab = habValidada.data;
  try {
   const [resupdate] = await db.query(
  "UPDATE `habitaciones` SET `Nombre` = ?, `descripcion` = ?, `categoria` = ?, `precio` = ?, `imagen` = ?, `acceso_spa` = ?, `acceso_gym` = ?, `servicio_habitacion` = ? WHERE id = ?",
  [
    updateHab.Nombre,
    updateHab.descripcion,
    updateHab.categoria,
    updateHab.precio,
    updateHab.imagen,
    updateHab.acceso_spa,
    updateHab.acceso_gym,
    updateHab.servicio_habitacion,
    habID 
  ]
);

    return res.status(200).json({ info: { status: 200, message: "habitacion actualizada" }, data: resupdate });
  } catch (error) {
    return res.status(500).json({ info: { status: 500, message: "Error al actualizar la habitación" }, error: error.message });
  }
}

async function deleteHab(req,res){

 const habitacionId= req.params.habitacionid;
  const habID = parseInt(habitacionId);
  
  const [resHabDeleteid]= await db.query("SELECT * FROM `habitaciones` WHERE id = ?",habID)


if(resHabDeleteid=== -1){
  return res.json({ info: { status: 404, message: "habitacion no encontrada" }});
}


try {const [resDelete]=await db.query("DELETE FROM `habitaciones` WHERE id = ?", habID)

   return res.status(200).json({ info: { status: 200, message: "habitacion eliminada" }, data: resDelete });
} 

catch(error){
  return res.status(500).json({ info: { status: 500, message: "Error al eliminar la habitación" }, error: error.message });
}

}

export { getAllHabs, getCatHab, getById,postNewHab,putParcialHab,deleteHab};