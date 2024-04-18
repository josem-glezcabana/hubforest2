let test= {
		0:{
			valores : {'controlador':'AUTH','action':'LOGIN','usuario':'ejemplo','contrasena':'ejemplo'},
			condicion : {'valor':'LOGIN_OK'}
		},
		1:{
			valores : {'controlador':'AUTH','action':'LOGIN','usuario':'ejemplo','contrasena':'ejemplo1'},
			condicion : {'valor':'USUARIO_PASS_KO'}
		},
		2:{
			valores : {'controlador':'AUTH','action':'LOGIN','usuario':'ejemplo1','contrasena':'ejemplo'},
			condicion : {'valor':'USUARIO_LOGIN_KO'}
		},
		3:{
			valores : {'controlador':'rol','action':'ADD','nombre_rol':'ejemplo1','descrip_rol':'ejemplo1rol'},
			condicion : {'valor':'SQL_OK'}
		},
		4:{
			valores : {'controlador':'rol','action':'SEARCH'},
			condicion : {'valor':'RECORDSET_DATOS'}
		},
		5:{
			valores : {'controlador':'rol','action':'SEARCH','nombre_rol':'pepe'},
			condicion : {'valor':'RECORDSET_VACIO'}
		}
	}