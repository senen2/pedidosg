/**
 * @author rigols
 */

function inicioCatalogos()
{
	encabezado = getCookie("encabezado");
	if (encabezado==null || encabezado=="'','',''" || encabezado.split(',')[0]=="''") {
		document.cookie = "pagpend=" + document.URL;			
		window.location.assign("registro.html");		
	}
		
	pagina = "pdcatalogos";
	ayuda = "http://gtienda.com/wiki/mediawiki-1.23.5/index.php?title=Implementacion&section=#Crear_las_secciones_del_catalogo";
	leeServidor();
	refrescar();
	
}

function refrescar()
{
	LeeCatalogosP(dibujaPagina);
}

function dibujaPagina(datos)
{
	$("#usuario").html(datos.cuenta.empresa + " / " + datos.cuenta.usuario);
	gdatos = datos;
	dibujaTabla(datos, "catalogos", "catalogos","verCatalogo");
	if (datos.datos.length>0)
		verCatalogo(datos.datos[0].ID);	
	//dibujaMenu();
	dibujaLogin(gdatos.cuenta);
	dibujaTitulos(gdatos.cuenta.lenguaje);
}

function verCatalogo(ID)
{
	catalogoSel = buscaObjetoxID(gdatos.datos, ID);	
	seleccionaRenglon(gdatos, "catalogos", ID);
	$("#nombre").val(catalogoSel.nombre);
	$("#titulo").val(catalogoSel.titulo);
	$("#tags").val(catalogoSel.tag);
}

function activaCatalogo(ID)
{	
	ActivaCatalogoP(ID);
}

function modificaCatalogo()
{
	ModificaCatalogoP(catalogoSel.ID, $("#nombre").val(), $("#titulo").val(), $("#tags").val(), refrescar);
}

function agregaCatalogo()
{
	AgregaCatalogoP($("#nombre").val(), $("#titulo").val(), $("#tags").val(), refrescar);
}

function eliminaCatalogo(ID)
{
	EliminaCatalogoP(ID, refrescar);
}
