import express from "express";
import habRouter from "../Ruteos/habitaciones.js";
import { db } from "../Model/conexionDb.js";
import cors from 'cors';

const result= await db.query("select * from habitaciones ");

console.log(result);

const puerto = 4000;
const app = express();

app.use(cors());

app.use(express.json());

app.use("/habitaciones", habRouter);

app.use(express.urlencoded({extended:true}))

app.listen(puerto, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
  }
});
