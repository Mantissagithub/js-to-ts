"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var recoil_1 = require("recoil");
var Login_1 = require("./Components/Login");
var Signup_1 = require("./Components/Signup");
var TodoList_1 = require("./Components/TodoList");
var react_router_dom_2 = require("react-router-dom");
var recoil_2 = require("recoil");
var authState_js_1 = require("./store/authState.js");
function App() {
    return (react_1.default.createElement(recoil_1.RecoilRoot, null,
        react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement(InitState, null),
            react_1.default.createElement(react_router_dom_1.Routes, null,
                react_1.default.createElement(react_router_dom_1.Route, { path: '/login', element: react_1.default.createElement(Login_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: '/signup', element: react_1.default.createElement(Signup_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: '/todos', element: react_1.default.createElement(TodoList_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: '/', element: react_1.default.createElement(Login_1.default, null) })))));
}
function InitState() {
    var _this = this;
    var setAuth = (0, recoil_2.useSetRecoilState)(authState_js_1.authState);
    var navigate = (0, react_router_dom_2.useNavigate)();
    var init = function () { return __awaiter(_this, void 0, void 0, function () {
        var token, response, data, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = localStorage.getItem("token");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch('http://localhost:3000/auth/me', {
                            headers: { Authorization: "Bearer ".concat(token) }
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (data.username) {
                        setAuth({ token: data.token, username: data.username });
                        navigate("/todos");
                    }
                    else {
                        navigate("/login");
                    }
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    navigate("/login");
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        init();
    }, []);
    return react_1.default.createElement(react_1.default.Fragment, null);
}
exports.default = App;
