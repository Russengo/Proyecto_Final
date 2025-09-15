import { Router } from "express";
import { getEjemplos } from "../controllers/ejemplo.controller.js";

const router = Router();

router.get("/", getEjemplos);

export default router;
