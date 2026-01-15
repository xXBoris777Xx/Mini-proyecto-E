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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var readline = require("readline");
// ================= CLASE ESTUDIANTE =================
var Estudiante = /** @class */ (function () {
    function Estudiante(id, nombre, edad, carrera, promedio, activo) {
        if (activo === void 0) { activo = true; }
        this.id = id;
        this.nombre = nombre;
        this.edad = edad;
        this.carrera = carrera;
        this.promedio = promedio;
        this.activo = activo;
    }
    Estudiante.prototype.toString = function () {
        return "ID: ".concat(this.id, " | Nombre: ").concat(this.nombre, " | Edad: ").concat(this.edad, " | Carrera: ").concat(this.carrera, " | Promedio: ").concat(this.promedio.toFixed(2), " | Activo: ").concat(this.activo);
    };
    return Estudiante;
}());
// ================= SISTEMA =================
var SistemaEstudiantes = /** @class */ (function () {
    function SistemaEstudiantes() {
        this.estudiantes = [];
    }
    SistemaEstudiantes.prototype.agregar = function (est) {
        for (var i = 0; i < this.estudiantes.length; i++) {
            if (this.estudiantes[i].id === est.id) {
                return { ok: false, mensaje: "ID ya existe." };
            }
        }
        if (est.edad < 15 || est.edad > 80) {
            return { ok: false, mensaje: "Edad inválida (15-80)." };
        }
        if (est.promedio < 0 || est.promedio > 10) {
            return { ok: false, mensaje: "Promedio inválido (0-10)." };
        }
        this.estudiantes.push(est);
        return { ok: true, mensaje: "Estudiante agregado.", data: est };
    };
    SistemaEstudiantes.prototype.listar = function () {
        return this.estudiantes.slice();
    };
    SistemaEstudiantes.prototype.buscarPorId = function (id) {
        for (var _i = 0, _a = this.estudiantes; _i < _a.length; _i++) {
            var e = _a[_i];
            if (e.id === id) {
                return { ok: true, mensaje: "Encontrado.", data: e };
            }
        }
        return { ok: false, mensaje: "No existe ese ID." };
    };
    SistemaEstudiantes.prototype.actualizarPromedio = function (id, promedio) {
        if (promedio < 0 || promedio > 10) {
            return { ok: false, mensaje: "Promedio inválido." };
        }
        for (var _i = 0, _a = this.estudiantes; _i < _a.length; _i++) {
            var e = _a[_i];
            if (e.id === id) {
                e.promedio = promedio;
                return { ok: true, mensaje: "Promedio actualizado.", data: e };
            }
        }
        return { ok: false, mensaje: "No existe ese ID." };
    };
    SistemaEstudiantes.prototype.cambiarEstado = function (id, activo) {
        for (var _i = 0, _a = this.estudiantes; _i < _a.length; _i++) {
            var e = _a[_i];
            if (e.id === id) {
                e.activo = activo;
                return { ok: true, mensaje: "Estado actualizado.", data: e };
            }
        }
        return { ok: false, mensaje: "No existe ese ID." };
    };
    SistemaEstudiantes.prototype.listarActivos = function () {
        return this.estudiantes.filter(function (e) { return e.activo; });
    };
    SistemaEstudiantes.prototype.promedioGeneral = function () {
        if (this.estudiantes.length === 0)
            return 0;
        var suma = 0;
        for (var _i = 0, _a = this.estudiantes; _i < _a.length; _i++) {
            var e = _a[_i];
            suma += e.promedio;
        }
        return suma / this.estudiantes.length;
    };
    return SistemaEstudiantes;
}());
// ================= CONSOLA =================
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function preguntar(p) {
    return new Promise(function (resolve) { return rl.question(p, resolve); });
}
// ================= MENÚ =================
function mostrarMenu() {
    console.log("\n===== SISTEMA DE ESTUDIANTES =====");
    console.log("1. Agregar estudiante");
    console.log("2. Listar estudiantes");
    console.log("3. Buscar por ID");
    console.log("4. Actualizar promedio");
    console.log("5. Cambiar estado");
    console.log("6. Listar activos");
    console.log("7. Promedio general");
    console.log("0. Salir");
    console.log("=================================");
}
// ================= MAIN =================
function menuInteractivo() {
    return __awaiter(this, void 0, void 0, function () {
        var sistema, opcion, _a, id, _b, nombre, edad, _c, carrera, promedio, _d, res, id, _e, r, id, _f, prom, _g, id, _h, est;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    sistema = new SistemaEstudiantes();
                    opcion = "";
                    _j.label = 1;
                case 1:
                    mostrarMenu();
                    return [4 /*yield*/, preguntar("Opción: ")];
                case 2:
                    opcion = _j.sent();
                    _a = opcion;
                    switch (_a) {
                        case "1": return [3 /*break*/, 3];
                        case "2": return [3 /*break*/, 9];
                        case "3": return [3 /*break*/, 10];
                        case "4": return [3 /*break*/, 12];
                        case "5": return [3 /*break*/, 15];
                        case "6": return [3 /*break*/, 18];
                        case "7": return [3 /*break*/, 19];
                        case "0": return [3 /*break*/, 20];
                    }
                    return [3 /*break*/, 21];
                case 3:
                    _b = Number;
                    return [4 /*yield*/, preguntar("ID: ")];
                case 4:
                    id = _b.apply(void 0, [_j.sent()]);
                    return [4 /*yield*/, preguntar("Nombre: ")];
                case 5:
                    nombre = _j.sent();
                    _c = Number;
                    return [4 /*yield*/, preguntar("Edad: ")];
                case 6:
                    edad = _c.apply(void 0, [_j.sent()]);
                    return [4 /*yield*/, preguntar("Carrera: ")];
                case 7:
                    carrera = _j.sent();
                    _d = Number;
                    return [4 /*yield*/, preguntar("Promedio: ")];
                case 8:
                    promedio = _d.apply(void 0, [_j.sent()]);
                    res = sistema.agregar(new Estudiante(id, nombre, edad, carrera, promedio));
                    console.log(res.mensaje);
                    return [3 /*break*/, 22];
                case 9:
                    sistema.listar().forEach(function (e) { return console.log(e.toString()); });
                    return [3 /*break*/, 22];
                case 10:
                    _e = Number;
                    return [4 /*yield*/, preguntar("ID: ")];
                case 11:
                    id = _e.apply(void 0, [_j.sent()]);
                    r = sistema.buscarPorId(id);
                    console.log(r.ok && r.data ? r.data.toString() : r.mensaje);
                    return [3 /*break*/, 22];
                case 12:
                    _f = Number;
                    return [4 /*yield*/, preguntar("ID: ")];
                case 13:
                    id = _f.apply(void 0, [_j.sent()]);
                    _g = Number;
                    return [4 /*yield*/, preguntar("Nuevo promedio: ")];
                case 14:
                    prom = _g.apply(void 0, [_j.sent()]);
                    console.log(sistema.actualizarPromedio(id, prom).mensaje);
                    return [3 /*break*/, 22];
                case 15:
                    _h = Number;
                    return [4 /*yield*/, preguntar("ID: ")];
                case 16:
                    id = _h.apply(void 0, [_j.sent()]);
                    return [4 /*yield*/, preguntar("Activo? (si/no): ")];
                case 17:
                    est = _j.sent();
                    console.log(sistema.cambiarEstado(id, est.toLowerCase() === "si").mensaje);
                    return [3 /*break*/, 22];
                case 18:
                    sistema.listarActivos().forEach(function (e) { return console.log(e.toString()); });
                    return [3 /*break*/, 22];
                case 19:
                    console.log("Promedio general:", sistema.promedioGeneral().toFixed(2));
                    return [3 /*break*/, 22];
                case 20:
                    console.log("Saliendo...");
                    return [3 /*break*/, 22];
                case 21:
                    console.log("Opción inválida");
                    _j.label = 22;
                case 22:
                    if (opcion !== "0") return [3 /*break*/, 1];
                    _j.label = 23;
                case 23:
                    rl.close();
                    return [2 /*return*/];
            }
        });
    });
}
// ================= EJECUCIÓN =================
menuInteractivo();
