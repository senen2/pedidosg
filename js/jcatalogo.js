/**
 * @author botpi
 */
var pagina, ayuda, encabezado, gdatos;
var gdatosleccion, itemini, itemsxpag, nitems, editando, filtrosact, empresa, IDcatalogo, itemdefault;

function inicioCat()
{
	encabezado = getCookie("encabezado");
	if (encabezado==null || encabezado=="" || encabezado=="'',''")
		encabezado="'','',''";
	pagina = "pdcatalogo";
	ayuda = "http://gtienda.com/wiki/mediawiki-1.23.5/index.php?title=Implementacion&section=#Subir_imagenes_de_los_productos";
	leeServidor();
	leeIdioma();

	modo = getURLParameter('m');
	if (modo==null) {
		modo=getCookie("editando");
		if (modo==null)
			modo=1;		
	}
	else
		document.cookie = "editando=" + modo;
	
	filtrosact = "";
	
	itemini = getCookie("itemini");
	if (itemini == null)
		itemini=0;
	else
		itemini = parseInt(getCookie("itemini"));
	
		
	itemsxpag = getCookie("itemsxpag");
	if (itemsxpag == null)
		itemsxpag=24;
	else		
		itemsxpag = parseInt(itemsxpag);
	
	empresa = getURLParameter('n');
	if (empresa!=null)
	{
		if (empresa=="wiki") {
			window.location.assign("http://gtienda.com/wiki/mediawiki-1.23.5/index.php?title=P%C3%A1gina_principal");		
			return;			
		}
		ListaProductosxEmpresaP(empresa, itemini, itemsxpag, filtrosact, idioma, dibujaCatalogo);
	} 
	else {
		IDcatalogo = getURLParameter('ID');
		if (IDcatalogo!=null) 
			ListaProductosxPaginaP(IDcatalogo, itemini, itemsxpag, filtrosact, dibujaCatalogo);
		else if (encabezado.length>8)
			ListaProductosxPaginaP(0, itemini, itemsxpag, filtrosact, dibujaCatalogo);
		else {
			document.cookie = "pagpend=" + document.URL;			
			window.location.assign("index.html");
		}
	}
}

function refrescar()
{
	ListaProductosxPaginaP(gdatos.catalogoCab.ID, itemini, itemsxpag, filtrosact, dibujaCatalogo);
}

function dibujaCatalogo(datos)
{
	
	if (!datos) {
		document.cookie = "pagpend=" + document.URL;			
		window.location.assign("index.html");		
	}

	gdatos=datos;
	nitems = datos.catalogo.n;
	if (itemini>nitems)
		itemini=0;
	
	// se edita si el propietario de la cuentaCat es el usuario y no esta como vendedor y está en modo de edicion
	editando = isOwner(datos) & modo == 1;
		
	ajustaEncabezado(gdatos.cuenta);		
	document.cookie = "IDcuentaCat=" + datos.cuentaCat.ID;
	
	dibujaLogin(gdatos.cuenta);
	dibujaTitulos(gdatos.cuenta.lenguaje);
	dibujaCatalogos(datos.catalogos, datos.catalogoCab.titulo, editando ? -1 : datos.carro.length);
	dibujaCuadro(datos);
	dibujaTitulo(datos.cuentaCat.titulo, datos.cuentaCat.ID + ".jpg");
	dibujaBuscar(datos.catalogo.tags);
	if (datos.catalogo.tags) {
		$("#filtros").html(dibujaFiltros(datos.catalogo.tags));		
		$("#titfiltros").show();
	}
	else
		$("#titfiltros").hide();
		
	$("#carro").html("(" + gdatos.carro.length + ")");
	$("body").fadeIn(400);		
	
}

function dibujaCuadro(datos)
{			
	var borrar, nombre, precio, pvm, pag, cad="";
	pag = "producto.html";
	if (editando) {
/*		cad = '<div class="col item"><a href="subeprod.html">'
				  + '<img src="'+ imagedir + 'imgcat/' + gdatos.cuenta.lenguaje.agregarProductos + '.jpg"/>'
				  + '</a></div>'; */
		pag="editorproducto.html";

		$(function() {
			$( "#catalogo" ).sortable({
				stop: function(event,ui) {
					if (editando)
						grabarOrden();
				}
			});
		});
	
		$(".menu-bar-bottom").show();
	}
	else {
		$(".menu-bar-bottom").hide();		
	}
	$.each(datos.catalogo.productos, function(i,item) {
		if (editando | item.tipo>1) {
			nombre = item.nombre;
			if (nombre!="")
				nombre = '<label class="item-name">' + nombre + '</label>';
	
			referencia = "";
			if (item.referencia!="")
				referencia = '<label class="item-ref">Ref: ' + item.referencia + '</label>';
			
			precio = "";
			if (item.precio>0)
				precio = '<label class="item-price">$ ' + item.precio.formatMoney(gdatos.cuenta.decimales)+ '</label>';
			
			pvm = "";
			if (item.pvm>0)
				pvm = '<label class="item-price">Al Mayor $ ' + item.pvm.formatMoney(gdatos.cuenta.decimales) + '</label>';
	
			borrar = "";
			if (editando)
				borrar = '<a href="#" onclick="eliminaProducto(' + item.ID +')">' + gdatos.cuenta.lenguaje.desactivar + '</a>';
			
			if (pag=="producto.html" || pag=="editorproducto.html" & datos.cuentaCat.ID==item.IDcuenta)
				cad = cad + '<div id="producto-'+ item.ID +'" class="col item" style="margin-bottom:14px;"><a href="' + pag + '?ID='+ item.ID + '">'
						  + '<img src="' + item.imagen + "?" + gdatos.time + '" />'
						  + '<div>'
						  + nombre
						  + referencia
						  + precio
						  + pvm
						  + borrar
						  + '</div></a></div>';						
		}
	} );
	$("#catalogo").html(cad);	
	cad = cadenaPaginado(); 
	$("#paginadosup").html(cad);
	$("#paginadoinf").html(cad);
}

function creaProductoEnBlanco()
{
	AgregaReferenciaP(gdatos.cuentaCat.ID, "xnuevox", "", "", 0, 0, "", "", "","", [], tomaID);
}

function tomaID(IDcuenta, referencia)
{
	//TomaIDxReferenciaP(IDcuenta, referencia, vaEditarNuevo);
	TomaUltimoIDproductoP(vaEditarNuevo);
}

function vaEditarNuevo(IDproducto)
{
	window.location.assign("editorproducto.html?ID=" + IDproducto);
}

function actualizaPagina(datos)
{
	location.reload(); 
	//dibujaCatalogo(0, 100, datos);
}

function eliminaProducto(ID)
{
	EliminaProductoP(ID, borraProducto);
}

function borraProducto(ID, response)
{
	if (response=="ok")
		$("#producto-"+ID).hide();
}

function grabarOrden()
{
	var datos={};
	datos.lista=[];
	$.each($("#catalogo").children(), function(i,item) {
		if (i>0)
			datos.lista.push(item.id.split("-")[1]);
	} );
	datos.itemini=itemini;
	ReordenaProductosP(datos);
}

function dibujaFiltros(filtros)
{
	var cad = "";
	$.each(filtros, function(i,item) {
		cad = cad + '<dd><input type="checkbox" onclick="armaFiltro();" /><label>' + item.tag + '</label></dd>';
	} );
	return cad;	
}

function armaFiltro(valor)
{
	filtrosact = "";
	$.each($("#filtros").children(), function(i,item) {
		if (item.children[0].checked) {
			if (filtrosact!="")
				filtrosact +=";";
			filtrosact += item.children[1].innerHTML;			
		}
	} );
	itemini=0;
	ListaProductosxPaginaP(gdatos.catalogoCab.ID, itemini, itemsxpag, filtrosact, dibujaCuadro);
	//dibujaCuadro(gdatos);
}

function verBusca(datos)
{
	if (datos)
	{
		if (datos.tipo=="catalogo")
			dibujaCatalogo(datos.datos);
		else 
			window.location.assign("producto.html?ID=" + datos.datos);
	}
}

// ---------------------------- subir Imagenes

function tomaFoto()
{
	$("#capture").trigger( "click" );
}

function upload() {
	$("#busy").show();
	itemdefault=getCookie("itemdefault");
	if (typeof itemdefault=='undefined' || itemdefault==null) {
		itemdefault={};
		itemdefault.nombre="";
		itemdefault.precio=0;
		itemdefault.pvm=0;
		itemdefault.referencia="";
		itemdefault.barcode="";
		itemdefault.descripcion="";
		itemdefault.tallas="";
		itemdefault.colores="";
		itemdefault.tags=[];
	}
	else
		itemdefault = JSON.parse(itemdefault);
		
	uploadImages("capture", itemdefault, gdatos.catalogoCab.ID, finalUpload);
}

function finalUpload()
{
	$("#busy").hide();
	refrescar(); 	
}

function dibujaLeccion(datos)
{
	gdatosleccion = datos;
	$("#leccion").show();
	$("#leccionNombre").html(datos.nombre);
	$("#leccionImagen").attr("src","lecciones/" + datos.imagen);
	$("#leccionTexto").html(datos.texto);
}

