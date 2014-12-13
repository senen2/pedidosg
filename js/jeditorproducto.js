/**
 * @author botpi
 */

function inicioEditorProd()
{
	$("#hiddenFrame").hide();
	encabezado = getCookie("encabezado");
	if (encabezado==null || encabezado=="" || encabezado=="'',''")
		encabezado="'','',''";
	pagina = "pdproducto";
	ayuda = "http://gtienda.com/wiki/mediawiki-1.23.5/index.php?title=Implementacion&section=#Ingresar_datos_de_los_productos";

	leeServidor();
	ultcambio = "";

	if (encabezado=="'','',''") {
		document.cookie = "pagpend=" + document.URL;					
		window.location.assign("registro.html");		
	}

	var IDproducto = getURLParameter('ID');
	if (IDproducto!=null & IDproducto!=0)
		ListaProductoP(IDproducto, dibujaProducto)		
	else {
		document.cookie = "pagpend=" + document.URL;					
		window.location.assign("registro.html");		
	}
	
}

function dibujaProducto(IDproducto, datos)
{
	gdatos = datos;
	$("#usuario").html(datos.cuenta.empresa + " / " + datos.cuenta.usuario);
	var cad = "", tallas = "", colores = "";
	var item = datos.producto;
	
	$("#busy").hide();	
	$("#imgprod").attr("src", item.imagen + "?" + gdatos.time);
	$("#nombre").val(item.nombre);
	$("#precio").val(item.precio);
	$("#pvm").val(item.pvm);
	$("#referencia").val(item.referencia);
	$("#barcode").val(item.barcode);
	$("#descripcion").val(item.descripcion);
	$("#IDimagen").val(item.IDproductobase);
	$("#dir").val(datos.cuenta.dir);
	$("#formaImagen").attr("action", "http://" + servidor + "/upload");

	if (gdatos.prevProducto>0) {
		$("#prevProd").attr("onclick", 'verProducto(' + gdatos.prevProducto + ')');
		$("#prevProd").show();		
	}
	else
		$("#prevProd").hide();
		
	if (gdatos.sigProducto>0) {
		$("#sigProd").attr("onclick", 'verProducto(' + gdatos.sigProducto + ')');		
		$("#sigProd").show();		
	}
	else
		$("#sigProd").hide();
	

	dibujaTitulo(datos.cuenta.titulo, datos.cuenta.ID + ".jpg");
	dibujaLogin(datos.cuenta);
	dibujaTags();
	llenaNuevoTag();
	llenaVariedades();
	
	if (datos.kardex.datos.length>0) {
		dibujaTabla(datos.kardex, "kardex", "kardex","");
		$("#divkardex").show();		
	}
	else
		$("#divkardex").hide();
		
	if (datos.proveedor && datos.proveedores.length>0) {
		llenaSelector(datos.proveedores, "proveedor")
		poneSelectorxID(datos.proveedor.ID, "proveedor");
		$("#divproveedor").show();
	}
	else
		$("#divproveedor").hide();
				
	
	//dibujaMenu();
}

function llenaVariedades()
{
	var cad = "";
	$.each(gdatos.tallas, function(i,item) {
		if (cad != "")
			cad = cad + ", ";
		cad = cad + item.talla; 
	} );
	$("#tallas").val(cad);
	
	var cad = "";
	$.each(gdatos.colores, function(i,item) {
		if (cad != "")
			cad = cad + ", ";
		cad = cad + item.color; 
	} );
	$("#colores").val(cad);
}

// ------------------------------- Edicion

function actualizarProducto()
{
	ModificaReferenciaP(gdatos.producto.ID, $("#proveedor").val(), $("#referencia").val(), $("#barcode").val(), $("#nombre").val()
		, $("#precio").val(), $("#pvm").val()
		, $("#descripcion").val(), gdatos.tags, $("#tallas").val(), $("#colores").val(), salir);
}

function actualizaCampo(campo)
{
	var v = $("#"+campo).val();
	ModificaCampoProductoP(gdatos.producto.ID, campo, v);
	ultcambio = "";
}

function cambia(campo)
{
	ultcambio = campo.id;
}

function activaCambioFoto()
{
	$("#cambiarFoto").show();
}

function cancelaSubidaImagen()
{
	$("#cambiarFoto").hide();	
}

function finalSubirImagen()
{
	$("#cambiarFoto").hide();
	//window.location.assign("editorproducto.html?ID=" + gdatos.producto.ID)
	location.reload(true);
}

function salir()
{
	verPendiente();
	//history.back(-1);
	window.location.assign('catalogo.html')
}

function iframeFinal()
{
  $("#hiddenFrame").attr("onload",'finalSubirImagen();')
  	$("#busy").show();

}

// --------------------------------- Tags

function dibujaTags()
{
	var cad="";
	$.each(gdatos.tags, function(i,item) {
		cad = cad 
				+ '<span class="yt-chip"title="' + item.tag + '">'
				+ '<span style="color:black" >' + item.tag + '</span>'
				+ '<span class="yt-delete-chip" onclick="borraTag(\'' + item.tag + '\');" >x</span>'
				+ '</span>';
	} );
	$("#tags").html(cad);	
}

function agregaTag()
{
	var tag = $("#nuevotag").val().trim();
	if (tag!="") {
		var valido = true;
		$.each(gdatos.tags, function(i,item) {
			if (item.tag==tag) {
				valido = false;
			}
	} );	
		
		if (valido) {
			AgregaTagProductoP(gdatos.producto.ID, $("#nuevotag").val());
			var dato = {};
			dato.tag = $("#nuevotag").val();
			dato.estado = 0;
			gdatos.tags.push(dato);
			dibujaTags();
		}	
		$("#nuevotag").val("");
	}
}

function borraTag(tag)
{
	var dato=null;
	$.each(gdatos.tags, function(i,item) {
		if (item.tag==tag) {
			dato = item;
		}
	} );	

	if (dato) {
		EliminaTagProductoP(gdatos.producto.ID, tag);
		gdatos.tags.splice(gdatos.tags.indexOf(dato),1);		
	}
	dibujaTags();
}

function llenaNuevoTag()
{
    $("#nuevotag").autocomplete({
      source: extraeNombre(gdatos.cuentaCat.tags, "tag")
    }); 	
}

function verProducto(IDproducto)
{
	verPendiente();
	ListaProductoP(IDproducto, dibujaProducto);
}

function verPendiente()
{
	if (ultcambio)
		actualizaCampo(ultcambio);
}
