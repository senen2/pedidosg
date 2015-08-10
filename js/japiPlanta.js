/**
 * @author Botpi
 */

function PlantaProduccionP(datos, funcion)
{
	$.post( 'http://' + servidor + '/functiond/' + datos.funcion + '(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
	 	.always(function(datos){
	 		if (funcion)
	 			funcion(datos);
	 	});
}

function PlantaOpcionesP(IDoperario, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/PlantaOpcionesP(" + encabezado + "," + IDoperario + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}