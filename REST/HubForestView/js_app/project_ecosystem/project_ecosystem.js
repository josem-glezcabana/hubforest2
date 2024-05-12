async function getListProjectEcosystem() {

    return peticionBackGeneral('', 'proj_ecosystem', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaProjectEcosystem(response['resource']) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });       
  }
  
  async function getListByParamProjectEcosystem(id_project, id_ecosystem) {
    const proj_ecosystem = {
        id_project: id_project,
        id_ecosystem: id_ecosystem
       
        
    };
    return peticionBackGeneral('', 'proj_ecosystem', 'SEARCH_BY', proj_ecosystem)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaProjectEcosystem(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
  }
  
  async function getListByParamProjectEcosystem_search(id_project, id_ecosystem) {
    const proj_ecosystem = {
        id_project: id_project,
        id_ecosystem: id_ecosystem
      
      
    };
    return peticionBackGeneral('', 'proj_ecosystem', 'SEARCH', proj_ecosystem)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaProjectEcosystem(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
  }
  
  async function addProjectEcosystem(id_project, id_ecosystem) {
    const proj_ecosystem = {
        id_project: id_project,
        id_ecosystem: id_ecosystem
      
      
    };
  
    return peticionBackGeneral('', 'proj_ecosystem', 'ADD', proj_ecosystem)
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
  
  async function editProjectEcosystem(id_project, id_ecosystem) {
    const proj_ecosystem = {
        id_project: id_project,
        id_ecosystem: id_ecosystem
      
      
    };
  
    return peticionBackGeneral('', 'proj_ecosystem', 'EDIT', proj_ecosystem)
        .then(response => {
            console.log(id_project)
            console.log(id_ecosystem)
            console.log(response)
            //location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
  }
  
  async function deleteProjectEcosystem(id_project,id_ecosystem) {
    
    return peticionBackGeneral('', 'proj_ecosystem', 'DELETE', {'id_project': id_project, 'id_ecosystem': id_ecosystem})
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
  }
  
  async function getListEcosystems(ecosystem) {
    return peticionBackGeneral('', 'ecosystem', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? rellenarSelectEcosystems("id_ecosystem", response['resource'], ecosystem) : null)
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
  
  function construyeTablaProjectEcosystem(filas) {
  
    let filasTabla = '';
    let tipo = "'EditarPermisos'";
    let element = document.getElementById("datosProjectEcosystems");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
  
    $("#datosProjectEcosystems").html("");
    filas.forEach(fila => {
  
        let atributosTabla = ["'" + fila.id_ecosystem + "'","'" + fila.id_project +"'"];
        let botonEdit='<button class="BotonEditar btn btn-info " id="editarProjectEcosystem" onclick="mostrarModal('+tipo+','+atributosTabla+')">Editar</button>'
  
        filasTabla += '<tr> <td>' + fila.id_ecosystem + 
                '</td> <td>' + fila.id_project +  
                '</td> <td class="text-center">' + botonEdit +
                '</td> <td class="text-center"><button class="BotonEliminar btn btn-danger" id="borrarProyecto" onclick="mostrarBorrar('+fila.id_project+','+fila.id_project+')">Eliminar</button>'
                
                '</td>  </tr>';
    });
    
    $("#datosProjectEcosystems").append(filasTabla);
    cerrarModal()
    setLang();
  }
  
  function getAtributos(tipo){
    var id_project = document.getElementById("id_project").value
    var id_ecosystem = document.getElementById("id_ecosystem").value
     switch(tipo){
        case "Editar":
            editProjectEcosystem(id_project, id_ecosystem)
            break;
        case "Añadir":
            addProjectEcosystem(id_project, id_ecosystem)
            break;
        case "Buscar":
            getListByParamProjectEcosystem_search(id_project, id_ecosystem)
            break;
     }
  }
  
  function mostrarModal(tipo, id_project=null, id_ecosystem=null, rol=null, name_ecosystem =null, name_project=null){
    // Ventana modal
    document.getElementById("ventanaModal").style.display = "block";
    document.getElementById("Titulo").innerHTML = '<h2 class="'+tipo+'">'+tipo+'</h2>';
    document.getElementById("aceptar").innerHTML = tipo;
    document.getElementById("aceptar").classList.add(tipo);
  
  
    getListEcosystems(id_ecosystem)
    getListProyectos(id_project)
  
    if(tipo.includes("Editar")){
        $("#formProjectEcosystem").attr('action' , 'javascript:getAtributos("Editar");');
  
        $("#id_project").val(id_project);
        $("#id_ecosystem").val(id_ecosystem);
        $("#rol").val(rol);
    }
    else{
        if(tipo.includes("Buscar")){
            document.getElementById("id_ecosystem").setAttribute("hidden", true);
            document.querySelector('label[for="id_ecosystem"]').setAttribute("hidden", true);
            document.getElementById("id_project").setAttribute("hidden", true);
            document.querySelector('label[for="id_project"]').setAttribute("hidden", true);
        }
        else{
          document.getElementById("id_project").required = true;
          document.getElementById("id_ecosystem").required = true;

  
            $("#formProjectEcosystem").attr('action' , 'javascript:getAtributos("Añadir");');
        }
  
        $("#id_project").val('');
        $("#id_ecosystem").val('');
    }
    setLang();
  }
  
  function rellenarSelectEcosystems(tipo, filas, ecosystem) {
    let element = document.getElementById(tipo);
    let option = document.createElement('option');
    
    // Eliminar opciones existentes antes de agregar las nuevas
    element.innerHTML = '';
    
    filas.forEach(fila => {
        option = document.createElement('option');
        option.value = fila.id_ecosystem;
        option.textContent = fila.name_ecosystem;
        element.appendChild(option);
    })
    
    if (ecosystem != null) element.value = ecosystem;
    
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
  
  function mostrarBorrar(id){
    // Ventana modal
    document.getElementById("comprobarBorrar").style.display = "block";
    $("#idBorrar").val(id)
    $("#formBorrarProjectEcosystem").attr('action' , 'javascript:borrar();');
  }
  
  function borrar(){
    var ids = document.getElementById("idBorrar").value
    var idArray = ids.split(","); 
      // Obtener los IDs por separado
      var id_project = idArray[0];
      var id_ecosystem = idArray[1];
      
    deleteProjectEcosystem(id_project, id_ecosystem)
  }