"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../src/index"));
exports.default = [
    index_1.default.get('/', (req, res) => {
        res.send("Ola");
    }),
    index_1.default.get('/users', (req, res) => {
        res.status(200).send("Olaa");
    })
];
