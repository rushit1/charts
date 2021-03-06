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

x   = config.query_fields.dimensions[0].name;     // Date
y   = config.query_fields.dimensions[1].name;     // Net Margin
z  = config.query_fields.dimensions[2].name;      // Gross Margin
 
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
 
	
//var symbol       = row[z5].value
//var label1  = symbol + ' Quaterly Net Margin and Gross Margin'
console.log('Chart data 1', cell)	
 	
 
Highcharts.chart('container', {
    chart: {
        zoomType: 'xy'
    },
    title: {
        text: '' 
    },
    subtitle: {
        text: 'Quaterly Net Margin and Gross Margin Chart'
    },
    xAxis: [{
        categories: xdata,
        crosshair: true
    }],
    yAxis: [{ // Primary yAxis
        labels: {
            format: '{value}%',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        title: {
            text: 'Gross Margin',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        }
    }, { // Secondary yAxis
        title: {
            text: 'Net Profit Margin',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        labels: {
            format: '{value}%',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        opposite: true
    }],
    tooltip: {
        shared: true
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        x: 120,
        verticalAlign: 'top',
        y: 100,
        floating: true,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || // theme
            'rgba(255,255,255,0.25)'
    },
    series: [{
        name: 'Net Profit Margin',
        type: 'column',
        yAxis: 1,
        data: netmargin_data,
        tooltip: {
            valueSuffix: '%'
        }

    }, {
        name: 'Gross Margin',
        type: 'spline',
        data: grossmargin_data,
        tooltip: {
            valueSuffix: '%'
        }
    }]
})
 
doneRendering();
}
})
