function View () {
	var self = this;

	this.maxX = 75;

	this.controller;
	this.margin = {top: 10, right: 60, bottom: 30, left: 50};
	this.width = 1300 - self.margin.left - self.margin.right,
	this.height = 500 - self.margin.top - self.margin.bottom;

	this.historico = d3.select("body").append("svg")
	.attr("id","historico")
	.attr("width", self.width + self.margin.left + self.margin.right)
	.attr("height", self.height + self.margin.top + self.margin.bottom)
	.append("g")
	.attr("class", "graph")
	.attr("transform",
		"translate(" + self.margin.left + "," + self.margin.top + ")");

	this.x = d3.scaleLinear().range([0, self.width]).domain([0,self.maxX]);
	this.y = d3.scaleLinear().range([self.height, 0]).domain([21, 1]);

	this.lineColor = {
		active:"#f33",
		regular:"#ddd"
	};

	this.div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


	this.criarRotulosEsquerda = function criarRotulosEsquerda(){
		var primeiraRodada = Object.values(self.controller.raw.tabela[1]);

		var rotulos = self.historico.append("g")
		.attr("id","labels")
		.selectAll("text")
		.data(primeiraRodada)
		.enter()
		.append("text")
		.attr("x",-10)
		.attr("y",function(d){ return self.y(d.posicao)+4 })
		.attr("class","abbr")
		.attr("id",function(d){
			return "esquerda_rotulo_"+d.time;
		})
		.on("click",function(d){
			var changeColor = self.controller.addToBuffer(d.time);
			if(changeColor){
				controller.emphasizeLine(d);
			}else{
				self.controller.removeFromBuffer(d.time);
				self.controller.demphasizeLine(d);
			}
		})
		.attr("text-anchor","end")
		.text(function(d){ return d.posicao+"  "+d.time;});
	}

	this.criarRotulosDireita = function criarRotulosDireita(){
		var ultimaRodada = Object.values(self.controller.raw.tabela[38]);
		var endLabels = self.historico.append("g")
		.attr("id","ranking")
		.selectAll("text")
		.data(ultimaRodada)
		.enter()
		.append("text")
		.attr("id",function(d){
			return "direita_rotulo_"+d.time;
		})
		.attr("x",function(d){ return self.x(2*d.rodada)+10;})
		.attr("class","abbr")
		.on("click",function(d){
			var changeColor = self.controller.addToBuffer(d.time);
			if(changeColor){
				controller.emphasizeLine(d);
			}else{
				self.controller.removeFromBuffer(d.time);
				self.controller.demphasizeLine(d);
			}
		})
		.on("mouseover",function(d){
			controller.selected = controller.times[d.time];
			// d3.select("#line_"+d.time)
			// .style("stroke-width",1.5)
			// .style("stroke", lineColor.active);

		})
		.on("mouseout",function(d){
			controller.selected = null;
			// d3.select("#line_"+d.time)
			// .style("stroke-width",1)
			// .style("stroke", lineColor.regular);
		})
		.attr("y",function(d){ return self.y(d.posicao)+4 })
		.text(function(d){ return d.posicao+"  "+d.time;});
	}

	this.criarHistorico = function criarHistorico(){
		
		var valueline = d3.line()
		.x(function(d,i) { return (self.width/self.maxX)+self.x(i)})
		.y(function(d) { return self.y(d.posicao); });

		var rankingBars = self.addRodadasBars(self.historico, self.width, self.height, self.maxX, true);

		Object.values(self.controller.times).forEach(function(time){

			var timeLineData = [];
			time.forEach(function(t,i){

				var data = {
					posicao: t.posicao,
					time:t.time,
					jogo:t.jogos
				}
				timeLineData.push(data);
				timeLineData.push(data);
				if(i == 0){
					// timeLineData.push(data);
				}
			})

			var timeLineBack = self.historico.append("path")
			.data([timeLineData])
			.attr("class", "line")
			.attr("id", function(d){ return "lineback_"+d[0].time})
			.style("stroke", "#fff")
			.style("stroke-opacity", 0)
			.style("stroke-width",5)
			.on("mouseover",function(d){

				// controller.selected = controller.times[d[0].time];
				
				// d3.select("#line_"+d[0].time)
				// .style("stroke-width",1.5)

			})
			.on("mouseout",function(d){

				// controller.selected = null;

				// d3.select("#line_"+d[0].time)
				// .style("stroke-width",1)
			})
			.attr("d", valueline);

			var timeLine = self.historico.append("path")
			.data([timeLineData])
			.attr("class", "line")
			.attr("id", function(d){ return "line_"+d[0].time})
			.style("stroke", self.lineColor.regular)
			.attr("d", valueline);



			function rsize(d){
				switch(d){
					case 1:
						return 2;
					case 3:
						return 6;
					case 0:
						return 0;
					case -1:
						return 0;
				}
			}
			// var r = self.historico.append("g")
			// .attr("class","resultado")
			// .selectAll("circle")
			// .data(time)
			// .enter()
			// .append("circle")
			// .on("mouseover",function(d){
			// 	console.log(d);
				
			// 	self.div.html(d.jogo.opp)
			// 	.style("opacity", .9)
		 //         .style("left", (d3.event.pageX) + "px")
		 //         .style("top", (d3.event.pageY - 28) + "px");
		     

			// })
			// .attr("fill",function(d,i){
				
			// 	if(d.jogo.pontos != -1) return self.lineColor.regular;
			// 	else return "#f00";
			// })
			// .attr("stroke",function(d){ 
			// 	if(d.jogo.pontos != -1) return self.lineColor.regular;
			// 	else return "none";
			// })
			// .attr("stroke-width",function(d){ 
			// 	if(d.jogo.pontos != -1) return 1;
			// 	else return "none";
			// })
			// .attr("cx",function(d,i){ 
			// 	return i*(2*self.width/self.maxX)+(self.width/self.maxX);
			// })
			// .attr("cy",function(d){ 
			// 	return self.y(d.posicao);
			// })
			// .attr("opacity",0)
			// .attr("r",function(d){ 
			// 	// return rsize(d.jogo.pontos);
			// 	return 4;
			// })



});
}

this.addRodadasBars = function addRodadasBars(root, width, height, maxX, withLabel){
	var bars = root.append("g")
	.attr("class","bars")
	.selectAll("rect")
	.data([...Array(38).keys()])
	.enter()
	.append("g")

	bars.append("rect")
	.attr("fill",function(d){
		if(d%2 == 0) return "#eee";
		else return "none";
	})
	.attr("stroke",function(d){
		if(d%2 == 0) return "#eee";
		else return "none";
	})
	.attr("stroke-width",1)
	.attr("x",function(d,i){
		return i*(2*width/(maxX));
	})
	.attr("y",-12)
	.attr("width",function(d,i){
		return 2*width/maxX;
	})
	.attr("height",height+6)

	if(withLabel){
		bars.append("text")
		.attr("class","rodada-label")
		.attr("x",function(d){
			return d*(2*width/maxX)+(width/(maxX));
		})
		.attr("y",height+6)
		.attr("fill","#999")
		.attr("width",width/maxX)
		.attr("text-anchor","middle")
		.on("mouseover",function(d){
			// var rodada = d+1;
			// console.log(d)

			// console.log(self.controller.raw.tabela[rodada]);

			// var rotulos = self.historico.append("g")
			// .attr("id","middle-label")
			// .selectAll("text")
			// .data(Object.values(self.controller.raw.tabela[rodada]))
			// .enter()
			// .append("text")
			// .attr("x",function(d){
			// 	console.log(d);
			// 	return self.x(2*rodada)
			// })
			// .attr("y",function(d){ return self.y(d.posicao)+4 })
			// .attr("class","abbr")
			// .attr("id",function(d){
			// 	return "rodada_rotulo_"+d.time;
			// })
			// .attr("text-anchor","middle")
			// .text(function(d){ return d.posicao+"  "+d.time;});

		})
		.text(function(d){ if(d < 38) return d+1;})
	}

	return bars;
}

function criarDesempenho(){

	addRodadasBars(desempenho, width, desempenhoHeight, maxX, false);

	var resultado = desempenho.append("g")
	.attr("class","resultado")
	.selectAll("circle")
	.data(selected)
	.enter()
	.append("circle");

	desempenhoConfig(resultado);
}

function updateDesempenho(){

	var old = desempenho
	.selectAll("g")
	.selectAll("circle")
	.data(selected)

	desempenhoConfig(old);
	
	desempenho.exit().remove();
}

function desempenhoConfig(root){

	function rsize(d){
		return Math.pow(d.jogo.pontos,1.5);
	}

	return root
	.filter(function(d,i){  
		return i%2 == 0;
	})
	.attr("fill",function(d){ 
		if(d.jogo.pontos != -1) return "#000";
		else return "#f00";
	})
	.attr("stroke",function(d){ 
		if(d.jogo.pontos != -1) return "#000";
		else return "none";
	})
	.attr("stroke-width",function(d){ 
		if(d.jogo.pontos != -1) return 1;
		else return "none";
	})
	.attr("cx",function(d,i){ 
		return i*(2*width/maxX)
	})
	.attr("cy",function(d){ 
		if(d.jogo.pontos != -1) return desempenhoHeight/2 - (rsize(d))/2;
		else return desempenhoHeight/2 - 1;
	})
	.attr("r",function(d){ 
		if(d.jogo.pontos != -1) return rsize(d);
		else return 2;
	})
}

}