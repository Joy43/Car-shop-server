"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/Contract.ts or Contract.model.ts
const mongoose_1 = require("mongoose");
const contractSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true });
const Contract = mongoose_1.models.Contract || (0, mongoose_1.model)("Contract", contractSchema);
exports.default = Contract;
