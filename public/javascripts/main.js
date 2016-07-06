function onDocumentReady() {
	var socket=io();
	var mbAttr = 'Edit For © <a href="#">Limbert AB</a>',
	mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibGltYmVydGFiIiwiYSI6ImNpcG9mMnV3ZDAxcHZmdG0zOWc1NjV2aGwifQ.89smGLtgJWmUKgd7B0cV1Q';
	var deafult=L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	    attribution: mbAttr
	});
	var map = L.map('mimapa', {
	    center: [-20.550508894195627, -66.62109375],
	    zoom:7,
	    layers: [deafult],
	});
	var polyline = L.polyline(functionPuntos(), {color: 'red',border:50}).addTo(map);//DIBUJO DEL MAPA DE POTOSI
	var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
		satellite = L.tileLayer(mbUrl, {id: 'mapbox.satellite', attribution: mbAttr}),
		Dark = L.tileLayer(mbUrl, {id: 'mapbox.dark', attribution: mbAttr}),
		uno = L.tileLayer(mbUrl, {id: 'mapbox.streets', attribution: mbAttr}),
		dos = L.tileLayer(mbUrl, {id: 'mapbox.mapbox-terrain-v2', attribution: mbAttr});
	var baseMaps = {"DEFAULT": deafult,"SATELITE":satellite,"OBSCURIDAD":Dark,"OPCION 1": uno,"OPCION 2":dos };//Titulos Mapas
	L.control.layers(baseMaps).addTo(map);

	function onAccuratePositionProgress (e) {
		console.log(e);
	}
	function onAccuratePositionFound (e) {
		//L.marker(e.latlng).addTo(map).bindPopup("Te encuentras AQUI!!").openPopup();
		socket.emit('EnviaMisCoordenas',e.latlng);
	}
	function onAccuratePositionError (e) {
		console.log(e.message)
	}
	map.on('accuratepositionprogress', onAccuratePositionProgress);
	map.on('accuratepositionfound', onAccuratePositionFound);
	map.on('accuratepositionerror', onAccuratePositionError);

	map.findAccuratePosition({
		maxWait: 15000, // defaults to 10000
		desiredAccuracy: 30 // defaults to 20
	});	
	socket.on("RespuestaCoordenadas",function(datos){
		L.marker(datos).addTo(map).bindPopup("Te encuentras AQUI!!");
	});
}
$(document).on('ready', onDocumentReady);