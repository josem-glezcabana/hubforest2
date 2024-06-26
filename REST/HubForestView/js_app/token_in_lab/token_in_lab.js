async function getListTokenInLab() {

  return peticionBackGeneral('', 'token_in_lab', 'SEARCH')
      .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaTokenInLab(response['resource']) : null)
      .catch(error => {
          console.error('Error en la solicitud:', error);
          return null;
      });       
}

async function getListByParamTokenInLab(id_token_in_sampling,id_lab_process) {
  const token_in_lab = {
      id_token_in_sampling: id_token_in_sampling,
      id_lab_process: id_lab_process
  };
  return peticionBackGeneral('', 'token_in_lab', 'SEARCH_BY', token_in_lab)
      .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaTokenInLab(response['resource']) :  mostrarErrorBusq())
      .catch(error => {
          console.error('Error en la solicitud:', error);
          return null;
      });
}


async function addTokenInLab(id_token_in_sampling,id_lab_process) {
  const token_in_lab = {
      id_token_in_sampling: id_token_in_sampling,
      id_lab_process: id_lab_process
  };


  return peticionBackGeneral('', 'token_in_lab', 'ADD', token_in_lab)
      .then(response => {
          location.reload();
          response['resource']
          return { status: 'OK', data: response };
      })
      .catch(error => {
          console.error('Error en la solicitud:', error);
          return null;
      });
}

async function deleteTokenInLab(id_token_in_lab, id_token_in_sampling) {
  
  return peticionBackGeneral('', 'token_in_lab', 'DELETE', {'id_token_in_lab': id_token_in_lab, 'id_token_in_sampling': id_token_in_sampling})
      .then(response => {
          location.reload();
          return { status: 'OK', data: response };
      })
      .catch(error => {
          console.error('Error en la solicitud:', error);
          return null;
      });
}

async function getListTokenInSampling(token_in_sampling) {
  return peticionBackGeneral('', 'token_in_sampling', 'SEARCH')
      .then(response => (response['code'] === 'RECORDSET_DATOS') ? rellenarSelectTokenInSampling("id_token_in_sampling", response['resource'], token_in_sampling) : null)
      .catch(error => {
          console.error('Error en la solicitud:', error);
          return null;
      });
}

async function getListLabProcess(lab_process) {
  return peticionBackGeneral('', 'lab_process', 'SEARCH')
      .then(response => (response['code'] === 'RECORDSET_DATOS') ? rellenarSelectLabProcess("id_lab_process", response['resource'], lab_process) : null)
      .catch(error => {
          console.error('Error en la solicitud:', error);
          return null;
      });
}

function construyeTablaTokenInLab(filas) {

  let filasTabla = '';
  let element = document.getElementById("datosTokenInLab");
  while (element.firstChild) {
      element.removeChild(element.firstChild);
  }

  $("#datosTokenInLab").html("");
  filas.forEach(fila => {

      filasTabla += '<tr> <td>' + fila.id_token_in_lab + 
              '</td> <td>' + fila.id_token_in_sampling + 
              '</td> <td>' + fila.id_lab_process+ 
              '</td> <td class="text-center"><button class="BotonEliminar btn btn-danger" id="borrarTokenInLab" onclick="mostrarBorrarTokenInLab(' + fila.id_token_in_lab + ','  + fila.id_token_in_sampling + '\)">Eliminar</button>'
              '</td>  </tr>';
  });

  recuperarYComprobarUsuarioLogeadoIsAdmin().then(resultado => {
    if (!resultado) {
      let borrarToken = document.getElementsByClassName("BotonEliminar");
      for (const fila of borrarToken) {
          fila.style.display = 'none';
      }
      $("#abrirModal").hide();
  } else {
      let borrarToken = document.getElementsByClassName("BotonEliminar");
      for (const fila of borrarToken) {
          fila.style.display = 'block';
      }
      $("#abrirModal").show();
  }
});
  
  $("#datosTokenInLab").append(filasTabla);
  cerrarModal()
  setLang();
}

async function getAtributosTokenInLab(tipo){
  var id_token_in_sampling = document.getElementById("id_token_in_sampling").value
  var id_lab_process = document.getElementById("id_lab_process").value
   switch(tipo){
      case "Añadir":
          addTokenInLab(id_token_in_sampling, id_lab_process)
          break;
      case "Buscar":
          getListByParamTokenInLab(id_token_in_sampling, id_lab_process)
          break;
   }
}

function mostrarModalTokenInLab(tipo, id_token_in_lab=null, id_token_in_sampling=null, id_lab_process=null){
  // Ventana modal
  document.getElementById("ventanaModal").style.display = "block";
  document.getElementById("Titulo").innerHTML = '<h2 class="'+tipo+'">'+tipo+'</h2>';
  document.getElementById("aceptar").innerHTML = tipo;
  document.getElementById("aceptar").classList.add(tipo);


  getListTokenInSampling(id_token_in_sampling);
  getListLabProcess(id_lab_process);
      if(tipo.includes("Buscar")){
          $("#formTokenInLab").attr('action' , 'javascript:getAtributosTokenInLab("Buscar");');
      }
      else{
        document.getElementById("id_token_in_sampling").required = true;
        document.getElementById("id_lab_process").required = true;

          $("#formTokenInLab").attr('action' , 'javascript:getAtributosTokenInLab("Añadir");');
      }

  $("#id_token_in_lab").val('');
  $("#id_token_in_sampling").val('');
  $("#id_lab_process").val('');
  setLang();
}

function rellenarSelectTokenInSampling(tipo, filas, token_in_sampling) {
  let element = document.getElementById(tipo);
  let option = document.createElement('option');
  
  // Eliminar opciones existentes antes de agregar las nuevas
  element.innerHTML = '';
  
  filas.forEach(fila => {
      option = document.createElement('option');
      option.value = fila.id_token_in_sampling;
      option.textContent = fila.id_token_in_sampling;
      element.appendChild(option);
  })
  
  if (token_in_sampling != null) element.value = token_in_sampling;
  
}

function rellenarSelectLabProcess(tipo, filas, lab_process) {
  let element = document.getElementById(tipo);
  let option = document.createElement('option');
  
  // Eliminar opciones existentes antes de agregar las nuevas
  element.innerHTML = '';
  
  filas.forEach(fila => {
      option = document.createElement('option');
      option.value = fila.id_lab_process;
      option.textContent = fila.name_lab_process;
      element.appendChild(option);
  })
  
  if (lab_process != null) element.value = lab_process;
  
}

function cerrarModal(){
  // Ventana modal
  var modal = document.getElementById("ventanaModal");
  modal.style.display = "none"
}

function mostrarBorrarTokenInLab(id_token_in_lab, id_token_in_sampling){

  const attributes = [id_token_in_lab,id_token_in_sampling]
  document.getElementById("comprobarBorrar").style.display = "block";
  $("#idBorrar").val(attributes)
  $("#formBorrarTokenInLab").attr('action' , 'javascript:borrarTokenInLab();');
}

function borrarTokenInLab(){
  var ids = $("#idBorrar").val();
    var idArray = ids.split(","); 
    // Obtener los IDs por separado
    var id_token_in_lab = idArray[0];
    var id_token_in_sampling = idArray[1];
  deleteTokenInLab(id_token_in_lab, id_token_in_sampling)
}