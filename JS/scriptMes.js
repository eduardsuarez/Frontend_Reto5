const endpointMes = "http://localhost:8080/api/Message/all";
const etpMes = document.getElementById("informacionMes");
/** capturar bones decliente */
const bmostrarMes = document.getElementById("bmostrarMes");
const bguardarMes = document.getElementById("bguardarMes");
const bactualizarMes = document.getElementById("bactualizarMes");
const beliminarMes = document.getElementById("beliminarMes");

/** captura de los inputs de la interfaz html para mensajes */
const idMes = document.getElementById("idMes");
const messagetext = document.getElementById("messagetext");

/**
 * petición get para mensajes
 */

function peticiongetMes() {
  $.ajax({
    method: "GET",
    url: endpointMes,
    success: function (data) {
      getMessage(data);
    },
  });
}

function peticionpostMes() {
  $.ajax({
    method: "POST",
    url: "http://localhost:8080/api/Message/save",
    data: capturarMensajes(),
    datatype: "json",
    contentType: "application/json",
    complete: function (response) {
      mostrarResultadoMes(response.status, "Se guardó con exito");
      //console.log(response.status);
      limpiarCampoMes();
      peticiongetMes();
    },
  });
}

function peticionputMes() {
  $.ajax({
    method: "PUT",
    url: "http://localhost:8080/api/Message/update",
    data: capturarMensajes(),
    datatype: "json",
    contentType: "application/json",
    complete: function (response) {
      mostrarResultadoMes(response.status, "Se guardó con exito");
      //console.log(response.status);
      limpiarCampoMes();
      peticiongetMes();
    },
  });
}

function peticionDeleteMes() {
  $.ajax({
    method: "DELETE",
    url: "http://localhost:8080/api/Message/delete",
    data: captIdMes(),
    datatype: "json",
    contentType: "application/json",
    complete: function (response) {
      resultadoEliminarMes(response.status);
      limpiarCampoMes();
      peticiongetMes();
    },
  });
}

function getMessage(mensajes) {
  let registro = "";
  $.each(mensajes, function (index, mensajes) {
    console.log(mensajes);
    registro +=
      "<tr>" +
      "<td>" +
      mensajes.idMessage +
      "</td>" +
      "<td>" +
      mensajes.messageText +
      "</td>" +
      "</tr>";
  });
  $("#informacionMes").html(registro);
  
}

function capturarMensajes() {
  const data = {
    idMessage : $("#idMes").val(),
    messageText: $("#messagetext").val(),
  };
  return JSON.stringify(data);
}

function mostrarResultadoMes(status, texto) {
  let mensaje = "";
  if (status == 201) {
    mensaje = texto;
  } else if (status == 204) {
    mensaje = "El registro existe";
  }
  alert(mensaje);
}

function limpiarCampoMes() {
  idMes.value = "";
  messagetext.value = "";
}

function validarCampoMes() {
  if (messagetext.value == "") {
    return true;
  } else {
    return false;
  }
}


function captIdMes() {
  const data = {
    idMessage: idMes.value,
  };
  return JSON.stringify(data);
}

function resultadoEliminarMes(status) {
  if (status == 204) {
    alert("Registro eliminado");
  }
}

function validarCampoEliMes() {
  if (idMes.value == "") {
    return true;
  } else {
    return false;
  }
}

bmostrarMes.addEventListener("click", (e) => {
  e.preventDefault();
  peticiongetMes();
});

bguardarMes.addEventListener("click", (e) => {
  e.preventDefault();
  if (validarCampoMes()) {
    alert("campo(s) Vacio!!");
  } else {
    peticionpostMes();
  }
});

bactualizarMes.addEventListener("click", (e) => {
  e.preventDefault();
  if (validarCampoEliMes()) {
    alert("Campo(s) vacio!!");
  } else {
    peticionputMes();
  }
});


beliminarMes.addEventListener("click", (e) => {
  e.preventDefault();
  if (validarCampoEliMes()) {
    alert("Campo id Vacio!!");
  } else {
    peticionDeleteMes();
  }
});
