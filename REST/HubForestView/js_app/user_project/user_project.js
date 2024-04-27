async function getListUsuarioProjecto() {

  return peticionBackGeneral('', 'user_project', 'SEARCH')
      .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaUsuarioProyecto(response['resource']) : null)
      .catch(error => {
          console.error('Error en la solicitud:', error);
          return null;
      });       
}

async function getListByParamUsuarioProyecto(id_user,id_project,rol) {
  const user_project = {
      id_user: id_user,
      id_project: id_project,
      rol: rol
  };
  return peticionBackGeneral('', 'user_project', 'SEARCH_BY', user_project)
      .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaUsuarioProyecto(response['resource']) :  mostrarErrorBusq())
      .catch(error => {
          console.error('Error en la solicitud:', error);
          return null;
      });
}

async function getListByParamUsuarioProyecto_search(id_user,id_project,rol) {
  const user_project = {
    id_user: id_user,
    id_project: id_project,
    rol: rol
  };
  return peticionBackGeneral('', 'user_project', 'SEARCH', user_project)
      .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaUsuarioProyecto(response['resource']) :  mostrarErrorBusq())
      .catch(error => {
          console.error('Error en la solicitud:', error);
          return null;
      });
}

async function addUsuarioProyecto(id_user,id_project,rol) {
  const user_project = {
    id_user: id_user,
    id_project: id_project,
    rol: rol
  };

  return peticionBackGeneral('', 'user_project', 'ADD', user_project)
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

async function editUsuarioProyecto(id_user,id_project,rol) {
  const user_project = {
    id_user: id_user,
    id_project: id_project,
    rol: rol
  };

  return peticionBackGeneral('', 'user_project', 'EDIT', user_project)
      .then(response => {
          location.reload();
          return { status: 'OK', data: response };
      })
      .catch(error => {
          console.error('Error en la solicitud:', error);
          return null;
      });
}

async function deleteUsuarioProyecto(id_user,id_project) {
  
  return peticionBackGeneral('', 'user_project', 'DELETE', {'id_user': id_user, 'id_project': id_project})
      .then(response => {
          location.reload();
          return { status: 'OK', data: response };
      })
      .catch(error => {
          console.error('Error en la solicitud:', error);
          return null;
      });
}

async function getListUsuarios(usuario) {
  return peticionBackGeneral('', 'user', 'SEARCH')
      .then(response => (response['code'] === 'RECORDSET_DATOS') ? rellenarSelectUsuarios("id_user", response['resource'], usuario) : null)
      .catch(error => {
          console.error('Error en la solicitud:', error);
          return null;
      });
}

async function getListProyectos(proyecto) {
  return peticionBackGeneral('', 'project', 'SEARCH')
      .then(response => (response['code'] === 'RECORDSET_DATOS') ? rellenarSelectProyectos("id_project", response['resource'], proyecto) : null)
      .catch(error => {
          console.error('Error en la solicitud:', error);
          return null;
      });
}

function construyeTablaUsuarioProyecto(filas) {

  let filasTabla = '';
  let tipo = "'EditarPermisos'";
  let element = document.getElementById("datosUsuarioProyectos");
  while (element.firstChild) {
      element.removeChild(element.firstChild);
  }

  $("#datosUsuarioProyectos").html("");
  filas.forEach(fila => {
      console.log('fila', fila)

      let atributosTabla = ["'" + fila.id_project + "'","'" + fila.id_user + "'", "'" + fila.rol + "'"];
      let botonEdit='<button class="BotonEditar btn btn-info " id="editarUsuarioProyecto" onclick="mostrarModal('+tipo+','+atributosTabla+')">Editar</button>'

      filasTabla += '<tr> <td>' + fila.id_user + 
              '</td> <td>' + fila.id_project + 
              '</td> <td>' + fila.rol+ 
              '</td> <td class="text-center">' + botonEdit +
              '</td> <td class="text-center"><button class="BotonEliminar btn btn-danger" id="borrarProyecto" onclick="mostrarBorrar('+fila.id_user+','+fila.id_project+')">Eliminar</button>'
              
              '</td>  </tr>';
  });
  
  $("#datosUsuarioProyectos").append(filasTabla);
  cerrarModal()
  setLang();
}

function getAtributos(tipo){
  var id_user = document.getElementById("id_user").value
  var id_project = document.getElementById("id_project").value
  var rol = document.getElementById("rol").value
   switch(tipo){
      case "Editar":
          editProyecto(id_user, id_project, rol)
          break;
      case "Añadir":
          addProyecto(id_user, id_project, rol)
          break;
      case "Buscar":
          getListByParamProyectos_search(id_user, id_project, rol)
          break;
   }
}

function mostrarModal(tipo, id_user=null, id_project=null, rol=null){
  // Ventana modal
  document.getElementById("ventanaModal").style.display = "block";
  document.getElementById("Titulo").innerHTML = '<h2 class="'+tipo+'">'+tipo+'</h2>';
  document.getElementById("aceptar").innerHTML = tipo;
  document.getElementById("aceptar").classList.add(tipo);




  


  getListUsuarios(id_user)
  getListProyectos(id_project)

  if(tipo.includes("Editar")){
      $("#formUsuarioProyecto").attr('action' , 'javascript:getAtributos("Editar");');

      $("#id_user").val(id_user);
      $("#id_project").val(id_project);
      $("#rol").val(rol);
  }
  else{
      if(tipo.includes("Buscar")){
          document.getElementById("id_user").required = false;
          document.getElementById("id_project").required = false;
          document.getElementById("rol").required = false;
          $("#formUsuarioProyecto").attr('action' , 'javascript:getAtributos("Buscar");');
      }
      else{
        document.getElementById("id_user").required = true;
        document.getElementById("id_project").required = true;
        document.getElementById("rol").required = true;

          $("#formUsuarioProyecto").attr('action' , 'javascript:getAtributos("Añadir");');
      }

      $("#id_user").val('');
      $("#id_project").val('');
      $("#rol").val('');
  }
  setLang();
}

function rellenarSelectUsuarios(tipo, filas, usuario) {
  let element = document.getElementById(tipo);
  let option = document.createElement('option');

  option.value = "";
  option.textContent = "-- Selecciona el usuario asociado al proyecto --";
  option.className = "selectUsuarios";
  element.appendChild(option);

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

  option.value = "";
  option.textContent = "-- Selecciona el proyecto --";
  option.className = "selectProyectos";
  element.appendChild(option);

  filas.forEach(fila => {
      option = document.createElement('option');
      option.value = fila.id_project;
      option.textContent = fila.name_project;
      element.appendChild(option);
  })

  if (usuario != null) element.value = proyecto;
}

function cerrarModal(){
  // Ventana modal
  var modal = document.getElementById("ventanaModal");
  modal.style.display = "none"
}

function mostrarBorrar(id){
  // Ventana modal
  document.getElementById("comprobarBorrar").style.display = "block";
  $("#idBorrar").val(id)
  $("#formBorrarUsuarioProyecto").attr('action' , 'javascript:borrar();');
}

function borrar(){
  var ids = document.getElementById("idBorrar").value
  var idArray = ids.split(","); 
    // Obtener los IDs por separado
    var id_user = idArray[0];
    var id_project = idArray[1];
    
  deleteUsuarioProyecto(id_user, id_project)
}