import * as readline from "readline";

// ================= INTERFACES =================
interface IEstudiante {
  id: number;
  nombre: string;
  edad: number;
  carrera: string;
  activo: boolean;
  promedio: number;
}

interface IResultado<T = any> {
  ok: boolean;
  mensaje: string;
  data?: T;
}

// ================= CLASE ESTUDIANTE =================
class Estudiante implements IEstudiante {
  id: number;
  nombre: string;
  edad: number;
  carrera: string;
  activo: boolean;
  promedio: number;

  constructor(
    id: number,
    nombre: string,
    edad: number,
    carrera: string,
    promedio: number,
    activo: boolean = true
  ) {
    this.id = id;
    this.nombre = nombre;
    this.edad = edad;
    this.carrera = carrera;
    this.promedio = promedio;
    this.activo = activo;
  }

  toString(): string {
    return `ID: ${this.id} | Nombre: ${this.nombre} | Edad: ${this.edad} | Carrera: ${this.carrera} | Promedio: ${this.promedio.toFixed(
      2
    )} | Activo: ${this.activo}`;
  }
}

// ================= SISTEMA =================
class SistemaEstudiantes {
  private estudiantes: Estudiante[] = [];

  agregar(est: Estudiante): IResultado<Estudiante> {
    for (let i = 0; i < this.estudiantes.length; i++) {
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
  }

  listar(): Estudiante[] {
    return this.estudiantes.slice();
  }

  buscarPorId(id: number): IResultado<Estudiante> {
    for (let e of this.estudiantes) {
      if (e.id === id) {
        return { ok: true, mensaje: "Encontrado.", data: e };
      }
    }
    return { ok: false, mensaje: "No existe ese ID." };
  }

  actualizarPromedio(id: number, promedio: number): IResultado<Estudiante> {
    if (promedio < 0 || promedio > 10) {
      return { ok: false, mensaje: "Promedio inválido." };
    }

    for (let e of this.estudiantes) {
      if (e.id === id) {
        e.promedio = promedio;
        return { ok: true, mensaje: "Promedio actualizado.", data: e };
      }
    }
    return { ok: false, mensaje: "No existe ese ID." };
  }

  cambiarEstado(id: number, activo: boolean): IResultado<Estudiante> {
    for (let e of this.estudiantes) {
      if (e.id === id) {
        e.activo = activo;
        return { ok: true, mensaje: "Estado actualizado.", data: e };
      }
    }
    return { ok: false, mensaje: "No existe ese ID." };
  }

  listarActivos(): Estudiante[] {
    return this.estudiantes.filter(e => e.activo);
  }

  promedioGeneral(): number {
    if (this.estudiantes.length === 0) return 0;
    let suma = 0;
    for (let e of this.estudiantes) suma += e.promedio;
    return suma / this.estudiantes.length;
  }
}

// ================= CONSOLA =================
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function preguntar(p: string): Promise<string> {
  return new Promise(resolve => rl.question(p, resolve));
}

// ================= MENÚ =================
function mostrarMenu(): void {
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
async function menuInteractivo(): Promise<void> {
  const sistema = new SistemaEstudiantes();
  let opcion = "";

  do {
    mostrarMenu();
    opcion = await preguntar("Opción: ");

    switch (opcion) {
      case "1": {
        const id = Number(await preguntar("ID: "));
        const nombre = await preguntar("Nombre: ");
        const edad = Number(await preguntar("Edad: "));
        const carrera = await preguntar("Carrera: ");
        const promedio = Number(await preguntar("Promedio: "));

        const res = sistema.agregar(
          new Estudiante(id, nombre, edad, carrera, promedio)
        );
        console.log(res.mensaje);
        break;
      }

      case "2":
        sistema.listar().forEach(e => console.log(e.toString()));
        break;

      case "3": {
        const id = Number(await preguntar("ID: "));
        const r = sistema.buscarPorId(id);
        console.log(r.ok && r.data ? r.data.toString() : r.mensaje);
        break;
      }

      case "4": {
        const id = Number(await preguntar("ID: "));
        const prom = Number(await preguntar("Nuevo promedio: "));
        console.log(sistema.actualizarPromedio(id, prom).mensaje);
        break;
      }

      case "5": {
        const id = Number(await preguntar("ID: "));
        const est = await preguntar("Activo? (si/no): ");
        console.log(
          sistema.cambiarEstado(id, est.toLowerCase() === "si").mensaje
        );
        break;
      }

      case "6":
        sistema.listarActivos().forEach(e => console.log(e.toString()));
        break;

      case "7":
        console.log(
          "Promedio general:",
          sistema.promedioGeneral().toFixed(2)
        );
        break;

      case "0":
        console.log("Saliendo...");
        break;

      default:
        console.log("Opción inválida");
    }
  } while (opcion !== "0");

  rl.close();
}

// ================= EJECUCIÓN =================
menuInteractivo();
