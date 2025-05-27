"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_contant_1 = require("./user.contant");
// -----------user schema--------------
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    status: {
        type: String,
        enum: user_contant_1.UserStatus,
        default: 'in-progress',
    },
    image: { type: String, default: 'N/A' },
    phone: { type: String, default: 'N/A' },
    address: { type: String, default: 'N/A' },
    city: { type: String, default: 'N/A' },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
// ---------password encrioted with hash-----------
userSchema.pre('save', async function (next) {
    const user = this;
    // hashing password and save into DATABASE
    user.password = await bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
    next();
});
// after saving password
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
