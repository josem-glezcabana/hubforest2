const AUTH_datostest= {
		0:{
			valores : {
				'controlador' : 'AUTH', 'action' : 'REGISTRAR', 
				'dni': '99', 
				'nombre_persona': 'Nombre9', 
				'apellidos_persona': 'Apellidos9',
				'fechaNacimiento_persona': '09/09/9999', 
				'direccion_persona': 'Direccion9',
				'telefono_persona': '999999999',
				'email_persona': '99@99.99',
				'foto_persona': 'Foto9.png',
				'usuario':'usuario99',
				'contrasena':'contrasena99'},
			condicion : {'valor' : 'REGISTRAR_OK'}
		},
		1:{
			valores : {
				'controlador' : 'AUTH', 'action' : 'REGISTRAR', 
				'dni': '99', 
				'nombre_persona': 'Nombre9', 
				'apellidos_persona': 'Apellidos9',
				'fechaNacimiento_persona': '09/09/9999', 
				'direccion_persona': 'Direccion9',
				'telefono_persona': '999999999',
				'email_persona': '99@99.99',
				'foto_persona': 'Foto9.png',
				'usuario':'usuario99',
				'contrasena':'contrasena99'},
			condicion : {'valor' : 'dni_EXISTE_en_persona_KO'}
		},
		2:{
			valores : {
				'controlador' : 'AUTH', 'action' : 'REGISTRAR', 
				'dni': '999', 
				'nombre_persona': 'Nombre9', 
				'apellidos_persona': 'Apellidos9',
				'fechaNacimiento_persona': '09/09/9999', 
				'direccion_persona': 'Direccion9',
				'telefono_persona': '999999999',
				'email_persona': '99@99.99',
				'foto_persona': 'Foto9.png',
				'usuario':'usuario99',
				'contrasena':'contrasena99'},
			condicion : {'valor' : 'email_EXISTE_en_persona_KO'}
		},
		3:{
			valores : {
				'controlador' : 'AUTH', 'action' : 'REGISTRAR', 
				'dni': '999', 
				'nombre_persona': 'Nombre9', 
				'apellidos_persona': 'Apellidos9',
				'fechaNacimiento_persona': '09/09/9999', 
				'direccion_persona': 'Direccion9',
				'telefono_persona': '999999999',
				'email_persona': '999@99.99',
				'foto_persona': 'Foto9.png',
				'usuario':'usuario99',
				'contrasena':'contrasena99'},
			condicion : {'valor' : 'usuario_EXISTE_EN_usuario_KO'}
		},
		4:{
			valores : {'controlador':'AUTH','action':'LOGIN','usuario':'usuario99','contrasena':'contrasena99'},
			condicion : {'valor':'LOGIN_OK'}
		},
		5:{
			valores : {'controlador':'AUTH','action':'LOGIN','usuario':'usuario99','contrasena':'ejemplo1'},
			condicion : {'valor':'USUARIO_PASS_KO'}
		},
		6:{
			valores : {'controlador':'AUTH','action':'LOGIN','usuario':'ejemplo1','contrasena':'ejemplo'},
			condicion : {'valor':'USUARIO_LOGIN_KO'}
		}

	}