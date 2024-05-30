async function cargarRegistro() {
    try {
        const resultadoValidacion = await validarUsuario();
        if (resultadoValidacion.data.ok === false || resultadoValidacion.data.ok === undefined) {
            volverRegistro()
        } else {
            volverHome();
        }
    } catch (error) {
        console.error('Error al cargar el registro:', error);
        volverRegistro() // Cambia 'registro.html' por la URL de tu página de registro
    }
}

function volverRegistro(){
    window.location.href = 'registro.html';
}

function ocultarMenu(){
    $( "#menu" ).hide();
    $( "#logout" ).hide();
}

function volverHome(){
    $.ajax({
        url: 'home.html',
        type: 'GET',
        dataType: 'html',
        success: function(data) {
            // Inserta el contenido en el div con id "contenido"
            $('#contenido').html(data);
            $( "#menu" ).show();
            $( "#logout" ).show();
            recuperarYComprobarUsuarioLogeadoIsAdmin().then(resultado => {
                if(!resultado){
                    $("#permisosMenu").hide();
                }
                else{
                    $("#permisosMenu").show();
                }
            });
            setLang();
        },
        error: function(error) {
            console.error('Error al cargar la vista:', error);
        }
    });
}
function logout(){

    deleteCookie("tokenUsuario");
    volverRegistro();
}

/** Añade un header a una vista */
function includeHeader() {
    $("#header").html("");

    let header = '<header class="bg-dark text-white py-3">' +
    '<div class="container">' +
        '<div class="row">' +
            '<div class="col-md-1">' +
                '<a href="index.html" class="d-flex justify-content-start">' +
                    '<img src="img/logo.png" alt="Logo de la Aplicación" class="img-fluid" style="width: 100%">' +
                '</a>' +
            '</div>' +
            '<div id="menu" class="col-md-8">' +
                '<nav class="navbar navbar-expand-md navbar-dark">' +
                    '<ul class="navbar-nav ml-auto">' +
                        '<li class="nav-item">' +
                            '<a class="inicioPage nav-link" href="index.html">Inicio</a>' +
                        '</li>' +
                        '<li class="nav-item">' +
                            '<a class="usuariosMenu nav-link" href="listaUsuarios.html">Usuarios</a>' +
                        '</li>' +
                        '<li class="nav-item">' +
                            '<div class="dropdown">' +
                                '<button class="proyectosMenu btn nav-link dropdown-toggle" type="button" data-toggle="dropdown">Proyectos' +
                                    '<span class="caret"></span>' +
                                '</button>' +
                                '<ul class="dropdown-menu">' +
                                    '<li><a class="proyectosMenu dropdown-item" href="proyectos.html">Proyectos</a></li>' +
                                    '<li id="permisosMenu"><a class="permisosMenu dropdown-item" href="permisos.html">Permisos Proyectos</a></li>' +
                                    '<li><a class="ecosystemsMenu dropdown-item" href="listaEcosystem.html">Ecosistemas</a></li>' +
                                    '<li><a class="projectEcosystemMenu dropdown-item" href="project_ecosystem.html">Proyectos-ecosistemas</a></li>' +
                                '</ul>' +
                            '</div>' +
                        '</li>' +
                        '<li class="nav-item">' +
                            '<div class="dropdown">' +
                                '<button class="samplingMenu btn nav-link dropdown-toggle" type="button" data-toggle="dropdown">Muestras' +
                                    '<span class="caret"></span>' +
                                '</button>' +
                                '<ul class="dropdown-menu">' +
                                    '<li><a class="samplingMenu dropdown-item" href="sampling.html">Muestras</a></li>' +
                                    '<li><a class="samplingMethodMenu dropdown-item" href="sampling_methodology.html">Metodologías de muestreo</a></li>' +
                                '</ul>' +
                            '</div>' +
                        '</li>' +
                        '<li class="nav-item">' +
                            '<div class="dropdown">' +
                                '<button class="sitesMenu btn nav-link dropdown-toggle" type="button" data-toggle="dropdown">Sitios' +
                                    '<span class="caret"></span>' +
                                '</button>' +
                                '<ul class="dropdown-menu">' +
                                    '<li><a class="sitesMenu dropdown-item" href="sites.html">Sitios</a></li>' +
                                    '<li><a class="TemporalsamplingSiteMenu dropdown-item" href="listaTemporal_sampling_site_params.html">Temp. samp. sites</a></li>' +
                                '</ul>' +
                            '</div>' +
                        '</li>' +
                        '<li class="nav-item">' +
                            '<a class="storageMethodMenu nav-link" href="storageMethod.html">Metodos de almacenamiento</a>' +
                        '</li>' +
                        '<li class="nav-item">' +
                            '<div class="dropdown">' +
                                '<button class="labProcessMenu btn nav-link dropdown-toggle" type="button" data-toggle="dropdown">Laboratorio' +
                                    '<span class="caret"></span>' +
                                '</button>' +
                                '<ul class="dropdown-menu">' +
                                    '<li><a class="labProcessMenu dropdown-item" href="lab_process.html">Procesos laboratorio</a></li>' +
                                    '<li><a class="analysisTechniqueMenu dropdown-item" href="analysis_technique.html">Técnicas análisis</a></li>' +
                                '</ul>' +
                            '</div>' +
                        '</li>' +
                    '</ul>' +
                '</nav>' +
            '</div>' +
            '<div class="col-md-2 ml-auto">' + // Contenedor de banderas y logout
                '<div class="d-flex justify-content-end">' +
                    '<img src="img/Spain.png" alt="Español" style="width: 30px; cursor: pointer;" onclick="cambiarLang(\'ES\')">' +
                    '<img src="img/United-Kingdom.png" alt="English" style="width: 30px; cursor: pointer; margin-left: 10px;" onclick="cambiarLang(\'EN\')">' +
                    '<button id="logout" style="background-color: transparent; border: none; padding: 0; margin-left: 10px;" onclick="logout()">' +
                        '<img src="img/logout.png" alt="Logout">' +
                    '</button>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>' +
'</header>';
    recuperarYComprobarUsuarioLogeadoIsAdmin().then(resultado => {
        if(!resultado){
            $("#permisosMenu").hide();
        }
        else{
            $("#permisosMenu").show();
        }
    });
    
    $("#header").append(header);

}

/** Añade el footer a una vista */
function includeFooter() {
    $("#footer").html("");
         
    
    let footer = '<footer class="bg-dark text-white py-4 mt-5">' +
                '<div class="container">' +
                '<div class="row">' +
                '<div class="col-md-4">' +
                '<div class="row d-flex align-items-center" style="justify-content: space-evenly">' +
                '<img src="img/logo.png" alt="Logo Pequeño" class="img-fluid" style="width: 50px; height: auto;">' +
                '<div class="row w-50 d-flex justify-content-around">' +
                '<span class="followUs">Siguenos en:</span>' +
                '<div class="row">' +
                '<a href="https://github.com/ncgomez17/HubForest" target="_blank">' +
                '<img src="img/github-icon.svg" alt="Instagram" width="24" height="24">' +
                '</a>' +
                '<a href="https://www.instagram.com/ruben_fb_2" target="_blank">' +
                '<img src="img/instagram-icon.svg" alt="Instagram" width="24" height="24">' +
                '</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-md-8">' +
                '<h5 class="contactUs">Contacto</h5>' +
                '<div class="row d-flex" style="justify-content: space-evenly">' +
                '<span>Correo: info@hubforest.com</span>' +
                '<span>Teléfono: +123 456 789</span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</footer>';

    $("#footer").append(footer);
}

/** Función para establecer el valor de la cookie*/
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

/** Función para obtener el valor de la cookie*/
function getCookie(name) {
    let cookie_name = name + "=";
    let cookie_array = document.cookie.split(';');

    for (let cookie of cookie_array) {
        while (cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length);
        if (cookie.indexOf(cookie_name) == 0) return cookie.substring(cookie_name.length, cookie.length);
    }

    return null;
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// /** Comprueba que un usuario esté logueado, obteniendo la cookie 'tokenUsuario'*/
// function userLoggedIn() {
//     let user_token = getCookie('tokenUsuario');
//     return (user_token !== null);
// }

/** Cierra el modal de confirmación de eliminar un elemento */
function cerrarBorrar(){
    // Ventana modal
    var modal = document.getElementById("comprobarBorrar");
    modal.style.display = "none"
}

/**Función para encriptar la pass en md5*/
function encriptar(idElemento){
  	return hex_md5(document.getElementById(idElemento).value);
}

function iniciarSesion() {
    // Obtener los valores de nombre de usuario y contraseña
    var nombreUsuario = $('#nameLogin').val();
    var contrasena = encriptar('passwordLogin');
    // Llamar a la función loginUsuario con los datos del formulario
    loginUsuario(nombreUsuario, contrasena)
      .then(response => {
        if (response.status==="OK") {
            cargarRegistro()
        } else {
          // Mostrar el modal de error en caso de un inicio de sesión fallido
          $('#errorModal').modal('show');
        }
      });
  }
  function submitFormRegistro() {
    var name_user = document.getElementById("name_user").value
    var surname_user = document.getElementById("surname_user").value
    var organization_user = document.getElementById("organization_user").value
    var email_user = document.getElementById("email_user").value
    var passwd = encriptar("passwd")
    var position_user = document.getElementById("position_user").value
    var is_admin = false;
    var file_curr_user = null;

    registrarUsuario(name_user,surname_user, organization_user,email_user,passwd, position_user, is_admin, file_curr_user, 'user')
        .then(response => {
            if (response && response.status === 'OK') {
                $('#registroModal').modal('hide');
                cargarRegistro();
            } else {
                $('#registroErrorModal').modal('show');
            }
        })
        .catch(error => {
            console.error('Error en el registro:', error);
            $('#registroErrorModal').modal('show');
        });

    // Evitar que el formulario se envíe de manera tradicional
    return false;
}

/** Muestra un error en la búsqueda en el modal */
function mostrarErrorBusq(){
    // Ventana modal
    document.getElementById("mensajeError").style.display = "block";
}

/** Oculta un error en la búsqueda en el modal */
function cerrarErrorBusq(){
    // Ventana modal
    document.getElementById("mensajeError").style.display = "none";
}

async function recuperarYComprobarUsuarioLogeadoIsAdmin() {
    try {
        const response = await peticionBackConToken('', 'AUTH', 'RECUPERAR_USUARIO_LOGEADO',getCookie("tokenUsuario"),'');
        if (response && response.ok === true && response.resource[0].is_admin === 'SI') {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return false;
    }
}


