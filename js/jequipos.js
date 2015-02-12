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
		t = $("#divtareas").position().top,
		l = $("#divtareas").position().left,
		h = parseInt(Math.sqrt(($(window).width())*($(document).height()-t-40)/n/1.62))-1,
		h = h>160 ? 160 : h,
		w = parseInt(1.62 * h); 		
 		
	$.each(gdatos.equipos, function(i, item) {
		cad += '<div class="node col" onclick="verTarea(' + item.ID + ')" style="' 
			+ 'width:' + w + 'px;'
			+ 'max-width:' + w + 'px;'
			+ 'height:' + h + 'px;'
			+ 'background-image:' + item.color + ';'
			+ '">' 
				+ item.nombre
				+ '<br>' + dibujaProcesos(item.ID)
			+ '</div>'
	});	
	$("#divtareas").html(cad);	
	
	dibujaMenu();
}

function dibujaProcesos(IDequipo)
{
	var cad="";
	$.each(gdatos.procesos, function(i, item) {
		if (item.IDequipo==IDequipo)
			cad += '<div style"padding: 5px">' 
			 		+ '<label class="item-price col">' + item.nombre + ' - ' + item.producto + ' - ' + item.cliente + '</label>' 
		 		+ '</div><br>'
	});		
	return cad;
}

function actualizaListo(IDmp)
{
	
}

function verEquipo(IDequipo)
{
	
}
