/**
 * @author Botpi
 */

var encabezado, idioma, pagina, ayuda, gdatos, IDoperario;

function inicioPlantaPro()
{
	encabezado = getCookie("encabezado");
	if (encabezado==null || encabezado=="" || encabezado=="'',''")
		window.location.assign("planta.html");	
	pagina = "pdplantaPro";
	ayuda = "";
	leeServidor();
	idioma="es";
	loginP(false, inicio);
}

function inicio()
{
	$("#divMenu").hide();
	$("#operario").focus();	
}

function verMaquina()
{
	IDmaquina = 1;
	PlantaMaquinaP(1, muestraOpciones);
}

function verProducto()
{
	document.cookie = "IDoperario=" + IDoperario;
	window.location.assign(gdatos[Number($("#menu").val())-1].pagina);
}
