/**
 * @author Botpi
 */

    
function LeePlanillaMopp(funcion)
{
	encabezado="'demo@themopp.com','demo'";
	$.ajax({
		url: "http://" + servidor + "/function/LeePlanillaMopp(" + encabezado + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}
    
function LeeEquiposPR(funcion)
{
	encabezado="'demo@themopp.com','demo'";
	$.ajax({
		url: "http://" + servidor + "/function/LeeEquiposP(" + encabezado + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}

function LeeTareasP(funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/LeeTareasP(" + encabezado + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}

function LeeEquiposP(funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/LeeEquiposP(" + encabezado + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}
