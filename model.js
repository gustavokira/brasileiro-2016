function Model () {
	var self = this;
	this.fileName = "brasileiro-2016.json";

	this.carregar = function carregar(){
		
		return new Promise(function(resolve,reject){
			d3.json(self.fileName, function(error, data) {
				if (error) reject(error);
				resolve(data);
			});
		});
	}
}