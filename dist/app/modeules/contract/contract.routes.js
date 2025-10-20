"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractRoute = void 0;
const express_1 = require("express");
const contract_controller_1 = require("./contract.controller");
const router = (0, express_1.Router)();
router.post("/", contract_controller_1.ContractController.CreateContract);
router.get("/");
exports.contractRoute = router;
