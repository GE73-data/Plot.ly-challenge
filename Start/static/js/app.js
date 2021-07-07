
function buildMetadata(sample) {
    //get my samples data from samples.json file
    d3.json("samples.json").then((data) => {
        console.log(data);
        var metadata = data.metadata;
        console.log(metadata);

        //filter the metadata for a single sample
        var resultArray = metadata.filter(sampleObject => sampleObject.id == sample);
        console.log(resultArray);

        var result = resultArray[0];
        console.log(result);

        var washFrequency = result.wfreq;
        console.log(washFrequency);

        // build gauge
        var gaugeData = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: washFrequency,
              title: {text: "Belly Button Washing Frequency <br> Scrubs per Week"},
              type: "indicator",
              mode: "gauge+number",
              gauge: { axis: { range: [null, 9] } }
            }
          ];
          
          var gaugeLayout = { width: 600, height: 400 };

          Plotly.newPlot('gauge', gaugeData, gaugeLayout);
        // Demographic  Info
        var panel = d3.select("#sample-metadata");

        //ensure the panel is clear before loading metadata
        panel.html("");

        // object.entries to access key value pairs
        // use chain technique to add text to h5 tag for each key value pair
        Object.entries(result).forEach(([key, value]) => {
            panel.append("h5").text(`${key.toUpperCase()}: ${value}`);
        });

    });

}

function buildCharts (sample) {
    d3.json("samples.json").then((data) => {
        console.log(data);

        var samples = data.samples;
        console.log(samples);

        var resultArray = samples.filter(sampleObject => sampleObject.id == sample);
        console.log(resultArray);

        var result = resultArray[0]
        console.log(result);


        // parse data to variables
        // Use sample_values as the values for the bar chart.

// Use otu_ids as the labels for the bar chart.

// Use otu_labels as the hovertext for the chart.

// bar Chart
        var sample_values = result.sample_values;
        console.log(sample_values);

        var otu_ids = result.otu_ids;
        console.log(otu_ids);

        var otu_labels = result.otu_labels;
        console.log(otu_labels);

        // build horizontal barchart

        // use slice to get the top 10 bacteria

        // use map function iterate over each of the top 10 and create string OTU otuid
        var yticks = otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();

        var barData = [{
            y: yticks,
            x: sample_values.slice(0,10).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h",
        }];

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {
                t: 30,
                r: 0,
                b: 20,
                l: 140,
            },
        };
        
        
        Plotly.newPlot("bar", barData, barLayout)

        // build bubble Chart

        var bubbleData = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth",
            }
        }];
          
        var bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            margin: {
                t: 30,
                r: 10,
                b: 40,
                l: 10,
            },
            hovermode: "closest",
            xaxis: {title: "OTU Id"},
          };
          
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    }); 

}
//initialize dashboard with init function
function init() { 

    var pullDownMenu = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {

        var names = data.names;
        console.log(data.names);

        names.forEach((sample) => {
            pullDownMenu
                .append("option")
                .property("value", sample)
                .text(sample)
        });

    });    

    buildMetadata(940);
    buildCharts(940);
}

function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
}

init();