/**
 * @author Botpi
 */

function inicioVisitas()
{
	encabezado = getCookie("encabezado");
	if (encabezado==null || encabezado=="'','',''" || encabezado.split(',')[0]=="''") {
		document.cookie = "pagpend=" + document.URL;			
		window.location.assign("registro.html");		
	}
		
	pagina = "visitasSI";
	ayuda = "http://gtienda.com/wiki/mediawiki-1.23.5/index.php?title=Implementacion&section=#Subir_imagenes_de_los_productos";
	leeServidor();
	poneDatePicker("#fecha", "", new Date()); //"d M yy"
	refrescar();
	
}

function refrescar()
{
	LeeVisitasSI(new Date($("#fecha").val()), dibuja);
}
		
function dibuja(datos)
{
	$("#visitas").html(datos);
}

function addDays(dias)
{
	var f = tomaDatePicker($("#fecha").val());
	f = f.setDate(f.getDate() + dias);
	$("#fecha").datepicker( "setDate", new Date(f));
	refrescar();
}
