	/*Función que elimina todas las cookies para que no quede basura en ellas*/
function deleteAllCookies() {
	var cookies = document.cookie.split(";");
    	for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        setCookie(name, '');
    }
 }

function desconectar(){
	deleteAllCookies();
	window.location.href = "login.html";
}

function redirigir(){

	if ((getCookie('usuarioSistema') === null) || (getCookie('usuarioSistema') === '')) {
		window.location.href = "login.html";
	}
  else{
  	window.location.href = "menu.html";
  }
}

function incluircabecera(){

	$("#id_caja_superior").html = "";
	let incluir = "<table id='id_tabla_idiomas'>"+
        "<tr>"+
          "<td onclick=\"setLang(\'ES\');\">ES</td>"+
          "<td onclick=\"setLang(\'EN\');\">EN</td>"+
          "<td onclick=\"setLang(\'GA\');\">GA</td>"+
        "</tr>"+
      "</table>";

  $("#id_caja_superior").append(incluir);

}

function esta_autenticado(){
	 if ((getCookie('usuarioSistema') === null) || (getCookie('usuarioSistema') === '')) {
	 		window.location.href = "login.html";
      }
      else{
      	let temp = "Usuario :"+getCookie('usuarioSistema');
      	temp += "<br><a href='javascript:desconectar();'>Desconectar</a>";
      	$("#id_caja_superior").append(temp);
      }
     
}

function comprobar_permisos(){

}

/**Función para crear un formulario oculto*/
function crearformoculto(name, action){

	if ( $("#" + name).length == 0) {

		var formu = document.createElement('form');
		document.body.appendChild(formu);
	    formu.name = name;
	    formu.action = action; 
	    formu.id = name;  
	    formu.style.display = "none";

	}

}

function ponerinvisibleerror(){
	document.getElementById('id_caja_error').style.display='none';
}

function ponerinvisibleformusuario(){
	document.getElementById('id_caja_formulario_usuario').style.display = 'none';
}

function ponerinvisible(idElemento){
	document.getElementById(idElemento).style.display = 'none';
}

function ponervisible(idElemento){
	document.getElementById(idElemento).style.display = 'block';
}

function mensajeKO(idElemento, codigoerror){

	document.getElementById('id_texterror').classList.add(codigoerror); 
	//document.getElementById('id_texterror').innerHTML = codigoerror;
	document.getElementById('id_caja_error').style.display = 'block';
	document.getElementById(idElemento).style.borderColor = "#ff0000";
	setLang();

}
// cerrarMensajeKO()
// si el div de error fuese modal, se controlaria que solo hubiese un class
// de texto de error
// como no es modal por el momento, ante la acumulación de class de errores 
// encadenados, se obtiene la lista de clases del elemento, se convierte en un
// string desde un DOMtokenList, se crea un array con los elementos al hacer
// split con el espacio, y se eliminan de la lista de clases cada uno de los
// codigos del array
// despues de pone la ventana de error como invisible
function cerrarMensajeKO(){

	codigos = String(document.getElementById('id_texterror').classList);
	codigos = codigos.split(' ');
	for (let codigo of codigos){
		document.getElementById('id_texterror').classList.remove(codigo);
	}
	document.getElementById('id_texterror').innerHTML = '';
	document.getElementById('id_caja_error').style.borderColor = "";
	document.getElementById('id_caja_error').style.display = 'none';

}

function mensajeOK(idElemento){

	//document.getElementById('id_texterror').innerHTML = '';
	document.getElementById('id_caja_error').style.display = 'none';
	document.getElementById(idElemento).style.borderColor = "#00e600";

}

function mensajeactionOK(codigo){

	//document.getElementById('id_texterror').innerHTML = codigo;
	document.getElementById('id_texterror').classList.add(codigo);
	document.getElementById('id_caja_error').style.borderColor = "#00e600"; 
	document.getElementById('id_caja_error').style.display = 'block';
	setLang();

}

function mensajeFAIL(codigoerror){

	//document.getElementById('id_texterror').innerHTML = codigoerror;
	document.getElementById('id_texterror').classList.add(codigoerror); 
	document.getElementById('id_caja_error').style.display = 'block';
	setLang();

}

/**Función para mostrar mensaje de error cuando fallan las peticiones ajax*/
function mensajeHTTPFAIL(status){
	var idioma = getCookie('lang');
	
	if (status === 500) {
	mensajeFAIL("MENSAJE_ERROR_INTERNO");
	} else if (status === 403) {
	mensajeFAIL("ERROR_AUTENTICACION");
	} else if (status === 0){
	mensajeFAIL("ERR_CONNECTION_REFUSED");
	}

	setLang();
}

/**Función para insertar campos en el formulario a mayores*/
function insertacampo(idform, name, value){
	
	formulario = document.getElementById(idform);
	var input = document.createElement('input');
	input.type = 'hidden';
	input.name = name;
	input.id = name;
	input.value = value;
	input.className = name;
	formulario.appendChild(input);

}

function size_minimo(idElemento,longitudminima){

	let elemento;
	elemento = document.getElementById(idElemento).value;
	if (elemento.length < longitudminima){
		return false;
	}
	else{
		return true;
	}
}

function size_maximo(idElemento,longitudmaxima){
	
	elemento = document.getElementById(idElemento).value;
	if (elemento.length > longitudmaxima){
		return false;
	}
	else{
		return true;
	}
}

function letrassinacentoynumeros(idElemento){
	return true;
}

function encriptarpassword(){
	document.getElementById('id_contrasena').value = hex_md5(document.getElementById('id_contrasena').value);
	return true;
}