/**
 * @author Carlos Botello
 */

function getip(json){
  if (typeof myip=='undefined')
  	myip = json.ip;
}

function armaMenu(tabla, titulos)
{
	var w,cad,clase;
	
	cad="";
	$.each(titulos, function(i,item) {
		clase = "menuitem";
		if (item.pagina==pagina + ".html")
			clase="menuitemsel";
		cad = cad + '<a href="' + item.pagina + '" class="' + clase + '">' + item.nombre + '</a>'; 
	} );
	$('#' + tabla).html('<img border="0" src="images/botpi.JPG" width="100" height="40" style="float:left;">'
	 + cad
	 + '<a href="usuario.html" class="menuitem">' + usuario.nombre + '</a>'
	 + '<a href="#" onclick=ayuda(); class="menuitem">Ayuda</a>'
	 + '<a href="index.html" onclick=logout() class="menuitem">Salir</a>');

	w = w = Math.round(($(window).width()-60) / (titulos.length + 3),0);
	$(".menuitem").css('width', w + 'px');
	$(".menuitemsel").css('width', w + 'px');
}

function armaMenu1(tabla, titulos)
{
	var w,cad;
	
	w = w = Math.round(($(window).width()-60) / (titulos.length + 3),0);
	cad="";
	$.each(titulos, function(i,item) { 
		cad = cad + '<td align="center" width="'+ w + '"><a href="' + item.pagina + '" style="text-decoration:none">' + item.nombre + '</a></td>'; } );
	$('#' + tabla).html('<tr><td width="60" valign="top"><img border="0" src="images/botpi.JPG" width="100" height="40"></td>'
	 + cad
	 + '<td align="center" width="'+ w + '"><a href="usuario.html" style="text-decoration:none">' + usuario.nombre + '</a></td>'
	 + '<td align="center" width="'+ w + '" onclick=ayuda();><a href="#" style="text-decoration:none">Ayuda</a></td>'
	 + '<td align="center" width="'+ w + '" onclick=logout()><a href="index.html" style="text-decoration:none">Salir</a></td>'
	 + '</tr>');
}

function ayuda()
{
	window.open("help/h" + pagina + ".html");
	return false;
}

function ir(pagina)
{
	document.cookie = "servidor=" + servidor;
	document.cookie = "encabezado=" + encabezado;
	window.open(pagina,"_self");
}

function llenaSelector(datos, control)
{
	var cad = "";
	$.each(datos, function(i,item) {
		cad = cad + '<option value="' + item.ID +'">' + item.nombre + '</option>';
	});
	$("#" + control).html(cad);	
}

function llenaSelectorxCampo(datos, control,campo)
{
	var cad = "";
	$.each(datos, function(i,item) {
		cad = cad + '<option value="' + item.ID +'">' + item[campo] + '</option>';
	});
	$("#" + control).html(cad);	
}

function poneSelector(val, control)
{
	var sel = document.getElementById(control);
    for(var i = 0, j = sel.options.length; i < j; ++i) {
        if(sel.options[i].innerHTML === val) {
           sel.selectedIndex = i;
           break;
        }
    }
}

function poneSelectorxID(ID, control)
{
	var sel = document.getElementById(control);
    for(var i = 0, j = sel.options.length; i < j; ++i) {
        if(sel.options[i].value === ID.toString()) {
           sel.selectedIndex = i;
           break;
        }
    }
}

// tablas

function agregaTitulos(titulos, row, tabla)
{
	var cad="";
	$("#" + tabla + " > thead").html("<tr></tr>");
	$.each(titulos, function(i,item) { 
		cad = cad + '<th width="'+ item.ancho +'"><p align="' + item.alinea + '">' + item.titulo + '</th>'; } );
	$('#' + row + ' tr:last').after('<tr">' + cad + '</tr>');
}

function ajustaAnchos(tabla, titulos)
{
	s=0;
	$.each(titulos, function(i,item) {
		s = s + item.ancho;	} );
	w = $(window).width()-120;
	if (w<1050) w = 1050; // parece que hace nada
	$("#" + tabla).attr('width', w);
	s = (w-100)/s;	// antes estaba en w-75
	$.each(titulos, function(i,item) {
		item.ancho = item.ancho*s; } );
}

function ajustaAlto()
{		
	var h = $(window).height();
	if (h>350)
	{
		var t = document.getElementsByTagName('tbody.scrollContent');
		t.height = h - 100 + 'px';
		//$("#planilla > tbody").css("height:" + h - 300 + "px");
	}
}

function ymd(date)
{
	return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
}

function extraeNombre(lista, campo)
{
	var l=[];
	$.each(lista, function(i, item) {
		l.push(item[campo]);
	});	
	return l;	
}

function filtraActores(lista, IDtipo)
{
	var l=[];
	$.each(lista, function(i, item) {
		if (item.IDtipo==IDtipo)
			l.push(item);
	});	
	return l;	
}

function buscaValor(lista, valor, campo)
{
	var a = "";
	$.each(lista, function(i, item) {
		if (item[campo]==valor)
			a = item;
	});	
	return a;
}

function quitaValor(lista, valor, campo)
{
	var a = "";
	$.each(lista, function(i, item) {
		if (item[campo]==valor)
			lista.splice(i,1);
	});	
	return a;
}

function enviaMensaje()
{
	$.ajax({
		url: "http://" + servidor + "/function/EnviaMensaje('','','" + $("#mensaje").val() + "','" + $("#emailenvia").val() + "')?pagina=contacto",
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) { 
			$("#mensajeEnviado").html("Su mensaje ha sido enviado, gracias");
			$("#emailenvia").val("");
			$("#mensaje").val("");
		}
	});	
}

function enviaMensajeBN()
{
	$.ajax({
		url: "http://" + servidor + "/function/EnviaMensajeBN('','','" + $("#mensaje").val() + "','" + $("#emailenvia").val() + "')?pagina=contacto",
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) { 
			$("#mensajeEnviado").html("Su mensaje ha sido enviado, gracias");
			$("#emailenvia").val("");
			$("#mensaje").val("");
		}
	});	
}

function tipoRol(nombre)
{
	switch(nombre)
	{
	case "equipo":
	case "equipos":
	  return 28;
	case "trabajador":
	case "trabajadores":
	  return 14;
	case "proveedor":
	case "proveedores":
	  return 23;
	case "material":
	case "materiales":
	  return 22;
	case "producto":
	case "productos":
	  return 13;
	case "cliente":
	case "clientes":
	  return 24;
	default:
	  return 0;
	}
}

function buscaObjetoxID(datos, ID)
{
	for (var i=0; i<datos.length; i++)
		if (datos[i]["ID"]==ID)
			break;
	if (i<datos.length)
		return datos[i];
	return null
}
