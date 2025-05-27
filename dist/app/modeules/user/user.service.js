"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const createUser = async (payload) => {
    payload.role = 'user';
    const result = await user_model_1.default.create(payload);
    return result;
};
const createAdminIntoDB = async (userData) => {
    const result = await user_model_1.default.create(userData);
    return result;
};
const getUser = async () => {
    const result = await user_model_1.default.find();
    return result;
};
const getSingleUser = async (id) => {
    const result = await user_model_1.default.findById(id);
    return result;
};
const updateUser = async (id, payload) => {
    const result = await user_model_1.default.findByIdAndUpdate(id, payload);
    return result;
};
const deleteUser = async (id) => {
    const result = await user_model_1.default.findByIdAndDelete(id);
    return result;
};
exports.userService = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser,
    createAdminIntoDB
};
