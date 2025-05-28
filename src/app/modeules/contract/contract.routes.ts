import { Router } from "express";
import { ContractController } from "./contract.controller";




const router = Router();

router.post("/",ContractController.CreateContract );
router.get("/",);

export const contractRoute= router;
