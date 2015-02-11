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

function ActivaProcesoCarroP(IDproceso, activo)
{
	datos={}
	datos.IDproceso=IDproceso;
	datos.activo=activo;
	$.post( 'http://' + servidor + '/functiond/ActivaProcesoCarroP(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
	 	.always(function(){
	 	});
}

function CreaProcesoP(IDproducto, nombre, funcion)
{
	datos={}
	datos.IDproducto=IDproducto;
	datos.nombre=nombre;
	$.post( 'http://' + servidor + '/functiond/CreaProcesoP(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
	 	.always(function(){
	 		if (funcion)
	 			funcion();
	 	});
}

function CreaMaterialP(IDproducto, IDproceso, nombre, funcion)
{
	datos={}
	datos.IDproducto=IDproducto;
	datos.IDproceso=IDproceso;
	datos.nombre=nombre;
	$.post( 'http://' + servidor + '/functiond/CreaMaterialP(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
	 	.always(function(){
	 		if (funcion)
	 			funcion();
	 	});
}

function BorraMaterialP(ID, funcion)
{
	datos={}
	datos.ID=ID;
	$.post( 'http://' + servidor + '/functiond/BorraMaterialP(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
	 	.always(function(){
	 		if (funcion)
	 			funcion();
	 	});
}

function CambiaTipoProductoP(IDproducto, tipo, funcion)
{
	datos={}
	datos.IDproducto=IDproducto;
	datos.tipo=tipo;
	$.post( 'http://' + servidor + '/functiond/CambiaTipoProductoP(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
	 	.always(function(){
	 		if (funcion)
	 			funcion();
	 	});
}

function CambiaFichaProductoP(IDproceso, ficha, funcion)
{
	datos={}
	datos.IDproceso=IDproceso;
	datos.ficha=ficha;
	$.post( 'http://' + servidor + '/functiond/CambiaFichaProductoP(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
	 	.always(function(){
	 		if (funcion)
	 			funcion();
	 	});
}
