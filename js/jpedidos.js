/**
 * @author gtienda
 */

function inicioPedidos()
{
	encabezado = getCookie("encabezado");
	if (encabezado==null || encabezado=="'','',''" || encabezado.split(',')[0]=="''") {
		document.cookie = "pagpend=" + document.URL;			
		window.location.assign("registro.html");		
	}
		
	pagina = "pdpedidos";
	ayuda = "http://gtienda.com/wiki/mediawiki-1.23.5/index.php?title=Implementacion&section=#Subir_imagenes_de_los_productos";
	leeServidor();
	gIDpedido=0;
	gurl="";
	refrescar("xdespachar");
}

function refrescar(modo)
{
	gmodo = modo;
	LeePedidosP(modo, dibujaPedidos);
	$("#tab-xcotizar").removeClass("active");
	$("#tab-cotizaciones").removeClass("active");
	$("#tab-despachados").removeClass("active");
	$("#tab-xdespachar").removeClass("active");
	$("#tab-recibidos").removeClass("active");
	$("#tab-xrecibir").removeClass("active");
	$("#tab-" + modo).addClass("active");
	$("#notas").val('');
	if (modo=="xcotizar")
		$("#enviaremail").show();
	else
		$("#enviaremail").hide();
}

function dibujaPedidos(datos)
{
	gdatos = datos;
	entregado = false;
	eliminando = false;
	$("#productos").html("");
	$("#usuario").html(datos.cuenta.empresa + " / " + datos.cuenta.usuario);
	dibujaLogin(datos.cuenta);
	$('#pedidos').html( cadTabla(datos, "pedidos", "leePedido"));
	llenaTercero();
	dibujaTitulos(gdatos.cuenta.lenguaje);
	ajustaTabla("pedidos");
	if (gdatos.datos.length>0)
		leePedido(gdatos.datos[0].ID);
}

function leePedido(IDpedido)
{
	if (!eliminando) {
		gIDpedido = IDpedido;
		if (!entregado){
			seleccionaRenglon(gdatos, "pedidos", IDpedido);
			LeePedidoDetP(IDpedido, gmodo, dibujaPedido);		
		}
		entregado = false;		
	}
}

function dibujaPedido(datos)
{
	gdatosped=datos;
	//$("#productos").html(datos.cuadro);
	dibujaProductos();
	$("#notas").val(datos.notas);
	$("#titref").removeClass("DN");
	actualizaTotal(datos);
	//dibujaCuadro(datos, "productos", 300, 200);	
}

function dibujaProductos()
{
	var cad="", entrega;
	var pedido = buscaObjetoxID(gdatos.datos, gIDpedido);
	$.each(gdatosped.datos, function(i,item) {
		entrega = '';
		if (pedido.aprobado)
			entrega = '<div>' 
			 		+ '<label class="item-price col">' + gdatos.cuenta.lenguaje.despachado + '</label>'
			 		+ '<input class="col" id="entregado-' + item.ID 
			 			+ '" type="checkbox" onclick="actualizaRenglonDespacho(' + item.ID + ');"' 
			 			+ (item.entregado ? ' checked' : '') + '>'
		 		+ '</div>';
		 		
		 cad += '<div class="col item" style="height: 320px;">'
			 		+ '<a href="#" onclick="editaVariedad(' + item.ID + ')">'
			 			+ '<img src="' + item.imagen + '">' 
			 		+ '</a>'
			 		+ '<label class="item-name">' + item.producto+ '</label>'
			 		+ '<label class="item-ref">Ref ' + item.referencia + '</label>'
			 		+ '<label class="item-name">' + item.cantidad + ' x $' + item.precio + ' = $' + item.valor + '</label>' 
			 		+ '<label class="item-ref">' + gdatos.cuenta.lenguaje.producto + ' $' + item.precioprod + '</label>' 
			 		+ dibujaProduccion(item.ID)
			 		+ '<label><a href="#" onclick="eliminaVariedad(' + item.ID + ');">' + gdatos.cuenta.lenguaje.quitar + '</a></label>'
			 		+ entrega
	 		    + '</div>';	
	});
	$("#productos").html(cad);
}

function dibujaProduccion(IDdetped)
{
	var cad="";
	if (gdatosped.produccion) {
		$.each(gdatosped.produccion.procesos, function(i,item) {
			if (item.IDdetped==IDdetped & item.activo=="1" & item.opcional==1)
				cad += '<label class="item-ref">' + item.nombre + ' $' + item.precio + '</label>';
		});		
	}
	return cad;
}

function actualizaDespacho(ID)
{
	EntregaDespachoP(ID);
	$("#pedidos-" + ID).hide();
	$("#productos").html("");
	entregado = true;
}

function actualizaRenglonDespacho(ID)
{
	var entregado=0;
	$.each(gdatosped.datos, function(i,item) {
		if (item.ID==ID) {
			if (item.entregado>0)
				entregado=0;
			else
				entregado=item.cantidad;
		}
	});
	ActualizaDespachoLineaP(ID, entregado, "");
	$("#productos-" + ID).hide();
}

function aprobar(ID)
{
	AprobarPedidoP(ID, $("#aprobado-" + ID).prop("checked") ? 1 : 0);
	$("#pedidos-" + ID).hide();
	$("#productos").html("");
}

function llenaTercero()
{
	if (gmodo=="xdespachar" | gmodo=="despachados" | gmodo=="xcotizar" | gmodo=="cotizaciones") {
	    $("#tercero").autocomplete({
	      source: extraeNombre(gdatos.clientes, "empresa")
	    });
		$("#tercero").attr("placeholder", gdatos.cuenta.lenguaje.cliente);
	}
	else {
	    $("#tercero").autocomplete({
	      source: extraeNombre(gdatos.proveedores, "empresa")
	    });
		$("#tercero").attr("placeholder", "proveedor");	
	} 	
}

function actualizaTotal(datos)
{
	var cab, s=0, c=0;
	$.each(gdatos.datos, function(i,item) {
		if (item.ID==datos.IDpedido)
			cab = item;
	});
	$.each(datos.datos, function(i,item) {
		s += parseFloat(item.cantidad.replace(/\,/g,''))*parseFloat(item.precio.replace(/\,/g,''));
		c += parseFloat(item.cantidad.replace(/\,/g,''));
	});
	cab.valor = s.formatMoney(gdatos.cuenta.decimales);
	cab.cantidad = c.formatMoney(gdatos.cuenta.decimales);
	$("#pedidos-" + datos.IDpedido).html(dibujaRenglon(cab, gdatos.titulos));
}

// ----------------------------- edicion

function agregarPedido()
{
	if ($("#tercero").val()) {
		var cliente, email="";
		$.each(gdatos.clientes, function(i,item) {
			if (item.empresa==$("#tercero").val())
				cliente = item;
		});
		//if (!cliente)
			//email = prompt("ingrese email del cliente");
	
		AgregarPedidoCabP(gdatos.cuenta.ID, $("#tercero").val(), email, gmodo, dibujaPedidos);
		$("#tercero").val("");
	}
}

function verVariedad(url)
{
	gurl = url.replace("imgprod","imgcat");
	var a = url.split("/");
	var b = a[a.length-1];
	var IDproductobase = b.split(".")[0];
	gdatoseditar = null; // no es una edicion
	LeeVariedadesxBaseP(IDproductobase, seleccionarVariedad);
}

function editaVariedad(IDdetped)
{
	gdatoseditar = null;
	gIDdetped=IDdetped;
	$.each(gdatosped.datos, function(i,item) {
		if (item.ID==IDdetped) {
			gdatoseditar = item;
			return;
		}
	});
	LeeVariedadesxBaseP(gdatoseditar.IDproductobase, seleccionarVariedad);	
}

function seleccionarVariedad(datos)
{
	if (datos) {
		gdatosvar = datos;
		if (gurl=="") 
			gurl = datos.producto.imagen.replace("imgprod","imgcat");
		mostrarVariedad();
		gurl="";
		tapar(); // pasa el control a aceptar() o cancelar()
	}
}

function mostrarVariedad()
{
    $('#selVariedad').css({'top':50,'left':$(window).width()/2-250});
	$("#selVariedad").removeClass("DN");

	$("#imagen").attr("src", gurl);

	cad = "";
	if (gdatosvar.tallas.length>0) {
		$.each(gdatosvar.tallas, function(i,item) {
			cad = cad + '<option value="' + item.talla +'">' + item.talla + '</option>';
		});
		$("#talla").html(cad);
		$("#divTalla").show();
		llenaColoresxTalla();
	}	
	else {
		$("#divTalla").hide();
		if (gdatosvar.colores.length>0) {
			$.each(gdatosvar.colores, function(i,item) {
				cad = cad + '<option value="' + item.color+'">' + item.color + '</option>';
			});
			$("#color").html(cad);
			$("#divColor").show();
		}	
		else
			$("#divColor").hide();

	}	

	if (gdatoseditar) {
		$("#precio").html(gdatoseditar.precio.replace(/\,/g,""));
		$("#precioprod").val(gdatoseditar.precioprod.replace(/\,/g,""));
		$("#cantidad").val(gdatoseditar.cantidad.replace(/\,/g,""));
		$("#talla").val(gdatoseditar.talla);
		$("#color").val(gdatoseditar.color);
	}
	else {
		$("#precio").html(gdatosvar.producto.precio);
		$("#precioprod").val(gdatosvar.producto.precio);
		$("#cantidad").val(1);
	}
	$("#procesos").html(dibujaEditarProduccion());
	totalizaEditor();
}

function dibujaEditarProduccion()
{
	var cad="";
	if (gdatoseditar) {
		if (gdatosped.produccion)
			$.each(gdatosped.produccion.procesos, function(i,item) {
				if (item.IDdetped==gIDdetped & item.opcional==1)
				 	cad	+= cadRenglonProduccion(item); 
			});	
	}
	else { 
		if (gdatosvar.produccion)
		{
			$.each(gdatosvar.produccion.procesos, function(i,item) {
				if (item.opcional==1) {
				 	cad	+= cadRenglonProduccion(item); 
				}
			});				
		}				
	}
	return cad;
}

function totalizaEditor()
{
	var precio = parseFloat($("#precioprod").val());
	if (gdatoseditar) {
		if (gdatosped.produccion)
			$.each(gdatosped.produccion.procesos, function(i,item) {
				if (item.IDdetped==gIDdetped) {
					if (item.opcional==1 & $("#proceso-"+item.ID).prop("checked")) {
						precio += parseFloat($("#precioproceso-"+item.ID).val());						
					}
				}
			});
	}
	else {
		if (gdatosvar.produccion)
			$.each(gdatosvar.produccion.procesos, function(i,item) {
				if (item.opcional==1 & $("#proceso-"+item.ID).prop("checked")) {
					precio += parseFloat($("#precioproceso-"+item.ID).val());					
				}
			});
	}		
	$("#precio").html((precio*parseFloat($("#cantidad").val())).formatMoney(gdatos.cuenta.decimales));	
}

function cadRenglonProduccion(item)
{
 	return '<div class="fila" style="min-width: 300px;">'
 			+ '<div class="col">' 
		 		+ '<input class="col" id="proceso-' + item.ID + '" type="checkbox" ' + (item.activo=='1' ? ' checked':'') + ' onchange="totalizaEditor()" />' 
		 		+ '<label class="item-name col">' + item.nombre + '&nbsp;$&nbsp;</label>'
	 		+ '</div>'
 			+ '<input id="precioproceso-' + item.ID  + '" class="item-name col" style="width:70px" value="' + item.precio  + '" onchange="totalizaEditor()"/>' 
 		+ '</div>';
}
/*
function cadRenglonProduccion1(item)
{
 	return '<div class="fila" style="min-width: 300px;">'
 			+ '<div class="auto-width col">' 
		 		+ '<input class="col" id="proceso-' + item.ID + '" type="checkbox" ' + (item.activo=='1' ? ' checked':'') + '>' 
		 		+ '<label class="item-name col">' + item.nombre + '&nbsp;$&nbsp;</label>'
	 		+ '</div>'
 			+ '<input id="precioproceso-' + item.ID  + '" class="item-name col auto-width" style="width:70px" value="' + item.precio  + '"/>' 
 		+ '</div>';
}
*/
function llenaColoresxTalla()
{
	var colores, cad="";
	var talla = $("#talla").val();
	$.each(gdatosvar.tallas, function(i,item) {
		if (item.talla==talla) {
			colores = item.colores;
		}
	} );

	if (colores.length>0) {
		$.each(colores, function(i,item) {
			cad = cad + '<option value="' + item.color+'">' + item.color + '</option>';
		});
		$("#color").html(cad);
		$("#divColor").show();
	}	
	else
		$("#divColor").hide();
}

function agregarxReferencia()
{
	gdatoseditar = null;
	gurl = "";
	LeeVariedadesxReferenciaP($("#ref").val(), seleccionarVariedad);
}

function grabaObs()
{
	GrabaNotasPedidoP(gIDpedido, $("#notas").val());
}

function eliminaVariedad(IDdetped)
{
	if (confirm('Seguro de quitar este producto?'))
		EliminaVariedadPedidoP(IDdetped, gmodo, dibujaPedido);
}

function eliminaPedido(IDpedido)
{
	if (confirm("Seguro de eliminar este pedido?")) {	
		eliminando = true;
		CancelarPedidoP(IDpedido, gmodo, dibujaPedidos);		
	}
}

// ------------------ ventana emergente

function agregar()
{
	modo = "agregar";
	$("#tituloAgregar").html("Agregar Avance");
	$("#cantidad").val("1");
	tapar();
    $('#selVariedad').css({'top':$(window).height()/2-250,'left':$(window).width()/2-250});
	$("#selVariedad").removeClass("DN");
}

function aceptar()
{
	var precio = parseFloat($("#precioprod").val());
	var procesos = [];
	if (gdatoseditar) {
		if (gdatosped.produccion)
			$.each(gdatosped.produccion.procesos, function(i,item) {
				if (item.IDdetped==gIDdetped) {
					p = {};
					p.ID = item.ID;
					if (item.opcional==1) {
						p.activo = $("#proceso-"+item.ID).prop("checked") ? 1 : 0;
						p.precio = parseFloat($("#precioproceso-"+item.ID).val());						
					}
					else {
						p.activo=1;
						p.precio=0;						
					}
					p.opcional = item.opcional;
					procesos.push(p);
					if (p.activo)
						precio += p.precio;
				}
			});
		ModificaRenglonPedidoP(gIDpedido, gdatoseditar.ID, $("#cantidad").val(), precio, $("#precioprod").val()
							, $("#talla").val(), $("#color").val(), gmodo, procesos, dibujaPedido);			
	}
	else {
		if (gdatosvar.produccion)
			$.each(gdatosvar.produccion.procesos, function(i,item) {
				p = {};
				p.ID = item.ID;
				if (item.opcional==1) {
					p.activo = $("#proceso-"+item.ID).prop("checked") ? 1 : 0;
					p.precio = parseFloat($("#precioproceso-"+item.ID).val());					
				}
				else {
					p.activo=1;
					p.precio=0;
				}
				p.opcional = item.opcional;
				procesos.push(p);
				if (p.activo)						
					precio += p.precio;
			});

		if (gdatosvar.variedades.length==1)
			AgregaAlPedidoP(gIDpedido, gdatosvar.variedades[0].ID, $("#cantidad").val(), precio
				, $("#precioprod").val(), gmodo, procesos, dibujaPedido);
		else 
			$.each(gdatosvar.variedades, function(i,item) {
				if (item.talla==$("#talla").val() & item.color==$("#color").val())
					AgregaAlPedidoP(gIDpedido, item.ID, $("#cantidad").val(), precio
						, $("#precioprod").val(), gmodo, procesos, dibujaPedido);	  
			});		
	}		
	cancelar();
}

function cancelar()
{
	$("#selVariedad").addClass("DN");
    $('#mask').fadeOut(100);    
    $('#mask').fadeTo("slow",0);
}

function tapar()
{
    $('#mask').css({'width':$(window).width(),'height':$(document).height()});
    $('#mask').fadeIn(100);    
    $('#mask').fadeTo("slow",0.7);
}

function enviarEmail()
{
	EnviarEmailPedidoP(gIDpedido, EmailEnviado);
}

function EmailEnviado()
{
	alert("El Email ha sido enviado");
	LeePedidosP(gmodo, dibujaPedidos);
} 
