"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const subscribeSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
}, { timestamps: true });
const Subscribe = mongoose_1.models.Subscribe || (0, mongoose_2.model)("Subscribe", subscribeSchema);
exports.default = Subscribe;
