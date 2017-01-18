function Controller () {
	
	var self = this;
	this.buffer = new Array(6).fill(0);
	this.selected;
	this.raw;
	this.times = {};
	
	this.colorScale = function colorScale(abr){
		var idx = self.buffer.indexOf(abr);
		var scale = [
			"#e41a1c",
			"#377eb8",
			"#4daf4a",
			"#984ea3",
			"#ff7f00",
			// "#a6cee3",
			// "#1f78b4",
			// "#b2df8a",
			// "#33a02c",
			// "#fb9a99",
			// "#e31a1c",
			// "#fdbf6f",
			// "#ff7f00",
			// "#cab2d6",
			// "#6a3d9a",
			// "#ffff99",
			"#b15928"
		];
		if(idx > -1){
			return scale[idx];
		}else{
			return null;
		}
		
	};
	this.view;

	this.lineColor = {
		regular:"#ddd"
	};

	this.labelColor = {
		regular:"#333"
	};


	this.init = function init(data){
		self.raw = data;

		var abr;
		for(var rodadaIdx in self.raw.tabela){

			var rodada = self.raw.tabela[rodadaIdx];
			
			for(abr in rodada){
				
				if(!self.times[abr]){
					self.times[abr] = [];
				}
				var rodadaInt = parseInt(rodadaIdx);
				self.times[abr].push(rodada[abr]);

			}
		}


		selected = self.times['PAL'];
	}

	this.addToBuffer = function addToBuffer(abr){
		
		var zeros = self.buffer.filter(function(x){ return x==0}).length;
		

		if(zeros > 0 && !self.times[abr].selected){
			for(var i =0;i<self.buffer.length;i++){
				if(self.buffer[i] === 0){
					self.buffer[i] = abr;
					break;
				}
			}
			self.times[abr].selected = true;

			return true;
		}
		else{
			return false;
		}
	}
	this.removeFromBuffer = function removeFromBuffer(abr){
		var idx = self.buffer.indexOf(abr);
		if(idx > -1){
			self.buffer[idx] = 0;
			self.times[abr].selected = false;
		}
	}

	this.emphasizeLine = function emphasizeLine(item){

		d3.select("#line_"+item.time)
		.style("stroke-width",1.5)
		.style("stroke", function(d){
			return self.colorScale(item.time);
		});

		d3.select("#direita_rotulo_"+item.time)
		.style("fill", function(d){
			return self.colorScale(item.time);
		});

		d3.select("#esquerda_rotulo_"+item.time)
		.style("fill", function(d){
			return self.colorScale(item.time);
		});

	}
	this.demphasizeLine = function emphasizeLine(item){
		d3.select("#line_"+item.time)
		.style("stroke-width",1.5)
		.style("stroke", function(d){
			return self.lineColor.regular
		});

		d3.select("#direita_rotulo_"+item.time)
		.style("fill", function(d){
			return self.labelColor.regular;
		});

		d3.select("#esquerda_rotulo_"+item.time)
		.style("fill", function(d){
			return self.labelColor.regular;
		});

	}
}