/**
 * @author botpi
 */
var gdatos;

function inicioSalon()
{
	leeServidor();
	encabezado = getCookie("encabezado");
	if (encabezado==null | encabezado=="" | encabezado=="'',''")
		encabezado="'','',''";
	refrescar();	
}

function refrescar()
{
	TraeTiendasP(dibujaTiendas);
}

function dibujaTiendas(datos)
{
	var cad="";
	gdatos = datos;
	$.each(gdatos.tiendas, function(i,item) {
		cad += '<div class="section"><div class="container">'
				+ '<label style="font-size:21px;">' + item.empresa + ' - ' + item.categoria + '</label>'
				+ '<a href="catalogo.html?n=' + item.empresa  + '">' 
				+ '<div class="fila">'
					+ dibujaTienda(item.IDcuenta)
				 + '</div>'+
				 '</a></div></div>';
	} );
	$("#tiendas").html(cad);
}

function dibujaTienda(IDcuenta)
{
	var cad="";
	$.each(gdatos.productos, function(i,item) {
		if (item.IDcuenta==IDcuenta)
			cad += '<div class="col item">'
				  + '<img src="' + imagedir + 'imgcat/' + item.IDproductobase + '.jpg" />'
				+ "</div>";
	} );
	return cad;
}
