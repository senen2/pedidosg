
function dibujaTitulos(l)
{
	if (typeof l!='undefined' && l) {
		if (pagina in l)
			document.title = l[pagina];
		else
			document.title = "Gtienda";

		// encabezado
		$("#titquierovender").html(l.quierovender);
		$("#quierovender").attr("href", l.pagprecio);
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
		$("#titregresar").html(l.regresar);		

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
		$("#pagpedidos").html(l.pedidos);		
		$("#titxcotizar").html(l.xcotizar);		
		$("#titcotizaciones").html(l.cotizaciones);		
		$("#titxdespachar").html(l.xdespachar);		
		$("#titdespachados").html(l.despachados);		
		$("#titxrecibir").html(l.xrecibir);		
		$("#titrecibidos").html(l.recibidos);		
		$("#titagregarreferencia").html(l.agregarreferencia);		
		$("#titcrearpedidonuevo").html(l.crearpedidonuevo);		
		$("#titabrircatalogo").html(l.abrircatalogo);		
		$("#ref").attr("placeholder", l.referencia);		
		$("#tercero").attr("placeholder", l.empresa);		
		$("#notas").attr("placeholder", l.escribirnotas);		
		$("#titabrircatalogo").html(l.abrircatalogo);		
		$("#titpreciototal").html(l.preciototal);		
		$("#titproducto").html(l.producto);		
		$("#btnaceptar").html(l.aceptar);		
		$("#btncancelar").html(l.cancelar);		

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
		$("#titproveedor").html(l.proveedor);		
		$("#aceptar").attr("value", l.aceptar);		
		$("#cancelar").attr("value", l.cancelar);		
		$("#seleccionarimagen").attr("value", l.seleccionarimagen);		
		$("#titcambioimagen").html(l.cambioimagen);		

		// gracias.html
		$("#titgraciasporsupedido").html(l.graciasporsupedido);
		$("#titconfirmacionasucorreo").html(l.confirmacionasucorreo);

		// editorcuenta.html
		$("#pagmicuenta").html(l.micuenta);

		$("#titcambiodelogo").html(l.cambiodelogo);
		$("#botsubirimagen").attr("value", l.subirimagen);
		$("#botguardarcambiodelogo").attr("value", l.guardarcambiodelogo);

		$("#titcambiodeclave").html(l.cambiodeclave);
		$("#botguardarcambiodeclave").html(l.guardarcambiodeclave);
		$("#claveactual").attr("placeholder", l.claveactual);
		$("#clave1nuevo").attr("placeholder", l.clavenueva);
		$("#clave2nuevo").attr("placeholder", l.repetirnuevaclave);

		$("#titinformaciondecontacto").html(l.informaciondecontacto);
		$("#botguardarinformaciondecontacto").html(l.guardar);
		$("#direccion").attr("placeholder", l.direccion);
		$("#telefono").attr("placeholder", l.telefono);

		$("#titformadepagoyenvio").html(l.formadepagoyenvio);
		$("#botguardarformadepagoyenvio").html(l.guardar);
		$("#formapago").attr("placeholder", l.notaformadepagoyenvio);

		// tcat.html secciones
		$("#pagsecciones").html(l.secciones);
		$("#titeditarseccion").html(l.editarseccion);
		$("#titnombre").html(l.nombre);
		$("#tittitulo").html(l.titulo);
		$("#tittags").html(l.tags);
		$("#botmodificar").html(l.modificar);
		$("#botagregar").html(l.agregar);

		// tasoc.html
		$("#pagasociados").html(l.asociados);
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
		$("#titsubeprod5").html(l.subeprod5);

		// tsubeprod.html
        $("#pagpapelera").html(l.papelera);
		//$("#titactivarproductos").html(l.activarproductos);
        
        // registro.html
        $("#titaccesoamiembros").html(l.accesoamiembros);
        $("#titiniciasesion").html(l.iniciasesion);
        $("#titiniciarsesion").html(l.iniciarsesion);
        $("#titcreacuenta").html(l.creacuenta);
        $("#titregistrarse").html(l.registrarse);
        $("#titproblemacreandocuenta").html(l.problemacreandocuenta);
        
        $("#emaillogin").attr("placeholder", l.email);
        $("#passwdlogin").attr("placeholder", l.clave);
        $("#nombrenuevo").attr("placeholder", l.nombre);
        $("#empresanuevo").attr("placeholder", l.nombretienda);

		// index.html
		$("#titprueba").html(l.prueba);
		$("#pagprecio").attr("href", l.pagprecio);
		$("#pagfunciona").attr("href", l.pagfunciona);
		$("#titcomofunciona").html(l.comofunciona);
		$("#titplanesyprecios").html(l.planesyprecios);
		$("#titsincomisiones1").html(l.sincomisiones1);
		$("#titsincomisiones2").html(l.sincomisiones2);
		$("#titsincomisiones3").html(l.sincomisiones3);
		$("#titmejoresprecios1").html(l.mejoresprecios1);
		$("#titmejoresprecios2").html(l.mejoresprecios2);
		$("#titmejoresprecios3").html(l.mejoresprecios3);

		$("#titfacilmanejo").html(l.facilmanejo);
		$("#titllenadatos").html(l.llenadatos);
		$("#tittomafotos").html(l.tomafotos);
		$("#titcomienzavender").html(l.comienzavender);
		$("#titprocesapedidos").html(l.procesapedidos);

		$("#titcontrolaventas1").html(l.controlaventas1);
		$("#titcontrolaventas2").html(l.controlaventas2);
		$("#titaumentaganacias1").html(l.aumentaganacias1);
		$("#titaumentaganacias2").html(l.aumentaganacias2);
        
        // Menu
        $("#titmanejesutienda").html(l.manejesutienda);
        $("#titcatalogo").html(l.catalogo);
        $("#titpedidos").html(l.pedidos);
        $("#titasociados").html(l.asociados);
        $("#titsecciones").html(l.secciones);
        $("#titmicuenta").html(l.micuenta);
        $("#tittareas").html(l.tareas);
        $("#titequipos").html(l.equipos);
        $("#titpapelera").html(l.papelera);
        
        // Tareas
        $("#pagtareas").html(l.asignaciontareas);
        
        // Menu
        $("#pagequipos").html(l.programacionequipos);

	}
}

function dibujaTituloPag()
{
	var titulo = "GTienda";
	switch (pagina) {
		case "Indexp":
			titulo = "GTienda es tu tienda | Ventas por internet | Mi sitio en internet";
	}
	document.title = titulo;
}
