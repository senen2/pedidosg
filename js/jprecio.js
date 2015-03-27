/**
 * @author botpi
 */

function inicioPrecios()
{
	pagina = "pdprecios";
	$("#precio1").html("$" + precioPlan(1));
	$("#precio2").html("$" + precioPlan(2));
	$("#precio3").html("$" + precioPlan(3));
}

function servicioTel(ID)
{
	$("#precio"+ID).html("$" + (precioPlan(ID)+precioTel(ID)) );
}

function precioPlan(ID)
{
	switch (ID) {
		case 1:
			return 115;
		case 2:
			return 195;
		case 3:
			return 295;
		default:
			return 295;
	}
}

function precioTel(ID)
{
	if ($("#tel"+ID).is(':checked'))
		return 150;		
	else
		return 0;		
	
}

function comprar(ID)
{
	document.cookie = "IDplan=" + ID ;
	document.cookie = "precioPlan=" + precioPlan(ID);
	document.cookie = "precioTel=" + precioTel(ID);
}
