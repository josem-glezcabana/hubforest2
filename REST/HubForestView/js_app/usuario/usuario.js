
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
async function getUsuarioPorId(id_user) {
    const user = {
        id_user: id_user
    };
    return peticionBackGeneral('', 'user', 'SEARCH_BY', user)
        .then(response => response['resource'])
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function getListByParamUsuarios_search(name_user, surname_user, organization_user, email_user, position_user) {
    const user = {
        name_user: name_user,
        surname_user: surname_user,
        organization_user: organization_user,
        email_user: email_user,
        position_user: position_user
    };
    return peticionBackGeneral('', 'user', 'SEARCH', user)
        .then(response => (response['code'] === 'RECORDSET_DATOS') ? construyeTablaUsuario(response['resource']) :  mostrarErrorBusq())
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return null;
        });
}

async function addUsuario(name_user, surname_user, organization_user, email_user, passwd, position_user, file_curr_user) {
    const user = {
        name_user: name_user,
        surname_user: surname_user,
        organization_user: organization_user,
        email_user: email_user,
        passwd: passwd,
        position_user: position_user,
        file_curr_user: file_curr_user,
        is_admin: "NO"
    };

    return peticionBackGeneral('formUsuario', 'user', 'ADD', user)
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

async function editUsuario(id_user, name_user, surname_user, organization_user, email_user, passwd, position_user, file_curr_user) {
    const user = {
        id_user: id_user,
        name_user: name_user,
        surname_user: surname_user,
        organization_user: organization_user,
        email_user: email_user,
        passwd: passwd,
        position_user: position_user,
        file_curr_user:  file_curr_user,
        is_admin: "NO"
    };

    return peticionBackGeneral('formUsuario', 'user', 'EDIT', user)
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

async function registrarUsuario(name_user, surname_user, organization_user, email_user, passwd, position_user, is_admin, file_curr_user) {

    const user = {
        name_user: name_user,
        surname_user: surname_user,
        organization_user: organization_user,
        email_user: email_user,
        passwd: passwd,
        position_user: position_user,
        is_admin: is_admin,
        file_curr_user: file_curr_user

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
        var atributosTabla = ["'" + fila.id_user + "'","'" + fila.name_user + "'", "'" + fila.surname_user + "'", "'" + fila.passwd + "'",
            "'" + fila.email_user + "'", "'" + fila.organization_user + "'","'" + fila.position_user + "'", "'" + fila.file_curr_user + "'"];
        var botonEdit='<button class="BotonEditar btn btn-info" id="editarUsuario" onclick="mostrarModal('+tipo+','+atributosTabla+')">Editar</button>'

        // Generar el enlace de descarga
        let fileURL = fila.file_curr_user ? '../../HubForestBack/files/user/' + fila.file_curr_user : '';
        let enlaceArchivo = fileURL ? '<a href="' + fileURL + '" download>'+fila.file_curr_user+'</a>' : '';

        filasTabla += '<tr> <td>' + fila.id_user + 
                '</td> <td>' + fila.name_user + 
                '</td> <td>' + fila.surname_user + 
                '</td> <td>' + fila.email_user + 
                '</td> <td>' + fila.organization_user + 
                '</td> <td>' + fila.position_user + 
                '</td> <td>' + enlaceArchivo + 
                '</td> <td class="text-center">' + botonEdit +
                '</td> <td class="text-center"><button class="BotonEliminar btn btn-danger" id="borrarUsuario" onclick="mostrarBorrar('+fila.id_user+')">Eliminar</button>'
                
                '</td>  </tr>';
    });

    recuperarYComprobarUsuarioLogeadoIsAdmin().then(resultado => {
        if (!resultado) {
            let elements = document.getElementsByClassName('BotonEditar');
            for (let e of elements) {
                e.style.display = 'none';
            }
            elements = document.getElementsByClassName('BotonEliminar');
            for (let e of elements) {
                e.style.display = 'none';
            }
            $("#abrirModal").hide();
        } else {
            let elements = document.getElementsByClassName('BotonEditar');
            for (let e of elements) {
                e.style.display = 'block';
            }
            elements = document.getElementsByClassName('BotonEliminar');
            for (let e of elements) {
                e.style.display = 'block';
            }
            $("#abrirModal").show();
        }
    });
    
    $("#datosUsuarios").append(filasTabla);
    cerrarModal();
    setLang();
}

function getAtributos(tipo){
    var id_user = document.getElementById("id_user").value
    var name_user = document.getElementById("name_user").value
    var surname_user = document.getElementById("surname_user").value
    var organization_user = document.getElementById("organization_user").value
    var email_user = document.getElementById("email_user").value
    var passwd = encriptar("passwd")
    var position_user = document.getElementById("position_user").value
    var file_curr_user = document.getElementById("new_file_curr_user").value
     switch(tipo){
        case "Editar":
            editUsuario(id_user,name_user, surname_user, organization_user, email_user, passwd, position_user, file_curr_user)
            break;
        case "Añadir":
            addUsuario(name_user, surname_user, organization_user, email_user, passwd, position_user, file_curr_user)
            break;
        case "Buscar":
            getListByParamUsuarios_search(name_user, surname_user, organization_user, email_user, position_user)
            break;
     }
}

function mostrarModal(tipo, id_user=null, name_user=null, surname_user=null, passwd=null, email_user=null, 
                        organization_user=null, position_user=null, file_curr_user=null){
    // Ventana modal
    document.getElementById("ventanaModal").style.display = "block";
    document.getElementById("Titulo").innerHTML = '<h2>'+tipo+'</h2>';
    document.getElementById("aceptar").innerHTML = tipo;
    if(tipo.includes("Editar")){
        $("#formUsuario").attr('action' , 'javascript:getAtributos("Editar");');

        $("#id_user").val(id_user);
        $("#name_user").val(name_user);
        $('#formPassword').show();
        $("#passwd").val(passwd);
        $('#form_old_file_curr_user').show();
        $('#form_file_curr_user').show();
        $("#surname_user").val(surname_user);
        $("#email_user").val(email_user);
        $("#organization_user").val(organization_user);
        $("#position_user").val(position_user);
        $("#file_curr_user").val(file_curr_user);
    }
    else{
        $('#form_old_file_curr_user').hide();
        if(tipo.includes("Buscar")){
            document.getElementById("name_user").required = false;
            $('#formPassword').hide();
            document.getElementById("passwd").required = false;
            document.getElementById("surname_user").required = false;
            document.getElementById("email_user").required = false;
            document.getElementById("organization_user").required = false;
            document.getElementById("position_user").required = false;
            $('#form_file_curr_user').hide();
            document.getElementById("new_file_curr_user").required = false;

            $("#formUsuario").attr('action' , 'javascript:getAtributos("Buscar");');
        }
        else{
            document.getElementById("name_user").required = true;
            $('#formPassword').show();
            document.getElementById("passwd").required = true;
            document.getElementById("surname_user").required = true;
            document.getElementById("email_user").required = true;
            document.getElementById("organization_user").required = true;
            document.getElementById("position_user").required = true;
            $('#form_file_curr_user').show();
            document.getElementById("new_file_curr_user").required = false;

            $("#formUsuario").attr('action' , 'javascript:getAtributos("Añadir");');
        }

        $("#id_user").val('');
        $("#name_user").val('');
        $("#passwd").val('');
        $("#surname_user").val('');
        $("#email_user").val('');
        $("#organization_user").val('');
        $("#position_user").val('');
        $("#file_curr_user").val('');
    }
    setLang();
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