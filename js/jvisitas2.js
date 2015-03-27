/**
 * @author Botpi
 */

function inicioVisitas()
{
	encabezado = getCookie("encabezado");
	if (encabezado==null || encabezado=="'','',''" || encabezado.split(',')[0]=="''") {
		document.cookie = "pagpend=" + document.URL;			
		window.location.assign("registro.html");		
	}
		
	pagina = "visitasSI";
	ayuda = "http://gtienda.com/wiki/mediawiki-1.23.5/index.php?title=Implementacion&section=#Subir_imagenes_de_los_productos";
	leeServidor();
	poneDatePicker("#fecha", "", new Date()); //"d M yy"
	refrescar();
	
}

function refrescar()
{
	//dibuja(1);
	LeePuntosSI(new Date($("#fecha").val()), dibuja);
	//LeeVisitasSI(new Date($("#fecha").val()), dibuja);
}

function addDays(dias)
{
	var f = tomaDatePicker($("#fecha").val());
	f = f.setDate(f.getDate() + dias);
	$("#fecha").datepicker( "setDate", new Date(f));
	refrescar();
}
		
function dibuja(datos)
{
	var margin = {top: 20, right: 50, bottom: 30, left: 50},
	    width = 1500 - margin.left - margin.right,
	    height = 200 - margin.top - margin.bottom;
	
	var parseDate = d3.time.format("%d-%b-%y").parse,
	    bisectDate = d3.bisector(function(d) { return d.date; }).left,
	    formatValue = d3.format(",.2f"),
	    formatCurrency = function(d) { return "$" + formatValue(d); };
	
	var x = d3.time.scale()
	    .range([0, width]);
	
	var y = d3.scale.linear()
	    .range([height, 0]);
	
	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom");
	
	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left");
	
	var line = d3.svg.line()
	    .x(function(d) { return x(d.date); })
	    .y(function(d) { return y(d.close); });
	
	var svg = d3.select("body").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	data = JSON.parse(datos);

	//d3.tsv("data.tsv", function(error, data) {
	  data.forEach(function(d) {
	    //d.date = parseDate(d.date);
	    d.close = +d.close;
	  });
	
	  data.sort(function(a, b) {
	    return a.date - b.date;
	  });
	
	  x.domain([data[0].date, data[data.length - 1].date]);
	  y.domain(d3.extent(data, function(d) { return d.close; }));
	
	  svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis);
	
	  svg.append("g")
	      .attr("class", "y axis")
	      .call(yAxis)
	    .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text("Funcion");
	
	  svg.append("path")
	      .datum(data)
	      .attr("class", "line")
	      .attr("d", line);
	
	  var focus = svg.append("g")
	      .attr("class", "focus")
	      .style("display", "none");
	
	  focus.append("circle")
	      .attr("r", 4.5);
	
	  focus.append("text")
	      .attr("x", 9)
	      .attr("dy", ".35em");
	
	  svg.append("rect")
	      .attr("class", "overlay")
	      .attr("width", width)
	      .attr("height", height)
	      .on("mouseover", function() { focus.style("display", null); })
	      .on("mouseout", function() { focus.style("display", "none"); })
	      .on("mousemove", mousemove);
	
	  function mousemove() {
	    var x0 = x.invert(d3.mouse(this)[0]),
	        i = bisectDate(data, x0, 1),
	        d0 = data[i - 1],
	        d1 = data[i],
	        d = x0 - d0.date > d1.date - x0 ? d1 : d0;
	    focus.attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")");
	    focus.select("text").text(d.funcion);
	  }
	//});
}
