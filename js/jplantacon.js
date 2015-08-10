/**
 * @author Botpi
 */

var encabezado, idioma, pagina, ayuda, gdatos, IDoperario;

function inicioPlantaCon()
{
	encabezado = getCookie("encabezado");
	if (encabezado==null || encabezado=="" || encabezado=="'',''")
		window.location.assign("planta.html");	
	pagina = "pdplantaCon";
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

function verOperario()
{
	IDoperario = 1;
	PlantaOpcionesP(1, muestraOpciones);
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
		$("#menu").focus();
		
	}
	else {
		$("#operario").val("");	
		$("#operario").focus();	
	}
}

function verOpcion()
{
	document.cookie = "IDoperario=" + IDoperario;
	window.location.assign(gdatos[Number($("#menu").val())-1].pagina);
}
