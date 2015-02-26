/**
 * @author Botpi
 */

function inicioTareas()
{
	encabezado = getCookie("encabezado");
	if (encabezado==null || encabezado=="'','',''" || encabezado.split(',')[0]=="''") {
		document.cookie = "pagpend=" + document.URL;			
		window.location.assign("registro.html");		
	}
		
	pagina = "ptareas";
	ayuda = "http://gtienda.com/wiki/mediawiki-1.23.5/index.php?title=Implementacion&section=#Subir_imagenes_de_los_productos";
	leeServidor();
	LeeProduccionTareasP(dibujaTareas);
}

function dibujaTareas(datos)
{
	if (!datos) 
		window.location.assign("index.html");
		
	gdatos = datos;
	var n = (Math.sqrt(gdatos.procesos.length) + 1);
	n = n * n; 
	var cad = "", noches, equipo, color
		t = $("#divtareas").position().top,
		l = $("#divtareas").position().left,
		h1 = parseInt(Math.sqrt(($(window).width())*($(document).height()-t-40)/n/1.62))-1,
		h = h1>160 ? 160 : h1,
		w = parseInt(1.62 * h); 		
 		
	$.each(gdatos.procesos, function(i, item) {
		equipo = item.equipo;
		color = '#DDD';
		if (item.equipo==null) {
			equipo="Sin Equipo"
			color = 'linear-gradient(#FF7D7D, #FF4F4F)';		
		}
		
		cad += '<div class="node col" onclick="verProceso(' + i + ')" style="padding: 5px;' 
			+ 'width:' + w + 'px;'
			+ 'max-width:' + w + 'px;'
			+ 'height:' + h + 'px;'
			+ 'background-image:' + color + ';'
			+ '">'
				+ item.nombre + " - " + item.producto
				+ '<img style="height:40px" src="' + imagedir + 'imgcarro/' + item.IDproductobase + '.jpg"/>' 
	 			+ '<br><label class="item-price col">' + item.referencia + '</label>'
	 			+ '<br><label class="item-price col">' + item.cliente + '</label>'
	 			+ '<br><label class="item-price col">' + equipo + '</label>'
				+ '<br>' + dibujaMP(item.ID)
			+ '</div>'
	});	
	$("#divtareas").html(cad);	
	
	dibujaMenu();
}

function dibujaMP(IDproceso)
{
	var cad="";
	$.each(gdatos.mp, function(i, item) {
		if (item.IDpedidosproceso==IDproceso & item.listo==0)
			cad += '<div style"padding: 5px">' 
			 		+ '<input class="col" type="checkbox" onclick="return false;">' 
			 		+ '<label class="item-price col">' + item.nombre + ' - ' + item.cantidad + '</label>' 
		 		+ '</div><br>'
	});		
	return cad;
}

// -------------------------------- editar proceso

function tapar()
{
	$("#editorproceso").show();
	//$('#editorproceso').css({'width':$(window).width()/2,'height':$(document).height()/4});	
	$("#mask2").removeClass("DN");
	$('#mask2').css({'width':$(window).width(),'height':$(document).height()});	
}

function destapar()
{
	$("#editorproceso").hide();
	$("#mask2").addClass("DN");
	$('#mask2').css({'width':0,'height':0});	
	LeeProduccionTareasP(dibujaTareas);		
}

function verProceso(procesoi)
{
	var item = gdatos.procesos[procesoi], cadmp="";
	gprocesoi=procesoi; 
	$.each(gdatos.mp, function(i, mp) {
		if (mp.IDpedidosproceso==item.ID)
			cadmp += '<div>' 
			 		+ '<input id="mp-' + i + '" class="col" type="checkbox"' + (mp.listo==1 ? ' checked' : '') + ' onclick="cambiaListoMP(' + i + ');">' 
			 		+ '<label class="item-price col">' + mp.nombre + ' - ' + mp.cantidad + '</label>' 
		 		+ '</div><br>'		
	} );

	gequipo = item.equipo;
	if (item.equipo==null)
		gequipo="Sin Equipo"
				
	cad = '<div class="sector v2" style=" z-index:9010;position: fixed;top:5%;left:30%">'
			   + '<h3>' + item.nombre + '</h3>' 
	 			+ 'Producto: <label class="item-name">' + item.producto+ '</label>'
	 			+ '<br>Cliente: <label class="item-name">' + item.cliente + '</label>'
	 			+ '<br><div>'
	 				+ 'Equipo: <select id="equipo" onchange="cambiaEquipo()"></select>'
	 				+ '<strong><a href="#" onclick="agregaEquipo();" title="Agregar Nuevo Equipo"> + </a></strong>'
	 			+ '<div>'
			   + '<h5>Materiales</h5>' 
			   + cadmp
			   + '<br><div class="col"><a id="titcerrar" class="btn v4" onclick="cerrar();">Cerrar</a></div>'
		   + '</div>';

	$("#editorproceso").html(cad);
	llenaSelector(gdatos.equipos, "equipo");
	$("#equipo").val(item.IDequipo)
	tapar();		
}

function cambiaListoMP(i)
{
	CambiaListoPedidoP(gdatos.mp[i].ID, $("#mp-" + i).prop("checked") ? 1: 0)
}

function cambiaEquipo()
{
	CambiaEquipoPedidoP(gdatos.procesos[gprocesoi].ID, $("#equipo").val())
}

function cerrar()
{
	destapar();
}

function agregaEquipo()
{
	var nombre = prompt("Nombre del Equipo");
	if (nombre)	
		CreaEquipoP(nombre, leeEquipos);
}

function leeEquipos()
{
	LeeEquiposP(actualizaEquipos);
}

function actualizaEquipos(datos)
{
	gdatos.equipos = datos;
	llenaSelector(gdatos.equipos, "equipo");
	var id=0
	$.each(gdatos.equipos, function(i, item) {
		if (item.ID>id)
			id=item.ID
	});
	$("#equipo").val(id);
	CambiaEquipoPedidoP(gdatos.procesos[gprocesoi].ID, id);	
}
