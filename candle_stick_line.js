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
y   = config.query_fields.dimensions[1].name;     // Open
z1  = config.query_fields.dimensions[2].name;    // High
z2  = config.query_fields.dimensions[3].name;    // Low 
z3  = config.query_fields.dimensions[4].name;    // Close
z5  = config.query_fields.dimensions[5].name;    // Symbol
z6  = config.query_fields.dimensions[6].name;    // Last Entry Date
z7  = config.query_fields.dimensions[7].name;    // Entry Price
z8  = config.query_fields.dimensions[8].name;    // Target Price 1
z9  = config.query_fields.dimensions[9].name;    // Target Price 2
z10 = config.query_fields.dimensions[10].name;  // Target Price 3
z11 = config.query_fields.dimensions[11].name;  // Stop Loss Price 1
z12 = config.query_fields.dimensions[12].name;  // Stop Loss Price 2
z13 = config.query_fields.dimensions[13].name;  // Stop Loss Price 3

// load band variables 

//var ta = row[z8].value;
//var tb = row[z9].value;
//var tc = row[z10].value;

//var sla = row[z11].value;
//var slb = row[z12].value;
//var slc = row[z13].value;
	
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
	}

//var StateData = [];	
//for(var row of data) {
//	
//	if (row[z4]['value'] !== null) 
//	{var cell = row[queryResponse.fields.dimensions[0].name]
//	StateData.push({
//		x: row[x].value,
//		title: row[z4].value,
//		text: row[z4].value
//	});}
//	}
	
var symbol       = row[z5].value
var chart_title  = symbol + ' stock price'
console.log('Chart data 1', cell)	
console.log('Chart data', lnData)
console.log('Entry Price', row[z7].value)
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
            name: symbol,
            type: 'candlestick',
            data: lnData,
	        id: 'stockseries',
            tooltip: {
                valueDecimals: 2
                     }
 //               },
//	            {
//           type: 'flags',
 //          data: StateData,
//	       onSeries:'stockseries'	
                }],
         yAxis: {
              plotBands: [{
                      color: '#32CD32',
                        to: row[z9].value,
                     from: row[z8].value
                        },
                        {
                    color: '#6FDC6F',
                      to: row[z10].value,
                    from: row[z9].value
                        },
						{
                    color: '#DE2008',
                       to: row[z12].value,
                     from: row[z11].value 
                        },
                        {
                    color: '#FF6347',
                      to: row[z13].value,
                   from: row[z12].value
                        }]
              } 
    }) 
doneRendering();
}
})
