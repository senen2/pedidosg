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
		    datos.push({nombre: "rot", valor: rot });
			    
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
	    };
	};
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

function uploadImages(tag, itemdefault, IDcuentacat, funcionfinal) {
    var file = document.getElementById(tag);
	var theQueue = $({});

    var a = encabezado.split(',');
    var datos = [];
    datos.push({nombre: "email", valor: a[0].replace("'","").replace("'","")});
    datos.push({nombre: "token", valor: a[2].replace("'","").replace("'","")});
    datos.push({nombre: "IDcuentacat", valor: IDcuentacat });
    datos.push({nombre: "nombre", valor: itemdefault.nombre });
    datos.push({nombre: "referencia", valor: itemdefault.referencia });
    datos.push({nombre: "barcode ", valor: itemdefault.barcode });
    datos.push({nombre: "descripcion ", valor: itemdefault.descripcion });
    datos.push({nombre: "precio", valor: itemdefault.precio });
    datos.push({nombre: "pvm", valor: itemdefault.pvm });
    datos.push({nombre: "tallas", valor: itemdefault.tallas });
    datos.push({nombre: "colores", valor: itemdefault.colores });
    datos.push({nombre: "tags", valor: JSON.stringify(itemdefault.tags) });

	$.each(file.files, function(i, archivo) {
	  theQueue.queue('uploads', function(next) {
	  	 resizeAndUpload(archivo, datos, next, 600, 600);
	  }); 
	});
	theQueue.queue('uploads', function(next) {
		theQueue.dequeue('uploads');
		funcionfinal(); 
	}); 
	theQueue.dequeue('uploads');
}
