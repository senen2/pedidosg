
var umbralR=255, umbralG=255, umbralB=255,
	margenR, margenG, margenB,
    imageData, pixels, numPixels,
    canvas, ctx, image,
    IDproductobase="1887",
    inicio=true;					

var canvasOffset;
var offsetX;
var offsetY;
var startX,startY,mouseX,mouseY;
var isDown=false;
var lines=[];
var imageOpacity=1;
var cuadro;
var backCanvas, backCtx;

function nada() {}

function inicioEditorImagen()
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
    ctx.strokeStyle="green";
    ctx.lineWidth=3;
	
	// create backing canvas
	backCanvas = document.getElementById('backCanvas');
	backCanvas.width = canvas.width;
	backCanvas.height = canvas.height;
	backCtx = backCanvas.getContext('2d');		

    recargar();
    defineColor();
}

function recargar()
{
	image = new Image();
	image.src = "imgprod/" + $("#imagen").val() + ".jpg";
	IDproductobase=$("#imagen").val();
	$(image).load(function() {
		ctx.drawImage(image, 0, 0); 
	    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	    pixels = imageData.data;
	    numPixels = imageData.width * imageData.height;
	});				
}

function defineColor()
{	    
	desconectaEventos();
    $("#seleccionaColor").css("color", "red");
	$(canvas).click(function(e) {		
	    canvasOffset = $(canvas).offset();
		offsetX=canvasOffset.left;
		offsetY=canvasOffset.top;
	    var canvasX = Math.floor(e.pageX-canvasOffset.left);
	    var canvasY = Math.floor(e.pageY-canvasOffset.top);
	    var index = pixelIndex(canvasX, canvasY, imageData.width);

	    umbralR = pixels[index];
	    umbralG = pixels[index+1];
	    umbralB = pixels[index+2];
	
		defineUmbrales();
	});					
}

function defineUmbrales()
{
	margenR = $("#margen").slider("value");
	margenG = $("#margen").slider("value");
	margenB = $("#margen").slider("value");

    $("#colorSel").attr("style","fill:rgb(" + umbralR + "," + umbralG + "," + umbralB + ")");
    $("#colorSel2").attr("style","fill:rgb(" + colorInf(umbralR, margenR) + "," + colorInf(umbralG, margenG) + "," + colorInf(umbralB, margenB) + ")");
    $("#colorSel1").attr("style","fill:rgb(" + colorSup(umbralR, margenR) + "," + colorSup(umbralG, margenG) + "," + colorSup(umbralB, margenB) + ")");	
	$("#defineColor").show();	
}

function colorSup(color, margen)
{
	color += margen;
	if (color>255) color=255;
	return color;
}

function colorInf(color, margen)
{
	color -= margen;
	if (color<0) color=0;
	return color;
}

function quitaColor()
{
	var j, x, y;
		
	for (var i = 0; i < numPixels; i++) {
		j=i*4;
		x = i%imageData.width;
		y = Math.floor(i/imageData.width);
		if (x>=cuadro.x1 & x<=cuadro.x2 & y>=cuadro.y1 & y<=cuadro.y2)
	        if (esColor(pixels[j], pixels[j+1], pixels[j+2])) {
	        	pixels[j] = 255;
	        	pixels[j+1] = 255;
	        	pixels[j+2] = 255;
	        }
	}			
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.putImageData(imageData, 0, 0);
    image.src = canvas.toDataURL();	
}
	
function conservaColor()
{
	var j;

	for (var i = 0; i < numPixels; i++) {
		j=i*4;
		x = i%imageData.width;
		y = Math.floor(i/imageData.width);
		if (x>=cuadro.x1 & x<=cuadro.x2 & y>=cuadro.y1 & y<=cuadro.y2)
	        if (!esColor(pixels[j], pixels[j+1], pixels[j+2])) {
	        	pixels[j] = 255;
	        	pixels[j+1] = 255;
	        	pixels[j+2] = 255;
        }
	};	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.putImageData(imageData, 0, 0);
    image.src = canvas.toDataURL();	
}

function pixelIndex(x, y, width)
{
	return ((y - 1) * width + x - 1) * 4;	
}

function esColor(r,g,b)
{
	return Math.abs(r-umbralR)<=margenR & Math.abs(g-umbralG)<=margenG & Math.abs(b-umbralB)<=margenB;
}

// -----------------------------

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

// ----------------------- Rectangulo

function seleccionaRegion()
{
	desconectaEventos();
    $("#seleccionaRegion").css("color", "red");
    $("#myCanvas").mousedown(function(e){handleMouseDown(e);});
    $("#myCanvas").mousemove(function(e){handleMouseMove(e);});
    $("#myCanvas").mouseup(function(e){handleMouseUp(e);});
    $("#myCanvas").mouseout(function(e){handleMouseUp(e);});
}

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

// ---------------------- Cuadro


function drawLines(toX,toY){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawTheImage(image,imageOpacity);
    drawRect({x1:startX,y1:startY,x2:mouseX,y2:mouseY});
}

function drawTheImage(img,opacity){
    ctx.globalAlpha=opacity;
    ctx.drawImage(img,0,0);
    ctx.globalAlpha=1.00;
}

function drawRect(line){
    ctx.beginPath();
    ctx.moveTo(line.x1, line.y1);
    ctx.lineTo(line.x2, line.y1);
    ctx.lineTo(line.x2, line.y2);
    ctx.lineTo(line.x1, line.y2);
    ctx.lineTo(line.x1, line.y1);
    ctx.stroke();
}

function handleMouseDown(e){
  e.stopPropagation();
  e.preventDefault();
  mouseX=parseInt(e.clientX-offsetX);
  mouseY=parseInt(e.clientY-offsetY);

  // Put your mousedown stuff here
  startX=mouseX;
  startY=mouseY;
  isDown=true;

  backCtx.drawImage(image, 0,0); // respaldo

}

function handleMouseUp(e){
  e.stopPropagation();
  e.preventDefault();

  // Put your mouseup stuff here
  isDown=false;
  var a;
  if (startX>mouseX) {
  	a = startX;
  	startX=mouseX;
  	mouseX=a;
  }
  if (startY>mouseY) {
  	a = startY;
  	startY=mouseY;
  	mouseY=a;
  }
  if (mouseX>=imageData.width) mouseX=imageData.width-1;
  if (mouseY>=imageData.height) mouseY=imageData.heigth-1;

  lines.push({x1:startX,y1:startY,x2:mouseX,y2:mouseY});
  cuadro={x1:startX,y1:startY,x2:mouseX,y2:mouseY};
}

function handleMouseMove(e){
  if(!isDown){return;}
  e.stopPropagation();
  e.preventDefault();
  mouseX=parseInt(e.clientX-offsetX);
  mouseY=parseInt(e.clientY-offsetY);

  // Put your mousemove stuff here
  drawLines(mouseX,mouseY);
}

// ---------------------- Bordes

function bordeDer()
{
	desconectaEventos();
    $("#bordeDer").css("color", "red");
    $("#myCanvas").mousedown(function(e){bordeMouseDown(e);});
    $("#myCanvas").mousemove(function(e){bordeMouseMove(e);});
    $("#myCanvas").mouseup(function(e){bordeMouseUp(e);});
    $("#myCanvas").mouseout(function(e){bordeMouseUp(e);});
}

function bordeIzq()
{
	desconectaEventos();
    $("#bordeIzq").css("color", "red");

}

function bordeSup()
{
	desconectaEventos();
    $("#bordeSup").css("color", "red");

}

function bordeInf()
{
	desconectaEventos();
    $("#bordeInf").css("color", "red");

}

function bordeMouseDown(e){
  e.stopPropagation();
  e.preventDefault();
  mouseX=parseInt(e.clientX-offsetX);
  mouseY=parseInt(e.clientY-offsetY);

  // Put your mousedown stuff here
  startX=mouseX;
  startY=mouseY;
  isDown=true;
  backCtx.drawImage(image, 0,0); // respaldo
}

function bordeMouseUp(e){
  e.stopPropagation();
  e.preventDefault();

  // Put your mouseup stuff here
  isDown=false;
}

function bordeMouseMove(e){
	if(!isDown){return;}
	e.stopPropagation();
	e.preventDefault();
	mouseX=parseInt(e.clientX-offsetX);
	mouseY=parseInt(e.clientY-offsetY);

    // Put your mousemove stuff here
    creaBordeDer();
 }

function creaBordeDer2()
 {
  	var ur=umbralR, ug=umbralG, ub=umbralB;
	var i0 = (mouseY-1)*imageData.width+mouseX;
	umbralR = pixels[i0*4];
	umbralG = pixels[i0*4+1];
	umbralB = pixels[i0*4+2];
    cuadro={x1:mouseX-5,y1:mouseY-2,x2:imageData.width-1,y2:mouseY+2};
	quitaColor();
  	umbralR=ur; umbralG=ug; umbralB=ub;
	
}

function creaBordeDer()
{
	var j, x, y, bordeX;
	
	bordeX=buscaBordeDer();
	
	var n = imageData.width-bordeX;
	var i0 = mouseY*imageData.width;
	for (var i = 0; i < n; i++) {
		j=(i+i0+bordeX)*4;
    	pixels[j] = 255;
    	pixels[j+1] = 255;
    	pixels[j+2] = 255;
	}	
			
	
/*
	for (var i = 0; i < numPixels; i++) {
		j=i*4;
		x = i%imageData.width;
		y = Math.floor(i/imageData.width);
		if (Math.abs(y-mouseY)<1 & x>=bordeX) {
        	pixels[j] = 255;
        	pixels[j+1] = 255;
        	pixels[j+2] = 255;
        }
	}
	*/		
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.putImageData(imageData, 0, 0);
    image.src = canvas.toDataURL();
    		
}

function buscaBordeDer()
{
	var j,
		i2=imageData.width, 
		i0 = mouseY*imageData.width+mouseX-10,
		iMax=i0, difMax=0, dif,
		u, r, g, ur, ug, ub;
		
	j=i0*4;
	ur = pixels[j];
	ug = pixels[j+1];
	ub = pixels[j+2];
	//i0++;
	iMax=i0;

	for (var i = 0; i < 20; i++) {
		j=(i+i0)*4;
		r = pixels[j];
		g = pixels[j+1];
		b = pixels[j+2];
		dif = Math.sqrt(Math.pow(r-ur,2) + Math.pow(g-ug,2) + Math.pow(g-ub,2));
		if (dif>difMax) {
			difMax=dif;
			iMax=i;
		}
		ur = r;
		ug = g;
		ub = b;
	}
		

	return (iMax+i0)%imageData.width;
}
