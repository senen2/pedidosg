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
					+ dibujaTienda(item.IDcuenta)
				 + '</div>'+
				 '</a></div></div><hr style="marging:5px">';
	} );
	$("#tiendas").html(cad);
}

function dibujaTienda(IDcuenta)
{
	var cad="";
	$.each(gdatos.productos, function(i,item) {
		if (item.IDcuenta==IDcuenta)
			cad += '<div class="col item" style="margin-bottom:14px;">'
				  + '<img src="' + imagedir + 'imgcat/' + item.IDproductobase + '.jpg" />'
				+ "</div>";
	} );
	return cad;
}
