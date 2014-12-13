/**
 * @author botpi
 */

function inicioGracias()
{
	encabezado = getCookie("encabezado");
	pagina = "pdgracias";
	leeServidor();
		
	itemini = getCookie("itemini");
	if (itemini == null)
		itemini=0;
		
	itemsxpag = getCookie("itemsxpag");
	if (itemsxpag == null)
		itemsxpag=24;		
	
	empresa = getURLParameter('n');
	if (empresa!=null) 
		ListaProductosxEmpresaP(empresa, itemini, itemsxpag, "", dibujaCatalogo);
}

function dibujaCatalogo(datos)
{
	if (!datos)
		window.location.assign("index.html");
		
	gdatos=datos;
	var ncarro = datos.carro.length;
	dibujaCatalogos(datos.catalogos, datos.catalogo.titulo, ncarro);
	dibujaTitulo(datos.cuentaCat.titulo, datos.cuentaCat.ID + ".jpg");
	dibujaBuscar(datos.tags);
	dibujaLogin(datos.cuenta);
	//if (datos.cuenta!=null)
	//	dibujaMenu();
}

function seguirComprando()
{
	if (typeof gdatos != 'undefined' && gdatos)
		window.location = "catalogo.html?n=" + gdatos.cuentaCat.empresa;
	else
		window.location = "catalogo.html";
}