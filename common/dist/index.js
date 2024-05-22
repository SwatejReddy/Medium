"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogInput = exports.createBlogInput = exports.singinInput = exports.signupInput = void 0;
const zod_1 = __importDefault(require("zod"));
//signupInput
exports.signupInput = zod_1.default.object({
    username: zod_1.default.string(),
    password: zod_1.default.string().min(6),
    name: zod_1.default.string()
});
//singinInput
exports.singinInput = zod_1.default.object({
    username: zod_1.default.string(),
    password: zod_1.default.string().min(6)
});
//createBlogInput
exports.createBlogInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string()
});
//updateBlogInput
exports.updateBlogInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    id: zod_1.default.number()
});
