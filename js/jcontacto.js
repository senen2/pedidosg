/**
 * @author Andres Botello
 */
function inicioContacto()
{
	pagina = "pdeditLogo";
	leeServidor();
	encabezado = getCookie("encabezado");
	if (!(encabezado==null | encabezado=="'','',''"))
		leeCuentaP(refrescar)
	else
		refrescar(null, "");
}

function refrescar(cuenta)
{
	$("#aviso").hide();
	$("#gracias").hide();
	dibujaLogin(cuenta);
	if (typeof cuenta!='undefined' && cuenta!=null ) {
		$("#nombre").val(cuenta.usuario);
		$("#email").val(cuenta.email);
	}	
}

function enviarMensaje()
{
	if ($("#nombre").val()!="" & IsEmail($("#email").val()) & $("#mensaje").val()!="") {
		RecibeContactoP($("#nombre").val(), $("#email").val(), $("#mensaje").val(), gracias);
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
