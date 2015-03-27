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
	modo = modop;
	LeeAsociadosP(modo, dibujaAsociados);
	desactivaTodo();
	$("#tap-" + modo).addClass("active");
	$("#texto-" + modo).show();
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
	}
	$("#tituloAgregar").html(gdatos.cuenta.lenguaje.nuevo + " " + tercero);
}

function desactivaTodo()
{
	$("#tap-proveedores").removeClass("active");
	$("#tap-distribuidores").removeClass("active");
	$("#tap-vendedores").removeClass("active");
	$("#tap-clientes").removeClass("active");
	$("#texto-proveedores").hide();
	$("#texto-distribuidores").hide();
	$("#texto-vendedores").hide();
	$("#texto-clientes").hide();
}

function activaAsociado(ID)
{	
	ActivaAsociadoP(ID);
}

function agregaAsociacion()
{
	if (modo != "proveedores" & !IsEmail($("#email").val())) {
		$("#aviso").html("se requiere un email valido");
		$("#aviso").show();
	}
	else {
		$("#aviso").hide();
		AgregaAsociacionP($("#email").val(), $("#nombre").val(), modo, refrescar);
		$("#email").val("");
		$("#nombre").val("");		
	}
}

function compraxCliente(IDcuentacli)
{
	document.cookie = "IDcuentacli=" + IDcuentacli;
	window.location.assign("catalogocli.html");
}
