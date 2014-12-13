function dibujaCuadro(tabla, tag, altoitem, anchoitem)
{
	var cad = "", clase, ancho;
	$.each(tabla.datos, function(i,item) {
		cad += '<div class="col item" style="height:' + altoitem + 'px;width:' + anchoitem + 'px">';
		$.each(tabla.titulos, function(i,itemtit) {
			clase="";
			if ("clase" in itemtit)
				clase = itemtit.clase;
			ancho="";
			if ("ancho" in itemtit)				
				ancho = ' width="' + (itemtit.ancho-4) + 'px"';
				
			if ("link" in itemtit)
				cad += '<td><a class="normal" style="font-weight: 700" href="' + itemtit.linktext + item[itemtit.link] + '">'+ item[itemtit.campo] + '</a></td>'
			else if ("funcion" in itemtit)
				cad += '<td><a href="#" onclick="' + itemtit.funcion + '(' + item.ID + ');">' + itemtit.titulo + '</a></td>'
			else if ("input" in itemtit) {
				finput = "";
				if ("funcioninput" in itemtit)
					finput = itemtit.funcioninput;
				cad += '<div><label class="item-price col">' + itemtit.titulo + ' </label>'
					+ '<input class="col" id="' + itemtit.campo + '-' + item.ID + '" type="checkbox" ' + (item[itemtit.campo]==0 ? '':'checked')
					+ ' onclick="' + finput + '(' + item.ID + ');"></div>';
			}
			else if ("img" in itemtit)
				cad += '<a href="' + itemtit.img + item[itemtit.imgcampo] + '"><img src="' + item[itemtit.campo] + '"/></a>'
			else
				cad += '<label class="'+ clase + '">' + itemtit.titulo + " " + item[itemtit.campo]  + ' </label>'
		});
		cad = cad + '</div>';
	});	

	$('#' + tag).html(cad);	
}
