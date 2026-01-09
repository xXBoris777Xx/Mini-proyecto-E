// Clase Estudiante
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
// Clase SistemaEstudiantes
var SistemaEstudiantes = /** @class */ (function () {
    function SistemaEstudiantes() {
        this.estudiantes = [];
    }
    // 1. agregar
    SistemaEstudiantes.prototype.agregar = function (est) {
        // Validaciones: ID no repetido
        for (var i = 0; i < this.estudiantes.length; i++) {
            if (this.estudiantes[i].id === est.id) {
                return { ok: false, mensaje: "ID ya existe." };
            }
        }
        // Edad valida: >=15 y <=80
        if (est.edad < 15 || est.edad > 80) {
            return { ok: false, mensaje: "Edad inválida. Debe estar entre 15 y 80." };
        }
        // Promedio valido: 0 a 10
        if (est.promedio < 0 || est.promedio > 10) {
            return { ok: false, mensaje: "Promedio inválido. Debe estar entre 0 y 10." };
        }
        this.estudiantes.push(est);
        return { ok: true, mensaje: "Estudiante agregado.", data: est };
    };
    // 2. listar
    SistemaEstudiantes.prototype.listar = function () {
        // devolvemos copia superficial para evitar manipulación directa
        return this.estudiantes.slice();
    };
    // 3. buscarPorId
    SistemaEstudiantes.prototype.buscarPorId = function (id) {
        for (var i = 0; i < this.estudiantes.length; i++) {
            if (this.estudiantes[i].id === id) {
                return { ok: true, mensaje: "Estudiante encontrado.", data: this.estudiantes[i] };
            }
        }
        return { ok: false, mensaje: "No existe estudiante con ese ID." };
    };
    // 4. actualizarPromedio
    SistemaEstudiantes.prototype.actualizarPromedio = function (id, nuevoPromedio) {
        if (nuevoPromedio < 0 || nuevoPromedio > 10) {
            return { ok: false, mensaje: "Promedio inválido. Debe estar entre 0 y 10." };
        }
        for (var i = 0; i < this.estudiantes.length; i++) {
            if (this.estudiantes[i].id === id) {
                this.estudiantes[i].promedio = nuevoPromedio;
                return { ok: true, mensaje: "Promedio actualizado.", data: this.estudiantes[i] };
            }
        }
        return { ok: false, mensaje: "No existe estudiante con ese ID." };
    };
    // 5. cambiarEstado
    SistemaEstudiantes.prototype.cambiarEstado = function (id, activo) {
        for (var i = 0; i < this.estudiantes.length; i++) {
            if (this.estudiantes[i].id === id) {
                this.estudiantes[i].activo = activo;
                return { ok: true, mensaje: "Estado actualizado.", data: this.estudiantes[i] };
            }
        }
        return { ok: false, mensaje: "No existe estudiante con ese ID." };
    };
    // 6. listarActivos
    SistemaEstudiantes.prototype.listarActivos = function () {
        var activos = [];
        for (var i = 0; i < this.estudiantes.length; i++) {
            if (this.estudiantes[i].activo) {
                activos.push(this.estudiantes[i]);
            }
        }
        return activos;
    };
    // 7. promedioGeneral
    SistemaEstudiantes.prototype.promedioGeneral = function () {
        if (this.estudiantes.length === 0)
            return 0;
        var suma = 0;
        for (var i = 0; i < this.estudiantes.length; i++) {
            suma += this.estudiantes[i].promedio;
        }
        return suma / this.estudiantes.length;
    };
    return SistemaEstudiantes;
}());
// Funciones sueltas solicitadas
function mostrarMenu() {
    console.log("=== Sistema de Estudiantes (Demo) ===");
    console.log("1. Agregar estudiante");
    console.log("2. Listar estudiantes");
    console.log("3. Buscar por ID");
    console.log("4. Actualizar promedio");
    console.log("5. Cambiar estado");
    console.log("6. Listar activos");
    console.log("7. Promedio general");
    console.log("====================================\n");
}
function ejecutarDemo(sistema) {
    console.log("== Ejecutando demo mínima ==");
    // 1) Agrega 3 estudiantes
    console.log("\n1) Agregando 3 estudiantes...");
    var r1 = sistema.agregar(new Estudiante(1, "Ana Pérez", 20, "Sistemas", 8.5));
    var r2 = sistema.agregar(new Estudiante(2, "Luis Gómez", 22, "Arquitectura", 7.2));
    var r3 = sistema.agregar(new Estudiante(3, "María López", 19, "Diseño", 9.1));
    console.log("Agregar 1:", r1.mensaje);
    console.log("Agregar 2:", r2.mensaje);
    console.log("Agregar 3:", r3.mensaje);
    // 2) Lista todos
    console.log("\n2) Listando todos los estudiantes:");
    var todos = sistema.listar();
    for (var i = 0; i < todos.length; i++) {
        console.log(todos[i].toString());
    }
    // 3) Busca 1 por id
    console.log("\n3) Buscando estudiante con ID = 1:");
    var busq = sistema.buscarPorId(1);
    if (busq.ok && busq.data) {
        console.log("Encontrado:", busq.data.toString());
    }
    else {
        console.log(busq.mensaje);
    }
    // 4) Actualiza promedio (cambiamos promedio del ID=2)
    console.log("\n4) Actualizando promedio del ID = 2 a 8.8");
    var upd = sistema.actualizarPromedio(2, 8.8);
    console.log(upd.mensaje);
    if (upd.ok && upd.data)
        console.log("Actualizado:", upd.data.toString());
    // 5) Cambia estado a inactivo (ID = 3)
    console.log("\n5) Cambiando estado del ID = 3 a inactivo");
    var st = sistema.cambiarEstado(3, false);
    console.log(st.mensaje);
    if (st.ok && st.data)
        console.log("Estado actual:", st.data.toString());
    // 6) Lista solo activos
    console.log("\n6) Listando solo estudiantes activos:");
    var activos = sistema.listarActivos();
    if (activos.length === 0) {
        console.log("No hay estudiantes activos.");
    }
    else {
        for (var i = 0; i < activos.length; i++) {
            console.log(activos[i].toString());
        }
    }
    // 7) Muestra el promedio general del curso
    console.log("\n7) Promedio general del curso:");
    var prom = sistema.promedioGeneral();
    console.log("Promedio general (todos los estudiantes):", prom.toFixed(2));
    console.log("\n== Demo finalizada ==");
}
// Si este archivo se ejecuta directamente, corremos la demo
if (require.main === module) {
    mostrarMenu();
    var sistema = new SistemaEstudiantes();
    ejecutarDemo(sistema);
}
