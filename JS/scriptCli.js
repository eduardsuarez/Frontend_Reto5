const endpointCli = "http://localhost:8080/api/Client/all";
const etpCli = document.getElementById("informacionCli");
/** capturar bones decliente */
const bmostrarCli = document.getElementById("bmostrarCli");
const bguardarCli = document.getElementById("bguardarCli");
const bactualizarCli = document.getElementById("bactualizarCli");
const beliminarCli = document.getElementById("beliminarCli");

/** captura de los inputs de la interfaz html para clientes */
const idCli = document.getElementById("idCli");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const age = document.getElementById("age");
const password = document.getElementById("password");

/**
 * petición get para clientes
 */

function peticiongetCli() {
  $.ajax({
    method: "GET",
    url: endpointCli,
    success: function (data) {
      getCliente(data);
    },
  });
}

function peticionpostCli() {
  $.ajax({
    method: "POST",
    url: "http://localhost:8080/api/Client/save",
    data: capturarClientes(),
    datatype: "json",
    contentType: "application/json",
    complete: function (response) {
      mostrarResultadoCli(response.status, "Se guardó con exito");
      //console.log(response.status);
      limpiarCampoCli();
      peticiongetCli();
    },
  });
}

function peticionputCli() {
  $.ajax({
    method: "PUT",
    url: "http://localhost:8080/api/Client/update",
    data: capturarClientes(),
    datatype: "json",
    contentType: "application/json",
    complete: function (response) {
      mostrarResultadoCli(response.status, "Se guardó con exito");
      //console.log(response.status);
      limpiarCampoCli();
      peticiongetCli();
    },
  });
}

function peticionDeleteCli() {
  $.ajax({
    method: "DELETE",
    url: "http://localhost:8080/api/Client/delete",
    data: captIdCli(),
    datatype: "json",
    contentType: "application/json",
    complete: function (response) {
      resultadoEliminarCli(response.status);
      limpiarCampoCli();
      peticiongetCli();
    },
  });
}

function getCliente(clientes) {
  let registro = "";
  $.each(clientes, function (index, clientes) {
    console.log(clientes);
    registro +=
      "<tr>" +
      "<td>" +
      clientes.idClient +
      "</td>" +
      "<td>" +
      clientes.email +
      "</td>" +
      "<td>" +
      clientes.name +
      "</td>" +
      "<td>" +
      clientes.age +
      "</td>" +
      "</tr>";
  });
  $("#informacionCli").html(registro);

}

function capturarClientes() {
  const data = {
    idClient: $("#idCli").val(),
    email: $("#email").val(),
    password: $("#password").val(),
    name: $("#nombre").val(),
    age: $("#age").val(),
  };
  return JSON.stringify(data);
}

function mostrarResultadoCli(status, texto) {
  let mensaje = "";
  if (status == 201) {
    mensaje = texto;
  } else if (status == 204) {
    mensaje = "El registro existe";
  }
  alert(mensaje);
}

function limpiarCampoCli() {
  idCli.value = "";
  nombre.value = "";
  email.value = "";
  age.value = "";
  password.value = "";
}

function validarCampoCli() {
  if (
    password.value == "" ||
    nombre.value == "" ||
    email.value == "" ||
    age.value == ""
  ) {
    //console.log(nombre.value);
    return true;
  } else {
    return false;
  }
}

function captIdCli() {
  const data = {
    idClient: idCli.value,
  };
  return JSON.stringify(data);
}

function resultadoEliminarCli(status) {
  if (status == 204) {
    alert("Registro eliminado");
  }
}

function validarCampoEliCli() {
  if (idCli.value == "") {
    return true;
  } else {
    return false;
  }
}


bmostrarCli.addEventListener("click", (e) => {
  e.preventDefault();
  peticiongetCli();
});

bguardarCli.addEventListener("click", (e) => {
  e.preventDefault();
  if (validarCampoCli()) {
    alert("campo(s) Vacio!!");
  } else {
    peticionpostCli();
  }
});


bactualizarCli.addEventListener("click", (e) => {
  e.preventDefault();
  if (validarCampoCli()) {
    alert("Campo(s) vacio!!");
  } else {
    peticionputCli();
  }
});


beliminarCli.addEventListener("click", (e) => {
  e.preventDefault();
  if (validarCampoEliCli()) {
    alert("Campo id Vacio!!");
  } else {
    peticionDeleteCli();
  }
});
