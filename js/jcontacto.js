/**
 * @author Andres Botello
 */
function inicioContacto()
{
	pagina = "pdcontacto";
	leeServidor();
	encabezado = getCookie("encabezado");
	if (!(encabezado==null | encabezado=="'','',''"))
		leeCuentaP(refrescar);
	else
		refrescar(null, "");
}

function refrescar(cuenta)
{
	$("#aviso").hide();
	$("#gracias").hide();
	dibujaTitulos(cuenta.lenguaje);
	dibujaLogin(cuenta);
	if (typeof cuenta!='undefined' && cuenta!=null ) {
		$("#nombre").val(cuenta.usuario);
		$("#email").val(cuenta.email);
	}	
}

function enviarMensaje()
{
	if ($("#nombre").val()!="" & IsEmail($("#email").val()) & $("#mensajecontacto").val()!="") {
		RecibeContactoP($("#nombre").val(), $("#email").val(), $("#mensajecontacto").val(), gracias);
		$("#gracias").show();			
		$("#aviso").hide();
	}
	else
		$("#aviso").show();
}

function salir()
{
	history.back(-1);
}
