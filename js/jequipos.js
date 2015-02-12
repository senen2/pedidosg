/**
 * @author Botpi
 */

function inicioEquipos()
{
	encabezado = getCookie("encabezado");
	if (encabezado==null || encabezado=="'','',''" || encabezado.split(',')[0]=="''") {
		document.cookie = "pagpend=" + document.URL;			
		window.location.assign("registro.html");		
	}
		
	pagina = "pequipos";
	ayuda = "http://gtienda.com/wiki/mediawiki-1.23.5/index.php?title=Implementacion&section=#Subir_imagenes_de_los_productos";
	leeServidor();
	LeeEquiposP(dibujaEquipos);
}

function dibujaEquipos(datos)
{
	if (!datos) 
		window.location.assign("index.html");
		
	gdatos = datos;
	var n = (Math.sqrt(gdatos.procesos.length) + 1);
	n = n * n; 
	var cad = "", noches
		t = $("#divequipos").position().top,
		l = $("#divequipos").position().left,
		h = parseInt(Math.sqrt(($(window).width())*($(document).height()-t-40)/n/1.62))-1,
		h = h>160 ? 160 : h,
		w = parseInt(1.62 * h); 		
 		
	$.each(gdatos.equipos, function(i, item) {
		cad += '<div class="node col" onclick="verEquipo(' + i + ')" style="' 
			+ 'width:' + w + 'px;'
			+ 'max-width:' + w + 'px;'
			+ 'height:' + h + 'px;'
			+ 'background-image:' + item.color + ';'
			+ '">' 
				+ item.nombre
				+ '<br>' + dibujaProcesos(item.ID)
			+ '</div>'
	});	
	$("#divequipos").html(cad);	
	
	dibujaMenu();
}

function dibujaProcesos(IDequipo)
{
	var cad="";
	gIDequipo=IDequipo;
	$.each(gdatos.procesos, function(i, item) {
		if (item.IDequipo==IDequipo)
			cad += '<div style="padding-left: 5px";padding-right: 5px">' 
			 		+ '<label class="item-price col">' + item.cantidad + ' ' + item.producto + ' - ' + item.cliente + '</label>' 
		 		+ '</div><br>'
	});		
	return cad;
}

// -------------------------------- editar proceso

function tapar()
{
	$("#editorequipo").show();
	//$('#editorproceso').css({'width':$(window).width()/2,'height':$(document).height()/4});	
	$("#mask2").removeClass("DN");
	$('#mask2').css({'width':$(window).width(),'height':$(document).height()});	
}

function destapar()
{
	$("#editorequipo").hide();
	$("#mask2").addClass("DN");
	$('#mask2').css({'width':0,'height':0});	
}

function guardar()
{
	destapar();
	var procesos=[], d;
	$.each($("#sortable").children(), function(i, item) {
		p = {};
		p.IDproceso=item.id.split("-")[1];
		p.orden=i+1;
		procesos.push(p);
	});		
	
	GuardaOrdenProcesosP(gdatos.equipos[gequipoi].ID, procesos, refresca);
}

function refresca()
{
	LeeEquiposP(dibujaEquipos);			
}

function cerrar()
{
	destapar();
}

function verEquipo(equipoi)
{
	var equipo = gdatos.equipos[equipoi], cad="";
	gequipoi=equipoi;
	gnprocesos = 0 
	$.each(gdatos.procesos, function(i, item) {
		if (item.IDequipo==equipo.ID) {
			cad += '<li id="proceso-' + item.ID + '" class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>' 
			 		+ item.cantidad 
			 		+ ' - ' + item.producto
			 		+ ' - ' +item.cliente
		 		+ '</li>'
		}
	});		

	$("#editorequipo").html(
		'<div class="sector v2" style=" z-index:9010;position: fixed;top:5%;left:30%;">'
			+ '<label class="item-name" align="center">Procesos ' + equipo.nombre + '</label><br><br>'
			+ '<div style="min-height:200px; font-size:12px" align="left">'
				+ '<ul id="sortable">'
					+ cad 
				+ '</ul>'
			+ '</div>'
		    + '<div class="col"><a id="titcerrar" class="btn v4" onclick="guardar();">Guardar</a></div>'
			+ '<div class="col">&nbsp;&nbsp;&nbsp;&nbsp;</div>'
		    + '<div class="col"><a id="titcerrar" class="btn v4" onclick="cerrar();">Cancelar</a></div>'
		+ '<br></div>');

	$("#sortable").sortable();
	$("#sortable").disableSelection();

	tapar();		
}

function verEquipo1(equipoi)
{
	var equipo = gdatos.equipos[equipoi], cad="";
	gequipoi=equipoi;
	gnprocesos = 0 
	$.each(gdatos.procesos, function(i, item) {
		if (item.IDequipo==equipo.ID) {
			cad += '<tr id="proceso-' + i + '" onclick="selProceso(' + i + ')">' 
			 		+ '<td align="left">' + item.producto + '</td>'
			 		+ '<td align="left">' + item.cliente + '</td>'
			 		+ '<td align="right">' + item.cantidad + '</td>' 
		 		+ '</tr>'
		 	gnprocesos++; 			
		}
	});		

	$("#editorequipo").html(
		'<div class="sector v2" style=" z-index:9010;position: fixed;top:5%;left:30%">'
			+ '<label class="item-name" align="center">Procesos ' + equipo.nombre + '</label><br><br>'
			+ '<div class="col mo v2 sector min-width" style="min-height:200px" align="left">'
			+ '<table>'
				+ '<thead>'
					+ '<th style="width:300px">producto</th>'
					+ '<th style="width:100px">cliente</th>'
					+ '<th>cantidad</th>'
				+ '</thead>'
				+ '<tbody>'
					+ cad 
				+ '</tbody>'
			+ '</table>'
			+ '</div>'
		    + '<br><div class="col"><a id="titcerrar" class="btn v4" onclick="cerrar();">Cerrar</a></div>'
		+ '<br></div>');
	tapar();		
}

function selProceso(procesoi)
{
	for (i=0; i<=gnprocesos; i++)
		$('#proceso-' + i).removeClass("seleccionada");

	$('#proceso-' + procesoi).addClass("seleccionada");		
}
