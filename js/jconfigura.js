/**
 * @author Botpi
 */

function inicioProv()
{
	encabezado = getCookie("encabezado");
	if (encabezado==null)
		window.location.assign("registro.html");
	
	if (encabezado.length>5) {
		pagina = "proveedorBN";
		leeServidor();
		apagaTodo();
		leeCuentaP(dibujaProv);
	}
	else
		window.location.assign("registro.html");
}

function dibujaProv(response)
{
	if (response) {
		gdatos = response;
		cuenta = response;
		$("#formaLogo").attr("action", "http://" + servidor + "/uploadped");
		$("#usuario").html(cuenta.empresa + " / " + cuenta.usuario);
		$("#logoedita").attr("src",'logos/' + gdatos.ID + '.jpg')
		$("#IDimagen").val(gdatos.ID);

/*		$("#quierovender").hide();
		$("#registro").hide();
		$("#login").html("Cerrar Sesion");
		$("#login").attr("onclick","logout();")
*/	}
	else
		window.location.assign("registro.html");
}

function CambiarLogo()
{
	apagaTodo();
	$("#cambioLogo").show();
}

function finalSubirLogo()
{
}

function CrearProducto()
{
	apagaTodo();
	$("#creaProducto").show();
	
}

function ingresaListaProductos()
{
	apagaTodo();
	$("#ingresaProductos").show();
	$("#listaProductosCrear").attr("placeholder","referencia, nombre, precio, descripcion\nreferencia, nombre, precio, descripcion\n  .\n  . \n  . ")
	$("#listaProductosSubir").hide();
	$("#crearProductos").hide();
}

function activaProductos()
{
	apagaTodo();
	$("#activaProducto").show();
	
}

function ConfiguraCarro()
{
	apagaTodo();
	$("#configuraCarro").show();
	
}

function ConfiguraCorreo()
{
	apagaTodo();
	$("#cambioLogo").show();
	
}

function apagaTodo()
{
	$("#cambioLogo").hide();
	$("#creaProducto").hide();
	$("#ingresaProductos").hide();
	$("#activaProducto").hide();
	$("#editaVendedores").hide();
	$("#configuraCarro").hide();
	$("#configuraCorreo").hide();
	
}

//--------------------

function creaProducto()
{
	AgregaReferenciaP(IDcuenta, $("#referenciaProductoCrear").val(), $("#nombreProductoCrear").val(), $("#descripcionProductoCrear").val(), ""
						, "", "", [], vaEditarProducto);
}

function vaEditarProducto(referencia, IDproducto)
{
	window.relocation("editorProducto.html?ID=" + IDproducto)	
}

function convertirProductos()
{
	$("#listaProductosSubir").show();
	$("#crearProductos").show();

	var texto, palabras, cad;
	texto = $("#listaProductosCrear").val();
	lineas = texto.split("\n");
	lineas.length--;
	lote = [];
	$('#listaProductosSubir tr:first').after("");
	$.each(lineas, function(i, linea) {
		d = {};
		lote.push(d);
		palabras = linea.split("\t");
		d["referencia"]=palabras[0];
		d["nombre"]=palabras[1];
		d["precio"]=palabras[2];		
		d["descripcion"]=palabras[2];		
	
		cad = "";
		for (var i=0; i<4; i++) {
			cad = cad + '<td>' + palabras[i] + '</td>';
		}
		$('#listaProductosSubir tr:last').after('<tr>' + cad + '</tr>');
	});


}

function crearProductos()
{
	
}
