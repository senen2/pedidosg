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
	$("#tap-despachados").removeClass("active");
	$("#tap-xdespachar").removeClass("active");
	$("#tap-recibidos").removeClass("active");
	$("#tap-xrecibir").removeClass("active");
	$("#tap-" + modo).addClass("active");
}

function dibujaPedidos(datos)
{
	gdatos = datos;
	entregado = false;
	eliminando = false;
	$("#productos").html("");
	$("#usuario").html(datos.cuenta.empresa + " / " + datos.cuenta.usuario);
	dibujaLogin(datos.cuenta);
	dibujaTabla(datos, "pedidos", "pedidos", "leePedido");
	llenaTercero();
	dibujaTitulos(gdatos.cuenta.lenguaje);
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
	gdatosdet=datos;
	$("#productos").html(datos.cuadro);
	$("#notas").val(datos.notas);
	$("#titref").removeClass("DN");
	actualizaTotal(datos);
	//dibujaCuadro(datos, "productos", 300, 200);	
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
	$.each(gdatosdet.datos, function(i,item) {
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

function llenaTercero()
{
	if (gmodo=="xdespachar" | "despachados") {
	    $("#tercero").autocomplete({
	      source: extraeNombre(gdatos.clientes, "nombre")
	    });
		$("#tercero").attr("placeholder", gdatos.cuenta.lenguaje.cliente)
	}
	else {
	    $("#tercero").autocomplete({
	      source: extraeNombre(gdatos.proveedores, "empresa")
	    });
		$("#tercero").attr("placeholder", "proveedor")		
	} 	
}

function actualizaTotal(datos)
{
	var cab, s=0;
	$.each(gdatos.datos, function(i,item) {
		if (item.ID==datos.IDpedido)
			cab = item;
	});
	$.each(datos.datos, function(i,item) {
		s += item.cantidad*item.precio.replace(",","");
	});
	cab.valor = s.formatMoney(gdatos.cuenta.decimales);
	$("#pedidos-" + datos.IDpedido).html(dibujaRenglon(cab, gdatos.titulos));
}

// ----------------------------- edicion

function agregarPedido()
{
	if ($("#tercero").val()) {
		AgregarPedidoCabP(gdatos.cuenta.ID, $("#tercero").val(), gmodo, dibujaPedidos);
		$("#tercero").val("");
	}
}

function verVariedad(url)
{
	//http://localhost/gtienda/imgcat/860.jpg?1416678724.921
	gurl = url.replace("imgprod","imgcat");
	var a = url.split("/");
	var b = a[a.length-1];
	var IDproductobase = b.split(".")[0]
	gdatoseditar = null;
	LeeVariedadesxBaseP(IDproductobase, seleccionarVariedad)
}

function editaVariedad(IDpeddet)
{
	gdatoseditar = null;
	$.each(gdatosdet.datos, function(i,item) {
		if (item.ID==IDpeddet) {
			gdatoseditar = item
			return;
		}
	});
	LeeVariedadesxBaseP(gdatoseditar.IDproductobase, seleccionarVariedad)	
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
    $('#selVariedad').css({'top':$(window).height()/2-250,'left':$(window).width()/2-250});
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
		$("#precio").val(gdatoseditar.precio.replace(",",""));
		$("#cantidad").val(gdatoseditar.cantidad);
		$("#talla").val(gdatoseditar.talla);
		$("#color").val(gdatoseditar.color);
	}
	else {
		$("#precio").val(gdatosvar.producto.precio);
		$("#cantidad").val(1);
	}

}

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
	if (gdatoseditar)
		ModificaRenglonPedidoP(gIDpedido, gdatoseditar.ID, $("#cantidad").val(), $("#precio").val(), $("#talla").val(), $("#color").val(), gmodo, dibujaPedido);	
	else
		if (gdatosvar.variedades.length==1)
			AgregaAlPedidoP(gIDpedido, gdatosvar.variedades[0].ID, $("#cantidad").val(), $("#precio").val(), gmodo, dibujaPedido);
		else 
			$.each(gdatosvar.variedades, function(i,item) {
				if (item.talla==$("#talla").val() & item.color==$("#color").val())
					AgregaAlPedidoP(gIDpedido, item.ID, $("#cantidad").val(), $("#precio").val(), gmodo, dibujaPedido);	  
			});

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
