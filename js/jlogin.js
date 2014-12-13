/**
 * @author Carlos Botello
 */

function login()
{	
	$.ajax({
		url: "http://" + servidor + "/function/LeeUsuarioBN('" + $("#email").val() + "','" + $("#passwd").val() + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) { 
			if (response=="OK") {
				encabezado = "'" + $("#email").val() + "','" + $("#passwd").val() + "'";
				document.cookie = "encabezado=" + encabezado;
				document.cookie = "servidor=" + servidor;
				window.location.href="usuarios.html";	
			} 
		}
	});		
}

function logout()
{
	document.cookie = "IDusuario=";
	document.cookie = "IDempresa=";
	document.cookie = "empresa=";
	document.cookie = "encabezado='',''";
	IDempresa="";
	IDusuario="";
	encabezado="'',''";
	window.location.href="index.html";	
}

function logdefaults()
{
	document.cookie = "IDusuario=";
	document.cookie = "IDempresa=";
	document.cookie = "empresa=";
	document.cookie = "encabezado='',''";
	document.cookie = "servidor=" + servidor;
}

function grabaUsuario(response)
{
	if (response != null) {	
		encabezado = "'" + $("#email").val() + "','" + $("#passwd").val() + "'";
		document.cookie = "IDusuario=" + response.ID;
		document.cookie = "servidor=" + servidor;
		document.cookie = "encabezado=" + encabezado;
		document.cookie = "IDempresa=" + response.IDempresa;
		document.cookie = "empresa=" + response.nombreempresa;
		document.cookie = "IDproducto=''";
		document.cookie = "IDop=0";
		usuario = {};
		usuario.nivel = response.nivelusuario;
		usuario.nivelempresa = response.nivelempresa;
		if (pagina=='inicio')
			window.open(response.inicio, "_self");
		if (pagina=='indexRigols')
			window.open("emper.html", "_self");
	}
	else
		$("#aviso").show("slow");
}

function leeUsuario()
{
	encabezado = "'',''";
	encabezado = getCookie("encabezado");
	servidor = getCookie("servidor");
}

function chequeaYC()
{
	if (getCookie("yc")==1) {	
		encabezado = "'demo@themopp.com','demo'";
		document.cookie = "IDusuario=" + 228;
		document.cookie = "servidor=" + servidor;
		document.cookie = "encabezado=" + encabezado;
		document.cookie = "IDempresa=" + 4419;
		document.cookie = "empresa=" + 'demo';
		document.cookie = "IDproducto=''";
		document.cookie = "IDop=0";
		window.open("central.html", "_self");
	}
}

function leeDemo()
{
	encabezado = "'demo@themopp.com','todos'";
	document.cookie = "IDusuario=" + 117;
	document.cookie = "servidor=" + servidor;
	document.cookie = "encabezado=" + encabezado;
	document.cookie = "IDempresa=" + 2410;
	document.cookie = "empresa=" + 'demo';
	document.cookie = "IDproducto=''";
	document.cookie = "IDop=0";
	//document.cookie = "yc=0; domain=.rigols.com; path=/";
	//window.open("emper.html?ID=2410", "_self");
}

function actualizaEspacioLogin()
{
	if (empresa != null && empresa!="") {
		$('#nombrelog').html(empresa);
		$('#nombrelog').attr("href", "emper.html?ID=" + IDempresa);
		$("#login").addClass("DN"); 
		$("#logout").removeClass("DN");
	}
	else {
		$("#login").removeClass("DN");
		$("#logout").addClass("DN");  
	}
}

function chequeaDatos()
{
	$("#error").html("");
	if ($("#nombrenuevo").val()==""){
		$("#error").html("el nombre no puede estar vacio");
		$("#error").show();
		return;
	}
	if ($("#empresanuevo").val()==""){
		$("#error").html("empresa no puede estar vacio");
		$("#error").show();
		return;
	}
	if ($("#pais").val()=="0"){
		$("#error").html("debe seleccionar un pais");
		$("#error").show();
		return;
	}
	if (!IsEmail($("#emailnuevo").val())){
		$("#error").html("email invalido");
		$("#error").show();
		return;
	}
	if ($("#clave1nuevo").val() == ""){
		$("#error").html("la clave no puede estar vacia");
		$("#error").show();
		return;
	}
	if ($("#clave1nuevo").val() != $("#clave2nuevo").val()){
		$("#error").html("la claves deben ser iguales");
		$("#error").show();
		return;
	}

	$.ajax({
		url: "http://" + servidor + "/function/ChequeaEmail('" + $("#emailnuevo").val() + "','')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) { creaUsuario(response); }
	});		
}

function creaUsuario(response)
{
	if (response!="ok") {
		$("#error").html("el usuario ya existe");
		$("#error").show();
		return;		
	}

	if (typeof pagina == 'undefined')
			pagina = 'inicio';
	
	leeServidor();
	var datos = {};
	datos.email=$("#emailnuevo").val();
	datos.clave=$("#clave1nuevo").val();
	datos.nombre=$("#nombrenuevo").val();
	datos.empresa=$("#empresanuevo").val();
	datos.telefono=$("#telefononuevo").val();
	datos.pais = "EC";
//	datos.id=$("#idcrea").val();		
	$.post('http://' + servidor + '/functiond/RegistraUsuarioPorPagina()?pagina=' + pagina, JSON.stringify(datos))	
	 	.always(function(){
			encabezado = "'" + datos.email + "','" + datos.clave + "'";
			$("#email").val(datos.email);
			$("#passwd").val(datos.clave);
			login();
	 	});
}

function getCookie(c_name)
{
	var c_value, c_start, c_end;
	 c_value = document.cookie;
	c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1) {
		c_start = c_value.indexOf(c_name + "="); }
	if (c_start == -1) {
		c_value = null; }
	else  {
		c_start = c_value.indexOf("=", c_start) + 1;
		c_end = c_value.indexOf(";", c_start);
		if (c_end == -1)  {
			c_end = c_value.length;  }
		c_value = unescape(c_value.substring(c_start,c_end));}
	
	return c_value;
}

function IsEmail(email) 
{
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
