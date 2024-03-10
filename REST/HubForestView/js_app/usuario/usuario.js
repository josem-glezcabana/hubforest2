
function getListUsuarios() {

    return peticionBackGeneral('', 'usuario', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaUsuario(response['resource']) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
        
}


function getListByParamUsuarios(nombre, correo, password, rol) {
    const usuario = {
        nombre: nombre,
        correo: correo,
        password: password,
        rol: rol
    };
    return peticionBackGeneral('', 'usuario', 'SEARCH_BY', usuario)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaUsuario(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

function getListByParamUsuarios_search(nombre, correo, password, rol) {
    const usuario = {
        nombre: nombre,
        correo: correo,
        password: password,
        rol: rol
    };
    return peticionBackGeneral('', 'usuario', 'SEARCH', usuario)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaUsuario(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

function addUsuario(nombre, correo, password, rol) {
    const usuario = {
        nombre: nombre,
        correo: correo,
        password: password,
        rol: rol
    };

    return peticionBackGeneral('', 'usuario', 'ADD', usuario)
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

function editUsuario(idUsuario,nombre, correo, password, rol) {
    const usuario = {
        id: idUsuario,
        nombre: nombre,
        correo: correo,
        password: password,
        rol: rol
    };

    return peticionBackGeneral('', 'usuario', 'EDIT', usuario)
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

function deleteUsuario(idUsuario) {
    
    return peticionBackGeneral('', 'usuario', 'DELETE', {'id': idUsuario})
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

function construyeTablaUsuario(filas) {

    var filasTabla = ''

    var tipo = "'Editar usuario'"

    var element = document.getElementById("datosUsuarios");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    $("#datosUsuarios").html("");
    filas.forEach(fila => {
        var atributosTabla = ["'" + fila.id + "'","'" + fila.nombre + "'", "'" + fila.password + "'", "'" + fila.correo + "'", "'" + fila.rol + "'"];
        var botonEdit='<button class="btn btn-info" id="editarUsuario" onclick="mostrarModal('+tipo+','+atributosTabla+')">Editar</button>'

        filasTabla += '<tr> <td>' + fila.id + 
                '</td> <td>' + fila.nombre + 
                '</td> <td>' + fila.password + 
                '</td> <td>' + fila.correo + 
                '</td> <td>' + fila.rol + 
                '</td> <td class="text-center">' + botonEdit +
                '</td> <td class="text-center"><button class="btn btn-danger" id="borrarUsuario" onclick="mostrarBorrar('+fila.id+')">Eliminar</button>'
                
                '</td>  </tr>';
    });
    
    $("#datosUsuarios").append(filasTabla);
    cerrarModal()
}

function getAtributos(tipo){
    var id = document.getElementById("id").value
    var nombre = document.getElementById("nombre").value
    var password = document.getElementById("password").value
    var correo = document.getElementById("correo").value
    var rol = document.getElementById("rol").value
     switch(tipo){
        case "Editar":
            editUsuario(id,nombre,correo,password,rol)
            break;
        case "Añadir":
            addUsuario(nombre,correo,password,rol)
            break;
        case "Buscar":
            getListByParamUsuarios_search(nombre,correo,password,rol)
            break;
     }
   /* if(tipo.includes("Editar")){
        
    }
    else{
       
        
    }*/
}

function mostrarModal(tipo, id=null, nombre=null, password=null, correo=null, rol=null){
    // Ventana modal
    document.getElementById("ventanaModal").style.display = "block";
    document.getElementById("Titulo").innerHTML = '<h2>'+tipo+'</h2>';
    document.getElementById("aceptar").innerHTML = tipo;
    if(tipo.includes("Editar")){
        $("#formUsuario").attr('action' , 'javascript:getAtributos("Editar");');

        $("#id").val(id);
        $("#nombre").val(nombre);
        $("#password").val(password);
        $("#correo").val(correo);
        $("#rol").val(rol);
    }
    else{
        if(tipo.includes("Buscar")){
            document.getElementById("nombre").required = false;
            document.getElementById("password").required = false;
            document.getElementById("correo").required = false;
            document.getElementById("rol").required = false;
            $("#formUsuario").attr('action' , 'javascript:getAtributos("Buscar");');
        }
        else{
            $("#formUsuario").attr('action' , 'javascript:getAtributos("Añadir");');
        }

        $("#id").val('');
        $("#nombre").val('');
        $("#password").val('');
        $("#correo").val('');
        $("#rol").val('');
    }
}


function cerrarModal(){
    // Ventana modal
    var modal = document.getElementById("ventanaModal");
    modal.style.display = "none"

    document.getElementById("nombre").required = true;
    document.getElementById("password").required = true;
    document.getElementById("correo").required = true;
    document.getElementById("rol").required = true;

}

function mostrarErrorBusq(){
    // Ventana modal
    document.getElementById("mensajeError").style.display = "block";
   
}

function cerrarErrorBusq(){
    // Ventana modal
    document.getElementById("mensajeError").style.display = "none";
   
}


function mostrarBorrar(id){
    // Ventana modal
    document.getElementById("comprobarBorrar").style.display = "block";
    $("#idBorrar").val(id)
    $("#formBorrarUsuario").attr('action' , 'javascript:borrar();');
}

function borrar(){
    var id = document.getElementById("idBorrar").value
    deleteUsuario(id)
}

function cerrarBorrar(){
    // Ventana modal
    var modal = document.getElementById("comprobarBorrar");
    modal.style.display = "none"

}
