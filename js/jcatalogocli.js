/**
 * @author botpi
 */

function inicioCatCli()
{
	encabezado = getCookie("encabezado");
	if (encabezado==null | encabezado=="" | encabezado=="'',''")
		encabezado="'','',''";
	pagina = "pdcatalogocli";
	leeServidor();
	
	filtrosact = [];
	itemini=0;
	itemsxpag=200;
		
	empresa = getURLParameter('n');
	if (empresa!=null) 
		ListaProductosxEmpresaP(empresa, itemini, itemsxpag, filtrosact, dibujaCatalogo)
	else {
		IDcatalogo = getURLParameter('ID');
		if (IDcatalogo!=null) 
			ListaProductosxPaginaP(IDcatalogo, itemini, itemsxpag, filtrosact, dibujaCatalogo);
		else
			ListaProductosxPaginaP(0, itemini, itemsxpag, filtrosact, dibujaCatalogo);
	}
}

function dibujaCatalogo(datos)
{	
	if (!datos)
		window.location.assign("index.html");
	gdatos=datos;
	
	ajustaEncabezado(gdatos.cuenta);		
	dibujaLogin(gdatos.cuenta);
	dibujaCatalogos(datos.catalogos, datos.catalogoCab.titulo, datos.carro.length);
	dibujaTitulo(datos.cuentaCat.titulo, datos.cuentaCat.ID + ".jpg");
	dibujaBuscar(datos.catalogo.tags);
	$('#catalogo').html(datos.cuadroProductos);
	//dibujaCuadro(datos, "catalogo",  260, 200);
}
