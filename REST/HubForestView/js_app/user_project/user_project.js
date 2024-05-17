async function getListUsuarioProjecto() {

  return peticionBackGeneral('', 'user_project', 'SEARCH_PERMISSIONS')
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

async function getListByParamUsuarioProyecto(id_user, id_project, rol) {
  const user_project = {
    id_user: id_user,
    id_project: id_project,
    rol: rol,
  };

  try {
    const response = await peticionBackGeneral('', 'user_project', 'SEARCH_BY', user_project);

    if (response['code'] === "RECORDSET_DATOS") {
      const datos = response['resource'];

      const updatedDatos = await Promise.all(
        datos.map(async (element) => {
          const user = await getUsuarioPorId(element.id_user);
          const project = await getProyectoPorId(element.id_project);

          // Crear un nuevo objeto con las propiedades actualizadas
          return {
            ...element,
            name_user: user[0].name_user,
            name_project: project[0].name_project
          };
        })
      );

      return construyeTablaUsuarioProyecto(updatedDatos);
    } else {
      return mostrarErrorBusq();
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return null;
  }
}


async function addUsuarioProyecto(id_user,id_project,rol) {
  const currentDate = new Date();
  const user_project = {
    id_user: id_user,
    id_project: id_project,
    rol: rol,
    date_user_project: currentDate.toISOString().slice(0, 10)
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

async function deleteUsuarioProyecto(id_user, id_project, rol) {
  
  return peticionBackGeneral('', 'user_project', 'DELETE', {'id_user': id_user, 'id_project': id_project, 'rol': rol})
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

function construyeTablaUsuarioProyecto(filas) {

  let filasTabla = '';
  let tipo = "'EditarPermisos'";
  let element = document.getElementById("datosUsuarioProyectos");
  while (element.firstChild) {
      element.removeChild(element.firstChild);
  }

  $("#datosUsuarioProyectos").html("");
  filas.forEach(fila => {

      filasTabla += '<tr> <td>' + fila.name_project + 
              '</td> <td>' + fila.name_user + 
              '</td> <td>' + fila.rol+ 
              '</td> <td>' + fila.date_user_project+ 
              '</td> <td class="text-center"><button class="BotonEliminar btn btn-danger" id="borrarProyecto" onclick="mostrarBorrarPermiso(' + fila.id_user + ',' + fila.id_project + ',\'' + fila.rol + '\')">Eliminar</button>'
              '</td>  </tr>';
  });
  
  $("#datosUsuarioProyectos").append(filasTabla);
  cerrarModal()
  setLang();
}

async function getAtributosPermisos(tipo){
  var id_user = document.getElementById("id_user").value
  var id_project = document.getElementById("id_project").value
  var rol = document.getElementById("rol").value
   switch(tipo){
      case "Añadir":
          addUsuarioProyecto(id_user, id_project, rol)
          break;
      case "Buscar":
          getListByParamUsuarioProyecto(id_user, id_project, rol)
          break;
   }
}

function mostrarModalPermisos(tipo, id_user=null, id_project=null, rol=null, name_project =null, name_user=null){
  // Ventana modal
  document.getElementById("ventanaModal").style.display = "block";
  document.getElementById("Titulo").innerHTML = '<h2 class="'+tipo+'">'+tipo+'</h2>';
  document.getElementById("aceptar").innerHTML = tipo;
  document.getElementById("aceptar").classList.add(tipo);


  getListUsuariosPermisos(id_user);
  getListProyectosPermisos(id_project);
      if(tipo.includes("Buscar")){
          $("#formUsuarioProyecto").attr('action' , 'javascript:getAtributosPermisos("Buscar");');
      }
      else{
        document.getElementById("id_user").required = true;
        document.getElementById("id_project").required = true;
        document.getElementById("rol").required = true;

          $("#formUsuarioProyecto").attr('action' , 'javascript:getAtributosPermisos("Añadir");');
      }

  $("#id_user").val('');
  $("#id_project").val('');
  $("#rol").val('');
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

function mostrarBorrarPermiso(id_user, id_proyecto, rol){
  // Ventana modal
  const attributes = [id_user, id_proyecto, rol]
  document.getElementById("comprobarBorrar").style.display = "block";
  $("#idBorrar").val(attributes)
  $("#formBorrarUsuarioProyecto").attr('action' , 'javascript:borrarPermiso();');
}

function borrarPermiso(){
  var ids = $("#idBorrar").val();
  var idArray = ids.split(","); 
    // Obtener los IDs por separado
    var id_user = idArray[0];
    var id_project = idArray[1];
    var rol = idArray[2];
    
  deleteUsuarioProyecto(id_user, id_project, rol)
}