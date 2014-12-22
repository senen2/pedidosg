/**
 * @author gtienda
 */

function inicioSubeProd()
{
	encabezado = getCookie("encabezado");
	if (encabezado==null | encabezado=="" | encabezado=="'',''")
		encabezado="'','',''";

	if (encabezado=="'','',''") {
		document.cookie = "pagpend=" + document.URL;					
		window.location.assign("registro.html");		
	}
		
	pagina = "subeprod";
	ayuda = "http://gtienda.com/wiki/mediawiki-1.23.5/index.php?title=Implementacion&section=#Subir_imagenes_de_los_productos";
	leeServidor();
	
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
	
	leeCuentaP(dibujaPagina)
	
}

function dibujaPagina(datos)
{
	gdatos = datos;
	
	$("#nombre").val(itemdefault.nombre);
	$("#referencia").val(itemdefault.referencia);
	$("#barcode").val(itemdefault.barcode);
	$("#descripcion").val(itemdefault.descripcion);
	$("#precio").val(itemdefault.precio);
	$("#pvm").val(itemdefault.pvm);
	$("#tallas").val(itemdefault.tallas);
	$("#colores").val(itemdefault.colores);

	dibujaTags();
	llenaNuevoTag();

	$("#busy").hide();
	$("#parasubir").show();
	$("#botsubirimagenes").hide();
	dibujaLogin(datos);
	dibujaTitulos(gdatos.lenguaje);

}

function tomaDatos()
{
	itemdefault.nombre = $("#nombre").val();
	itemdefault.referencia = $("#referencia").val();
	itemdefault.barcode = $("#barcode").val();
	itemdefault.descripcion = $("#descripcion").val();
	itemdefault.precio = $("#precio").val();
	itemdefault.pvm = $("#pvm").val();
	itemdefault.tallas = $("#tallas").val();
	itemdefault.colores = $("#colores").val();
	document.cookie = "itemdefault=" + JSON.stringify(itemdefault);	
}

function upload() {
	$("#busy").show();
	$("#parasubir").hide();
	
    var file = document.getElementById("uploadfile");

	var theQueue = $({});

    var a = encabezado.split(',');
    var datos = [];
    datos.push({nombre: "email", valor: a[0].replace("'","").replace("'","")})
    datos.push({nombre: "token", valor: a[2].replace("'","").replace("'","")})
    datos.push({nombre: "IDcuentacat", valor: gdatos.ID })
    datos.push({nombre: "nombre", valor: itemdefault.nombre })
    datos.push({nombre: "referencia", valor: itemdefault.referencia })
    datos.push({nombre: "barcode ", valor: itemdefault.barcode })
    datos.push({nombre: "descripcion ", valor: itemdefault.descripcion })
    datos.push({nombre: "precio", valor: itemdefault.precio })
    datos.push({nombre: "pvm", valor: itemdefault.pvm })
    datos.push({nombre: "tallas", valor: itemdefault.tallas })
    datos.push({nombre: "colores", valor: itemdefault.colores })
    datos.push({nombre: "tags", valor: JSON.stringify(itemdefault.tags) })

	$.each(file.files, function(i, archivo) {
	  theQueue.queue('uploads', function(next) {
	  	 resizeAndUpload(archivo, datos, next, 600, 600);
	  }); 
	});
	theQueue.queue('uploads', function(next) {
		$("#busy").hide();
		$("#parasubir").show();
	}); 
	theQueue.dequeue('uploads'); 
}

// --------------------------------- Tags

function dibujaTags()
{
	var cad="";
	$.each(itemdefault.tags, function(i,item) {
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
		$.each(itemdefault.tags, function(i,item) {
			if (item.tag==tag) {
				valido = false;
			}
	} );	
		
// ------------------ variedades


function llenaVariedades()
{
	var cad = "";
	$.each(itemdefault.tallas, function(i,item) {
		if (cad != "")
			cad = cad + ", ";
		cad = cad + item.talla; 
	} );
	$("#tallas").val(cad);
	
	var cad = "";
	$.each(itemdefault.colores, function(i,item) {
		if (cad != "")
			cad = cad + ", ";
		cad = cad + item.color; 
	} );
	$("#colores").val(cad);
}
		
		if (valido) {
			var dato = {};
			dato.tag = $("#nuevotag").val();
			dato.estado = 0;
			itemdefault.tags.push(dato);
			dibujaTags();
		}	
		$("#nuevotag").val("");
	}
}

function borraTag(tag)
{
	var dato=null;
	$.each(itemdefault.tags, function(i,item) {
		if (item.tag==tag) {
			dato = item;
		}
	} );	

	if (dato) {
		itemdefault.tags.splice(gdatos.tags.indexOf(dato),1);		
	}
	dibujaTags();
}

function llenaNuevoTag()
{
    $("#nuevotag").autocomplete({
      source: extraeNombre(gdatos.tags, "tag")
    }); 	
}
