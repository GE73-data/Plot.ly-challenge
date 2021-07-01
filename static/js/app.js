// FUNCTION #1 of 4
function buildCharts(patientID) {
    d3.json("samples.json").then(data => {
        console.log(data)
        var samples = data.samples

        //BARCHART

        var data = [
            {
                x: ['giraffes', 'orangutans', 'monkeys'],
                y: [20, 14, 23],
                type: 'bar'
            }
        ];

        Plotly.newPlot('barDiv', data);

        //BUBBLE CHARTS
        var trace1 = {
            x: [1, 2, 3, 4],
            y: [10, 11, 12, 13],
            mode: 'markers',
            marker: {
                size: [40, 60, 80, 100]
            }
        };

        var data = [trace1];

        var layout = {
            title: 'Marker Size',
            showlegend: false,
            height: 600,
            width: 600
        };

        Plotly.newPlot('bubbleDiv', data, layout);

        //GAUGE
        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: 450,
                title: { text: "Speed" },
                type: "indicator",
                mode: "gauge+number",
                delta: { reference: 400 },
                gauge: { axis: { range: [null, 500] } }
            }
        ];

        var layout = { width: 600, height: 400 };
        Plotly.newPlot('gaugeDiv', data, layout);

        // ADD APPROXIMATELY 50 LINES OF CODE

        // Plotly.newPlot("barDiv", barData, barLayout)
        // Plotly.newPlot("bubbleDiv", bubbleData, bubbleLayout)
        // Plotly.newPlot("gaugeDiv", guageData, bubbleLayout)
    });
};

// FUNCTION #2 of 4
function populateDemographicInfo(patientID) {

    var demographicInfoBox = d3.select("#sample-metadata");

    d3.json("samples.json").then(data => {
        demographicInfoBox.html("")
        console.log(data)
        var metaData = data.metadata
        console.log(metaData)
        var dataFromSelectedPatient = metaData.filter(patient => patient.id == patientID)[0]
        console.log(dataFromSelectedPatient)
        let toString = obj => Object.entries(obj).map(([key, value]) => `${key}: ${value}`).join(', ');


        console.log(toString(dataFromSelectedPatient));
        demographicInfoBox.append("h6").text(toString(dataFromSelectedPatient))
        // ADD APPROXIMATELY 3-6 LINE OF CODE
    });
}

// FUNCTION #3 of 4
function optionChanged(patientID) {
    console.log(patientID);
    buildCharts(patientID);
    populateDemographicInfo(patientID);
}

// FUNCTION #4 of 4
function initializeDashboard() {
    var dropdown = d3.select("#selDataset")
    d3.json("samples.json").then(data => {
        var patientIDs = data.names;
        patientIDs.forEach(patientID => {
            dropdown.append("option").text(patientID).property("value", patientID)
        })
        buildCharts(patientIDs[0]);
        populateDemographicInfo(patientIDs[0]);
    });
};

initializeDashboard();