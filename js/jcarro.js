/**
 * @author botpi
 */

function inicioCarro()
{
	encabezado = getCookie("encabezado");
	IDcuentaCat = getCookie("IDcuentaCat");
	pagina = "pdcarro";
	leeServidor();
	nota = getCookie("nota");
	if (nota && nota!="''")
		$("#notas").val(nota);
			
	if (IDcuentaCat==null)
		window.location.assign("registro.html")
	else
		LeerCarroP(IDcuentaCat, dibujaCarro)
}

function dibujaCarro(datos)
{
	gdatos = datos;
	if (datos.carro.length) {
		dibujaTitulos(datos.cuenta.lenguaje);
		modo=0;
		var l = gdatos.cuenta.lenguaje;
		var cad = "", precio = "", prop = "", tagprecio="";

		$.each(datos.carro, function(i,item) {
			precio = item.precio.formatMoney(gdatos.cuenta.decimales);
			valor = (item.precio*item.cantidad).formatMoney(gdatos.cuenta.decimales);
			
			tagprecio = '<label class="item-price">$' + precio + '</label><br>'
			if (modo==1)
				tagprecio = '<label class="item-price">$ </label><input class="item-price" id="precio-' + item.ID + '" value="' + item.precio + '"/><br><br>'
							
			prop=""
			if (item.talla!="")
				prop = prop + '<label class="item-ref">Talla: ' + item.talla + '</label>'
			
			if (item.color!="") {
				if (prop != "")
					prop = prop + ', ';
				prop = prop + '<label class="item-ref">Color: ' + item.color+ '</label>'				
			}

			cad = cad + '<div class="hor-item">'
					  		+ '<a href="producto.html?ID='+ item.IDproducto + '">'
					  			+ '<img src="' + item.imagen + '" height="70" class="col" />'
					  		+ '</a>'
					  		+ '<div class="col" style="width:30px">&nbsp;</div>'
				  			+ '<div class="col" style="width:100px">'
						  		+ '<label class="item-name">' + item.nombre + '</label><br>'
						  		+ '<label class="item-ref">' + item.referencia + '</label><br>'
						  		+ prop + '<br>'
					  		+ '</div>'
					  		+ '<div class="col" style="width:30px">&nbsp;</div>'
					  		+ '<div class="col">'
						  		+ tagprecio
					  		+ '</div>'
					  		+ '<div class="col" style="width:30px">&nbsp;</div>'
					  		+ '<div class="col">'
					  	  		+ '<label class="item-price">' + l.cantidad + ': </label>'
					  	  		+ '<input class="item-price" id="cantidad'+ item.ID + '" value="' + item.cantidad + '"/><br><br>'
					  		+ '</div>'
					  		+ '<div class="col" style="padding-left:10px">'
					  	  		+ '<a class="btn" href="#" onclick="actualizarPedido();" style="font-weight: bold">' + l.actualizar + '</a>'
					  	  		+ dibujaProcesos(item.ID)
					  	  		+ '<br><a class="btn" href="#" onclick="quitarDelCarro('+ item.ID + ');" style="font-weight: bold">' + l.quitar + '</a>'
					  		+ '</div><br>'
					  		+ '<div class="col" style="width:30px">&nbsp;</div>'
					  + '</div><hr><br>'
		} );
		$("#totalcuadro").show();
		$("#carro").html(cad);
		dibujaTotal();		
	}
	else {
		$("#totalcuadro").hide();
		$("#carro").html("<h1>" + gdatos.cuenta.lenguaje.elcarroestavacio + "</h1>");
		dibujaTitulos(gdatos.cuenta.lenguaje);
	}
	if (datos) {
		dibujaTitulo(datos.cuentaCat.titulo, datos.cuentaCat.ID + ".jpg");
		dibujaBotonPedir();
		dibujaCatalogos(datos.catalogos);
		dibujaLogin(datos.cuenta);		
	}

	//if (datos.cuenta!=null)
	//	dibujaMenu();
}

function dibujaProcesos(IDcarro)
{
	var cad="";
	$.each(gdatos.produccion, function(i,item) {
		if (item.IDcarro==IDcarro)
			cad += '<div><input id="proceso-' + i + '" type="checkbox"' + (item.activo=="1" ? " checked": "") 
					+ ' onclick="activaProceso(' + i + ')">' 
					+ item.nombre + '</input></div>';
	} );	
	return cad;
}

function activaProceso(i)
{
	ActivaProcesoCarroP(gdatos.produccion[i].ID, $("#proceso-" + i).prop("checked") ? 1:0)
}


function dibujaTotal()
{
	$("#total").html("$" + total().formatMoney(gdatos.cuenta.decimales));	
}

function actualizarPedido()
{
	$.each(gdatos.carro, function(i,item) {
		item.cantidad=$("#cantidad" + item.ID).val();
		if (modo==1)
			item.precio=$("#precio-" + item.ID).val();
	} );
 	dibujaTotal();	
	
}

function total()
{
	var s = 0;
	$.each(gdatos.carro, function(i,item) {
		s = s + item.precio*item.cantidad
	} );
	return s;
}

function realizarPedido()
{
	document.cookie = "nota=''";
	actualizarPedido();
	var datos = {};
	datos.detalle = [];
	datos.notas = $("#notas").val();
	$.each(gdatos.carro, function(i,item) {
		d = {}
		d.ID = item.ID;
		d.cantidad = item.cantidad;
		d.precio = item.precio;
		datos.detalle.push(d);
	} );
	if (gdatos.cuenta.tipo=="P" | gdatos.cuenta.tipo=="V")
		AgregarPedidoP(datos, 0, salir);
	else
		AgregarPedidoP(datos, 0, salir);
}

function salir()
{
	IDcuentacli = getCookie("IDcuentacli");
	if (IDcuentacli>0) {
		document.cookie = "IDcuentacli=0";
		window.location = "catalogo.html?n=" + gdatos.cuentaCat.empresa;					
	}
	else
		window.location = "gracias.html?n=" + gdatos.cuentaCat.empresa;			
}

function seguirComprando()
{
	window.location = "catalogo.html?n=" + gdatos.cuentaCat.empresa;
}

function login()
{
	document.cookie = "pagpend=carro.html";
	document.cookie = "nota=" + $("#notas").val();
	window.location.assign("registro.html");
}

function dibujaBotonPedir()
{
	var email = encabezado.split(",")[0];
	if (email=="''") {
		$("#realizar").hide();
		$("#autenticar").show();
	}
	else {
		$("#autenticar").hide();
		$("#realizar").show();		
	} 
	
}

function quitarDelCarro(ID)
{
	var indice=-1;
	$.each(gdatos.carro, function(i,item) {
		if (item.ID==ID)
			indice = i;
	} );
	if (indice>=0)
	{
		gdatos.carro.splice(indice, 1);
		BorraDelCarroP(ID, refresca())
	}
}

function refresca()
{
	dibujaCarro(gdatos);			
}

function verBusca(datos)
{
	if (datos)
	{
		if (datos.tipo=="catalogo")
			window.location.assign("producto.html");
		else
			ListaProductoP(datos.datos, dibujaProducto); 
	}
}
