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

	modo="producto";
	var IDproducto = getURLParameter('ID');
	if (IDproducto!=null & IDproducto!=0)
		ListaProductoP(IDproducto, dibuja)		
	else {
		document.cookie = "pagpend=" + document.URL;					
		window.location.assign("registro.html");		
	}	
}

function dibuja(IDproducto, datos)
{
	gdatos=datos;
	$("#usuario").html(gdatos.cuenta.empresa + " / " + gdatos.cuenta.usuario);
	$("#busy").hide();	

	var item = gdatos.producto;
	$("#imgprod").attr("src", item.imagen + "?" + gdatos.time);
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
	
	dibujaTitulo(gdatos.cuenta.titulo, gdatos.cuenta.ID + ".jpg");
	dibujaLogin(gdatos.cuenta);

	switch (modo) {
		case "producto":
			dibujaDatos();
			break;
		case "kardex":
			dibujaKardex();
			break;
		case "produccion":
			dibujaProduccion();
			break;
	}
}

function dibujaDatos()
{
	modo = "producto";
	$("#divdatos").show();
	$("#divkardex").hide()
	$("#divproduccion").hide()
	$("#tab-datos").addClass("active");
	$("#tab-kardex").removeClass("active")
	$("#tab-produccion").removeClass("active");
	
	var item = gdatos.producto;
	$("#nombre").val(item.nombre);
	$("#precio").val(item.precio);
	$("#pvm").val(item.pvm);
	$("#referencia").val(item.referencia);
	$("#barcode").val(item.barcode);
	$("#descripcion").val(item.descripcion);
	$("#IDimagen").val(item.IDproductobase);
	$("#dir").val(gdatos.cuenta.dir);
	dibujaTags();
	llenaNuevoTag();
	llenaVariedades();
	dibujaTitulos(gdatos.cuenta.lenguaje);				
}

function dibujaKardex()
{
	modo = "kardex";		
	$("#divdatos").hide();
	$("#divkardex").show()
	$("#divproduccion").hide()
	$("#tab-datos").removeClass("active");
	$("#tab-kardex").addClass("active")
	$("#tab-produccion").removeClass("active");

	if (gdatos.kardex.datos.length>0) {
		dibujaTabla(gdatos.kardex, "kardex", "kardex","");
		$("#divkardex").show();		
	}
	else
		$("#divkardex").hide();
		
	if (gdatos.proveedor && gdatos.proveedores.length>0) {
		llenaSelector(gdatos.proveedores, "proveedor")
		poneSelectorxID(gdatos.proveedor.ID, "proveedor");
		$("#divproveedor").show();
	}
	else
		$("#divproveedor").hide();

	dibujaTitulos(gdatos.cuenta.lenguaje);				
}

function dibujaProduccion()
{
	modo = "produccion"
	$("#divdatos").hide();
	$("#divkardex").hide()
	$("#divproduccion").show()
	$("#tab-datos").removeClass("active");
	$("#tab-kardex").removeClass("active")
	$("#tab-produccion").addClass("active");

	var cad = "", cadmp;
	if (typeof gdatos.produccion!='undefined' & gdatos.producto.tipo>0) {
		$.each(gdatos.produccion.procesos, function(i,item) {
			cadmp="";
			$.each(gdatos.produccion.mp, function(j, mp) {
				if (mp.IDproceso==item.ID)
					cadmp += '<div style="font-size:8px">' + mp.nombremp + '</div>'; 
			} );
			cad += '<div class="col" style="border-style:solid; border-width:1px;width: 120px; height: 180px;margin-right:5px;padding:5px"'
						+ 'onclick="editarProceso(' + i + ');">'
				   +  item.nombre 
				   + '<br><label class="item-name" style="font-size:9px" >Precio: ' + item.precio + '</label>'
				   + cadmp
				   + '<div style="font-size:9px"><br>Ficha Tecnica' 
				   		+ '<textarea style="border-style:solid; border-width:1px;width: 100px; height: 80px;font-size:8px">' 
				   		+ item.ficha + '</textarea>'
				   + '</div>' 
				   + '<button onclick="eliminaProceso(' + item.ID + ');">Eliminar Proceso</button>'
				   + '</div>'
		
		} );
		cad += '<button onclick="agregaProceso();">Agregar Proceso</button>';		
	} 
	$("#produccion").html(
		'<div>Tipo de Producto: <select id="tipo" onchange="cambiaTipo();">'
			+ '<option>Plantilla</option>'
			+ '<option>Generico</option>'
			+ '<option>Particular</option>'
			+ '<option>Materia Prima</option>'
			+ '<option>Servicio</option>'
		+ '</select></div><br>'
		+ cad 
	);
	switch (gdatos.producto.tipo)
	{
		case 0:
			$("#tipo").val("Materia Prima");
			break;
		case 1:
			$("#tipo").val("Plantilla");
			break;
		case 2:
			$("#tipo").val("Generico");
			break;
		case 3:
			$("#tipo").val("Particular");
			break;
		case 4:
			$("#tipo").val("Servicio");
			break;
	}		
	
	dibujaTitulos(gdatos.cuenta.lenguaje);
	borrandoProceso=false;
				
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
	ListaProductoP(IDproducto, dibuja);
}

function verPendiente()
{
	if (ultcambio)
		actualizaCampo(ultcambio);
}

// ----------------------------- editor procesos

function tapar()
{
	$("#editorproceso").show();
	//$('#editorproceso').css({'width':$(window).width()/2,'height':$(document).height()/4});	
	$("#mask2").removeClass("DN");
	$('#mask2').css({'width':$(window).width(),'height':$(document).height()});	
}

function destapar()
{
	$("#editorproceso").hide();
	$("#mask2").addClass("DN");
	$('#mask2').css({'width':0,'height':0});	
	
}

function editarProceso(procesoi)
{
	if (!borrandoProceso){
		cambioFicha=false;
		var item = gdatos.produccion.procesos[procesoi], cadmp="";
		gprocesoi=procesoi; 
		$.each(gdatos.produccion.mp, function(i, mp) {
			if (mp.IDproceso==item.ID)
				cadmp += '<div style="font-size:12px;">' 
							+ mp.nombremp + ', cantidad=' + mp.cantidad
							+ '<a href="#" onclick="borraMP(' + i + ')"><img src="images/delete.png" style="height:15px"></a>' 
						+ '</div>'; 
		} );
		cad = '<div id="verProc" class="sector v2" style=" z-index:9010;position: fixed;top:5%;left:30%">'
			   	   + 'Nombre: <input id="nombreproc" value="' + item.nombre + '" onchange="cambioFicha=true;" />'
			   	   + '<br>Precio: <input id="precioproc" value="' + item.precio + '" onchange="cambioFicha=true;" />'
				   + '<br><br><div style="border-style:solid; border-width:1px; padding:-3px;">' 
				   		+ cadmp
				   		+ '<br><button onclick="agregaMP();">Agregar Material</button>' 
		   		   + '</div>'
				   + '<br><div>Ficha Tecnica<br>' 
				   		+ '<textarea id="ficha" style="border-style:solid; border-width:1px;width: 300px; height:200px" onchange="cambioFicha=true;">' 
				   		+ item.ficha + '</textarea>'
			   	   + '</div>' 
				   + '<div class="col"><a id="titcerrar" class="btn v4" onclick="cerrar();">Cerrar</a></div>'
			   + '</div>';
	
		$("#editorproceso").html(cad);
		//$("#fichatecnica").attr("top");
		tapar();		
	}	
	borrandoProceso=false;
}

function cerrar()
{
	destapar();
	if (cambioFicha)
		CambiaFichaProductoP(gdatos.produccion.procesos[gprocesoi].ID, $("#ficha").val(), $("#precioproc").val(), $("#nombreproc").val(), refrescaProducto)
	else
		refrescaProducto();
}

function agregaMP(IDproceso)
{
	$('#divdefmaterial').css({'top':$("#verProc").position().top + 10,'left':$("#verProc").position().left+10});	
	$("#divdefmaterial").removeClass("DN");
}

function salirmp()
{
	$("#divdefmaterial").addClass("DN");
}

function aceptarmp()
{
	if ($('#nombremp').val()!="") {
		salirmp();	
		if ($('#cantidadmp').val()=="")
			$('#cantidadmp').val("1")
		CreaMaterialP(gdatos.producto.ID, gdatos.produccion.procesos[gprocesoi].ID, $('#nombremp').val(), $('#cantidadmp').val(), vaRefrescaProceso);		
	}
}

function borraMP(i)
{
	BorraMaterialP(gdatos.produccion.mp[i].ID, vaRefrescaProceso);
}

function agregaProceso()
{
	var nombre = prompt("Nombre del Proceso");
	if (nombre)
		CreaProcesoP(gdatos.producto.ID, nombre, refrescaProducto);
}

function eliminaProceso(ID)
{
	borrandoProceso=true;
	EliminaProcesoProductoP(ID, refrescaProducto)
}

function refrescaProducto()
{
	ListaProductoP(gdatos.producto.ID, dibuja);
}

function vaRefrescaProceso()
{
	ListaProductoP(gdatos.producto.ID, refrescaProceso);
}

function refrescaProceso(IDproducto, datos)
{
	gdatos=datos;
	editarProceso(gprocesoi);	
}

function cambiaTipo()
{
	var tipo = "";
	switch ($("#tipo").val())
	{
		case "Materia Prima":
			tipo=0;
			break;
		case "Plantilla":
			tipo=1;
			break;
		case "Generico":
			tipo=2;
			break;
		case "Particular":
			tipo=3;
			break;
		case "Servicio":
			tipo=4;
			break;
	}	
	
	var IDplanilla=0
	if (typeof gdatos.produccion!='undefined')
		IDplanilla = gdatos.produccion.IDplanilla

	CambiaTipoProductoP(gdatos.producto.ID, IDplanilla, tipo, refrescaProducto)
}
