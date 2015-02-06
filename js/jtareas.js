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
	dibujaTareas();
}

function dibujaTareas()
{
	dibujaMenu();
}
