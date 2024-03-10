var traduccion;

/**
 * Si no se envía idioma el idioma por defecto es ES
 * Este fichero se encargará de manejar el tipo de idioma de la aplicación
 * 
 * */

/**Función que coge el idioma de las cookies, por defecto está en ES*/
function setLang(lang =''){

    if (lang=='') {
        if (getCookie('lang') != '') {
          lang = getCookie('lang');
        } else { 	
        	lang= 'ES';
        }

    }

    setCookie('lang', lang, 1);

    switch(lang) {
    	case 'ES' : 
    	   traduccion=arrayES;
            document.getElementById("imagenIdioma").src = "images/Spain.png";
    	break;
    	case 'EN' :
    	   traduccion=arrayEN;
           document.getElementById("imagenIdioma").src = "images/United-Kingdom.png";
    	break;
    	case 'GA' :
    	   traduccion=arrayGA;
           document.getElementById("imagenIdioma").src = "images/Galicia.png";
    	break;
    	default:
    	   traduccion=arrayES;
           document.getElementById("imagenIdioma").src = "images/Spain.png";
    	break;
    }

   //**Se recorre el array de traducciones buscando coincidencias una por una*/
   for(var clave in traduccion) {

 		var elementos = document.getElementsByClassName(clave);
        var etiquetas =document.getElementsByTagName('LABEL');
        var inputs = document.getElementsByTagName('input');
        var imgs = document.getElementsByTagName('img');
        var options = document.getElementsByTagName('option');
        var textAreas = document.getElementsByTagName('textarea');

        for (var elem in elementos) {
            elementos[elem].innerHTML = traduccion[clave];
        }

        for (var i = 0; i < etiquetas.length; i++) {
            if (etiquetas[i].htmlFor == clave) {
                etiquetas[i].innerHTML = traduccion[clave];
            }
        }

        for (var i = 0; i < inputs.length; i++) {
            var list = inputs[i].classList;
            for (var j = 0; j < list.length; j++) {
                if (list[j] == clave) {
                    inputs[i].placeholder = traduccion[clave];
                }            
            }
        }

        for (var i = 0; i < imgs.length; i++) {
            var list = imgs[i].classList;
            for (var j = 0; j < list.length; j++) {
                 if (list[j] == clave) {
                    imgs[i].alt = traduccion[clave];
                }
            } 
        } 

        for (var i = 0; i < options.length; i++) { 
            if (options[i].className == clave) {
                options[i].label = traduccion[clave];
            }
        }

        for (var i = 0; i < textAreas.length; i++) {
            var list = textAreas[i].classList;
            for (var j = 0; j < list.length; j++) {
                if (list[j] == clave) {
                    textAreas[i].placeholder = traduccion[clave];
                }            
            }
        }
	}
}

/**Función para cambiar el idioma*/
function cambiarLang(lang) {

    setCookie('lang',lang,5);
    window.location.reload(true);

}