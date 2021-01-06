looker.plugins.visualizations.add({
create: function(element, config) {
  element.innerHTML = `
	<style>
	.sannith {
	min-width: 310px;
	height: 400px
	}
	</style>
	`;
	
    var container = element.appendChild(document.createElement("div"));
	container.className = "sannith";
    container.id = 'container';
		
  },

updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
// Clear any errors from previous updates:
this.clearErrors();

// Dump data and metadata to console:
console.log('updateAsync() data', data)
console.log('updateAsync() config', config)
console.log('updateAsync() queryResponse', queryResponse)
	
// get the names of the first dimension and measure available in data

x  = config.query_fields.dimensions[0].name;     // activity
y  = config.query_fields.dimensions[1].name;     // quater
z  = config.query_fields.dimensions[2].name;     // total count
a  = config.query_fields.dimensions[3].name;     // BM
 
var xdata = [];
for(var row of data) {
	var cell = row[queryResponse.fields.dimensions[0].name]
	xdata.push([
		row[x].value 
	]);
}

var netmargin_data = [];
for(var row of data) {
	var cell = row[queryResponse.fields.dimensions[1].name]
	netmargin_data.push([
		row[y].value 
	]);
}

var grossmargin_data = [];
for(var row of data) {
	var cell = row[queryResponse.fields.dimensions[2].name]
	grossmargin_data.push([
		row[z].value 
	]);
}

var bm_data = [];
for(var row of data) {
	var cell = row[queryResponse.fields.dimensions[3].name]
	bm_data.push([
		row[a].value 
	]);
}
	
for(var row of data) {
	var cell = row[queryResponse.fields.dimensions[3].name]
	bm_data.push([
		row[a].value 
	]);
}

fLen = grossmargin_data.length;
var i;
var color_data = [];
	
for (i = 0; i < fLen; i++) {
	if (grossmargin_data[i] > bm_data [i] ) { color_data.push("#44cf3a");} 
	else if (grossmargin_data[i] < bm_data [i] ) {color_data.push("#cf0f14");} 
	else { color_data.push("#f3ff4a");}
}

	
//var symbol       = row[z5].value
//var label1  = symbol + ' Quaterly Net Margin and Gross Margin'
console.log('Chart data 1', cell)	
console.log('Color', color_data)	
 	
 
Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Efficiency Optimization by Branch'
    },
    xAxis: {
        categories: netmargin_data
    },
    
    legend: {
        shadow: false
    },
    tooltip: {
        shared: true
    },
    plotOptions: {
        column: {
            grouping: false,
            shadow: false,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Goal',
        color: 'rgba(165,170,217,1)',
        data: bm_data,
        pointPadding: 0.3,
        pointPlacement: -0.2
    }, {
        name: 'Total Count',
        color: color_data,
        data: grossmargin_data,
        pointPadding: 0.4,
        pointPlacement: -0.2
    }]
})
 
doneRendering();
}
})
