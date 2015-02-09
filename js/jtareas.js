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
	LeeTareasP(dibujaTareas);
}

function dibujaTareas(datos)
{
	if (!datos) 
		window.location.assign("index.html");
		
	gdatos = datos;
	var n = (Math.sqrt(gdatos.procesos.length) + 1);
	n = n * n; 
	var cad = "", noches, equipo
		t = $("#divtareas").position().top,
		l = $("#divtareas").position().left,
		h = parseInt(Math.sqrt(($(window).width())*($(document).height()-t-40)/n/1.62))-1,
		h = h>300 ? 160 : h,
		w = parseInt(1.62 * h); 		
 		
	$.each(gdatos.procesos, function(i, item) {
		equipo = item.equipo;
		if (item.equipo==null)
			equipo="Sin Equipo"
		
		cad += '<div class="node col" onclick="verTarea(' + item.ID + ')" style="padding: 5px;' 
			+ 'width:' + w + 'px;'
			+ 'max-width:' + w + 'px;'
			+ 'height:' + h + 'px;'
			+ 'background-image:' + item.color + ';'
			+ '">' 
				+ item.nombre + " - " + item.producto
	 			+ '<br><label class="item-price col">' + item.cliente + '</label>'
	 			+ '<br><div>' 
		 			+ '<label class="item-price col">' + equipo + '</label>' 
		 			+ '<a class="btn v4 col" href="#" onclick="cambiaEquipo(' + item.ID + ');" >Cambiar</a>'
	 			+ '</div>' 		 			
				+ dibujaMP(item.ID)
				+ '<div>' 
			 		+ '<br><input class="col" type="checkbox" onclick="terminaTarea(' + item.ID + ');">Tarea Terminada' 
		 		+ '</div>'
			+ '</div>'
	});	
	$("#divtareas").html(cad);	
	
	dibujaMenu();
}

function dibujaMP(IDproceso)
{
	var cad="";
	$.each(gdatos.mp, function(i, item) {
		if (item.IDpedidosproceso==IDproceso)
			cad += '<div style"padding: 5px">' 
			 		+ '<input class="col" type="checkbox" onclick="actualizaListo(' + item.ID + ');">' 
			 		+ '<label class="item-price col">' + item.nombre + '</label>' 
		 		+ '</div><br>'
	});		
	return cad;
}

function actualizaListo(IDmp)
{
	
}

function verTarea(IDtarea)
{
	
}
