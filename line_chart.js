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
	
//console.log('LnChart data', lnData)

Highcharts.stockChart('container', {


        rangeSelector: {
            selected: 1
        },

        title: {
            text: 'AAPL Stock Price'
        },

        series: [{
            name: 'AAPL',
            data: [[1534167000000,208.87],[1534253400000,209.75],[1534339800000,210.24],[1534426200000,213.32],[1534512600000,217.58]],
            tooltip: {
                valueDecimals: 2
            }
        }]
    })
 
//chart.data = lnData;
doneRendering();
}
})
