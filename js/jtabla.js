/**
 * @author Botpi
 */

function dibujaTabla(tabla, tag, tagID, fundetalle)
{
	var cad = "", tit="", tot="", estado="", f="", finput, val;
	
	$.each(tabla.titulos, function(i,item) {
		tit = tit + '<th style="width:'+ item.ancho +'px; text-align:' + item.alinea + '">' + item.titulo + '</th>';
	});

	var f;
	$.each(tabla.datos, function(i,item) {	
		f="";
		if (fundetalle)
			f = ' onclick="'+ fundetalle + "('" + item.ID + "');" + '"';
			
		cad += '<tr id="' + tagID + '-' + item.ID + '" ' +  f + '>' + dibujaRenglon(item, tabla.titulos) + '</tr>'
	});

	$.each(tabla.totales, function(i,item) {
		$.each(tabla.titulos, function(t,itemtit) {
			tot = tot + '<th>' + item[itemtit.campo] + '</th>'
		});
	});

	$('#' + tag).html('<tr>' + tit + '</tr>' + cad + '<tr>' + tot + '</tr>');	
}

function dibujaRenglon(item, titulos)
{
	var cad="";
	$.each(titulos, function(t,itemtit) {
		cad += dibujaCelda(item, itemtit);
	});
	return cad;
}

function dibujaCelda(item, itemtit)
{
	if ("link" in itemtit) {
		val = "";
		if (itemtit.link!="")
			val = item[itemtit.link]
		funcion = "";
		if (itemtit.funcion!="")
			funcion=item[itemtit.funcion];
		return '<td align="' + itemtit.alinea + '"><a class="normal" style="font-weight: 700" href="'
			  + itemtit.linktext + val + '" ' + funcion + '>' 
			  + item[itemtit.campo] + '</a></td>'								
	}
	else if ("funcion" in itemtit)
		return '<td align="' + itemtit.alinea + '"><a href="#" onclick="' + itemtit.funcion + '(' + item.ID + ');">' + itemtit.titulo + '</a></td>'
	else if ("input" in itemtit) {
		finput = "";
		if ("funcioninput" in itemtit)
			finput = itemtit.funcioninput;
		return '<td align="' + itemtit.alinea + '"><input id="' + itemtit.campo + '-' + item.ID + '" type="checkbox" ' + (item[itemtit.campo]==0 ? '':'checked')
			+ ' onclick="' + finput + '(' + item.ID + ');">' + '</td>'
	}
	else if ("img" in itemtit)
		return '<td><a href="' + itemtit.img + item[itemtit.imgcampo] + '"><img width="' + (itemtit.ancho-4) + 'px" src="' + item[itemtit.campo] + '"/></a></td>'
	else
		return '<td align="' + itemtit.alinea + '">' + item[itemtit.campo] + '</td>'
	
	return "";
}

function seleccionaRenglon(tabla, tag, ID)
{
	$.each(tabla.datos, function(i,item) {
		$('#' + tag + "-" + item.ID).removeClass("seleccionada");
	});
	$('#' + tag + "-" + ID).addClass("seleccionada");	
}
