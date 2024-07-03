import express from "express";
import { getAllHabs, getCatHab, getById,postNewHab, putParcialHab,deleteHab} from "../Controladores/habitaciones.js";

const router = express.Router();

router.get("/", getAllHabs);
router.get("/:categoria", getCatHab);
router.get("/habitacion/:habitacionid", getById);

router.post("/:new", postNewHab);
router.put("/:habitacionid", putParcialHab);
router.delete("/:habitacionid",deleteHab);

export default router;
