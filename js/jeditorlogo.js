/**
 * @author Andres Botello
 */
function inicioEditLogo()
{
	encabezado = getCookie("encabezado");
	if (encabezado==null || encabezado=="'','',''" || encabezado.split(',')[0]=="''") {
		document.cookie = "pagpend=" + document.URL;			
		window.location.assign("registro.html");		
	}
		
	pagina = "pdeditLogo";
	ayuda = "http://gtienda.com/wiki/mediawiki-1.23.5/index.php?title=Implementacion&section=#Subir_imagenes_de_los_productos";
	leeServidor();
	leeCuentaP(refrescar);
}

function refrescar(datos)
{
	gdatos=datos;
	dibujaMenu();
	dibujaLogin(gdatos);
	dibujaTitulos(gdatos.lenguaje);
	$("#formaLogo").attr("action", "http://" + servidor + "/uploadlogo");
	$("#direccion").val(gdatos.direccion);
	$("#telefono").val(gdatos.telefono);
	$("#formapago").val(gdatos.formapago);
	$("#busy").hide();
	$("#logo").attr("src", imagedir + 'logos/' + datos.ID + '.jpg');
	$("#IDimagen").val(datos.ID);
}


function iframeFinal()
{
  	$("#hiddenFrame").attr("onload",'finalSubirImagen();')
  	$("#busy").show();

}

function finalSubirImagen()
{
	$("#busy").hide();
	//window.location.assign("editorproducto.html?ID=" + IDproducto)
	//refrescar();
	location.reload(true);
}

function cambiarClave()
{
	if ($("#clave1nuevo").val()=="") {
		$("#error").html("la contraseña no puede estar vacia");
		$("#error").show();				
		return;
	}
	if ($("#clave1nuevo").val()=="") {
		$("#error").html("la nueva contraseña no puede estar vacia");
		$("#error").show();				
		return;
	}
	if ($("#clave1nuevo").val() != $("#clave2nuevo").val()) {
		$("#error").html("las nuevas contraseñas deben ser iguales");
		$("#error").show();				
		return;
	}
	CambiarClaveP($("#claveactual").val(), $("#clave1nuevo").val(), verifica);	
}

function verifica(response)
{
	if (response!="ok")
		//$("#aviso").html("La contraseña no se pudo cambiar");
		alert("La contraseña no se pudo cambiar");
	else {
		alert("la clave fue cambiada con exito")
		$("#claveactual").val("");
		$("#clave1nuevo").val("");
		$("#clave2nuevo").val("");
	}
}

function guardarInfoContacto()
{
	
	GuardarInfoContactoP($("#direccion").val(), $("#telefono").val());
}

function guardarFormaPago()
{
	GuardarFormaPagoP($("#formapago").val());
	
}
