let reservas = [];
const valorAdultos = 1000;
const valorMenores = 2000;
const valorDescuento = 0.1;
const descuentoPorCantidad = 4;

function cargarReservasDesdeLocalStorage() {
  const reservasJSON = localStorage.getItem("reservas");
  if (reservasJSON) {
    reservas = JSON.parse(reservasJSON);
  }
}

function guardarReservasEnLocalStorage() {
  const reservasJSON = JSON.stringify(reservas);
  localStorage.setItem("reservas", reservasJSON);
}


function registrarCondiciones() {
  let tipoMenu; // Declarar la variable tipoMenu

  do {
    tipoMenu = parseInt(prompt("Elija un numero de menu (1-3):"));
    switch (tipoMenu) {
      case 1:
        console.log("Ha elegido el menu " + tipoMenu);
        break;
      case 2:
        console.log("Ha elegido el menu " + tipoMenu);
        break;
      case 3:
        console.log("Ha elegido el menu " + tipoMenu);
        break;
      default:
        console.log("No ha elegido ningun tipo de menu");
    }
  } while (tipoMenu < 1 || tipoMenu > 3);


  const nombre = prompt("Ingrese nombre y apellido");
  const cantidadAdultos = parseInt(prompt("Cantidad de adultos"));
  const cantidadMenores = parseInt(prompt("Cantidad de menores"));
  const fecha = prompt("Fecha");
  const hora = prompt("Hora");

  registrarReserva(nombre, cantidadAdultos, cantidadMenores, fecha, hora);
}

function registrarReserva(
  nombre,
  cantidadAdultos,
  cantidadMenores,
  fecha,
  hora
) {
  const precioAdultos = cantidadAdultos * valorAdultos;
  const precioMenores = cantidadMenores * valorMenores;

  const cantidadPersonas = cantidadAdultos + cantidadMenores;

  let total, totalConDescuento;

  if (cantidadPersonas >= descuentoPorCantidad) {
    total = precioAdultos + precioMenores;
    totalConDescuento = total - total * valorDescuento;
  } else {
    total = precioAdultos + precioMenores;
    totalConDescuento = total;
  }

  const reserva = {
    nombre: nombre,
    cantidadAdultos: cantidadAdultos,
    cantidadMenores: cantidadMenores,
    fecha: fecha,
    hora: hora,
    totalConDescuento: totalConDescuento,
  };

  reservas.push(reserva);

  const resultado = document.getElementById("resultado");
  resultado.innerHTML =
    nombre + " ha reservado para la fecha " + fecha + " a las " + hora;

  alert(
    "GRACIAS! Su reserva ha sido registrada para la fecha " +
      fecha +
      " a las " +
      hora +
      " para " +
      cantidadPersonas +
      " persona/s y el total a abonar es de: " +
      totalConDescuento
  );

  agregarReserva();
}

function agregarReserva() {
  let opcion = prompt("Desea agregar otra reserva? (SI/NO)").toUpperCase();
  if (opcion === "SI") {
    registrarCondiciones();
  } else {
    guardarReservasEnLocalStorage();
    mostrarReservas();
    let opcionModificar = prompt(
      "Desea modificar alguna reserva? (SI/NO)"
    ).toUpperCase();
    if (opcionModificar === "SI") {
      modificarReserva();
    }
  }
}

function modificarReserva() {
  if (reservas.length === 0) {
    alert("No hay reservas registradas.");
    return;
  }

  let indiceReserva = prompt(
    "Ingrese el numero de reserva que desea modificar (1-" +
      reservas.length +
      "):"
  );

  if (
    isNaN(indiceReserva) ||
    indiceReserva < 1 ||
    indiceReserva > reservas.length
  ) {
    alert("Numero de reserva invalido.");
    return;
  }

  let reserva = reservas[indiceReserva - 1];

  let confirmacion = prompt(
    "Desea modificar la siguiente reserva?" +
      "\nNombre: " +
      reserva.nombre +
      "\nFecha: " +
      reserva.fecha +
      "\nHora: " +
      reserva.hora +
      "\nTotal a abonar: " +
      reserva.totalConDescuento +
      "\n(Responder SI o NO)"
  ).toUpperCase();

  if (confirmacion === "SI") {
    reserva.nombre = prompt("Nuevo nombre y apellido:", reserva.nombre);
    reserva.cantidadAdultos = parseInt(
      prompt("Nueva cantidad de adultos:", reserva.cantidadAdultos)
    );
    reserva.cantidadMenores = parseInt(
      prompt("Nueva cantidad de menores:", reserva.cantidadMenores)
    );
    reserva.fecha = prompt("Nueva fecha:", reserva.fecha);
    reserva.hora = prompt("Nueva hora:", reserva.hora);

    let cantidadPersonas = reserva.cantidadAdultos + reserva.cantidadMenores;
    if (cantidadPersonas >= descuentoPorCantidad) {
      let total =
        reserva.cantidadAdultos * valorAdultos +
        reserva.cantidadMenores * valorMenores;
      reserva.totalConDescuento = total - total * valorDescuento;
    } else {
      reserva.totalConDescuento =
        reserva.cantidadAdultos * valorAdultos +
        reserva.cantidadMenores * valorMenores;
    }

    alert("Reserva modificada exitosamente.");
    guardarReservasEnLocalStorage();
    mostrarReservas();
  } else {
    alert("No se realizo ninguna modificacion.");
  }
}

function mostrarReservas() {
  let listaReservas = "Reservas:\n";
  for (let i = 0; i < reservas.length; i++) {
    let reserva = reservas[i];
    listaReservas +=
      "Numero de reserva: " +
      (i + 1) +
      "\nNombre: " +
      reserva.nombre +
      "\nFecha: " +
      reserva.fecha +
      "\nHora: " +
      reserva.hora +
      "\nTotal a abonar: " +
      reserva.totalConDescuento +
      "\n-----------------------\n";
  }
  alert(listaReservas);
}
function verTodasLasReservas() {
  if (reservas.length === 0) {
    alert("No hay reservas almacenadas.");
    return;
  }

  let listaReservas = "Todas las Reservas:\n";
  for (let i = 0; i < reservas.length; i++) {
    let reserva = reservas[i];
    listaReservas +=
      "Numero de reserva: " +
      (i + 1) +
      "\nNombre: " +
      reserva.nombre +
      "\nFecha: " +
      reserva.fecha +
      "\nHora: " +
      reserva.hora +
      "\nTotal a abonar: " +
      reserva.totalConDescuento +
      "\n-----------------------\n";
  }
  alert(listaReservas);
}


// Cargar reservas desde el LocalStorage
cargarReservasDesdeLocalStorage();

