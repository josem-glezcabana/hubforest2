
async function getListUsuarios() {

    return peticionBackGeneral('', 'user', 'SEARCH')
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaUsuario(response['resource']) : null)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
        
}


async function getListByParamUsuarios(name_user, surname_user, organization_user, email_user, passwd, position_user) {
    const user = {
        name_user: name_user,
        surname_user: surname_user,
        organization_user: organization_user,
        email_user: email_user,
        passwd: passwd,
        position_user: position_user
    };
    return peticionBackGeneral('', 'user', 'SEARCH_BY', user)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaUsuario(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function getListByParamUsuarios_search(name_user, surname_user, organization_user, email_user, passwd, position_user) {
    const user = {
        name_user: name_user,
        surname_user: surname_user,
        organization_user: organization_user,
        email_user: email_user,
        passwd: passwd,
        position_user: position_user
    };
    return peticionBackGeneral('', 'user', 'SEARCH', user)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaUsuario(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function addUsuario(name_user, surname_user, organization_user, email_user, passwd, position_user) {
    const user = {
        name_user: name_user,
        surname_user: surname_user,
        organization_user: organization_user,
        email_user: email_user,
        passwd: passwd,
        position_user: position_user
    };

    return peticionBackGeneral('', 'user', 'ADD', user)
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

async function editUsuario(id_user, name_user, surname_user, organization_user, email_user, passwd, position_user) {
    const user = {
        id_user: id_user,
        name_user: name_user,
        surname_user: surname_user,
        organization_user: organization_user,
        email_user: email_user,
        passwd: passwd,
        position_user: position_user
    };

    return peticionBackGeneral('', 'user', 'EDIT', user)
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function deleteUsuario(id_user) {
    
    return peticionBackGeneral('', 'user', 'DELETE', {'id_user': id_user})
        .then(response => {
            location.reload();
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function registrarUsuario(name_user, surname_user, organization_user, email_user, passwd, position_user) {

    const user = {
        name_user: name_user,
        surname_user: surname_user,
        organization_user: organization_user,
        email_user: email_user,
        passwd: passwd,
        position_user: position_user
    };

    return peticionBackGeneral('', 'AUTH', 'REGISTRAR', user)
        .then(response => {
            if(response.ok){
                setCookie("tokenUsuario",response.resource, 1)
                return { status: 'OK', data: response };
            } else{
                return { status: 'KO', data: response }; 
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return error;
        });
        
}

async function loginUsuario(name_user, passwd) {

    const datos = {
        name_user: name_user,
        passwd: passwd
    };

    return peticionBackGeneral('', 'AUTH', 'LOGIN', datos)
        .then(response => {
            if(response.ok){
                setCookie("tokenUsuario",response.resource, 1)
                return { status: 'OK', data: response };
            } else{
                return { status: 'KO', data: response }; 
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return error;
        });
        
}

async function cambiarContrasenha(name_user, passwd) {

    const datos = {
        name_user: name_user,
        passwd: passwd
    };

    return peticionBackGeneral('', 'AUTH', 'CAMBIAR_CONTRASENA', datos)
        .then(response => {
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
        
}

async function validarUsuario() {

    return peticionBackConToken('', 'AUTH', 'VALIDAR_TOKEN', getCookie("tokenUsuario") ,'')
        .then(response => {
            return { status: 'OK', data: response };
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return { status: 'False', data: response };;
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
        var atributosTabla = ["'" + fila.id_user + "'","'" + fila.name_user + "'", "'" + fila.surname_user + "'", "'" + fila.email_user + "'", "'" + fila.position_user + "'","'" + fila.organization_user + "'"];
        var botonEdit='<button class="btn btn-info" id="editarUsuario" onclick="mostrarModal('+tipo+','+atributosTabla+')">Editar</button>'

        filasTabla += '<tr> <td>' + fila.id_user + 
                '</td> <td>' + fila.name_user + 
                '</td> <td>' + fila.surname_user + 
                '</td> <td>' + fila.email_user + 
                '</td> <td>' + fila.position_user + 
                '</td> <td>' + fila.organization_user + 
                '</td> <td class="text-center">' + botonEdit +
                '</td> <td class="text-center"><button class="btn btn-danger" id="borrarUsuario" onclick="mostrarBorrar('+fila.id+')">Eliminar</button>'
                
                '</td>  </tr>';
    });
    
    $("#datosUsuarios").append(filasTabla);
    cerrarModal()
}

function getAtributos(tipo){
    var id_user = document.getElementById("id_user").value
    var name_user = document.getElementById("name_user").value
    var surname_user = document.getElementById("surname_user").value
    var organization_user = document.getElementById("organization_user").value
    var email_user = document.getElementById("email_user").value
    var passwd = encriptar("passwd")
    var position_user = document.getElementById("position_user").value
     switch(tipo){
        case "Editar":
            editUsuario(id_user,name_user, surname_user, organization_user, email_user, passwd, position_user)
            break;
        case "Añadir":
            addUsuario(name_user, surname_user, organization_user, email_user, passwd, position_user)
            break;
        case "Buscar":
            getListByParamUsuarios_search(name_user, surname_user, organization_user, email_user, passwd, position_user)
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
        $('#formPassword').show();
        $("#password").val(password);
        $("#correo").val(correo);
        $("#rol").val(rol);
    }
    else{
        if(tipo.includes("Buscar")){
            document.getElementById("nombre").required = false;
            $('#formPassword').hide();
            document.getElementById("password").required = false;
            document.getElementById("correo").required = false;
            document.getElementById("rol").required = false;
            $("#formUsuario").attr('action' , 'javascript:getAtributos("Buscar");');
        }
        else{
            document.getElementById("nombre").required = true;
            $('#formPassword').show();
            document.getElementById("password").required = true;
            document.getElementById("correo").required = true;
            document.getElementById("rol").required = true;
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