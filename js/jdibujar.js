
function dibujaCanvas(pcanvas, pimage, tagcanvas, imageOpacity, src)
{
    var canvas, img;
    if (canvas)
    	canvas = pcanvas;
    else
    	canvas=document.getElementById(tagcanvas);

    var ctx=canvas.getContext("2d");
    var canvasOffset=$("#"+tagcanvas).offset();
    var offsetX=canvasOffset.left;
    var offsetY=canvasOffset.top;

    var startX,startY,mouseX,mouseY;
    var isDown=false;

    var lines=[];

	var img;
    if (src!=null & src!="") {
	    img=new Image();
	    img.crossOrigin="anonymous";
    	img.onload=start;
    	img.src=src;    	
    }
    else {
    	img = pimage;
    	start();
    }
   
    function start(){
	    if (src!=null & src!="") {
	        canvas.width=canvas.width=img.width;
	        canvas.height=img.height;
	    }
        ctx.strokeStyle="green";
        ctx.lineWidth=3;

        $("#"+tagcanvas).mousedown(function(e){handleMouseDown(e);});
        $("#"+tagcanvas).mousemove(function(e){handleMouseMove(e);});
        $("#"+tagcanvas).mouseup(function(e){handleMouseUp(e);});
        $("#"+tagcanvas).mouseout(function(e){handleMouseUp(e);});

        // redraw the image
        drawTheImage(img,imageOpacity);

    }

    function drawLines(toX,toY){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        drawTheImage(img,imageOpacity);
        drawRect({x1:startX,y1:startY,x2:mouseX,y2:mouseY});
    }

    function drawTheImage(img,opacity){
        ctx.globalAlpha=opacity;
        ctx.drawImage(image,0,0);
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

}
