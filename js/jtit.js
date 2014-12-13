
function dibujaTitulos(l)
{
	if (typeof l!='undefined' && l) {
		$("#titquierovender").html(l.quierovender);
		$("#titregistro").html(l.registro);
		$("#titlogin").html(l.login);
		$("#titlogout").html(l.logout);
		$("#titayuda").html(l.ayuda);			
		$("#buscar").attr("placeholder",l.busquedarapida);			
		$("#titbuscar").html(l.buscar);			

		$("#titfiltros").html(l.filtrarpor);
		$("[name='ver']").html(l.ver);
	
		$("#titagregaralcarro").html(l.agregaralcarro);
		$("#titcontinuarcomprando").html(l.continuarcomprando);
		$("#titprecio").html(l.precio);
		$("#titpreciomayor").html(l.preciomayor);
		$("#titdescripcion").html(l.descripcion);
		$("#titcantidad").html(l.cantidad);
		$("#tittamano").html(l.tamano);
		$("#titcolor").html(l.color);		

		$("#titrealizarpedido").html(l.realizarpedido);		
		$("#tittotaldelpedido").html(l.totaldelpedido);		
		$("#autenticarseparapedido").html(l.autenticarseparapedido);		

		$("#titcontactanos").html(l.contactanos);		
		$("#titfaltaxllenar").html(l.faltaxllenar);		
		$("#titenviar").html(l.enviar);		
		$("#nombre").attr("placeholder", l.nombre);		
		$("#mensajecontacto").attr("placeholder", l.mensajecontacto);		

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


	}
}
