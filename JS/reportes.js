const bReportStatus = document.getElementById("ReportStatus");
const bReportClientCantRes = document.getElementById("ReportClientCantRes");
const bReportFecha = document.getElementById("ReportFecha");

const RstartDate = document.getElementById("RstartDate");
const RdevolutionDate = document.getElementById("RdevolutionDate");

function PeticiongetReportStatus() {
  $.ajax({
    method: "GET",
    url: "http://localhost:8080/api/Reservation/report-status",
    success: function (data) {
      console.log(data);
      getReportStatus(data);
    },
  });
}

function getReportStatus(reporteFecha) {
  let registro = "";

  registro +=
    "<tr>" +
    "<td>" +
    reporteFecha.completed +
    "</td>" +
    "<td>" +
    reporteFecha.cancelled +
    "</td>" +
    "</tr>";
  $("#resultadoStatus").html(registro);

  /** 
  let myTable = "<table>";
  myTable += "<tr>";
  myTable += "<th>completadas</th>";
  myTable += "<td>" + reporteFecha.completed + "</td>";
  myTable += "<th>canceladas</th>";
  myTable += "<td>" + reporteFecha.cancelled + "</td>";
  myTable += "</tr>";
  myTable += "</table>";
  $("#resultadoStatus").html(myTable);
  */
}

function peticiongetReportFecha() {
  var fechaInicio = document.getElementById("RstarDate");
  var fechaCierre = document.getElementById("RdevolutionDate");
  fechaInicio = $("#RstartDate").val();
  fechaCierre = $("#RdevolutionDate").val();

  console.log(fechaInicio);
  console.log(fechaCierre);
  $.ajax({
    url:
      "http://localhost:8080/api/Reservation/report-dates/" +
      fechaInicio +
      "/" +
      fechaCierre,
    type: "GET",
    datatype: "json",
    success: function (data) {
      console.log(data);
      getReportDate(data);
    },
  });
}

function getReportDate(reporteFecha) {
  let registro = "";
  $.each(reporteFecha, function (index, reporteFecha) {
    console.log(reporteFecha);
    registro +=
      "<tr>" +
      "<td>" +
      reporteFecha.idReservation +
      "</td>" +
      "<td>" +
      reporteFecha.startDate +
      "</td>" +
      "<td>" +
      reporteFecha.devolutionDate +
      "</td>" +
      "<td>" +
      reporteFecha.status +
      "</td>" +
      "</tr>";
  });
  $("#resultadoDate").html(registro);

  /**
  let myTable = "<table>";
  myTable += "<tr>";
   
  for (i = 0; i < reporteFecha.length; i++) {
    myTable += "<th>total</th>";
    myTable += "<td>" + reporteFecha[i].devolutionDate + "</td>";
    myTable += "<td>" + reporteFecha[i].startDate + "</td>";
    myTable += "<td>" + reporteFecha[i].status + "</td>";

    myTable += "</tr>";
  }
  myTable += "</table>";
  $("#resultadoDate").html(myTable);
  */
}

function PeticiongetReportClients() {
  $.ajax({
    method: "GET",
    url: "http://localhost:8080/api/Reservation/report-clients",
    success: function (data) {
      console.log(data);
      getStatusClients(data);
    },
  });
}

function getStatusClients(reporteClientes) {
  let registro = "";
  $.each(reporteClientes, function (index, reporteClientes) {
    console.log(reporteClientes);
    registro +=
      "<tr>" +
      "<td>" +
      reporteClientes.total +
      "</td>" +
      "<td>" +
      reporteClientes.client.idClient +
      "</td>" +
      "<td>" +
      reporteClientes.client.email +
      "</td>" +
      "<td>" +
      reporteClientes.client.name +
      "</td>" +
      "<td>" +
      reporteClientes.client.age +
      "</td>" +
      "</tr>";
  });
  $("#resultadoClientes").html(registro);

}

function validarCampoFec() {
  if (RstartDate.value == "" || RdevolutionDate.value == "" ) {
    return true;
  } else {
    return false;
  }
}

bReportStatus.addEventListener("click", (e) => {
  e.preventDefault();
  PeticiongetReportStatus();
});

bReportFecha.addEventListener("click", (e) => {
  e.preventDefault();
  if (validarCampoFec()) {
    alert("campo(s) Vacio!!");
  } else {
    peticiongetReportFecha();
  }
});

bReportClientCantRes.addEventListener("click", (e) => {
  e.preventDefault();
  PeticiongetReportClients();
});
