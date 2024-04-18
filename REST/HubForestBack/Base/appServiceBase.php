<?php

abstract class appServiceBase{


	public $listaAtributos = array();
	public $modelo = '';
	private $default_search_init = 0;
	private $default_page_size = 250;
	public $valores;

	

	function __construct(){
		
		$this->modificacion_atributos();

		$res = comprobar_si_existe_metodo(get_class($this), 'inicializarRest');
		if ($res['ok']){
			$this->inicializarRest();
		}
		else{
			$accion = $_POST['action'];
			$this->$accion();
		}

		
	}

	function ejecutar(){

		$res = $this->comprobarnulos();

		if ($res === true){ // no hay nulos

				//para debuggear deberiamos comprobar si existe $this->modelo->tabla o inicializarRest()
				$validacionesresultado = $this->incluirValidaciones($this->modelo->tabla);
				
				if ($validacionesresultado === true){ //no hay errores de validacion

					$accionejecutar = $_POST['action'];

					$res = comprobar_si_existe_metodo(get_class($this), $accionejecutar);

					if (($accionejecutar == 'ADD' || $accionejecutar == 'EDIT')){
                        if (isset($this->files)){
						    if ($this->files == ''){

						    }
						    else{
							    $procesarfiles = $this->procesarfiles($this->files);
							    if ($procesarfiles['ok'] == false){
								    return $procesarfiles;
							    }
						    }
                        }
					}

					if ($res['ok']){
						$mires = $this->$accionejecutar();
						return $mires;
					}
					else{
						//debuggearrrrrrrrrrrrrr
						if ($this->modelo == ''){
							
						}
						else{
							$mires = $this->modelo->$accionejecutar();
							return $mires;
						}
						//
					}
					
				}
				else{ //hay errores de validacion
					return $validacionesresultado;
				}

				
		
		}
		else{ // hay nulos
			return $res;
		}
	}


	function crearModelOne($entidad){
		$entidadbase = $entidad;
		include_once './app/'.$entidadbase.'/'.$entidadbase.'_MODEL.php';
		$entidadbase = $entidadbase.'_MODEL'; 
		$this->entidad = new $entidadbase;
		if(isset($this->listaAtributos)){
			$this->rellenaModel($this->entidad, $this->listaAtributos, $this->listaAtributosSelect);
		}
		return $this->entidad;
	}


	function rellenaModel(&$obj_entidad, $listaAtributos, $listaAtributosSelect){

		$objeto = $obj_entidad;
		
		foreach ($listaAtributos as $atributo){
			if (!isset($_POST[$atributo])){
				$_POST[$atributo] = '';
			}
			$objeto->$atributo = $_POST[$atributo];
			$objeto->valores[$atributo] = $_POST[$atributo];
			
		}

		//if (($_POST['action'] == 'SEARCH') || ($_POST['action'] == 'SEARCH_BY')) {
			if (!isset($_POST['empieza'])) { 
				$empieza = $this->default_search_init; 
			} 
			elseif ($_POST['empieza'] == '') { 
				$empieza = $this->default_search_init; } 
				else { 
					$empieza = $_POST['empieza']; 
				} // sino viene empieza defecto 0

	
			$objeto->empieza = $empieza;
			
			if (!isset($_POST['filaspagina'])) { 
				$filaspagina = $this->default_page_size; 
			} 
			elseif ($_POST['filaspagina'] == '' || $_POST['filaspagina'] == 0) { 
				$filaspagina = $this->default_page_size; 
			} 
				else { 
					$filaspagina = $_POST['filaspagina']; 
				}// sino viene filaspagina defecto 25
			
			$objeto->filaspagina = $filaspagina;

		//}
		

		$objeto->listaAtributos = $listaAtributos;
		$objeto->listaAtributosSelect = $listaAtributosSelect;
		
	}


	function comprobarnulos(){

		if (($_POST['action'] == 'SEARCH') || ($_POST['action'] == 'SEARCH_BY')){
		}
		else{
			if (isset($this->notnull)){
				foreach($this->notnull[$_POST['action']] as $atributo){
					if ((!isset($_POST[$atributo])) || (strlen($_POST[$atributo]) == 0)) {
						$respuesta['ok'] = false;
						$respuesta['code'] = $atributo.'_es_nulo_KO';
						return $respuesta;
					}
				}
			}
		}

		return true;

	}

	function incluirValidaciones($entidad){


		$ficherovalidaciones = './app/'.$entidad.'/'.$entidad.'_VALIDACIONESACCIONES.php';
		if (file_exists($ficherovalidaciones)) {
		    include_once $ficherovalidaciones;
		}

		$ficherovalidaciones = './app/'.$entidad.'/'.$entidad.'_VALIDACIONESATRIBUTOS.php';
		if (file_exists($ficherovalidaciones)) {
		    include_once $ficherovalidaciones;
		}

		$ficherovalidaciones = './app/'.$this->modelo->tabla.'/'.$this->modelo->tabla.'_VALIDACIONESACCIONES.php';

		if (file_exists($ficherovalidaciones)) {
			$metodo = 'VALIDACION_ACCION_'.$_POST['action'].'_'.$this->modelo->tabla;
			if (function_exists($metodo)){
				//$res = $metodo($this->modelo->valores);
				$res = $metodo($_POST);
			    if ($res===true){
			    }
			    else{
			    	return $res;
			    }
			}
		}

		$ficherovalidaciones = './app/'.$this->modelo->tabla.'/'.$this->modelo->tabla.'_VALIDACIONESATRIBUTOS.php';

		if (file_exists($ficherovalidaciones)) {
			$metodo = 'VALIDACION_ATRIBUTOS_'.$_POST['action'].'_'.$this->modelo->tabla;
			if (function_exists($metodo)){
				//$res = $metodo($this->modelo->valores);
				$res = $metodo($_POST);
			    if ($res===true){
			    }
			    else{
			    	return $res;
			    }
			}
		}

		return true;

	}

	function modificacion_atributos(){

	}
	
	function procesarfiles($ficheros){

		$errors= array();

		

		foreach($ficheros as $files){

			$nuevofichero = $files[0];
			$fichero = $files[1];
			$ruta = $files[2];
			$extensiones = $files[3];
			$size = $files[4];

			//si trae un string trae el valor anterior y ningun nuevo fichero
			if ($_FILES[$nuevofichero]['name']==''){
				$this->modelo->$fichero = $_POST[$fichero];
				$this->modelo->valores[$fichero] = $_POST[$fichero];
			}
			else{
				$file_name = $_FILES[$nuevofichero]['name'];
				$file_size =$_FILES[$nuevofichero]['size'];
				$file_tmp =$_FILES[$nuevofichero]['tmp_name'];
				$file_type=$_FILES[$nuevofichero]['type'];
				$file_ext=explode('.',$file_name);
				$file_ext=end($file_ext);
				$file_ext=strtolower($file_ext);
				
				$extensions = $extensiones;
				
				if(in_array($file_ext,$extensions)=== false){
					$textoextension = '';
					$primero = true;
					foreach($extensions as $extension){
						if ($primero){
							$textoextension .= $extension;
							$primero = false;
						}
						else{
							$textoextension .= ','.$extension;
						}
					}
					$errors[]="extension not allowed, please choose a ". $textoextension ." file.";
				}
				
				if($file_size > $size){
					$errors[]='File size must be excately '.$size.' bytes';
				}
				
				if(empty($errors)==true){
					$this->modelo->$fichero = $file_name;
					$this->modelo->valores[$fichero] = $file_name;

					if (move_uploaded_file($file_tmp,$ruta.$file_name)) {
						$respuesta['ok'] = true;
					} //dar permisos
					else{
						$respuesta['ok'] = false;
						return $respuesta;
					}
				}else{
					$respuesta['ok'] = false;
					$respuesta['code'] = 'ERROR_UPLOAD_'.$fichero.'_KO';
					$respuesta['resource'] = $errors;
					return $respuesta;
				}
				
			}
		}

		$respuesta['ok'] = true;
		$respuesta['code'] = 'UPLOAD_'.$fichero.'_OK';
		return $respuesta;
	}
	
}


// solo para validaciones
function devolver($funcionalidad, $valores){

		include_once './app/'.$funcionalidad.'/'.$funcionalidad.'_SERVICE.php';
		
		$clase = $funcionalidad.'_SERVICE';

		$almacenPOST = $_POST;
			
		unset($_POST);
		$_POST = $valores;
		$_POST['action'] = 'SEARCH_BY';
		$_POST['controlador'] = $funcionalidad;
		
		$prueba = new $clase;
		
		$res = $prueba->ejecutar();
		
		unset($_POST);
		$_POST = $almacenPOST; //recupero el contenido de POST	
		
		return $res;


}

// solo para validaciones
function devuelvoFalseSicomprobar($existe, $tabla, $atributo, $valores, $codigo){

		if ($atributo == ''){
			$res = devolver($tabla,$valores);
		}
		else{
			$res = devolver($tabla,array($atributo => $valores[$atributo]));	
		}

		if ($existe == 'existe'){
			if ($res['code'] == 'RECORDSET_DATOS'){
				$respuesta['ok'] = false;
				$respuesta['code'] = $codigo;
			}
			else{
				$respuesta['ok'] = true;
			}
		}
		else{
			if ($res['code'] == 'RECORDSET_VACIO'){
				$respuesta['ok'] = false;
				$respuesta['code'] = $codigo;
			}
			else{
				$respuesta['ok'] = true;
			}
		}
		return $respuesta;

	}



?>
