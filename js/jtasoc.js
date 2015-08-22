/**
 * @author rigols
 */

function inicioAsociados()
{
	encabezado = getCookie("encabezado");
	if (encabezado==null || encabezado=="'','',''" || encabezado.split(',')[0]=="''") {
		document.cookie = "pagpend=" + document.URL;			
		window.location.assign("registro.html");		
	}
		
	pagina = "pdasociados";
	ayuda = "http://gtienda.com/wiki/mediawiki-1.23.5/index.php?title=Implementacion&section=#Subir_imagenes_de_los_productos";
	leeServidor();
	iniciando=true;
	refrescar("clientes");
}

function refrescar(modop)
{
	if (modop!="null")
		modo = modop;
	desactivaTodo();
	$("#email").val("");
	$("#nombre").val("");		
	$("#id").val("");		
	$("#tab-" + modo).addClass("active");
	$("#texto-" + modo).show();
	LeeAsociadosP(modo, dibujaAsociados);
}

function dibujaAsociados(datos)
{
	$("#usuario").html(datos.cuenta.empresa + " / " + datos.cuenta.usuario);
	gdatos = datos;
	dibujaTabla(datos, "asociados", "asociados","");
	
	if (modo=="distribuidores") {
		$("#titnombre").hide();
		$("#nombre").hide();
	}
	else {
		$("#titnombre").show();
		$("#nombre").show();
	}
			
	if (modo=="operadores") {
		$("#titemail").hide();
		$("#email").hide();
		$("#titid").show();
		$("#id").show();
	}
	else {
		$("#titid").hide();
		$("#id").hide();
	}		
		
	dibujaLogin(gdatos.cuenta);
	dibujaTitulos(gdatos.cuenta.lenguaje);
	var tercero="";
	switch (modo)
	{
		case "clientes":
			tercero = gdatos.cuenta.lenguaje.cliente;
			break;
		case "proveedores":
			tercero = gdatos.cuenta.lenguaje.proveedor;
			break;
		case "distribuidores":
			tercero = gdatos.cuenta.lenguaje.distribuidor;
			break;
		case "vendedores":
			tercero = gdatos.cuenta.lenguaje.vendedor;
			break;
		case "operadores":
			tercero = gdatos.cuenta.lenguaje.operador;
			break;
	}
	$("#tituloAgregar").html(gdatos.cuenta.lenguaje.nuevo + " " + tercero);
}

function desactivaTodo()
{
	$("#tab-proveedores").removeClass("active");
	$("#tab-distribuidores").removeClass("active");
	$("#tab-vendedores").removeClass("active");
	$("#tab-clientes").removeClass("active");
	$("#tab-operadores").removeClass("active");
	$("#texto-proveedores").hide();
	$("#texto-distribuidores").hide();
	$("#texto-vendedores").hide();
	$("#texto-clientes").hide();
	$("#texto-operadores").hide();
}

function activaAsociado(ID)
{	
	if (modo=="operador")
		ActivaOperador(ID);
	else
		ActivaAsociadoP(ID);
}

function agregaAsociacion()
{
	if (modo != "proveedores" & modo != "operadores" & !IsEmail($("#email").val())) {
		$("#aviso").html("se requiere un email valido");
		$("#aviso").show();
	}
		if (modo == "operadores" & $("#id").val()=="") {
			$("#aviso").html("se requiere una identificacion");
			$("#aviso").show();
		}		
		else {
			$("#aviso").hide();
			AgregaAsociacionP($("#email").val(), $("#nombre").val(), $("#id").val(), modo, refrescar);
		}
}

function compraxCliente(IDcuentacli)
{
	document.cookie = "IDcuentacli=" + IDcuentacli;
	window.location.assign("catalogocli.html");
}
