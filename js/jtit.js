
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

	}
}
