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

function LeeProduccionTareasP(funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/LeeProduccionTareasP(" + encabezado + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}

function LeeProduccionEquiposP(funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/LeeProduccionEquiposP(" + encabezado + ")?pagina=" + pagina,
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

// --------------------------- plantillas

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

// ----------------------------- pedidos

function CambiaListoPedidoP(IDmp, listo)
{
	datos={}
	datos.IDmp=IDmp;
	datos.listo=listo;
	$.post( 'http://' + servidor + '/functiond/CambiaListoPedidoP(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
	 	.always(function(){
	 	});
}

function CambiaEquipoPedidoP(IDproceso, IDequipo)
{
	datos={}
	datos.IDproceso=IDproceso;
	datos.IDequipo=IDequipo;
	$.post( 'http://' + servidor + '/functiond/CambiaEquipoPedidoP(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
	 	.always(function(){
	 	});
}

function GuardaOrdenProcesosP(IDequipo, procesos, funcion)
{
	datos={}
	datos.IDequipo=IDequipo;
	datos.procesos=procesos;
	$.post( 'http://' + servidor + '/functiond/GuardaOrdenProcesosP(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
	 	.always(function(){
	 		if (funcion)
	 			funcion();
	 	});
}

function CreaEquipoP(nombre, funcion)
{
	datos={}
	datos.nombre=nombre;
	$.post( 'http://' + servidor + '/functiond/CreaEquipoP(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
	 	.always(function(){
	 		if (funcion)
	 			funcion();
	 	});
}
