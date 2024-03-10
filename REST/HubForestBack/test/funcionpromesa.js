function insertarscript(nombrefichero){
	elscript = document.createElement('script');
	elscript.type = 'text/javascript';
	elscript.src = '../app/'+nombrefichero+'/'+nombrefichero+'_datostest.js';
	document.head.appendChild(elscript);
}

function lineaseparadora(){
	linea = "<tr><td colspan='7' bgcolor='yelow'>&nbsp;</td></tr>";
	$("#datosresultados").append(linea);
}

async function probar(){


	insertarInicioTabla();
	await llamadafuncionpromesa(funcionesesquema_datostest);
	/*await llamadafuncionpromesa(AUTH_datostest);
	lineaseparadora();
	await llamadafuncionpromesa(rol_datostest);
	lineaseparadora();
	await llamadafuncionpromesa(usuario_datostest);
	lineaseparadora();
	await llamadafuncionpromesa(persona_datostest);
	*/
}

/*

	funcion principal para iniciar la tabla e invocar la llamada a la funcion que lanza los test a la promesa
*/

function insertarInicioTabla(){


	$("#tituloresultados").html('');
	titulotabla = "<tr><th>Num. Prueba</th><th>Controlador</th><th>Accion</th><th>Atributos</th><th>Obtenido</th><th>Esperado</th><th>Correcta</th></tr>";
	$("#tituloresultados").append(titulotabla);

	
}

/*

test : objeto con los datos de cada prueba. En cada prueba un objeto valores con los pares de campos y valores a mandar y 
		un objeto condicion con el valor de la respuesta esperada

*/

async function llamadafuncionpromesa(test){

	for (t in test){

		await funcionpromesa('', test[t].valores, test[t].condicion)
				.then((res) => {
				
						pintarresultados(t, test[t].valores, test[t].condicion, res.code);
								
					})
				.catch((res) => {
						
						pintarresultados(t, test[t].valores, test[t].condicion, res.code);

					});

		document.getElementById('form_generico').remove();
	}
}

/*

i : Número de prueba a ejecutar
valores: objeto js con los pares 'nombre campo formulario' : 'valor'
condicion: string de comparación (caso exito) con code de respuesta del back
codigorespuesta: respuesta devuelta por la promesa al ejecutar la prueba

*/

function pintarresultados(i, valores, condicion, codigorespuesta){

	res = Object.keys(valores);
	val = Object.values(valores);
	let linea = '';

	if (codigorespuesta === condicion.valor){
		correcta = 'SI';
		linea = "<tr bgcolor = '#00ff00'>";
	}
	else
	{
		correcta = 'NO';
		linea = "<tr bgcolor = '#ff0000'>";
	}

	linea += "<td>"+i+"</td><td>"+val[0]+"</td><td>"+val[1]+"</td><td>";

	campos = '';
	for (let j = 2; j<res.length; j++){
		campos += res[j]+'='+val[j]+'<br>';
	}

	linea += campos+"</td><td>"+codigorespuesta+"</td><td>"+condicion.valor+"</td><td>";

	linea += correcta+"</td></tr>";

	$("#datosresultados").append(linea);


}

/*

idform : id de formulario a utilizar para enviar la peticion en la promesa
valoresinsertar : objeto js con los pares 'nombre campo formulario' : 'valor'
condicion: string de comparación (caso exito) con code de respuesta del back

*/
function funcionpromesa(idform, valoresinsertar, condicion){

	if (idform == '') { 
		idform ='form_generico';
		crearformoculto(idform,'');
	}
	
	for ([clave,valor] of Object.entries(valoresinsertar)){
		insertacampo(idform,clave,valor);
	};
	
	return new Promise(function(resolve, reject) {
		$.ajax({
			method: "POST",
			url: urlPeticionesAjax,
			data: $("#"+idform).serialize(),
		}).done(res => {
			if (res.code != condicion.valor) {
				reject(res);
			}
			else{
				resolve(res);
			}
		})
		.fail( function( jqXHR ) {
			mensajeFAIL(jqXHR.status);
		});
	});

}