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

	
// build data array for the chart, by iterating over the Looker data object
var lnData = [];

for(var row of data) {
	lnData.push({
		row[x].value,
		row[y].value
	});
	
}
	
console.log('Chart data', lnData)
Highcharts.stockChart('container', {


        rangeSelector: {
            selected: 1
        },

        title: {
            text: 'AAPL Stock Price'
        },

        series: [{
            name: 'AAPL',
            data: [lnData],
            tooltip: {
                valueDecimals: 2
            }
        }]
    })
 
doneRendering();
}
})
