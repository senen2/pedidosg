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
	dibujaEquipos();
}

function dibujaEquipos()
{
	dibujaMenu();
}
