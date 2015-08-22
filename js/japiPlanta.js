/**
 * @author Botpi
 */
/*
function PlantaP(datos, funcion)
{
	$.post( 'http://' + servidor + '/functiond/' + datos.funcion + '(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
	 	.always(function(response){
	 		if (funcion)
	 			funcion(JSON.parse(response));
	 	});
}*/

function PlantaOpcionesP(IDoperador, IDpadre, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/PlantaOpcionesP(" + encabezado + "," + IDoperador + "," + IDpadre + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}

function CreaEtiquetaP(tipo, IDdetped, IDequipo, IDproceso, IDoperador, IDbodega, unidades, peso, funcion)
{
	datos={};
	datos.tipo=tipo;
	datos.IDdetped=IDdetped;
	datos.IDequipo=IDequipo;
	datos.IDproceso=IDproceso;
	datos.IDoperador=IDoperador;
	datos.IDbodega=IDbodega;
	datos.unidades=unidades;
	datos.peso=peso;
	$.post( 'http://' + servidor + '/functiond/CreaEtiquetaP(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
	 	.success(function(response){
	 		if (funcion)
	 			funcion(JSON.parse(response));
	 	});
}

function CreaPlantaP(funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/CreaPlantaP(" + encabezado + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}

function LoginPlantaP(funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/LoginPlantaP(" + encabezado + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}
