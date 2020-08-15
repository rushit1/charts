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
	
var tmpdaata = [["2020-06-01 00:00:00", 322.35],["2020-06-02 00:00:00", 323.44],["2020-06-03 00:00:00", 323.44],["2020-06-04 00:00:00", 323.44]]

// get the names of the first dimension and measure available in data
//x = config.query_fields.dimensions[0].name;
//y = config.query_fields.dimensions[1].name;

	
// build data array for the chart, by iterating over the Looker data object
//var lnData = [];

//for(var row of data) {
//	lnData.push({
//		
//		y: row[y].value,
//		x : row[x].value
//	});
//	
//}
	
console.log('LnChart data', tmpdaata)

Highcharts.stockChart('container', {


        rangeSelector: {
            selected: 1
        },

        title: {
            text: 'AAPL Stock Price'
        },

        series: [{
            name: 'AAPL',
            data: [["2020-06-01 00:00:00", 322.35],["2020-06-02 00:00:00", 323.44],["2020-06-03 00:00:00", 323.44],["2020-06-04 00:00:00", 323.44]],
            tooltip: {
                valueDecimals: 2
            }
        }]
    })
 
//chart.data = lnData;
doneRendering();
}
})
