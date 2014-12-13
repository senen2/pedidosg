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
	verClientes();
}

function refrescar()
{
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
		$("#tituloNombre").hide();
		$("#nombre").hide();
	}
	else {
		$("#tituloNombre").show();
		$("#nombre").show();
	}		
		
	dibujaLogin(gdatos.cuenta);
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

function verProveedores()
{
	modo="proveedores";
	$("#tituloAgregar").html("Nuevo Proveedor");
	refrescar();
}

function verDistribuidores()
{
	modo="distribuidores";
	$("#tituloAgregar").html("Nuevo Distribuidor");
	refrescar();
}

function verVendedores()
{
	modo="vendedores";
	$("#tituloAgregar").html("Nuevo Vendedor");
	refrescar();
}

function verClientes()
{
	modo="clientes";
	$("#tituloAgregar").html("Nuevo Cliente");
	refrescar();
}

function activaAsociado(ID)
{	
	ActivaAsociadoP(ID);
}

function agregaAsociacion()
{
	if (modo != "proveedores" & !IsEmail($("#email").val())) {
		$("#aviso").html("se requiere un email valido")
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
