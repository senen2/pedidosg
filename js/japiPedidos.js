/**
 * @author botpi
 */
    
function LeeLenguajeP(lenguaje, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/LeeLenguajeP(" + encabezado + ",'" + lenguaje + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(funcion(response));
		}
	});	
}
    
function loginP(comovendedor, funcion)
{
	var ven = comovendedor ? 1 : 0;
	$.ajax({
		url: "http://" + servidor + "/function/LoginP(" + encabezado + "," + ven + ",'" + idioma + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}

function AgregaClienteP(datos) //falta
{
	var datos = {};
	datos.nombre = "";		

	$.post( 'http://' + servidor + '/functiond/AgregaClienteP(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
	 	.always(function(){
	 	});
}

function CreaCuentaP(nombre, email, empresa, clave, funcion)
{
	$.ajax({
		url: 'http://' + servidor + "/function/CreaCuentaP('botpi@botpi.com','123','','P','" +  empresa + "','" + nombre + "','" + email + "','" +  clave + "','" +  idioma + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}
    
function leeCuentaP(funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/LeeCuentaP(" + encabezado + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}

function EliminaTokenP(funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/EliminaTokenP(" + encabezado + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion();
		}
	});	
}

// ---------------------------- productos

function AgregaListaReferenciasMemP(IDcatalogo, referencia, nombre, descripcion, refs)
{
	var datos = {};
	dato["IDcatalogo"] = IDcatalogo;
	dato["referencia"] = referencia;
	dato["nombre"] = nombre;
	dato["descripcion"] = descripcion;
	refs.push(datos);
}

function AgregaListaReferenciasP(datos)
{
	$.post( 'http://' + servidor + '/functiond/AgregaListaReferenciasP(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
	 	.always(function(){
	 	});
}

function AgregaReferenciaP(IDcuentaCat, referencia, barcode, nombre, precio, pvm, descripcion, urlfoto, tallas, colores, tags, funcion)
{
	var datos = {};
	datos["IDcuentacat"] = IDcuentaCat;
	datos["referencia"] = referencia;
	datos["barcode"] = barcode;
	datos["nombre"] = nombre;
	datos["precio"] = precio;
	datos["pvm"] = pvm;
	datos["descripcion"] = descripcion;		
	datos["urlfoto"] = urlfoto;
	datos["tallas"] = tallas;
	datos["colores"] = colores;
	datos["tags"] = tags;

	$.post( 'http://' + servidor + '/functiond/AgregaReferenciaP(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
	 	.always(function(response){
	 		if (funcion)
	 			funcion(IDcuentaCat, referencia);
	 		//ListaProductoxReferenciaP(IDcuentaCat, referencia, funcion);
	 	});
}

function ModificaReferenciaP(IDproducto, IDcuentaprov, referencia, barcode, nombre, precio, pvm, descripcion, tags, tallas, colores, funcion)
{
	var datos = {};
	datos["IDproducto"] = IDproducto;
	datos["IDcuentaprov"] = IDcuentaprov;
	datos["referencia"] = referencia;
	datos["barcode"] = barcode;
	datos["nombre"] = nombre;
	datos["precio"] = precio;
	datos["pvm"] = pvm;
	datos["descripcion"] = descripcion;
	datos["tags"]=tags;
	datos["tallas"]=tallas;
	datos["colores"]=colores;

	$.post( 'http://' + servidor + '/functiond/ModificaReferenciaP(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
	 	.always(function(){
	 		funcion();
	 	});
}

function ModificaCampoProductoP(IDproducto, campo, valor)
{
	var datos = {};
	datos["IDproducto"] = IDproducto;
	datos["campo"] = campo;
	datos["valor"] = valor;

	$.post( 'http://' + servidor + '/functiond/ModificaCampoProductoP(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos));

/*
	$.ajax({
		url: "http://" + servidor + "/function/ModificaCampoProductoP(" + encabezado + "," + IDproducto + ",'" + campo + "','" + valor + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp"
	});
			*/
}

function ListaProductoxReferenciaP(IDcuentaCat, referencia, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/ListaProductoxReferenciaP(" + encabezado + ",'" + referencia + "'," + IDcuentaCat + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			IDproducto = response.producto.ID;
			funcion(IDproducto, response)	
		}
	});	
}

function AgregaTagProductoP(IDproducto, tag)
{
	$.ajax({
		url: "http://" + servidor + "/function/AgregaTagProductoP(" + encabezado + "," + IDproducto + ",'" + tag + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp"
	});			
}

function EliminaTagProductoP(IDproducto, tag)
{
	$.ajax({
		url: "http://" + servidor + "/function/EliminaTagProductoP(" + encabezado + "," + IDproducto + ",'" + tag + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp"
	});			
}

function ListaProductoP(IDproducto, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/ListaProductoP(" + encabezado + "," + IDproducto + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion (IDproducto, response);
		}
	});	
}

function ActivarReferenciaP(referencia, activar)
{
	var datos = {};
	datos["referencia"]=referencia;
	dato["activar"]=activar;
	$.post( 'http://' + servidor + '/functiond/ActivarReferenciaP(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
	 	.always(function(){
	 	});
}

function SubirFotoReferenciaP(referencia) //falta
{
	$.ajax({
		url: "http://" + servidor + "/function/SubirFotoReferenciaP(" + encabezado + ",'" + getCookie("email") + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {	
		}
	});	
}

function ListaProductosxPaginaP(IDcatalogo, desde, nitems, filtros, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/ListaProductosxPaginaP(" 
			+ encabezado + "," + IDcatalogo  + "," + desde  + "," + itemsxpag + ",'" + filtros + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function(response ) {	
			funcion(response);
		}
	});	
}

function ListaProductosxEmpresaP(empresa, desde, nitems, filtros, idioma, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/ListaProductosxEmpresaP(" + encabezado + ",'" + empresa  
			+ "'," + desde  + "," + nitems + ",'" + filtros + "','" + idioma + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function(response ) {	
			funcion(response);
		}
	});	
}

function BuscarTag(tag, IDcuentaCat, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/BuscarTagP(" + encabezado + ",'" + tag + "'," + IDcuentaCat + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);	
		}
	});	
}
    
function TomaIDxReferenciaP(IDcuentaCat, referencia, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/TomaIDxReferenciaP(" + encabezado + "," + IDcuentaCat + ",'" + referencia + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			IDproducto = response;
			funcion(IDproducto);
		}
	});	
}
    
function TomaUltimoIDproductoP(funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/TomaUltimoIDproductoP(" + encabezado + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			IDproducto = response;
			funcion(IDproducto);
		}
	});	
}

function ListaProductosDesactivadosP(funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/ListaProductosDesactivadosP(" + encabezado + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			if (funcion!="")
				funcion(response);
		}
	});	
}

function ActivaProductoP(IDproducto)
{
	$.ajax({
		url: "http://" + servidor + "/function/ActivaProductoP(" + encabezado + "," + IDproducto + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp"
	});	
}

function AgregarAlCatalogoP(IDcuenta, IDproducto, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/AgregarAlCatalogoP(" + encabezado + "," + IDcuenta + "," + IDproducto + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion();	
		}
	});	
}

// ---------------------------- pedidos

function AgregarPedidoP(datos, entregado, funcion)
{
	$.post( 'http://' + servidor + '/functiond/AgregarPedidoP(' + encabezado + "," + entregado + ')?pagina=' + pagina, JSON.stringify(datos))
	 	.always(function(){
	 		funcion();
	 	});
}

function LeerPedidoP(IDpedido)
{
	$.ajax({
		url: "http://" + servidor + "/function/LeerPedidoP(" + encabezado + "," + IDpedido + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {	
		}
	});	
}

function AgregarPedidoCabP(IDcuenta, cliente, email, modo, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/AgregarPedidoCabP(" + encabezado + "," + IDcuenta + ",'" + cliente + "','" + email+ "','" + modo + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {	
			if (funcion)
				funcion(response);
		}
	});		
}

function CancelarPedidoP(IDpedido, modo, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/CancelarPedidoP(" + encabezado + "," + IDpedido + ",'" + modo + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {	
			if (funcion)
				funcion(response);
		}
	});	
}

function LeeVariedadesP(IDproducto, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/LeeVariedadesP(" + encabezado + "," + IDproducto + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {	
			if (funcion)
				funcion(response);
		}
	});	
}

function LeeVariedadesxReferenciaP(referencia, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/LeeVariedadesxReferenciaP(" + encabezado + ",'" + referencia + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {	
			if (funcion)
				funcion(response);
		}
	});	
}

function LeeVariedadesxBaseP(IDproductobase, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/LeeVariedadesxBaseP(" + encabezado + "," + IDproductobase + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {	
			if (funcion)
				funcion(response);
		}
	});	
}
    
function LeePedidosP(modo, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/LeePedidosP(" + encabezado + ",'" + modo + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}
    
function LeePedidoDetP(IDpedido, modo, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/LeePedidoDetP(" + encabezado + "," + IDpedido + ",'" + modo + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}
   
function EntregaDespachoP(ID)
{
	$.ajax({
		url: "http://" + servidor + "/function/EntregaDespachoP(" + encabezado + ',' + ID + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
		}
	});	
}
     
function ActualizaDespachoLineaP(ID, entregado, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/ActualizaDespachoLineaP(" + encabezado + ',' + ID + ',' + entregado +  ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			if (funcion!="")
				funcion(response);
		}
	});	
}
   
function AprobarPedidoP(ID, aprobado)
{
	$.ajax({
		url: "http://" + servidor + "/function/AprobarPedidoP(" + encabezado + ',' + ID + ',' + aprobado + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
		}
	});	
}

function AgregaAlPedidoP(IDpedido, IDvariedad, cantidad, precio, precioprod, modo, procesos, funcion)
{
	datos = {};
	datos.IDpedido = IDpedido;
	datos.IDvariedad = IDvariedad;
	datos.cantidad = cantidad;
	datos.precio = precio;
	datos.precioprod = precioprod;
	datos.modo = modo;
	datos.procesos = procesos;
	$.post( 'http://' + servidor + '/functiond/AgregaAlPedidoP(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
	 	.always(function(){
	 		if (funcion)
	 			LeePedidoDetP(IDpedido, modo, funcion)
	 	});
	
}

function ModificaRenglonPedidoP(IDpedido, IDdetped, cantidad, precio, precioprod, talla, color, modo, procesos, funcion)
{
	datos = {};
	datos.IDpedido = IDpedido;
	datos.IDdetped = IDdetped;
	datos.cantidad = cantidad;
	datos.precio = precio;
	datos.precioprod = precioprod;
	datos.talla = talla ? talla : "";
	datos.color = color ? color : "";
	datos.modo = modo;
	datos.procesos = procesos;
	$.post( 'http://' + servidor + '/functiond/ModificaRenglonPedidoP(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
	 	.always(function(){
	 		if (funcion)
	 			LeePedidoDetP(IDpedido, modo, funcion)
	 	});	
}

function EliminaVariedadPedidoP(IDdetped, modo, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/EliminaVariedadPedidoP(" + encabezado + ',' + IDdetped + ",'" + modo + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			if (funcion!="")
				funcion(response);
		}
	});		
}

function GrabaNotasPedidoP(IDpedido, notas)
{
	datos = {};
	datos.IDpedido = IDpedido;
	datos.notas = notas;
	$.post( 'http://' + servidor + '/functiond/GrabaNotasPedidoP(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos));
}
   
function EnviarEmailPedidoP(ID, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/EnviarEmailPedidoP(" + encabezado + ',' + ID + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			if (funcion)
				funcion();
		}
	});	
}

function ProbarEmailPedidoP(ID, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/ProbarEmailPedidoP(" + encabezado + ',' + ID + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			if (funcion)
				funcion(response);
		}
	});	
}

// ----------------------- carro

function LeerCarroP(IDcuentaCat, dibujaCarro)
{
	$.ajax({
		url: "http://" + servidor + "/function/LeerCarroP(" + encabezado + "," + IDcuentaCat + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			dibujaCarro(response)	
		}
	});		
}
    
function AgregarAlCarroP(IDproducto, IDcuentacli, IDcuentaven, talla, color, cantidad, precio, procesos, funcion)
{
	var datos={};
	datos.IDproducto = IDproducto;
	datos.IDcuentacli = IDcuentacli;
	datos.IDcuentaven = IDcuentaven;
	datos.talla = talla;
	datos.color = color;
	datos.cantidad = cantidad;
	datos.precio = precio;
	datos.procesos = procesos;
	$.post( 'http://' + servidor + '/functiond/AgregarAlCarroP(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
	 	.always(function(){
	 		funcion();
	 	});
}
    
function BorraDelCarroP(ID, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/BorraDelCarroP(" + encabezado + "," + ID + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion();
		}
	});	
}
    
function CambioEnCarroP(ID, cantidad)
{
	$.ajax({
		url: "http://" + servidor + "/function/CambioEnCarroP(" + encabezado + "," + ID + "," + cantidad + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
		}
	});	
}
   
//----------------------------------- Asociados
    
function LeeAsociadosP(modo, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/LeeAsociadosP(" + encabezado + ",'" + modo + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}
    
function ActivaAsociadoP(ID, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/ActivaAsociadoP(" + encabezado + ',' + ID + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			if (funcion!="")
				funcion(response);
		}
	});	
}

function AgregaAsociacionP(email, nombre, relacion, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/AgregaAsociacionP(" + encabezado + ",'" + email + "','" + nombre + "','" + relacion + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			if (funcion!="")
				funcion(response);
		}
	});	
}

// --------------------------------- Catalogos
      
function LeeCatalogosP(funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/LeeCatalogosP(" + encabezado + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}
    
function ActivaCatalogoP(ID, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/ActivaCatalogoP(" + encabezado + ',' + ID + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			if (funcion!="")
				funcion(response);
		}
	});	
}

function AgregaCatalogoP(nombre, titulo, tags, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/AgregaCatalogoP(" + encabezado + ",'" + nombre + "','" + titulo + "','" + tags + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			if (funcion!="")
				funcion(response);
		}
	});	
}

function ModificaCatalogoP(ID, nombre, titulo, tags, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/ModificaCatalogoP(" + encabezado + "," + ID + ",'" + nombre + "','" + titulo + "','" + tags + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			if (funcion!="")
				funcion(response);
		}
	});	
}

function EliminaCatalogoP(ID, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/EliminaCatalogoP(" + encabezado + "," + ID + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			if (funcion!="")
				funcion(response);
		}
	});	
}

function EliminaProductoP(ID, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/EliminaProductoP(" + encabezado + "," + ID + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			if (funcion!="")
				funcion(ID, response);
		}
	});	
}

function ReordenaProductosP(datos)
{
	$.post( 'http://' + servidor + '/functiond/ReordenaProductosP(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
	 	.always(function(){
	 	});
}

// ------------------------- Contacto


function RecibeContactoP(nombre, email, mensaje)
{
	datos = {};
	datos["nombre"]=nombre;
	datos["email"]=email;
	datos["mensaje"]=mensaje;
	$.post( 'http://' + servidor + '/functiond/RecibeContactoP(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
	 	.always(function(){
	 	});
}

function CambiarClaveP(claveactual, clavenueva, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/CambiarClaveP(" + encabezado + ",'" + claveactual + "','" + clavenueva + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			if (funcion)
				funcion(response);
		}
	});	
}

function GuardarInfoContactoP(direccion, telefono)
{
	
	datos = {};
	datos.direccion = direccion.replace("#", "No");
	$.post( 'http://' + servidor + '/functiond/GuardarInfoContactoP(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos));	
}

function GuardarFormaPagoP(formapago)
{
	datos = {};
	datos.formapago = formapago;
	$.post( 'http://' + servidor + '/functiond/GuardarFormaPagoP(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos));	
}
/*
function CreaProductoxUrlP(url)
{
	$.ajax({
		url: "http://" + servidor + "/function/CreaProductoxUrlP(" + encabezado + ",'" + url + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp"
	});	
}
*/
// --------------------------- imagenes

function TomaImagenesxUrlP()
{
	$.ajax({
		url: "http://" + servidor + "/function/TomaImagenesxUrlP(" + encabezado + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp"
	});	
}

function CambiaUrlFotoP(IDproductobase, urlfoto, funcion)
{
	var datos = {};
	datos["IDproductobase"] = IDproductobase;
	datos["urlfoto"] = urlfoto;

	$.post( 'http://' + servidor + '/functiond/CambiaUrlFotoP(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
	 	.always(function(response){
	 		if (funcion)
	 			funcion(response);
	 	});
} 

// ------------------------------- visitas
  
function LeeVisitasSI(funcion)
{
	fecha = '2015-02-26';
	$.ajax({
		url: "http://" + servidor + "/function/LeeVisitasSI(" + encabezado + ",'" + fecha + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(funcion(response));
		}
	});	
}
