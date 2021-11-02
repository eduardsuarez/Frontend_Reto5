const endpointAud = "http://localhost:8080/api/Audience/all";
const etp = document.getElementById("informacionAud");
/** capturar bones de auditorio */
const bmostrarAud = document.getElementById("bmostrarAud");
const bguardarAud = document.getElementById("bguardarAud");
const bactualizarAud = document.getElementById("bactualizarAud");
const beliminarAud = document.getElementById("beliminarAud");
/** captura de los inputs de la interfaz html para auditorios */
const idAud = document.getElementById("idAud");
const owner = document.getElementById("owner");
const capacity = document.getElementById("capacity");
const nameAud = document.getElementById("nameAud");
const description = document.getElementById("description");

/**
 * petición get para auditorios
 */

function peticiongetAud() {
  $.ajax({
    method: "GET",
    url: endpointAud,
    success: function (data) {
      getAuditorio(data);
      console.log(data);
    },
  });
}

function peticionpostAud() {
  $.ajax({
    method: "POST",
    url: "http://localhost:8080/api/Audience/save",
    data: capturarAuditorio(),
    datatype: "json",
    contentType: "application/json",
    complete: function (response) {
      mostrarResultadoAud(response.status, "Se guardó con exito");
      //console.log(response.status);
      limpiarCampoAud();
      peticiongetAud();
    },
  });
}

function peticionputAud() {
  $.ajax({
    method: "PUT",
    url: "http://localhost:8080/api/Audience/update",
    data: capturarAuditorio(),
    datatype: "json",
    contentType: "application/json",
    complete: function (response) {
      mostrarResultadoAud(response.status, "Se guardó con exito");
      //console.log(response.status);
      limpiarCampoAud();
      peticiongetAud();
    },
  });
}

function peticionDeleteAud() {
  $.ajax({
    method: "DELETE",
    url: "http://localhost:8080/api/Audience/delete",
    data: captIdAud(),
    datatype: "json",
    contentType: "application/json",
    complete: function (response) {
      resultadoEliminarAud(response.status);
      limpiarCampoAud();
      peticiongetAud();
    },
  });
}

function getAuditorio(auditorios) {
  let registro = "";
  $.each(auditorios, function (index, auditorios) {
    console.log(auditorios);
    registro +=
      "<tr>" +
      "<td>" +
      auditorios.id +
      "</td>" +
      "<td>" +
      auditorios.name +
      "</td>" +
      "<td>" +
      auditorios.owner +
      "</td>" +
      "<td>" +
      auditorios.capacity +
      "</td>" +
      "<td>" +
      auditorios.description +
      "</td>" +
      "</tr>";
  });
  $("#informacionAud").html(registro);
}

function capturarAuditorio() {
  const data = {
    id: $("#idAud").val(),
    owner: $("#owner").val(),
    capacity: $("#capacity").val(),
    description: $("#description").val(),
    name: $("#nameAud").val(),
  };
  return JSON.stringify(data);
}

function mostrarResultadoAud(status, texto) {
  let mensaje = "";
  if (status == 201) {
    mensaje = texto;
  } else if (status == 204) {
    mensaje = "El registro existe";
  }
  alert(mensaje);
}

function limpiarCampoAud() {
  idAud.value = "";
  owner.value = "";
  capacity.value = "";
  description.value = "";
  nameAud.value = "";
  capacity.value = "";
}

function validarCampoAud() {
  if (
    owner.value == "" ||
    capacity.value == "" ||
    description.value == "" ||
    nameAud.value == "" ||
    capacity.value == ""
  ) {
    return true;
  } else {
    return false;
  }
}
function captIdAud() {
  const data = {
    id: idAud.value,
  };
  return JSON.stringify(data);
}

function resultadoEliminarAud(status) {
  if (status == 204) {
    alert("Registro eliminado");
  }
}

function validarCampoEliAud() {
  if (idAud.value == "") {
    return true;
  } else {
    return false;
  }
}

bmostrarAud.addEventListener("click", (e) => {
  e.preventDefault();
  peticiongetAud();
});

bguardarAud.addEventListener("click", (e) => {
  e.preventDefault();
  if (validarCampoAud()) {
    alert("campo(s) Vacio!!");
  } else {
    console.log(capturarAuditorio());
    peticionpostAud();
  }
});

bactualizarAud.addEventListener("click", (e) => {
  e.preventDefault();
  if (validarCampoAud()) {
    alert("Campo(s) vacio!!");
  } else {
    peticionputAud();
  }
});


beliminarAud.addEventListener("click", (e) => {
  e.preventDefault();
  if (validarCampoEliAud()) {
    alert("Campo id Vacio!!");
  } else {
    peticionDeleteAud();
  }
});
