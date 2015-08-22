/**
 * @author Botpi
 */

var encabezado, idioma, pagina, ayuda, gdatos, gIDoperador;

function inicioPlanta()
{
	encabezado = getCookie("planta");
	if (encabezado==null || encabezado=="" || encabezado=="'',''")
		window.location.assign("index.html");

	pagina = "pdplanta";
	ayuda = "";
	leeServidor();
	idioma="es";
	LoginPlantaP(inicio);
}

function inicio()
{
	$("#divMenu").hide();
	$("#operario").focus();	
}

function verOperario()
{
	gIDoperador = Number( $("#operario").val());
	PlantaOpcionesP(gIDoperador, 0, muestraOpciones);
}

function muestraOpciones(datos)
{
	if (datos) {
		gdatos = datos;
		llenaSelector(datos, "menu");
		$("#divOperario").hide();
		$("#divMenu").show();
		$("#menu option:eq(0)").prop('selected', true);
		//$("#menu").val("Produccion");
		$("#menu").attr("size", gdatos.length);
		$("#menu").focus();
		
	}
	else {
		$("#operario").val("");	
		$("#operario").focus();	
	}
}

function verOpcion()
{
	document.cookie = "IDoperador=" + gIDoperador;
	window.location.assign(gdatos[Number($("#menu").val())-1].pagina);
}
