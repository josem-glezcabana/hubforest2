<?php

include_once './Base/appServiceBase.php';

class AUTH_SERVICE extends appServiceBase{

	public $modelo;

	//METODOS

	function __construct(){

		parent::__construct();

	}

	function inicializarRest(){

		$this->listaAtributos = array('dni', 'nombre_persona', 'apellidos_persona','fechaNacimiento_persona', 'direccion_persona','telefono_persona','email_persona','usuario','contrasena','id_rol');

		$this->listaAtributosSelect = array('dni', 'nombre_persona', 'apellidos_persona','fechaNacimiento_persona', 'direccion_persona','telefono_persona','email_persona','usuario','contrasena','id_rol');

		$this->notnull = array(
						'LOGIN'=>array('usuario', 'contrasena'),
						'DESCONECTAR'=>array('usuario'),
						'CAMBIAR_CONTRASENA'=>array('dni','contrasena'),
						'REGISTRAR'=>array('dni', 'nombre_persona', 'apellidos_persona','fechaNacimiento_persona', 'direccion_persona','telefono_persona','email_persona','usuario','contrasena')
						);

		$this->modelo = $this->crearModelOne('usuario');

	}


	function cargarTokenCabecera(){

		$tokenFront = '';	

		foreach(apache_request_headers() as $header =>$value){
			if($header == 'Authorization')
				$tokenFront = $value;
		}	
		
		return $tokenFront;

	}

	function LOGIN(){

		include_once './app/usuario/usuario_SERVICE.php';
		$_POST['controlador'] = 'usuario';
		$_POST['action'] = 'SEARCH_BY'; 
		$usuario = new usuario_SERVICE;
		$respuesta = $usuario->ejecutar();

		if (!(empty($respuesta['resource']))){

			$fila = $respuesta['resource'][0];
			if ($fila['contrasena'] == $_POST['contrasena']){

				//$usuarioDatos = ['usuario' => $_POST['usuario'],'contrasena' => $_POST['contrasena']];
				include_once "./Base/JWT/token.php";
				$token = MiToken::creaToken($_POST['usuario'],$_POST['contrasena'] );

				$feedback['ok'] = true;
				$feedback['code'] = literal['LOGIN_OK'];
				$feedback['resource'] = $token;

			}
			else{
				$feedback['ok'] = false;
				$feedback['code'] = literal['USUARIO_PASS_KO'];
				$feedback['resource'] = array($_POST['usuario'],$_POST['contrasena']);
			}
		}
		else{
			$feedback['ok'] = false;
			$feedback['code'] = literal['USUARIO_LOGIN_KO'];
			$feedback['resource'] = array($_POST['usuario'],$_POST['contrasena']);
		}


		return $feedback;

	} 

	function REGISTRAR(){

		include_once './app/persona/persona_SERVICE.php';
		$persona = new persona_SERVICE;
		$_POST['controlador'] = 'persona';
		$_POST['action'] = 'ADD';
		$res = $persona->ejecutar();

		if ($res['ok'] === true){ //no hay error insertando persona
			include_once './app/usuario/usuario_SERVICE.php';
			$_POST['controlador'] = 'usuario';
			$_POST['id_rol'] = 1; //inicializar el valor del id_rol al por defecto
			$usuario = new usuario_SERVICE;
			$res = $usuario->ejecutar();

			if ($res['ok'] === true){ // no hay error insertando usuario
				$res = $usuario->cambiar_contrasena();
				if ($res['ok'] === true){ // no hay error cambiando la contraseña
					$res['code'] = literal['REGISTRAR_OK'];
				}
				else //error cambiando contraseña
				{
					$res['code'] = literal['CAMBIAR_contrasena_KO'];
				}
			}
			else{ //hay error insertando usuario
				$_POST['action'] = 'DELETE';
				$persona->ejecutar();
			}
		}
		else{ //hay error al insertar la persona
		}

		$res['resource'] = '';
		return $res;
	}

	function CAMBIAR_CONTRASENA(){

		if ($_POST['dni']=='11111111H'){
			$respuesta['ok'] = false;
			$respuesta['code'] = literal['admin_no_se_puede_modificar_KO'];
			return $respuesta;
		}
		
		include_once './app/usuario/usuario_SERVICE.php';
		$_POST['controlador'] = 'usuario';
		$usuario = new usuario_SERVICE;
		$res = $usuario->cambiar_contrasena();
		if ($res['ok'] === true){ // no hay error cambiando la contraseña
			$res['code'] = literal['CAMBIAR_contrasena_OK'];
		}
		else //error cambiando contraseña
		{
			$res['code'] = literal['CAMBIAR_contrasena_KO'];
		}
		return $res;
	
	}

	function validar_token(){

		include_once "./Base/JWT/token.php";
		$current_token = cargarTokenCabecera();
		$resultado = MiToken::devuelveToken($current_token);
		$password = $resultado->data->id;
		$login = $resultado->data->name;
		//echo 'comprobar en la bd si son correctos';
	}

}

?>
