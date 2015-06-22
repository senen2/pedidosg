/**
 * @author botpi
 */
var gdatos;

function inicioComprar1()
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
				+ '<a href="catalogo.html?n=' + item.empresa  + '">' 
				+ '<h2>' + item.empresa + ' - ' + item.categoria + '</h2>'
				+ '<div class="fila">'
					+ dibujaTienda(item)
				 + '</div>'+
				 '</a></div></div>';
	} );
	$("#tiendas").html(cad);
}

function dibujaTienda(datos)
{
	var cad="";
	$.each(datos.productos, function(i,item) {
		cad += '<div class="col">'
			  + '<img src="' + imagedir + 'imgcat/' + item.IDproductobase + '.jpg" />'
			+ "</div>";
	} );
	return cad;
}
