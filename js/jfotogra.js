
var umbralR=255, umbralG=255, umbralB=255,
	margenR, margenG, margenB,
    imageData, pixels, numPixels,
    canvas, ctx, image,
    IDproductobase="2413",
    inicio=true;					

var canvasOffset;
var offsetX;
var offsetY;
var startX,startY,mouseX,mouseY;
var isDown=false;
var imageOpacity=1;
var cuadro;
var backCanvas, backCtx;
var puntosg, puntosm;

var pixelsder, pixelsizq;
var ider=0, isup=0;
var parx=10, pary=0, mueveparx=true;
var dibujandoLinea=false;
var lineas=[];
var magenta="#F25AF1", verde="#58EE59";
//var magenta="#F27AF1", verde="#49D34C";

function nada() {}

function inicioFotogra()
{
	encabezado = getCookie("encabezado");
	if (encabezado==null || encabezado=="" || encabezado=="'',''")
		encabezado="'','',''";
	pagina = "pdcatalogo";
	ayuda = "http://gtienda.com/wiki/mediawiki-1.23.5/index.php?title=Implementacion&section=#Subir_imagenes_de_los_productos";
	leeServidor();
	//leeIdioma();

    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    ctx.strokeStyle="black";
    ctx.lineWidth=3;
	
	// create backup canvas
	backCanvas = document.getElementById('backCanvas');
	backCtx = backCanvas.getContext('2d');		

    $("#myCanvas").mousemove(function(e){MouseMove(e);});
    $("#myCanvas").mousedown(function(e){MouseDown(e);});
    $("#myCanvas").mouseup(function(e){MouseUp(e);});
    canvas.onmousewheel = MouseWheel;

    recargar();
}

function recargar()
{
	image = new Image();
	image.src = "3D/" + $("#imagen").val()+".jpg";
	IDproductobase=$("#imagen").val();
	$(image).load(function() {
		canvas.width = image.width;
		canvas.height = image.height;
		backCanvas.width = canvas.width;
		backCanvas.height = canvas.height;
		
		ctx.drawImage(image, 0, 0); 
	    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	    pixels = imageData.data;
	    pixelsder = imageData.data;
	    pixelsizq = imageData.data;
	    numPixels = imageData.width * imageData.height;
		backCtx.drawImage(image, 0,0); // respaldo
		mezclaColores();

	    canvasOffset = $(canvas).offset();
		offsetX=canvasOffset.left;
		offsetY=canvasOffset.top;
	});				
}

function mezclaColores()
{
	var j, k=ider*4, 
		backImageData = backCtx.getImageData(0, 0, canvas.width, canvas.height),
	 	p = backImageData.data;
	
	for (var i = 0; i < numPixels; i++) {
		j=i*4;
		imageData.data[j+1]=p[j+1];
	}
	ctx.putImageData(imageData, 0, 0);
	//cruz(200,200);
	$("#ider").html(ider);			
	$("#isup").html(isup);			
}

function izq()
{
	ider-=10;
	backCtx.translate(-10,0);
	backCtx.drawImage(image, 0,0);
	mezclaColores();
}

function der()
{
	ider+=10;
	backCtx.translate(10,0);
	backCtx.drawImage(image, 0,0);
	mezclaColores();
}

function sube()
{
	isup-=10;
	backCtx.translate(0,-10);
	backCtx.drawImage(image, 0,0);
	mezclaColores();
}

function baja()
{
	isup+=10;
	backCtx.translate(0,10);
	backCtx.drawImage(image, 0,0);
	mezclaColores();
}

// ------------------------------ otro

function deshacer()
{
	ctx.drawImage(backCanvas, 0,0);
	image.src = backCanvas.toDataURL();	
}

function desconectaEventos()
{
    $("#seleccionaColor").css("color", "black");
	$(canvas).unbind( "click" );	

    $("#seleccionaRegion").css("color", "black");
    $("#myCanvas").unbind( "mousedown" );
    $("#myCanvas").unbind( "mousemove" );
    $("#myCanvas").unbind( "mouseup" );
    $("#myCanvas").unbind( "mouseout" );

    $("#bordeDer").css("color", "black");
    $("#bordeIzq").css("color", "black");
    $("#bordeSup").css("color", "black");
    $("#bordeInf").css("color", "black");

 	if(!inicio)
    	ctx.drawImage(image,0,0);	
    inicio = false;
		
}

function guardar()
{
    canvas.toBlob(
    	function(blob) {
	  		enviar(blob, nada);
		}
		, "image/png"
	);		
}

function enviar(imagen, next)
{
    var formData = new FormData();
    formData.append("upload", imagen, "prueba.jpg");
	formData.append("ID", IDproductobase);	
    var a = encabezado.split(',');
	formData.append("email", a[0].replace("'","").replace("'",""));	
	formData.append("token", a[2].replace("'","").replace("'",""));	
    
    var client = new XMLHttpRequest();
    client.onreadystatechange = function(ev){
        if (client.readyState == 4) {
		    next();
        }
    };
    
    client.open("post", "http://" + servidor + "/saveprod", true);
    client.send(formData);
}

// --------------  cursor

function cruz(x,y,color)
{
	dibujacruz(x,y,magenta);
	dibujacruz(x+parx,y+pary,verde);
}

function dibujacruz(x, y, color)
{
	ctx.globalAlpha=1;
	ctx.strokeStyle=color;
    ctx.beginPath();
    ctx.moveTo(x-5, y);
    ctx.lineTo(x+5, y);
    ctx.moveTo(x, y-5);
    ctx.lineTo(x, y+5);
    ctx.stroke();
    ctx.globalAlpha=1;
	
}

function MouseDown(e){
  e.stopPropagation();
  e.preventDefault();
  mouseX=parseInt(e.clientX-offsetX);
  mouseY=parseInt(e.clientY-offsetY);

  // Put your mousedown stuff here
  startX=mouseX;
  startY=mouseY;
  isDown=true;
  //backCtx.drawImage(image, 0,0); // respaldo
 	if (dibujandoLinea) {
    	puntosg.push({x: mouseX, y: mouseY});
    	puntosm.push({x: mouseX+parx, y: mouseY+pary}); 		
 	}
    	
	mueveparx = !mueveparx;    	
}

function MouseUp(e){
  e.stopPropagation();
  e.preventDefault();

  // Put your mouseup stuff here
  isDown=false;
}

function MouseMove(e){
	//if(!isDown){return;}
	e.stopPropagation();
	e.preventDefault();
	mouseX=parseInt(e.clientX-offsetX);
	mouseY=parseInt(e.clientY-offsetY);

    // Put your mousemove stuff here
    regeneraDibujo();
 }

function regeneraDibujo()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(image,0,0);
    cruz(mouseX, mouseY);
	dibujaLineas();	
}

function dibujaLineas()
{
	$.each(lineas, function(i,linea) {
		dibujaLinea(linea.g, magenta);
		dibujaLinea(linea.m, verde);
	});	
}

function dibujaLinea(linea, color)
{
	if (linea.length>0) {
	    ctx.lineWidth=3;
	    ctx.beginPath();
	    ctx.strokeStyle=color;
	    ctx.moveTo(linea[0].x, linea[0].y);
		$.each(linea, function(i,punto) {
			ctx.lineTo(punto.x, punto.y);
		});
	    ctx.stroke();
	}	
}

function MouseWheel(e){
	//if(!isDown){return;}
	e.stopPropagation();
	e.preventDefault();
	var wheel = event.wheelDelta/120;
	if (mueveparx)
		parx+=wheel;
	else
		pary+=wheel;

    // Put your mousemove stuff here
    regeneraDibujo();
    //ctx.clearRect(0,0,canvas.width,canvas.height);
    //ctx.drawImage(image,0,0);
    //cruz(mouseX, mouseY);
 }

function activaLinea()
{
	if (dibujandoLinea) {
		dibujandoLinea=false;
	    $("#activaLinea").css("color", "black");

	}
	else {
		puntosg=[];
		puntosm=[];
		lineas.push({g:puntosg, m:puntosm});
		dibujandoLinea=true;
	    $("#activaLinea").css("color", "red");
	}
}

function guardarLineas()
{
	GrabaLineasFG(lineas);
}

function leerLineas()
{
	LeeLineasFG(tomaLineas);
}
	
function tomaLineas(datos)
{
	lineas = JSON.parse(datos[0].linea);
	regeneraDibujo();
}
