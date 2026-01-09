
// Interfaces
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

// Clase Estudiante
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

// Clase SistemaEstudiantes
class SistemaEstudiantes {
  private estudiantes: Estudiante[] = [];

  // 1. agregar
  agregar(est: Estudiante): IResultado<Estudiante> {
    // Validaciones: ID no repetido
    for (let i = 0; i < this.estudiantes.length; i++) {
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
  }

  // 2. listar
  listar(): Estudiante[] {
    // devolvemos copia superficial para evitar manipulación directa
    return this.estudiantes.slice();
  }

  // 3. buscarPorId
  buscarPorId(id: number): IResultado<Estudiante> {
    for (let i = 0; i < this.estudiantes.length; i++) {
      if (this.estudiantes[i].id === id) {
        return { ok: true, mensaje: "Estudiante encontrado.", data: this.estudiantes[i] };
      }
    }
    return { ok: false, mensaje: "No existe estudiante con ese ID." };
  }

  // 4. actualizarPromedio
  actualizarPromedio(id: number, nuevoPromedio: number): IResultado<Estudiante> {
    if (nuevoPromedio < 0 || nuevoPromedio > 10) {
      return { ok: false, mensaje: "Promedio inválido. Debe estar entre 0 y 10." };
    }

    for (let i = 0; i < this.estudiantes.length; i++) {
      if (this.estudiantes[i].id === id) {
        this.estudiantes[i].promedio = nuevoPromedio;
        return { ok: true, mensaje: "Promedio actualizado.", data: this.estudiantes[i] };
      }
    }

    return { ok: false, mensaje: "No existe estudiante con ese ID." };
  }

  // 5. cambiarEstado
  cambiarEstado(id: number, activo: boolean): IResultado<Estudiante> {
    for (let i = 0; i < this.estudiantes.length; i++) {
      if (this.estudiantes[i].id === id) {
        this.estudiantes[i].activo = activo;
        return { ok: true, mensaje: "Estado actualizado.", data: this.estudiantes[i] };
      }
    }
    return { ok: false, mensaje: "No existe estudiante con ese ID." };
  }

  // 6. listarActivos
  listarActivos(): Estudiante[] {
    const activos: Estudiante[] = [];
    for (let i = 0; i < this.estudiantes.length; i++) {
      if (this.estudiantes[i].activo) {
        activos.push(this.estudiantes[i]);
      }
    }
    return activos;
  }

  // 7. promedioGeneral
  promedioGeneral(): number {
    if (this.estudiantes.length === 0) return 0;
    let suma = 0;
    for (let i = 0; i < this.estudiantes.length; i++) {
      suma += this.estudiantes[i].promedio;
    }
    return suma / this.estudiantes.length;
  }
}

// Funciones sueltas solicitadas

function mostrarMenu(): void {
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

function ejecutarDemo(sistema: SistemaEstudiantes): void {
  console.log("== Ejecutando demo mínima ==");

  // 1) Agrega 3 estudiantes
  console.log("\n1) Agregando 3 estudiantes...");
  const r1 = sistema.agregar(new Estudiante(1, "Ana Pérez", 20, "Sistemas", 8.5));
  const r2 = sistema.agregar(new Estudiante(2, "Luis Gómez", 22, "Arquitectura", 7.2));
  const r3 = sistema.agregar(new Estudiante(3, "María López", 19, "Diseño", 9.1));

  console.log("Agregar 1:", r1.mensaje);
  console.log("Agregar 2:", r2.mensaje);
  console.log("Agregar 3:", r3.mensaje);

  // 2) Lista todos
  console.log("\n2) Listando todos los estudiantes:");
  const todos = sistema.listar();
  for (let i = 0; i < todos.length; i++) {
    console.log(todos[i].toString());
  }

  // 3) Busca 1 por id
  console.log("\n3) Buscando estudiante con ID = 1:");
  const busq = sistema.buscarPorId(1);
  if (busq.ok && busq.data) {
    console.log("Encontrado:", busq.data.toString());
  } else {
    console.log(busq.mensaje);
  }

  // 4) Actualiza promedio (cambiamos promedio del ID=2)
  console.log("\n4) Actualizando promedio del ID = 2 a 8.8");
  const upd = sistema.actualizarPromedio(2, 8.8);
  console.log(upd.mensaje);
  if (upd.ok && upd.data) console.log("Actualizado:", upd.data.toString());

  // 5) Cambia estado a inactivo (ID = 3)
  console.log("\n5) Cambiando estado del ID = 3 a inactivo");
  const st = sistema.cambiarEstado(3, false);
  console.log(st.mensaje);
  if (st.ok && st.data) console.log("Estado actual:", st.data.toString());

  // 6) Lista solo activos
  console.log("\n6) Listando solo estudiantes activos:");
  const activos = sistema.listarActivos();
  if (activos.length === 0) {
    console.log("No hay estudiantes activos.");
  } else {
    for (let i = 0; i < activos.length; i++) {
      console.log(activos[i].toString());
    }
  }

  // 7) Muestra el promedio general del curso
  console.log("\n7) Promedio general del curso:");
  const prom = sistema.promedioGeneral();
  console.log("Promedio general (todos los estudiantes):", prom.toFixed(2));

  console.log("\n== Demo finalizada ==");
}
  mostrarMenu();
  const sistema = new SistemaEstudiantes();
  ejecutarDemo(sistema);