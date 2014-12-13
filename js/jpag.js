/**
 * @author Administrador
 */

function avanzaPag()
{
	if (itemini+itemsxpag<nitems) {
		itemini += itemsxpag;
		document.cookie = "itemini=" + itemini;
		ListaProductosxPaginaP(gdatos.catalogoCab.ID, itemini, itemsxpag, filtrosact, dibujaCuadro);		
	}
}

function retrocedePag()
{
	if (itemini>0) {
		itemini -= itemsxpag;
		if (itemini<0)
			itemini=0;
		document.cookie = "itemini=" + itemini;
		ListaProductosxPaginaP(gdatos.catalogoCab.ID, itemini, itemsxpag, filtrosact, dibujaCuadro);		
	}
}

function iraPag(pag)
{
	itemini = itemsxpag * (pag-1);
	document.cookie = "itemini=" + itemini;
	ListaProductosxPaginaP(gdatos.catalogoCab.ID, itemini, itemsxpag, filtrosact, dibujaCuadro);
}

function cambiaItemsxpag(n)
{
	itemsxpag = n;
	document.cookie = "itemsxpag =" + itemsxpag;
	ListaProductosxPaginaP(gdatos.catalogoCab.ID, itemini, itemsxpag, filtrosact, dibujaCuadro);	
}

function cadenaPaginado()
{
	var cad = "";
	var npaginas = Math.floor(nitems/ itemsxpag) + 1;
	var pagina = itemini / itemsxpag + 1;
	if (npaginas<6)
		cad += cadPags(pagina, 1, npaginas) 
	else {
		if (pagina<4) {
			cad += cadPags(pagina, 1, 4);
			cad	+= '<td>...</td>';
			cad += cadPags(pagina, npaginas, 1);
		}
		else if (pagina<npaginas-2) {
 			cad += cadPags(pagina, 1, 1);
			cad	+= '<td>...</td>';
			cad += cadPags(pagina, pagina-1, 3);
			cad	+= '<td>...</td>';
			cad += cadPags(pagina, npaginas, 1);						
		}
		else {
 			cad += cadPags(pagina, 1, 1);
			cad	+= '<td>...</td>';
			cad += cadPags(pagina, npaginas-3, 4)
		}
	}
	
	return '<td><a href="#" onclick="retrocedePag();"><img style="height:18px" src="images/flecha-izquierda.gif" />&nbsp;</a></td>'
			+ cad
			+ '<td><a href="#" onclick="avanzaPag();">&nbsp;<img style="height:18px" src="images/flecha-derecha.gif" /></a></td>';	
}

function cadPags(pagina, pagini, npags)
{
	var cad = "";
	for (var i=0; i<npags; i++) {
		if (i + pagini==pagina)
			cad += '<td><a href="#" onclick="iraPag(' + (i + pagini) + ');"><strong style="color: orange">' + (i + pagini) + '&nbsp;</strong></a></td>'
		else
			cad += '<td><a href="#" onclick="iraPag(' + (i + pagini) + ');">' + (i + pagini) + '&nbsp;</a></td>'
	}		
	return cad;
}
