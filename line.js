looker.plugins.visualizations.add({
create: function(element, config) {
  element.innerHTML = `
	<style>
  .rushit {
   height: 400px; min-width: 310px;
   }
    </style>
	`;
  
    var container = element.appendChild(document.createElement("div"));
	container.className = "rushit";
    container.id = 'amContainer';
	
	//this.container = element.appendChild(document.createElement("div"));
	
  },
  
  updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
// Clear any errors from previous updates:
this.clearErrors();

// Dump data and metadata to console:
console.log('updateAsync() data', data)
console.log('updateAsync() config', config)
console.log('updateAsync() queryResponse', queryResponse)

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
    });
})
  
