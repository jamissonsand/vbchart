$(document).ready(function () {
    labels = [
        12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12,
    ];
    data_left1 = [
        12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12,
    ];
    data_left2 = [
        0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 5.5, 5, 4.5, 4, 3.5,
        3, 2.5, 2, 1.5, 1, 0.5, 0,
    ];
    points = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        6.04,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
    ];

    function resize_left_image(height, width) {
        $("#image_left").css("height", height);
        $("#image_right").css("height", height);
        $("#image_bottom").css("width", width);
        $("#image_top").css("width", width);
    }

    const plugin = {
        id: "custom_gradient",
        afterLayout: (chart) => {
            var dataset = chart.data.datasets[0];
            console.log(chart);
            gradient = chart.ctx.createLinearGradient(
                chart.chartArea.top * 2,
                0,
                chart.chartArea.bottom * 2,
                0
            );
            gradient.addColorStop(0.895, "red");
            gradient.addColorStop(0.5, "white");
            gradient.addColorStop(0.25, "#0061F3");
            dataset.backgroundColor = gradient;
        },
    };

    var my_point = new Image();
    my_point.src = "./round-point.png";

    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
        type: "line",
        plugins: [plugin],
        data: {
            labels: labels,
            datasets: [
                {
                    label: "",
                    backgroundColor: "blue",
                    data: data_left1,
                    fill: 1,
                    pointRadius: 0,
                    pointHitRadius: 0,
                    pointHoverRadius: 0,
                    order: 1,
                    stack: "combined",
                },
                {
                    label: "",
                    backgroundColor: "blue",
                    data: data_left2,
                    fill: false,
                    pointRadius: 0,
                    pointHitRadius: 0,
                    pointHoverRadius: 0,
                    order: 1,
                    stack: "combined",
                },
                {
                    label: "",
                    data: points,
                    backgroundColor: "black",
                    type: "scatter",
                    order: 0,
                    pointRadius: 10,
                    pointStyle: my_point,
                },
            ],
        },
        options: {
            animation: {
                onComplete: function (chart) {
                    resize_left_image(
                        chart.chart.chartArea.height,
                        chart.chart.chartArea.width
                    );
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    enabled: false,
                },
            },
            scales: {
                yAxes: {
                    stacked: true,
                    ticks: {
                        display: false, //this will remove only the label
                    },
                },
                xAxes: {
                    ticks: {
                        display: false, //this will remove only the label
                    },
                },
            },
            interaction: {
                intersect: false,
            },
        },
    });
    window.addEventListener("beforeprint", () => {
        myChart.resize(600, 350);
    });
    window.addEventListener("afterprint", () => {
        myChart.resize();
    });
});
