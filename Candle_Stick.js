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
x = config.query_fields.dimensions[0].name;
y = config.query_fields.dimensions[1].name;
z1 = config.query_fields.dimensions[2].name;
z2 = config.query_fields.dimensions[3].name;
z3 = config.query_fields.dimensions[4].name;
z4 = config.query_fields.dimensions[5].name;
z5 = config.query_fields.dimensions[6].name;
	
// build data array for the chart, by iterating over the Looker data object
var lnData = [];

for(var row of data) {
	var cell = row[queryResponse.fields.dimensions[0].name]
	lnData.push([
		row[x].value,
		row[y].value,
		row[z1].value,
		row[z2].value,
		row[z3].value
	]);
	
var symbol       = row[z5].value
var chart_title  = symbol + ' stock price'
}
	
console.log('Chart data', lnData)
Highcharts.stockChart('container', {


        title: {
            text:chart_title
        },

        rangeSelector: {
            buttons: [{
                type: 'hour',
                count: 1,
                text: '1h'
            }, {
                type: 'day',
                count: 1,
                text: '1D'
            }, {
                type: 'all',
                count: 1,
                text: 'All'
            }],
            selected: 1,
            inputEnabled: false
        },

        series: [{
            name: 'AAPL',
            type: 'candlestick',
            data: lnData,
            tooltip: {
                valueDecimals: 2
            }
        }]
    }) 
doneRendering();
}
})
