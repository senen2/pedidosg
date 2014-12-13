/**
 * @author gtienda
 */

function resizeAndUpload(file, datos, next, anchomax, altomax) {
	var reader = new FileReader();
    reader.onloadend = function() { 
	    var tempImg = new Image();
	    tempImg.src = reader.result;
	    tempImg.onload = function () {
		 	var rot = 1;
		    EXIF.getData(tempImg, function() {
		    	rot = EXIF.getTag(tempImg, "Orientation");;
		    });
		    datos.push({nombre: "rot", valor: rot })
			    
		    var MAX_WIDTH = anchomax; // 484
		    var MAX_HEIGHT = altomax; // 330
		    var tempW = tempImg.width;
		    var tempH = tempImg.height;
		    if (tempW > tempH) {
		        if (tempW > MAX_WIDTH) {
		           tempH *= MAX_WIDTH / tempW;
		           tempW = MAX_WIDTH;
		        }
		    } else {
		        if (tempH > MAX_HEIGHT) {
		           tempW *= MAX_HEIGHT / tempH;
		           tempH = MAX_HEIGHT;
		        }
		    }
		 
		    var canvas = document.createElement('canvas');
		    canvas.width = tempW;
		    canvas.height = tempH;
		    var ctx = canvas.getContext("2d");
		    ctx.drawImage(tempImg, 0, 0, tempW, tempH);
		
		    canvas.toBlob(
		    	function(blob) {
			  		enviar(blob, datos, next);
				}
				, "image/png"
			);	    	
	    } 
	}
    reader.readAsDataURL(file);
}	

function enviar(imagen, datos, next)
{
    var formData = new FormData();
    formData.append("upload", imagen, "prueba.jpg");
    
	$.each(datos, function(i, dato) {
		formData.append(dato.nombre.trim(), dato.valor);	
	});    
    
    var client = new XMLHttpRequest();
    client.onreadystatechange = function(ev){
        if (client.readyState == 4) {
		    next();
        }
    };
    
    client.open("post", "http://" + servidor + "/uploadprod", true);
    client.send(formData);
}