


let reservas = [];
const valorAdultos = 1000;
const valorMenores = 2000;
const valorDescuento = 0.1;
const descuentoPorCantidad = 4;

function mostrarMensaje(mensaje) {
  var mensajes = "";
  mensajes += mensaje + "<br>";

  var resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = mensajes;
}

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
  const nombre = document.getElementById("nombre").value;
  const cantidadAdultos = document.getElementById("adultos").value;
  const cantidadMenores = document.getElementById("menores").value;
  const tipoMenu = document.getElementById("tipoMenu").value; // Corregido el ID

  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;

  registrarReserva(nombre, cantidadAdultos, cantidadMenores, tipoMenu, fecha, hora);
}

function registrarReserva(nombre, cantidadAdultos, cantidadMenores, tipoMenu, fecha, hora) {
  const precioAdultos = cantidadAdultos * valorAdultos;
  const precioMenores = cantidadMenores * valorMenores;
  const cantidadPersonas = parseInt(cantidadAdultos) + parseInt(cantidadMenores); // Convertir a números enteros

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
    cantidadAdultos: parseInt(cantidadAdultos), // Convertir a números enteros
    cantidadMenores: parseInt(cantidadMenores), // Convertir a números enteros
    tipoMenu: tipoMenu,
    fecha: fecha,
    hora: hora,
    totalConDescuento: totalConDescuento,
  };

  reservas.push(reserva);

  mostrarMensaje(". GRACIAS! Su reserva ha sido registrada para la fecha " +
    fecha +
    " a las " +
    hora +
    " para " +
    cantidadPersonas +
    " persona/s y el total a abonar es de: " +
    totalConDescuento);

  agregarReserva();
}

function agregarReserva() {
  Swal.fire({
    title: "¿Desea agregar otra reserva?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "SI",
    cancelButtonText: "NO"
  }).then((result) => {
    if (result.isConfirmed) {
     
      document.getElementById("nombre").value = "";
      document.getElementById("adultos").value = "";
      document.getElementById("menores").value = "";
      document.getElementById("fecha").value = "";
      document.getElementById("hora").value = "";
    } else {
      guardarReservasEnLocalStorage();
      mostrarReservas();
      Swal.fire({
        title: "¿Desea modificar alguna reserva?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "SI",
        cancelButtonText: "NO"
      }).then((result) => {
        if (result.isConfirmed) {
          modificarReserva();
        }
      });
    }
  });
}


function modificarReserva() {
  if (reservas.length === 0) {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "No hay reservas registradas.";
    return;
  }

  Swal.fire({
    title: "Modificar Reserva",
    input: "select",
    inputOptions: (() => {
      let options = {};
      for (let i = 0; i < reservas.length; i++) {
        let reserva = reservas[i];
        options[i + 1] = `Número de reserva: ${i + 1} - ${reserva.nombre}`;
      }
      return options;
    })(),
    inputPlaceholder: "Seleccione una reserva",
    showCancelButton: true,
    confirmButtonText: "Modificar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      const indiceReserva = parseInt(result.value);
      if (isNaN(indiceReserva) || indiceReserva < 1 || indiceReserva > reservas.length) {
        Swal.fire("Error", "Número de reserva inválido.", "error");
        return;
      }

      const reserva = reservas[indiceReserva - 1];
      Swal.mixin({
        input: "text",
        confirmButtonText: "Siguiente",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
        progressSteps: ["1", "2", "3", "4", "5", "6"],
      }).queue([
        {
          title: "Modificar Tipo de Menú",
          text: "Ingrese el nuevo tipo de menú:",
          inputValue: reserva.tipoMenu,
          inputPlaceholder: "Menú 1, Menú 2, Menú 3",
        },
        {
          title: "Modificar Cantidad de Adultos",
          text: "Ingrese la nueva cantidad de adultos:",
          inputValue: reserva.cantidadAdultos.toString(),
          inputPlaceholder: "0",
        },
        {
          title: "Modificar Cantidad de Niños",
          text: "Ingrese la nueva cantidad de niños:",
          inputValue: reserva.cantidadMenores.toString(),
          inputPlaceholder: "0",
        },
        {
          title: "Modificar Nombre",
          text: "Ingrese el nuevo nombre:",
          inputValue: reserva.nombre,
          inputPlaceholder: "Nombre y Apellido",
        },
        {
          title: "Modificar Fecha",
          text: "Seleccione la nueva fecha:",
          input: "date",
          inputValue: reserva.fecha,
        },
        {
          title: "Modificar Hora",
          text: "Seleccione la nueva hora:",
          input: "time",
          inputValue: reserva.hora,
        },
      ]).then((result) => {
        if (!result.dismiss) {
          const [
            nuevoTipoMenu,
            nuevaCantidadAdultos,
            nuevaCantidadMenores,
            nuevoNombre,
            nuevaFecha,
            nuevaHora,
          ] = result.value;
          
          reserva.tipoMenu = nuevoTipoMenu;
          reserva.cantidadAdultos = parseInt(nuevaCantidadAdultos);
          reserva.cantidadMenores = parseInt(nuevaCantidadMenores);
          reserva.nombre = nuevoNombre;
          reserva.fecha = nuevaFecha;
          reserva.hora = nuevaHora;

          guardarReservasEnLocalStorage();
          mostrarReservas();
        }
      });
    }
  });
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
  const resultado = document.getElementById("resultado");
  resultado.innerHTML =listaReservas;
}
function verTodasLasReservas() {
  if (reservas.length === 0) {
    const resultado = document.getElementById("resultado");
  resultado.innerHTML ="No hay reservas almacenadas.";
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
  const resultado = document.getElementById("resultado");
  resultado.innerHTML =listaReservas;
}
function eliminarReservas() {
  console.log("mensaje");
  reservas = [];
  localStorage.clear();
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "Se han eliminado las reservas";
}


