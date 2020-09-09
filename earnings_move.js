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
y   = config.query_fields.dimensions[1].name;     // Move Percent
z  = config.query_fields.dimensions[2].name;      // Straddle Cost
 
var xdata = [];
for(var row of data) {
	var cell = row[queryResponse.fields.dimensions[0].name]
	xdata.push([
		row[x].value 
	]);
}

var moveper_data = [];
for(var row of data) {
	var cell = row[queryResponse.fields.dimensions[1].name]
	moveper_data.push([
		row[y].value 
	]);
}

var straddle_data = [];
for(var row of data) {
	var cell = row[queryResponse.fields.dimensions[2].name]
	straddle_data.push([
		row[z].value 
	]);
}
 
	
//var symbol       = row[z5].value
//var label1  = symbol + ' Quaterly Net Margin and Gross Margin'
console.log('Chart data 1', moveper_data)	
console.log('Chart data 1', straddle_data)	
 	
 
Highcharts.chart('container', {
    chart: {
        zoomType: 'xy'
    },
    title: {
        text: '' 
    },
    subtitle: {
        text: 'Earnings Move'
    },
    xAxis: [{
        categories: xdata,
        crosshair: true
    }],
    yAxis: [{ // Primary yAxis
        //labels: {
        //    format: '{value}%',
        //    style: {
        //        color: Highcharts.getOptions().colors[1]
        //    }
        //},
        title: {
            text: 'Earning Move %',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        }
    }, { // Secondary yAxis
        title: {
            text: 'Straddle Cost Percent',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        //labels: {
        //    format: '{value}%',
        //    style: {
        //        color: Highcharts.getOptions().colors[0]
         //   }
        //},
        opposite: true
    }],
    tooltip: {
        shared: true
    },
   // legend: {
   //     layout: 'vertical',
   //     align: 'left',
   //     x: 120,
   //     verticalAlign: 'top',
   //     y: 100,
   //     floating: true,
   //     backgroundColor:
   //         Highcharts.defaultOptions.legend.backgroundColor || // theme
   //         'rgba(255,255,255,0.25)'
   // },
    series: [{
        name: 'Straddle Cost %',
        type: 'column',
        yAxis: 1,
        data: straddle_data,
        tooltip: {
            valueSuffix: '%'
        }

    }, {
        name: 'Price %',
        type: 'spline',
        data: moveper_data,
        tooltip: {
            valueSuffix: '%'
        }
    }]
})
 
doneRendering();
}
})
