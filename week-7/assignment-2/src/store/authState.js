"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authState = void 0;
var recoil_1 = require("recoil");
exports.authState = (0, recoil_1.atom)({
    key: 'authState',
    default: { token: '', username: '' },
});
