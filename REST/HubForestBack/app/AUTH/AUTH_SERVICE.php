<?php

include_once './Base/appServiceBase.php';

class AUTH_SERVICE extends appServiceBase{

	public $modelo;

	//METODOS

	function __construct(){

		parent::__construct();

	}

	function inicializarRest(){

		$this->listaAtributos = array('id_user','name_user','surname_user','position_user','organization_user','email_user','file_curr_user','passwd');

		$this->listaAtributosSelect = array('id_user','name_user','surname_user','position_user','organization_user','email_user','file_curr_user','passwd');

		$this->notnull = array(
						'LOGIN'=>array('name_user', 'passwd'),
						'DESCONECTAR'=>array('name_user'),
						'CAMBIAR_CONTRASENA'=>array('name_user','passwd'),
						'VALIDAR_TOKEN'=>array(),
						'REGISTRAR'=>array('email_user','name_user','surname_user','passwd','organization_user','position_user','is_admin')
						);

		$this->modelo = $this->crearModelOne('user');

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
		include_once './app/user/user_SERVICE.php';
		$_POST['controlador'] = 'user';
		$_POST['action'] = 'SEARCH_BY'; 
		$user = new user_SERVICE;
		$respuesta = $user->ejecutar();

		if (!(empty($respuesta['resource']))){

			$fila = $respuesta['resource'][0];
			if ($fila['passwd'] == $_POST['passwd']){

				include_once "./Base/JWT/token.php";
				$token = MiToken::creaToken($_POST['name_user'],$_POST['passwd'] );

				$feedback['ok'] = true;
				$feedback['code'] = literal['LOGIN_OK'];
				$feedback['resource'] = $token;

			}
			else{
				$feedback['ok'] = false;
				$feedback['code'] = literal['USUARIO_PASS_KO'];
				$feedback['resource'] = array($_POST['name_user'],$_POST['passwd']);
			}
		}
		else{
			$feedback['ok'] = false;
			$feedback['code'] = literal['USUARIO_LOGIN_KO'];
			$feedback['resource'] = array($_POST['name_user'],$_POST['passwd']);
		}
		return $feedback;

	}

	function REGISTRAR(){
			include_once './app/user/user_SERVICE.php';
			$_POST['controlador'] = 'user';
			$_POST['action'] = 'ADD';
			$res['resource'] = '';
			$user = new user_SERVICE;
			$res = $user->ejecutar();

			if ($res['ok'] === true){ // no hay error insertando usuario
				$res = $user->cambiar_contrasena();
				if ($res['ok'] === true){ // no hay error cambiando la contraseña
					$res['code'] = literal['REGISTRAR_OK'];
					include_once "./Base/JWT/token.php";
					$token = MiToken::creaToken($_POST['name_user'],$_POST['passwd'] );
					$res['resource'] = $token;
				}
				else //error cambiando contraseña
				{
					$res['code'] = literal['CAMBIAR_contrasena_KO'];
				}
			}
			else{ //hay error insertando usuario
				$_POST['action'] = 'DELETE';
				$$user->ejecutar();
			}

		return $res;
	}

	function CAMBIAR_CONTRASENA(){
		
		include_once './app/user/user_SERVICE.php';
		$_POST['controlador'] = 'user';
		$user = new user_SERVICE;
		$res = $user->cambiar_contrasena();
		if ($res['ok'] === true){ // no hay error cambiando la contraseña
			$res['code'] = literal['CAMBIAR_contrasena_OK'];
		}
		else //error cambiando contraseña
		{
			$res['code'] = literal['CAMBIAR_contrasena_KO'];
		}
		return $res;
	
	}

	function VALIDAR_TOKEN(){
    try {
        include_once "./Base/JWT/token.php";
        $current_token = $this->cargarTokenCabecera();
        $resultado = MiToken::devuelveToken($current_token);
        $password = $resultado->data->id;
        $login = $resultado->data->name;
        include_once './app/user/user_SERVICE.php';
        $_POST['controlador'] = 'user';
        $usuario = new user_SERVICE;
        $res = $usuario->comprobar_usuario($login, $password);

        return $res;
    } catch (excepcionToken $e) {
        // En caso de excepción, devolver respuesta con okk = false y code = BAD_TOKEN
        return array('ok' => false, 'code' => 'BAD_TOKEN');
    }
}

}

?>