"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const adminSchema = new mongoose_1.Schema({
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
}, {
    toJSON: {
        virtuals: true,
    },
});
adminSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
    next();
});
// set '' after saving password
adminSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
exports.Admin = (0, mongoose_1.model)('Admin', adminSchema);
