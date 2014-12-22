
function dibujaTitulos(l)
{
	if (typeof l!='undefined' && l) {
		// encabezado
		$("#titquierovender").html(l.quierovender);
		$("#titregistro").html(l.registro);
		$("#titlogin").html(l.login);
		$("#titlogout").html(l.logout);
		$("#titayuda").html(l.ayuda);			
		$("#buscar").attr("placeholder",l.busquedarapida);			
		$("#titbuscar").html(l.buscar);			

		// catalogo.html
		$("#titfiltros").html(l.filtrarpor);
		$("[name='ver']").html(l.ver);
	
		// producto.html
		$("#titagregaralcarro").html(l.agregaralcarro);
		$("#titcontinuarcomprando").html(l.continuarcomprando);
		$("#titprecio").html(l.precio);
		$("#titpvm").html(l.preciomayor);
		$("#titdescripcion").html(l.descripcion);
		$("#titcantidad").html(l.cantidad);
		$("#tittamano").html(l.tamano);
		$("#titcolor").html(l.color);		

		// carro.html
		$("#titrealizarpedido").html(l.realizarpedido);		
		$("#tittotaldelpedido").html(l.totaldelpedido);		
		$("#autenticarseparapedido").html(l.autenticarseparapedido);		

		// contacto.html
		$("#titcontactanos").html(l.contactanos);		
		$("#titfaltaxllenar").html(l.faltaxllenar);		
		$("#titenviar").html(l.enviar);		
		$("#nombre").attr("placeholder", l.nombre);		
		$("#mensajecontacto").attr("placeholder", l.mensajecontacto);		

		// pedidos.html
		$("#titpedidos").html(l.pedidos);		
		$("#titxdespachar").html(l.xdespachar);		
		$("#titdespachados").html(l.despachados);		
		$("#titxrecibir").html(l.xrecibir);		
		$("#titrecibidos").html(l.recibidos);		
		$("#titagregarreferencia").html(l.agregarreferencia);		
		$("#titcrearpedidonuevo").html(l.crearpedidonuevo);		
		$("#titabrircatalogo").html(l.abrircatalogo);		
		$("#ref").attr("placeholder", l.referencia);		
		$("#tercero").attr("placeholder", l.cliente);		

		// editorproducto.html
		$("#titeditordeproductos").html(l.editordeproductos);
		$("#titnombre").html(l.nombre);
		$("#titreferencia").html(l.referencia);
		$("#titbarcode").html(l.barcode);
		$("#tittamanos").html(l.tamanos);
		$("#titcolores").html(l.colores);		
		$("#titabrircatalogo").html(l.abrircatalogo);		
		$("#titfinalizar").html(l.finalizar);		
		$("#titcambiarimagen").html(l.cambiarimagen);		
		$("#aceptar").attr("value", l.aceptar);		
		$("#cancelar").attr("value", l.cancelar);		
		$("#seleccionarimagen").attr("value", l.seleccionarimagen);		

		// gracias.html
		$("#titgraciasporsupedido").html(l.graciasporsupedido);
		$("#titconfirmacionasucorreo").html(l.confirmacionasucorreo);

		// editorcuenta.html
		$("#titsucuenta").html(l.sucuenta);

		$("#titcambiodelogo").html(l.cambiodelogo);
		$("#botsubirimagen").attr("value", l.subirimagen);
		$("#botguardarcambiodelogo").attr("value", l.guardarcambiodelogo);

		$("#titcambiodeclave").html(l.cambiodeclave);
		$("#botguardarcambiodeclave").html(l.guardarcambiodeclave);
		$("#claveactual").attr("placeholder", l.claveactual);
		$("#clave1nuevo").attr("placeholder", l.clavenueva);
		$("#clave2nuevo").attr("placeholder", l.repetirnuevaclave);

		$("#titinformaciodencontacto").html(l.informaciondecontacto);
		$("#botguardarinformaciondecontacto").html(l.guardar);
		$("#direccion").attr("placeholder", l.direccion);
		$("#telefono").attr("placeholder", l.telefono);

		$("#titformadepagoyenvio").html(l.formadepagoyenvio);
		$("#botguardarformadepagoyenvio").html(l.guardar);
		$("#formapago").attr("placeholder", l.notaformadepagoyenvio);

		// tcat.html secciones
		$("#titsecciones").html(l.secciones);
		$("#titeditarseccion").html(l.editarseccion);
		$("#titnombre").html(l.nombre);
		$("#tittitulo").html(l.titulo);
		$("#tittags").html(l.tags);
		$("#botmodificar").html(l.modificar);
		$("#botagregar").html(l.agregar);

		// tasoc.html
		$("#titasociados").html(l.asociados);
		$("#titclientes").html(l.clientes);
		$("#titproveedores").html(l.proveedores);
		$("#titdistribuidores").html(l.distribuidores);
		$("#titvendedores").html(l.vendedores);
		$("#botmodificar").html(l.modificar);
		$("#botagregar").html(l.agregar);

		// tsubeprod.html
		$("#titagregarproductos").html(l.agregarproductos);
		$("#titsubeprod1").html(l.subeprod1);
		$("#titsubeprod2").html(l.subeprod2);
		$("#titsubeprod3").html(l.subeprod3);
		$("#titsubeprod4").html(l.subeprod4);

		// tsubeprod.html
		$("#titactivarproductos").html(l.activarproductos);
        
        // registro.html
        $("#titiniciasesion").html(l.iniciasesion);
        $("#titiniciarsesion").html(l.iniciarsesion);
        $("#titcreacuenta").html(l.creacuenta);
        $("#titregistrarse").html(l.registrarse);
        $("#titproblemacreandocuenta").html(l.problemacreandocuenta);
        
        $("#emaillogin").attr("placeholder", l.email);
        $("#passwdlogin").attr("placeholder", l.clave);
        $("#nombrenuevo").attr("placeholder", l.nombre);
        $("#empresanuevo").attr("placeholder", l.nombretienda);

	}
}
