const TYPES = {
  vacio: "vacio",
  pasillo: "pasillo",
  piloto: "piloto",
  copiloto: "copiloto",
  pasajero: "pasajero",
  bano: "bano",
};

class Espacio {
  constructor() {
    this.type = TYPES.vacio;
  }
}

function insertarMensaje() {
  const tabla = document.getElementById("table");
  const mensaje = document.createElement("div");
  mensaje.textContent =
    "Para crear un bus o  una movilidad, debe agregar filas y/o columnas.";
  mensaje.className = "mensaje";
  tabla.appendChild(mensaje);
}

function quitarMensaje() {
  const tabla = document.getElementById("table");
  tabla.removeChild(tabla.childNodes[1]);
}

function agregarElemento(i, j, bus) {
  const vacio = document.createElement("option");
  const pasillo = document.createElement("option");
  const piloto = document.createElement("option");
  const copiloto = document.createElement("option");
  const pasajero = document.createElement("option");
  const bano = document.createElement("option");

  vacio.textContent = "Vacio";
  pasillo.textContent = "Pasillo";
  piloto.textContent = "Piloto";
  copiloto.textContent = "Copiloto";
  pasajero.textContent = "Pasajero";
  bano.textContent = "Baño";

  vacio.value = "vacio";
  pasillo.value = "pasillo";
  piloto.value = "piloto";
  copiloto.value = "copiloto";
  pasajero.value = "pasajero";
  bano.value = "bano";

  const espacio = document.createElement("select");
  espacio.id = `${i}_${j}`;
  espacio.appendChild(vacio);
  espacio.appendChild(pasillo);
  espacio.appendChild(piloto);
  espacio.appendChild(copiloto);
  espacio.appendChild(pasajero);
  espacio.appendChild(bano);

  const label = document.createElement("label");
  label.textContent = `Espacio ${i} ${j}`;

  const div = document.createElement("div");
  div.className = "vacio";

  espacio.addEventListener("change", (e) => {
    div.className = e.target.options[e.target.options.selectedIndex].value;
    bus[i - 1][j - 1].type =
      TYPES[e.target.options[e.target.options.selectedIndex].value];
  });

  div.appendChild(label);
  div.appendChild(espacio);

  const td = document.createElement("td");
  td.appendChild(div);

  return td;
}

function agregarFilaBus(bus) {
  const fila = [];

  if (bus.length === 0) {
    fila.push(new Espacio());
  } else {
    for (let i = 0; i < bus[0].length; i++) {
      fila.push(new Espacio());
    }
  }

  bus.push(fila);
}

function agregarFilaTabla(bus) {
  const tabla = document.getElementById("table");
  const fragment = document.createDocumentFragment();
  const tr = document.createElement("tr");

  if (bus.length === 0) {
    tr.appendChild(agregarElemento(1, 1, bus));
    fragment.appendChild(tr);
  } else {
    for (let i = 0; i < bus[0].length; i++) {
      tr.appendChild(agregarElemento(bus.length, i + 1, bus));
    }
    fragment.appendChild(tr);
  }

  tabla.appendChild(fragment);
}

function agregarFila(bus) {
  if (bus.length === 0) {
    quitarMensaje();
  }
  if (bus.length < 40) {
    agregarFilaBus(bus);
    agregarFilaTabla(bus);
  }
}

function eliminarFila(bus) {
  if (bus.length === 0) {
    alert("No existen filas por eliminar.");
  } else {
    const tabla = document.getElementById("table");
    tabla.removeChild(tabla.childNodes[bus.length]);
    bus.pop();

    if (bus.length === 0) {
      insertarMensaje();
    }
  }
}

function agregarColumna(bus) {
  const tabla = document.getElementById("table");

  if (bus.length === 0) {
    quitarMensaje();
    const fila = [];
    fila.push(new Espacio());
    bus.push(fila);

    const fragment = document.createDocumentFragment();
    const tr = document.createElement("tr");
    tr.appendChild(agregarElemento(1, 1, bus));
    fragment.appendChild(tr);
    tabla.appendChild(fragment);
  } else if (bus[0].length < 10) {
    const filas = tabla.childNodes;

    for (let i = 0; i < bus.length; i++) {
      const fila = bus[i];
      fila.push(new Espacio());

      filas[i + 1].appendChild(agregarElemento(i + 1, bus[i].length, bus));
    }
  }
}

function eliminarColumna(bus) {
  if (bus.length === 0) {
    alert("No existen columnas por eliminar.");
  } else {
    const tabla = document.getElementById("table");
    const filas = tabla.childNodes;

    for (let i = 0; i < bus.length; i++) {
      let fila = bus[i];
      fila.pop();

      filas[i + 1].removeChild(filas[i + 1].lastChild);
    }

    if (bus[0].length === 0) {
      let filasBus = bus.length;
      for (let i = 0; i < filasBus; i++) {
        bus.pop();
        tabla.removeChild(tabla.lastChild);
      }

      insertarMensaje();
    }
  }
}

function limpiar(bus) {
  const filasBus = bus.length;
  const tabla = document.getElementById("table");

  for (let i = 0; i < filasBus; i++) {
    bus.pop();
    tabla.removeChild(tabla.lastChild);
  }
}

function main() {
  const bus = [];

  insertarMensaje();

  const btnAgregarFila = document.getElementById("btnAgregarFila");
  btnAgregarFila.addEventListener("click", () => {
    agregarFila(bus);
  });

  const btnEliminarFila = document.getElementById("btnEliminarFila");
  btnEliminarFila.addEventListener("click", () => {
    eliminarFila(bus);
  });

  const btnAgregarColumna = document.getElementById("btnAgregarColumna");
  btnAgregarColumna.addEventListener("click", () => {
    agregarColumna(bus);
  });

  const btnEliminarColumna = document.getElementById("btnEliminarColumna");
  btnEliminarColumna.addEventListener("click", () => {
    eliminarColumna(bus);
  });

  const btnGuardar = document.getElementById("btnGuardar");
  btnGuardar.addEventListener("click", () => {
    console.log(JSON.stringify(bus));
  });

  const btnLimpiar = document.getElementById("btnLimpiar");
  btnLimpiar.addEventListener("click", () => {
    if (bus.length > 0) {
      limpiar(bus);
      insertarMensaje();
    }
  });
}

main();
