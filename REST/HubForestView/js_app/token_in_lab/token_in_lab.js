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

async function deleteTokenInLab(id_token_in_lab) {
  
  return peticionBackGeneral('', 'token_in_lab', 'DELETE', {'id_token_in_lab': id_token_in_lab})
      .then(response => {
          location.reload();
          return { status: 'OK', data: response };
      })
      .catch(error => {
          console.error('Error en la solicitud:', error);
          return null;
      });
}

async function getListUsuariosPermisos(usuario) {
  return peticionBackGeneral('', 'user', 'SEARCH')
      .then(response => (response['code'] === 'RECORDSET_DATOS') ? rellenarSelectUsuarios("id_user", response['resource'], usuario) : null)
      .catch(error => {
          console.error('Error en la solicitud:', error);
          return null;
      });
}

async function getListProyectosPermisos(proyecto) {
  return peticionBackGeneral('', 'project', 'SEARCH')
      .then(response => (response['code'] === 'RECORDSET_DATOS') ? rellenarSelectProyectos("id_project", response['resource'], proyecto) : null)
      .catch(error => {
          console.error('Error en la solicitud:', error);
          return null;
      });
}

function construyeTablaTokenInLab(filas) {

  let filasTabla = '';
  let tipo = "'EditarTokenInLab'";
  let element = document.getElementById("datosTokenInLab");
  while (element.firstChild) {
      element.removeChild(element.firstChild);
  }

  $("#datosTokenInLab").html("");
  filas.forEach(fila => {

      filasTabla += '<tr> <td>' + fila.id_token_in_lab + 
              '</td> <td>' + fila.id_token_in_sampling + 
              '</td> <td>' + fila.id_lab_process+ 
              '</td> <td class="text-center"><button class="BotonEliminar btn btn-danger" id="borrarTokenInLab" onclick="mostrarBorrarTokenInLab(' + fila.id_token_in_lab +')">Eliminar</button>'
              '</td>  </tr>';
  });
  
  $("#datosTokenInLab").append(filasTabla);
  cerrarModal()
  setLang();
}

async function getAtributosTokenInLab(tipo){
  var id_token_in_lab = document.getElementById("id_token_in_lab").value
  var id_token_in_sampling = document.getElementById("id_token_in_sampling").value
  var id_lab_process = document.getElementById("id_lab_process").value
   switch(tipo){
      case "Añadir":
          addTokenInLab(id_token_in_sampling, id_lab_process)
          break;
      case "Buscar":
          getListByParamUsuarioProyecto(id_token_in_sampling, id_lab_process)
          break;
   }
}

function mostrarModalTokenInLab(tipo, id_token_in_lab=null, id_token_in_sampling=null, id_lab_process=null){
  // Ventana modal
  document.getElementById("ventanaModal").style.display = "block";
  document.getElementById("Titulo").innerHTML = '<h2 class="'+tipo+'">'+tipo+'</h2>';
  document.getElementById("aceptar").innerHTML = tipo;
  document.getElementById("aceptar").classList.add(tipo);


  getListUsuariosPermisos(id_user);
  getListProyectosPermisos(id_project);
      if(tipo.includes("Buscar")){
          $("#formTokenInLab").attr('action' , 'javascript:getAtributosTokenInLab("Buscar");');
      }
      else{
        document.getElementById("id_token_in_lab").required = true;
        document.getElementById("id_token_in_sampling").required = true;
        document.getElementById("id_lab_process").required = true;

          $("#formTokenInLab").attr('action' , 'javascript:getAtributosTokenInLab("Añadir");');
      }

  $("#id_token_in_lab").val('');
  $("#id_token_in_sampling").val('');
  $("#id_lab_process").val('');
  setLang();
}

function rellenarSelectUsuarios(tipo, filas, usuario) {
  let element = document.getElementById(tipo);
  let option = document.createElement('option');
  
  // Eliminar opciones existentes antes de agregar las nuevas
  element.innerHTML = '';
  
  filas.forEach(fila => {
      option = document.createElement('option');
      option.value = fila.id_user;
      option.textContent = fila.name_user;
      element.appendChild(option);
  })
  
  if (usuario != null) element.value = usuario;
  
}

function rellenarSelectProyectos(tipo, filas, proyecto) {
  let element = document.getElementById(tipo);
  let option = document.createElement('option');
  
  // Eliminar opciones existentes antes de agregar las nuevas
  element.innerHTML = '';
  
  filas.forEach(fila => {
      option = document.createElement('option');
      option.value = fila.id_project;
      option.textContent = fila.name_project;
      element.appendChild(option);
  })
  
  if (proyecto != null) element.value = proyecto;
  
}

function cerrarModal(){
  // Ventana modal
  var modal = document.getElementById("ventanaModal");
  modal.style.display = "none"
}

function mostrarBorrarTokenInLab(id_token_in_lab){
  // Ventana modal
  document.getElementById("comprobarBorrar").style.display = "block";
  $("#idBorrar").val(id_token_in_lab)
  $("#formBorrarTokenInLab").attr('action' , 'javascript:borrarTokenInLab();');
}

function borrarTokenInLab(){
  var id = $("#idBorrar").val();
    
  deleteTokenInLab(id)
}