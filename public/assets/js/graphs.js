window1();
function window1 () {

	//CanvasJS.addColorSet("Colors",
                //[//colorSet Array
                //"#009E1A",
                //"#C92626",
                //"#AB1EB2",
                //"#1EA8B2"               
                //]);
	var dataPoints1 = [];
	var dataPoints2 = [];
	var dataPoints3 = [];
	var dataPoints4 = [];
	var data = [];
	var dataPointsChar=[];
	var dataPoints=[];
	var state = [];
	var Estado1 = 0;
	var Estado2 = 0;
	var Estado3 = 0;
	var Estado4 = 0; 
    var Estado5 = 0;

	var chart = new CanvasJS.Chart("chartContainer", {
		zoomEnabled: true,
		theme:"light2",
		animationEnabled: true,
		zoomEnabled: true,
		exportEnabled: true,
		title:{
			fontFamily:"Poppins",
			text: "Tiempo Real",
		},
		
		axisY :{
			includeZero: false,
			title: "Potencia [W]",
			suffix: "W"
		},
		toolTip: {
			shared: true
		},
		legend:{
			cursor:"pointer",
			verticalAlign: "top",
			fontSize: 22,
			fontColor: "dimGrey",
			itemclick : toggleDataSeries
		},
		data: [{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00 W",
			xValueFormatString: "hh:mm:ss TT",
			name: "Red",
			dataPoints: dataPoints1
			},
			{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00 W",
			xValueFormatString: "hh:mm:ss TT",
			name: "Panel",
			dataPoints: dataPoints2

		},
			{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00 W",
			xValueFormatString: "hh:mm:ss TT",
			name: "Bateria",
			dataPoints: dataPoints3

		},
			{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00 W",
			xValueFormatString: "hh:mm:ss TT",
			name: "Carga",
			dataPoints: dataPoints4

		}]
	});
	var chart2 = new CanvasJS.Chart("chartContainer2",{
		exportEnabled: true,
		animationEnabled: true,
		theme:"light2",
		title:{
			fontFamily:"Poppins",
			text: "Tiempo Real",
		},
		
		legend:{
			cursor: "pointer"
		},
		data: [{
			type: "pie",
			showInLegend: true,
			toolTipContent: " <strong>{indexLabel}: {y} Wh</strong>",
			dataPoints: dataPointsChar
		}]
	});

	var chart3 = new CanvasJS.Chart("chartContainer3", {
	exportEnabled: true,
	animationEnabled: true,
    theme: "light2",
    //	colorSet: "Colors",
	title:{
			fontFamily:"Poppins",
			text: "Tiempo Real",
	},
	legend:{
		cursor: "pointer"
	},
	data: [{
		type: "doughnut",
        startAngle:60,
		showInLegend: true,
        toolTipContent: " <strong>{indexLabel}: {y} %</strong>",
		dataPoints: dataPoints
	}]
});

	function drawCharts(){
		console.log("Getting Data")
		jQuery.getJSON("/Generar",function addData(data) {
			for (var i = 0; i < data.length; i++) {
				dataPoints1.push({
					label: data[i].datetime,
					y: parseFloat(data[i].P1),


				});
				dataPoints2.push({
					label: data[i].datetime,
					y: parseFloat(data[i].P2),


				});
				dataPoints3.push({
					label: data[i].datetime,
					y: parseFloat(data[i].P3),


				});
				dataPoints4.push({
					label: data[i].datetime,
					y: parseFloat(data[i].P4),


				});
			}

			chart.render();
			chart.set("data",[{
					type: "spline",
					showInLegend: true,
					yValueFormatString: "##.00 W",
					xValueFormatString: "hh:mm:ss TT",
					name: "Red",
					dataPoints: dataPoints1
					},
					{
					type: "spline",
					showInLegend: true,
					yValueFormatString: "##.00 W",
					xValueFormatString: "hh:mm:ss TT",
					name: "Panel",
					dataPoints: dataPoints2

				},
					{
					type: "spline",
					showInLegend: true,
					yValueFormatString: "##.00 W",
					xValueFormatString: "hh:mm:ss TT",
					name: "Bateria",
					dataPoints: dataPoints3

				},
					{
					type: "spline",
					showInLegend: true,
					yValueFormatString: "##.00 W",
					xValueFormatString: "hh:mm:ss TT",
					name: "Carga",
					dataPoints: dataPoints4

				}],true)

			dataPoints1=[];
			dataPoints2=[];
			dataPoints3=[];
			dataPoints4=[];


		//Draw Pie
		for(var i = 0; i < data.length; i++){
			for(var l in data[i]){
			if(!isNaN(data[i][l])){
				P1[i] = parseFloat(data[i].P1)
				P2[i] = parseFloat(data[i].P2)
				P3[i] = parseFloat(data[i].P3)
				P4[i] = parseFloat(data[i].P4)
			}
			}
		}

		for(i = 0; i < P1.length; i++){
		Red = Red + P1[i];
		Panel = Panel + P2[i];
		Bateria = Bateria + P3[i];
		if(Bateria<0){
			Bateria=0;
		}
		Carga = Carga + P4[i];
		}

		//PARA LOS DIAS
		Red = Math.round((Red/(P1.length))*24);
		Panel = Math.round((Panel/(P2.length))*24);
		Bateria = Math.round((Bateria/(P3.length))*24);

		//PARA LAS SEMANAS
		//Red = Math.round((Red/(P1.length))*168);
		//Panel = Math.round((Panel/(P2.length))*168);
		//Bateria = Math.round((Bateria/(P3.length))*168);

		//PARA LOS MESES
		//Red = Math.round((Red/(P1.length))*730);
		//Panel = Math.round((Panel/(P2.length))*730);
		//Bateria = Math.round((Bateria/(P3.length))*730);
		//console.log(dataPoints);

		dataPointsChar.push({indexLabel: "Red", y: Red, name:"Red" },{indexLabel: "Panel", y: Panel, name:"Panel"}, {indexLabel: "Bateria", y: Bateria, name:"Bateria"});
		chart2.render();
		dataPointsChar = [];
		Red = 0;
		Panel = 0;
		Bateria = 0;
		Carga = 0;


		//Estados
              for(var i = 0; i < data.length; i++){
                for(var l in data[i]){
                  if(!isNaN(data[i][l])){
                    //Recorro el json y guardo la info de los estados en este vector
                    state[i] = parseFloat(data[i].estado)
                  }  
                }
              }
            //console.log(state[0])  
            for(i = 0; i <state.length; i++){
            //Aqui quiero contar cuantas veces está cada estado en el vector de arriba
            if(state[i] == 1) {
                Estado1 = Estado1 + 1;
            } else 
                if(state[i] == 2) {
                Estado2++;
                } else 
                    if(state[i] == 3) {
                        Estado3++;
                    } else 
                        if(state[i] == 4) {
                            Estado4++;
                        } else 
                            if(state[i] == 5) {
                                Estado5++;
                            } 
            } 
 
            //Aquí el calculo del promedio de los estados y eso 
            S1 = Math.round((Estado1/(state.length))*100);
            S2 = Math.round((Estado2/(state.length))*100);
            S3 = Math.round((Estado3/(state.length))*100);
            S4 = Math.round((Estado4/(state.length))*100);
            S5 = Math.round((Estado5/(state.length))*100);

            dataPoints.push({indexLabel: "Estado 1", y: S1, name:"Estado 1" },{indexLabel: "Estado 2", y: S2, name:"Estado 2"},{indexLabel: "Estado 3", y: S3, name:"Estado 3"},{indexLabel: "Estado 4", y: S4, name:"Estado 4"}, {indexLabel: "Estado 5", y: S5, name:"Estado 5"}); 
            //console.log(dataPoints);
            chart3.render();
            dataPoints = [];
            Estado1 = 0;
            Estado2 = 0;
            Estado3 = 0;
            Estado4 = 0;
            Estado5 = 0;
		});

	}


	var P1 = [];
	var P2 = [];
	var P3 = [];
	var P4 = [];
	var Red = 0;
	var Panel = 0;
	var Bateria = 0;
	var Carga = 0;
	var tot = 0;



	function toggleDataSeries(e) {
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible ){
			e.dataSeries.visible = false;
		} else {
			e.dataSeries.visible = true;
		}
		chart.render();
	}

	drawCharts();
	setInterval(drawCharts,9000);
};





function window2 () {
	var dataPoints1 = [];
	var dataPoints2 = [];
	var dataPoints3 = [];
	var dataPoints4 = [];
	var dataPoints = [];
	var data = [];
	var dataPointsChar=[];
    var state = [];
	var Estado1 = 0;
	var Estado2 = 0;
	var Estado3 = 0;
	var Estado4 = 0; 
    var Estado5 = 0;

	var chart = new CanvasJS.Chart("chartContainer", {
		zoomEnabled: true,
		theme:"light2",
		animationEnabled: true,
		zoomEnabled: true,
		exportEnabled: true,
		title:{
			fontFamily:"Poppins",
			text: "Ultimas 24 horas",
		},
		
		axisY :{
			includeZero: false,
			title: "Potencia [W]",
			suffix: "W"
		},
		toolTip: {
			shared: true
		},
		legend:{
			cursor:"pointer",
			verticalAlign: "top",
			fontSize: 22,
			fontColor: "dimGrey",
			itemclick : toggleDataSeries
		},
		data: [{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00 W",
			xValueFormatString: "hh:mm:ss TT",
			name: "Red",
			dataPoints: dataPoints1
			},
			{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00 W",
			xValueFormatString: "hh:mm:ss TT",
			name: "Panel",
			dataPoints: dataPoints2

		},
			{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00 W",
			xValueFormatString: "hh:mm:ss TT",
			name: "Bateria",
			dataPoints: dataPoints3

		},
			{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00 W",
			xValueFormatString: "hh:mm:ss TT",
			name: "Carga",
			dataPoints: dataPoints4

		}]
	});
	var chart2 = new CanvasJS.Chart("chartContainer2",{
		exportEnabled: true,
		animationEnabled: true,
		theme:"light2",
		title:{
			fontFamily:"Poppins",
			text: "Ultimas 24 horas",
		},
		
		legend:{
			cursor: "pointer"
		},
		data: [{
			type: "pie",
			showInLegend: true,
			toolTipContent: " <strong>{indexLabel}: {y} Wh</strong>",
			dataPoints: dataPointsChar
		}]
	});

	var chart3 = new CanvasJS.Chart("chartContainer3", {
	exportEnabled: true,
	animationEnabled: true,
    theme: "light2",
    //	colorSet: "Colors",
	title:{
			fontFamily:"Poppins",
			text: "Ultimas 24 horas",
	},
	legend:{
		cursor: "pointer"
	},
	data: [{
		type: "doughnut",
        startAngle:60,
		showInLegend: true,
        toolTipContent: " <strong>{indexLabel}: {y} %</strong>",
		dataPoints: dataPoints
	}]
});

	function drawCharts(){
		console.log("Getting Data")
		jQuery.getJSON("/GenerarDay",function addData(data) {
			for (var i = 0; i < data.length; i++) {
				dataPoints1.push({
					label: data[i].datetime,
					y: parseFloat(data[i].P1),


				});
				dataPoints2.push({
					label: data[i].datetime,
					y: parseFloat(data[i].P2),


				});
				dataPoints3.push({
					label: data[i].datetime,
					y: parseFloat(data[i].P3),


				});
				dataPoints4.push({
					label: data[i].datetime,
					y: parseFloat(data[i].P4),


				});
			}

			chart.render();
			chart.set("data",[{
					type: "spline",
					showInLegend: true,
					yValueFormatString: "##.00 W",
					xValueFormatString: "hh:mm:ss TT",
					name: "Red",
					dataPoints: dataPoints1
					},
					{
					type: "spline",
					showInLegend: true,
					yValueFormatString: "##.00 W",
					xValueFormatString: "hh:mm:ss TT",
					name: "Panel",
					dataPoints: dataPoints2

				},
					{
					type: "spline",
					showInLegend: true,
					yValueFormatString: "##.00 W",
					xValueFormatString: "hh:mm:ss TT",
					name: "Bateria",
					dataPoints: dataPoints3

				},
					{
					type: "spline",
					showInLegend: true,
					yValueFormatString: "##.00 W",
					xValueFormatString: "hh:mm:ss TT",
					name: "Carga",
					dataPoints: dataPoints4

				}],true)

			dataPoints1=[];
			dataPoints2=[];
			dataPoints3=[];
			dataPoints4=[];


		//Draw Pie
		for(var i = 0; i < data.length; i++){
			for(var l in data[i]){
			if(!isNaN(data[i][l])){
				P1[i] = parseFloat(data[i].P1)
				P2[i] = parseFloat(data[i].P2)
				P3[i] = parseFloat(data[i].P3)
				P4[i] = parseFloat(data[i].P4)
			}
			}
		}

		for(i = 0; i < P1.length; i++){
		Red = Red + P1[i];
		Panel = Panel + P2[i];
		Bateria = Bateria + P3[i];
		if(Bateria<0){
			Bateria=0;
		}
		Carga = Carga + P4[i];
		}

		//PARA LOS DIAS
		Red = Math.round((Red/(P1.length))*24);
		Panel = Math.round((Panel/(P2.length))*24);
		Bateria = Math.round((Bateria/(P3.length))*24);

		//PARA LAS SEMANAS
		//Red = Math.round((Red/(P1.length))*168);
		//Panel = Math.round((Panel/(P2.length))*168);
		//Bateria = Math.round((Bateria/(P3.length))*168);

		//PARA LOS MESES
		//Red = Math.round((Red/(P1.length))*730);
		//Panel = Math.round((Panel/(P2.length))*730);
		//Bateria = Math.round((Bateria/(P3.length))*730);
		//console.log(dataPoints);

		dataPointsChar.push({indexLabel: "Red", y: Red, name:"Red" },{indexLabel: "Panel", y: Panel, name:"Panel"}, {indexLabel: "Bateria", y: Bateria, name:"Bateria"});
		chart2.render();
		dataPointsChar = [];
		Red = 0;
		Panel = 0;
		Bateria = 0;
		Carga = 0;

//Estados
              for(var i = 0; i < data.length; i++){
                for(var l in data[i]){
                  if(!isNaN(data[i][l])){
                    //Recorro el json y guardo la info de los estados en este vector
                    state[i] = parseFloat(data[i].estado)
                  }  
                }
              }
            //console.log(state[0])  
            for(i = 0; i <state.length; i++){
            //Aqui quiero contar cuantas veces está cada estado en el vector de arriba
            if(state[i] == 1) {
                Estado1 = Estado1 + 1;
            } else 
                if(state[i] == 2) {
                Estado2++;
                } else 
                    if(state[i] == 3) {
                        Estado3++;
                    } else 
                        if(state[i] == 4) {
                            Estado4++;
                        } else 
                            if(state[i] == 5) {
                                Estado5++;
                            } 
            } 
 
            //Aquí el calculo del promedio de los estados y eso 
            S1 = Math.round((Estado1/(state.length))*100);
            S2 = Math.round((Estado2/(state.length))*100);
            S3 = Math.round((Estado3/(state.length))*100);
            S4 = Math.round((Estado4/(state.length))*100);
            S5 = Math.round((Estado5/(state.length))*100);

            dataPoints.push({indexLabel: "Estado 1", y: S1, name:"Estado 1" },{indexLabel: "Estado 2", y: S2, name:"Estado 2"},{indexLabel: "Estado 3", y: S3, name:"Estado 3"},{indexLabel: "Estado 4", y: S4, name:"Estado 4"}, {indexLabel: "Estado 5", y: S5, name:"Estado 5"}); 
            //console.log(dataPoints);
            chart3.render();
            dataPoints = [];
            Estado1 = 0;
            Estado2 = 0;
            Estado3 = 0;
            Estado4 = 0;
            Estado5 = 0;
		});

	}


	var P1 = [];
	var P2 = [];
	var P3 = [];
	var P4 = [];
	var Red = 0;
	var Panel = 0;
	var Bateria = 0;
	var Carga = 0;
	var tot = 0;



	function toggleDataSeries(e) {
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible ){
			e.dataSeries.visible = false;
		} else {
			e.dataSeries.visible = true;
		}
		chart.render();
	}

	drawCharts();
};

function window3 () {
	console.log(Fechas)
	var dataPoints1 = [];
	var dataPoints2 = [];
	var dataPoints3 = [];
	var dataPoints4 = [];
	var data = [];
	var dataPointsChar=[];
	var dataPoints = [];
    var state = [];
	var Estado1 = 0;
	var Estado2 = 0;
	var Estado3 = 0;
	var Estado4 = 0; 
    var Estado5 = 0;

	var chart = new CanvasJS.Chart("chartContainer", {
		zoomEnabled: true,
		theme:"light2",
		animationEnabled: true,
		zoomEnabled: true,
		exportEnabled: true,
		title:{
			fontFamily:"Poppins",
			text: "Día calendario",
		},
		
		axisY :{
			includeZero: false,
			title: "Potencia [W]",
			suffix: "W"
		},
		toolTip: {
			shared: true
		},
		legend:{
			cursor:"pointer",
			verticalAlign: "top",
			fontSize: 22,
			fontColor: "dimGrey",
			itemclick : toggleDataSeries
		},
		data: [{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00 W",
			xValueFormatString: "hh:mm:ss TT",
			name: "Red",
			dataPoints: dataPoints1
			},
			{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00 W",
			xValueFormatString: "hh:mm:ss TT",
			name: "Panel",
			dataPoints: dataPoints2

		},
			{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00 W",
			xValueFormatString: "hh:mm:ss TT",
			name: "Bateria",
			dataPoints: dataPoints3

		},
			{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00 W",
			xValueFormatString: "hh:mm:ss TT",
			name: "Carga",
			dataPoints: dataPoints4

		}]
	});
	var chart2 = new CanvasJS.Chart("chartContainer2",{
		exportEnabled: true,
		animationEnabled: true,
		theme:"light2",
		title:{
			fontFamily:"Poppins",
			text: "Día calendario",
		},
		
		legend:{
			cursor: "pointer"
		},
		data: [{
			type: "pie",
			showInLegend: true,
			toolTipContent: " <strong>{indexLabel}: {y} Wh</strong>",
			dataPoints: dataPointsChar
		}]
	});

	var chart3 = new CanvasJS.Chart("chartContainer3", {
	exportEnabled: true,
	animationEnabled: true,
    theme: "light2",
    //	colorSet: "Colors",
	title:{
			fontFamily:"Poppins",
			text: "Día calendario",
	},
	legend:{
		cursor: "pointer"
	},
	data: [{
		type: "doughnut",
        startAngle:60,
		showInLegend: true,
        toolTipContent: " <strong>{indexLabel}: {y} %</strong>",
		dataPoints: dataPoints
	}]
});

	function drawCharts(){
		console.log("Getting Data")
		jQuery.getJSON("/GenerarCal",String(Fechas),function addData(data) {
			for (var i = 0; i < data.length; i++) {
				dataPoints1.push({
					label: data[i].datetime,
					y: parseFloat(data[i].P1),


				});
				dataPoints2.push({
					label: data[i].datetime,
					y: parseFloat(data[i].P2),


				});
				dataPoints3.push({
					label: data[i].datetime,
					y: parseFloat(data[i].P3),


				});
				dataPoints4.push({
					label: data[i].datetime,
					y: parseFloat(data[i].P4),


				});
			}

			chart.render();
			chart.set("data",[{
					type: "spline",
					showInLegend: true,
					yValueFormatString: "##.00 W",
					xValueFormatString: "hh:mm:ss TT",
					name: "Red",
					dataPoints: dataPoints1
					},
					{
					type: "spline",
					showInLegend: true,
					yValueFormatString: "##.00 W",
					xValueFormatString: "hh:mm:ss TT",
					name: "Panel",
					dataPoints: dataPoints2

				},
					{
					type: "spline",
					showInLegend: true,
					yValueFormatString: "##.00 W",
					xValueFormatString: "hh:mm:ss TT",
					name: "Bateria",
					dataPoints: dataPoints3

				},
					{
					type: "spline",
					showInLegend: true,
					yValueFormatString: "##.00 W",
					xValueFormatString: "hh:mm:ss TT",
					name: "Carga",
					dataPoints: dataPoints4

				}],true)

			dataPoints1=[];
			dataPoints2=[];
			dataPoints3=[];
			dataPoints4=[];


		//Draw Pie
		for(var i = 0; i < data.length; i++){
			for(var l in data[i]){
			if(!isNaN(data[i][l])){
				P1[i] = parseFloat(data[i].P1)
				P2[i] = parseFloat(data[i].P2)
				P3[i] = parseFloat(data[i].P3)
				P4[i] = parseFloat(data[i].P4)
			}
			}
		}

		for(i = 0; i < P1.length; i++){
		Red = Red + P1[i];
		Panel = Panel + P2[i];
		Bateria = Bateria + P3[i];
		if(Bateria<0){
			Bateria=0;
		}
		Carga = Carga + P4[i];
		}

		//PARA LOS DIAS
		Red = Math.round((Red/(P1.length))*24);
		Panel = Math.round((Panel/(P2.length))*24);
		Bateria = Math.round((Bateria/(P3.length))*24);

		//PARA LAS SEMANAS
		//Red = Math.round((Red/(P1.length))*168);
		//Panel = Math.round((Panel/(P2.length))*168);
		//Bateria = Math.round((Bateria/(P3.length))*168);

		//PARA LOS MESES
		//Red = Math.round((Red/(P1.length))*730);
		//Panel = Math.round((Panel/(P2.length))*730);
		//Bateria = Math.round((Bateria/(P3.length))*730);
		//console.log(dataPoints);

		dataPointsChar.push({indexLabel: "Red", y: Red, name:"Red" },{indexLabel: "Panel", y: Panel, name:"Panel"}, {indexLabel: "Bateria", y: Bateria, name:"Bateria"});
		chart2.render();
		dataPointsChar = [];
		Red = 0;
		Panel = 0;
		Bateria = 0;
		Carga = 0;

		//Estados
              for(var i = 0; i < data.length; i++){
                for(var l in data[i]){
                  if(!isNaN(data[i][l])){
                    //Recorro el json y guardo la info de los estados en este vector
                    state[i] = parseFloat(data[i].estado)
                  }  
                }
              }
            //console.log(state[0])  
            for(i = 0; i <state.length; i++){
            //Aqui quiero contar cuantas veces está cada estado en el vector de arriba
            if(state[i] == 1) {
                Estado1 = Estado1 + 1;
            } else 
                if(state[i] == 2) {
                Estado2++;
                } else 
                    if(state[i] == 3) {
                        Estado3++;
                    } else 
                        if(state[i] == 4) {
                            Estado4++;
                        } else 
                            if(state[i] == 5) {
                                Estado5++;
                            } 
            } 
 
            //Aquí el calculo del promedio de los estados y eso 
            S1 = Math.round((Estado1/(state.length))*100);
            S2 = Math.round((Estado2/(state.length))*100);
            S3 = Math.round((Estado3/(state.length))*100);
            S4 = Math.round((Estado4/(state.length))*100);
            S5 = Math.round((Estado5/(state.length))*100);

            dataPoints.push({indexLabel: "Estado 1", y: S1, name:"Estado 1" },{indexLabel: "Estado 2", y: S2, name:"Estado 2"},{indexLabel: "Estado 3", y: S3, name:"Estado 3"},{indexLabel: "Estado 4", y: S4, name:"Estado 4"}, {indexLabel: "Estado 5", y: S5, name:"Estado 5"}); 
            //console.log(dataPoints);
            chart3.render();
            dataPoints = [];
            Estado1 = 0;
            Estado2 = 0;
            Estado3 = 0;
            Estado4 = 0;
            Estado5 = 0;
		});

	}


	var P1 = [];
	var P2 = [];
	var P3 = [];
	var P4 = [];
	var Red = 0;
	var Panel = 0;
	var Bateria = 0;
	var Carga = 0;
	var tot = 0;



	function toggleDataSeries(e) {
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible ){
			e.dataSeries.visible = false;
		} else {
			e.dataSeries.visible = true;
		}
		chart.render();
	}

	drawCharts();
};

function window4 () {
	var dataPoints1 = [];
	var dataPoints2 = [];
	var dataPoints3 = [];
	var dataPoints4 = [];
	var data = [];
	var dataPointsChar=[];
	var dataPoints = [];
    var state = [];
	var Estado1 = 0;
	var Estado2 = 0;
	var Estado3 = 0;
	var Estado4 = 0; 
    var Estado5 = 0;

	var chart = new CanvasJS.Chart("chartContainer", {
		zoomEnabled: true,
		theme:"light2",
		animationEnabled: true,
		zoomEnabled: true,
		exportEnabled: true,
		title:{
			fontFamily:"Poppins",
			text: "Última semana",
		},
		
		axisY :{
			includeZero: false,
			title: "Potencia [W]",
			suffix: "W"
		},
		toolTip: {
			shared: true
		},
		legend:{
			cursor:"pointer",
			verticalAlign: "top",
			fontSize: 22,
			fontColor: "dimGrey",
			itemclick : toggleDataSeries
		},
		data: [{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00 W",
			xValueFormatString: "hh:mm:ss TT",
			name: "Red",
			dataPoints: dataPoints1
			},
			{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00 W",
			xValueFormatString: "hh:mm:ss TT",
			name: "Panel",
			dataPoints: dataPoints2

		},
			{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00 W",
			xValueFormatString: "hh:mm:ss TT",
			name: "Bateria",
			dataPoints: dataPoints3

		},
			{
			type: "spline",
			showInLegend: true,
			yValueFormatString: "##.00 W",
			xValueFormatString: "hh:mm:ss TT",
			name: "Carga",
			dataPoints: dataPoints4

		}]
	});
	var chart2 = new CanvasJS.Chart("chartContainer2",{
		exportEnabled: true,
		animationEnabled: true,
		theme:"light2",
		title:{
			fontFamily:"Poppins",
			text: "Última semana",
		},
		
		legend:{
			cursor: "pointer"
		},
		data: [{
			type: "pie",
			showInLegend: true,
			toolTipContent: " <strong>{indexLabel}: {y} Wh</strong>",
			dataPoints: dataPointsChar
		}]
	});

	var chart3 = new CanvasJS.Chart("chartContainer3", {
	exportEnabled: true,
	animationEnabled: true,
    theme: "light2",
    //	colorSet: "Colors",
	title:{
			fontFamily:"Poppins",
			text: "Última semana",
	},
	legend:{
		cursor: "pointer"
	},
	data: [{
		type: "doughnut",
        startAngle:60,
		showInLegend: true,
        toolTipContent: " <strong>{indexLabel}: {y} %</strong>",
		dataPoints: dataPoints
	}]
});

	function drawCharts(){
		console.log("Getting Data")
		jQuery.getJSON("/GenerarWeek",function addData(data) {
			for (var i = 0; i < data.length; i++) {
				dataPoints1.push({
					label: data[i].datetime,
					y: parseFloat(data[i].P1),


				});
				dataPoints2.push({
					label: data[i].datetime,
					y: parseFloat(data[i].P2),


				});
				dataPoints3.push({
					label: data[i].datetime,
					y: parseFloat(data[i].P3),


				});
				dataPoints4.push({
					label: data[i].datetime,
					y: parseFloat(data[i].P4),


				});
			}

			chart.render();
			chart.set("data",[{
					type: "spline",
					showInLegend: true,
					yValueFormatString: "##.00 W",
					xValueFormatString: "hh:mm:ss TT",
					name: "Red",
					dataPoints: dataPoints1
					},
					{
					type: "spline",
					showInLegend: true,
					yValueFormatString: "##.00 W",
					xValueFormatString: "hh:mm:ss TT",
					name: "Panel",
					dataPoints: dataPoints2

				},
					{
					type: "spline",
					showInLegend: true,
					yValueFormatString: "##.00 W",
					xValueFormatString: "hh:mm:ss TT",
					name: "Bateria",
					dataPoints: dataPoints3

				},
					{
					type: "spline",
					showInLegend: true,
					yValueFormatString: "##.00 W",
					xValueFormatString: "hh:mm:ss TT",
					name: "Carga",
					dataPoints: dataPoints4

				}],true)

			dataPoints1=[];
			dataPoints2=[];
			dataPoints3=[];
			dataPoints4=[];


		//Draw Pie
		for(var i = 0; i < data.length; i++){
			for(var l in data[i]){
			if(!isNaN(data[i][l])){
				P1[i] = parseFloat(data[i].P1)
				P2[i] = parseFloat(data[i].P2)
				P3[i] = parseFloat(data[i].P3)
				P4[i] = parseFloat(data[i].P4)
			}
			}
		}

		for(i = 0; i < P1.length; i++){
		Red = Red + P1[i];
		Panel = Panel + P2[i];
		Bateria = Bateria + P3[i];
		if(Bateria<0){
			Bateria=0;
		}
		Carga = Carga + P4[i];
		}

		//PARA LOS DIAS
		//Red = Math.round((Red/(P1.length))*24);
		//Panel = Math.round((Panel/(P2.length))*24);
		//Bateria = Math.round((Bateria/(P3.length))*24);

		//PARA LAS SEMANAS
		Red = Math.round((Red/(P1.length))*168);
		Panel = Math.round((Panel/(P2.length))*168);
		Bateria = Math.round((Bateria/(P3.length))*168);

		//PARA LOS MESES
		//Red = Math.round((Red/(P1.length))*730);
		//Panel = Math.round((Panel/(P2.length))*730);
		//Bateria = Math.round((Bateria/(P3.length))*730);
		//console.log(dataPoints);

		dataPointsChar.push({indexLabel: "Red", y: Red, name:"Red" },{indexLabel: "Panel", y: Panel, name:"Panel"}, {indexLabel: "Bateria", y: Bateria, name:"Bateria"});
		chart2.render();
		dataPointsChar = [];
		Red = 0;
		Panel = 0;
		Bateria = 0;
		Carga = 0;

	//Estados
              for(var i = 0; i < data.length; i++){
                for(var l in data[i]){
                  if(!isNaN(data[i][l])){
                    //Recorro el json y guardo la info de los estados en este vector
                    state[i] = parseFloat(data[i].estado)
                  }  
                }
              }
            //console.log(state[0])  
            for(i = 0; i <state.length; i++){
            //Aqui quiero contar cuantas veces está cada estado en el vector de arriba
            if(state[i] == 1) {
                Estado1 = Estado1 + 1;
            } else 
                if(state[i] == 2) {
                Estado2++;
                } else 
                    if(state[i] == 3) {
                        Estado3++;
                    } else 
                        if(state[i] == 4) {
                            Estado4++;
                        } else 
                            if(state[i] == 5) {
                                Estado5++;
                            } 
            } 
 
            //Aquí el calculo del promedio de los estados y eso 
            S1 = Math.round((Estado1/(state.length))*100);
            S2 = Math.round((Estado2/(state.length))*100);
            S3 = Math.round((Estado3/(state.length))*100);
            S4 = Math.round((Estado4/(state.length))*100);
            S5 = Math.round((Estado5/(state.length))*100);

            dataPoints.push({indexLabel: "Estado 1", y: S1, name:"Estado 1" },{indexLabel: "Estado 2", y: S2, name:"Estado 2"},{indexLabel: "Estado 3", y: S3, name:"Estado 3"},{indexLabel: "Estado 4", y: S4, name:"Estado 4"}, {indexLabel: "Estado 5", y: S5, name:"Estado 5"}); 
            //console.log(dataPoints);
            chart3.render();
            dataPoints = [];
            Estado1 = 0;
            Estado2 = 0;
            Estado3 = 0;
            Estado4 = 0;
            Estado5 = 0;
		});

	}


	var P1 = [];
	var P2 = [];
	var P3 = [];
	var P4 = [];
	var Red = 0;
	var Panel = 0;
	var Bateria = 0;
	var Carga = 0;
	var tot = 0;



	function toggleDataSeries(e) {
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible ){
			e.dataSeries.visible = false;
		} else {
			e.dataSeries.visible = true;
		}
		chart.render();
	}

	drawCharts();
};


 