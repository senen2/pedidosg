/**
 * @author Botpi
 */

var encabezado, idioma, pagina, ayuda, gdatos, gequipo, gproceso, gIDoperador;

function inicioPlantaPro()
{
	encabezado = getCookie("planta");
	if (encabezado==null || encabezado=="" || encabezado=="'',''")
		window.location.assign("planta.html");	
	pagina = "pdplantaPro";
	ayuda = "";
	leeServidor();
	idioma="es";
	gIDoperador = getCookie("operador");
	LeeProduccionEquiposP(inicio);
}

function inicio(datos)
{
	if (!datos)
		window.location.assign("planta.html");
	
	gdatos = datos;
	$("#equipo").focus();
	gIDbodega = 0;	
}

function verEquipo()
{
	destapar();
	if ($("#equipo").val()=="") {
		var cad = "";
		$.each(gdatos.equipos, function(i,item) {
			cad += '<label style="color: red">' + (i+1) + "</label>. " + item.nombre + '<br>';
		});		
		
		$("#modal").removeClass("DN");
		$("#modal").html(
			'<div class="sector v2" style=" z-index:9010;position: fixed;top:5%;left:30%;" onkeydown="cerrar();">'
				+ '<label class="item-name" align="center" style="font-size:32px">Codigo de Equipos</label>'
				+ '<br><label class="item-name" align="center" style="font-size:24px">Utilice el número en rojo para indicar el equipo</label>'
				+ '<div style="min-height:200px; font-size:32px" align="left">'
					+ '<ul>'
						+ cad 
					+ '</ul>'
				+ '</div>'
			+ '<br></div>');
		$("#equipo").focus();
		tapar();	
	}
	else {
		var j = Number($("#equipo").val())-1;
		if (j<=gdatos.equipos.length) {
			gequipo = gdatos.equipos[j];
			
			gproceso = "";
			$.each(gdatos.procesos, function(i,item) {
				if (item.IDequipo==gequipo.ID & gproceso=="")
					gproceso = item;
			});
			gproducido = 0;
			$.each(gdatos.producido, function(i,item) {
				if (item.IDproceso==gproceso.ID)
					gproducido = item;
			});
						
			$("#equipo").val(gequipo.nombre);
			$("#cliente").val(gproceso.cliente);
			$("#producto").val(gproceso.producto);
			if (typeof gproducido.unidades!='undefined')
				$("#producido").val(gproducido.unidades + "/" + gproceso.cantidad + " un - " + gproducido.peso + "/" + gproceso.peso + " g");
			$("#unidades").focus();				
		}
		else {
			$("#equipo").val("");
			$("#cliente").val("");
			$("#producto").val("");						
			$("#equipo").focus();	
		}
		
	}
}

function verProducto()
{
	window.location.assign(gdatos[Number($("#menu").val())-1].pagina);
}

function verUnidades() 
{
	$("#peso").focus();	
	
}

function verPeso() 
{
	$("#aceptar").prop("disabled",false);
	$("#aceptar").focus();	
}

function aceptar()
{
	var unidades = Number($("#unidades").val());
	var peso = Number($("#peso").val());
	CreaEtiquetaP("P", gproceso.IDdetped, gequipo.ID, gproceso.ID, gIDoperador, gIDbodega, unidades, peso, verEtiqueta);	
}

function verEtiqueta(datos)
{
	$("#aceptar").hide();
	$("#IDetiqueta").val(datos.ID + ", bulto " + datos.numero);
	$("#IDetiqueta").removeClass("DN");
	$("#IDetiqueta").focus();
}

function iraPlanta()
{
	if ($("#modal").is(":visible"))
		cerrar();
	else
		window.location.assign("planta.html");
}

function tapar()
{
	$("#modal").show();
	$("#mask2").removeClass("DN");
	$('#mask2').css({'width':$(window).width(),'height':$(document).height()});	
}

function destapar()
{
	$("#modal").hide();
	$("#mask2").addClass("DN");
	$('#mask2').css({'width':0,'height':0});	
}

function cerrar()
{
	destapar();
}