/**
 * @author botpi
 */
var gdatos, empresa;

function inicioSalonT()
{
	leeServidor();
	encabezado = getCookie("encabezado");
	if (encabezado==null | encabezado=="" | encabezado=="'',''")
		encabezado="'','',''";

	empresa = getURLParameter('n');
	if (empresa==null)
		empresa="voluspa";
		//window.location.assign("salon.html");

	refrescar();	
}

function refrescar()
{
	TraeTiendaP(empresa, 7, dibujaTienda);
}

function dibujaTienda(datos)
{
	var cad="", barra;
	gdatos = datos;
	$.each(gdatos.secciones, function(i,item) {
		cad += '<div class="section"><div class="container">'
				+ '<label style="font-size:21px;">' + item.titulo + '</label>'
				+ '<a href="catalogo.html?ID=' + item.ID  + '">' 
				+ '<div class="fila">'
					+ dibujaSeccion(item.ID)
				 + '</div>'+
				 '</a></div></div>';
		barra = '<div id="barra' + i + '"></div>';
	} );
	$("#tienda").html(cad);
}

function dibujaSeccion(IDseccion)
{
	var cad="";
	$.each(gdatos.productos, function(i,item) {
		if (item.IDseccion==IDseccion)
			cad += '<div class="col item">'
				  + '<img src="' + imagedir + 'imgcat/' + item.IDproductobase + '.jpg" />'
				+ "</div>";
	} );
	return cad;
}
