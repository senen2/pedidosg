/**
 * @author gtienda.com
 */

function inicioActivap()
{
	encabezado = getCookie("encabezado");
	if (encabezado==null | encabezado=="'','',''" | encabezado.split(',')[0]=="''") {
		document.cookie = "pagpend=" + document.URL;			
		window.location.assign("registro.html");		
	}
		
	pagina = "pdactivap";
	ayuda = "http://gtienda.com/wiki/mediawiki-1.23.5/index.php?title=Implementacion&section=#Subir_imagenes_de_los_productos";
	leeServidor();
	refrescar();
	
}

function refrescar()
{
	ListaProductosDesactivadosP(dibujaPagina);
}

function dibujaPagina(datos)
{
	gdatos = datos;
	dibujaCuadro(datos, "productos", 260, 200);
	dibujaLogin(gdatos.cuenta);
	dibujaTitulos(gdatos.cuenta.lenguaje);
}

function activaProducto(ID)
{	
	ActivaProductoP(ID);
	$("#productos-" + ID).hide();
}
