import React from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "mapbox-gl-geocoder";
import MapboxDraw from "mapbox-gl-draw";
import turf from "turf";
import PubSub from "pubsub-js";
import "../../styles/MapInterface.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl-draw/dist/mapbox-gl-draw.css";

global.money = 0;
class Map extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			money: 0,
			coordinates: [],
			center: [144.974, -37.821],
		};
	}

	render() {
		// console.log("state",this.state)
		global.money = this.state.money;
		// console.log("global",global.money)
		return (
			<div id="mapInterface">
				<link
					href="https://api.tiles.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
					rel="stylesheet"
				/>
				<link
					rel="stylesheet"
					href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.3.0/mapbox-gl-geocoder.css"
					type="text/css"
				/>
				<link
					rel="stylesheet"
					href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.0.9/mapbox-gl-draw.css"
					type="text/css"
				/>

				<div id="map" className="map"></div>
				<div id="geocoder" className="geocoder"></div>

				<div id="map-style-menu" className="map-stlye-menu">
					<input
						id="streets-v11"
						type="radio"
						name="rtoggle"
						value="streets"
						defaultChecked="checked"
					></input>
					<label htmlFor="streets">streets</label>
					<input
						id="light-v10"
						type="radio"
						name="rtoggle"
						value="light"
					></input>
					<label fhtml="light">light</label>
					<input
						id="dark-v10"
						type="radio"
						name="rtoggle"
						value="dark"
					></input>
					<label fhtml="dark">dark</label>
					<input
						id="satellite-v9"
						type="radio"
						name="rtoggle"
						value="satellite"
					></input>
					<label fhtml="satellite">satellite</label>
				</div>
			</div>
		);
	}

	componentDidMount() {
		// map box access token
		mapboxgl.accessToken =
			"pk.eyJ1IjoieWxsaWFvIiwiYSI6ImNrZXVtc2ZoaTA0d2Yyc3FvbmhmZ2FyaDQifQ.fRlqWsH6nUv-9Ev6IKCx7g";
		// mapbox style var
		var map = new mapboxgl.Map({
			container: "map",
			style: "mapbox://styles/ylliao/cknzu549w0xqm17qnuz68g0it",
			center: this.state.center,
			zoom: 11,
		});

		// 选定区域在此处传出coordinate参数
		PubSub.subscribe("coordinates", (_, data) => {
			this.setState({ coordinates: data });
			this.setState({ center: data[0][0] });
		});

		// 当geo search选定值变化，实现地图jump
		map.on("load", function () {
			PubSub.subscribe("coordinates", (_, data) => {
				if (map.getLayer("poly")) {
					map.removeLayer("poly");
				}

				if (map.getLayer("outline")) {
					map.removeLayer("outline");
				}

				if (map.getSource("target")) {
					map.removeSource("target");
				}
				map.addSource("target", {
					type: "geojson",
					data: {
						type: "Feature",
						geometry: {
							type: "Polygon",
							// These coordinates outline target.
							coordinates: data,
						},
					},
				});

				map.addLayer({
					id: "poly",
					type: "fill",
					source: "target", // reference the data source
					layout: {},
					paint: {
						"fill-color": "#0080ff", // blue color fill
						"fill-opacity": 0.5,
					},
				});
				// Add a black outline around the polygon.
				map.addLayer({
					id: "outline",
					type: "line",
					source: "target",
					layout: {},
					paint: {
						"line-color": "#000",
						"line-width": 3,
					},
				});

				map.flyTo({
					center: data[0][0],
					zoom: 11,
				});
			});
		});

		map.addControl(new mapboxgl.NavigationControl());

		// Get self location.
		// map.addControl(new mapboxgl.GeolocateControl({
		//     positionOptions: {
		//     enableHighAccuracy: true
		//     },
		//     trackUserLocation: true
		// }));

		// Add draw polygon function.
		var draw = new MapboxDraw({
			displayControlsDefault: false,
			controls: {
				polygon: true,
				trash: true,
			},
		});

		// map.addControl(draw);
		map.addControl(draw, "top-left");
		map.on("draw.create", updateArea);
		map.on("draw.delete", updateArea);
		map.on("draw.update", updateArea);
		var this_ = this;

		function updateArea(e) {
			var data = draw.getAll();
			var answer = document.getElementById("calculated-area");
			if (data.features.length > 0) {
				var area = turf.area(data);
				// restrict to area to 2 decimal points
				var rounded_area = Math.round(area * 100) / 100;

				var temp = (rounded_area / 100000).toFixed(2);
				//我要把rounded_area传到那边去
				this_.setState({ money: temp });
			}
		}

		map.on("draw.create", updateVertice);
		map.on("draw.delete", updateVertice);
		map.on("draw.update", updateVertice);

		function updateVertice(e) {
			var data = draw.getAll();
			var num_of_polygon = data.features.length;
			var area = turf.area(data);
			var polygon_wkt = "";

			if (num_of_polygon === 1) {
				var vertices = data.features[0]["geometry"]["coordinates"][0];
				var num_of_vertice = vertices.length;

				var v1 = "";
				for (let i = 0; i < num_of_vertice; i++) {
					v1 = v1 + vertices[i][0] + " " + vertices[i][1] + ",";
				}
				var v2 = v1.substring(0, v1.length - 1);
				console.log("[v2]", v2);
				polygon_wkt = "POLYGON((" + v2 + "))";

				console.log(data.features[0]["geometry"]["coordinates"][0]);
				//WKT POLYGON.

				console.log(polygon_wkt);
				console.log(area);
			} else if (num_of_polygon > 1) {
				v2 = "";
				for (let i = 0; i < num_of_polygon; i++) {
					vertices = data.features[i]["geometry"]["coordinates"][0];
					num_of_vertice = vertices.length;

					v1 = "";
					for (let j = 0; j < num_of_vertice; j++) {
						v1 = v1 + vertices[j][0] + " " + vertices[j][1] + ",";
					}
					v2 = v2 + "((" + v1.substring(0, v1.length - 1) + ")),";
				}
				var v3 = v2.substring(0, v2.length - 1);
				polygon_wkt = "MULTIPOLYGON(" + v3 + ")";

				console.log(data.features);
				//WKT MULTIPOLYGON.
				console.log(polygon_wkt);
				console.log(area);
			}
			console.log("Sent");
			// 搜索结果 / 定制区域
			PubSub.publish("transfer_wkt", polygon_wkt);
		}

		// Map style menu.
		var layerList = document.getElementById("map-style-menu");
		var inputs = layerList.getElementsByTagName("input");

		function switchLayer(layer) {
			var layerId = layer.target.id;
			map.setStyle("mapbox://styles/mapbox/" + layerId);
		}

		for (var i = 0; i < inputs.length; i++) {
			inputs[i].onclick = switchLayer;
		}
	}
}

export default Map;
