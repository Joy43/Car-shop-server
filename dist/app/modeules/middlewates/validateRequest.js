"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateRequest = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync({
                body: req.body,
            });
            next();
        }
        catch (err) {
            next(err);
        }
    };
};
exports.default = validateRequest;
