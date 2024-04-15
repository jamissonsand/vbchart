$(document).ready(function () {
    // Função para obter parâmetros da URL
    function getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    // Obtendo os valores dos pontos X e Y da URL
    var pointX = parseFloat(getParameterByName('pointx')) || 17; // Ponto X padrão: 17
    var pointY = parseFloat(getParameterByName('pointy')) || 6.04; // Ponto Y padrão: 6.04

    // Criando o array de pontos
    var points = [{ x: pointX, y: pointY }];

    var my_point = new Image();
    my_point.src = "./circle.svg";

    var img = new Image();
    img.src = "./grafico2.svg";

    var legendImg = new Image();
    legendImg.src = "./legenda.svg";

    img.onload = function() { // Aguarde até que a imagem seja carregada antes de desenhar o gráfico
        // Função para redimensionar o gráfico
        function resizeChart() {
            var container = document.getElementById("chart-container");
            var width = container.offsetWidth;
            var height = (width / 960) * 480; // Mantendo a proporção 600 por 350

            ctx.canvas.width = width;
            ctx.canvas.height = height;

            myChart.resize(width, height);
        }

        // Redimensionar o gráfico quando a janela for redimensionada
        window.addEventListener('resize', resizeChart);

        var ctx = document.getElementById("myChart").getContext("2d");
        var myChart = new Chart(ctx, {
            type: "scatter",
            data: {
                datasets: [{
                    label: "",
                    data: points,
                    backgroundColor: "transparent",
                    borderColor: "black",
                    borderWidth: 1,
                    pointRadius: 10,
                    pointStyle: my_point,
                    pointBorderColor: "black",
                    pointBackgroundColor: "black",
                    pointBorderWidth: 1
                }]
            },
            options: {
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                },
                scales: {
                    y: {
                        display: false,
                        min: -1,
                        max: 13,
                        ticks: {
                            display: false,
                            stepSize: 2 // Definindo o espaçamento entre as linhas do grid em 2 unidades de altura
                        }
                    },
                    x: {
                        display: false,
                        min: -13.5,
                        max: 13.5,
                        ticks: {
                            display: false,
                            stepSize: 1 // Definindo o espaçamento entre as linhas do grid em 1 unidade de largura
                        }
                    }
                },
                interaction: { intersect: false }
            },
            // Adicionando a imagem ao gráfico
            plugins: [{
                beforeDraw: function(chart) {
                    var ctx = chart.ctx;
                    var xAxis = chart.scales['x'];
                    var yAxis = chart.scales['y'];
                    
                    // Desenhar imagem do gráfico 10px menor em cada lado
                    var graphWidth = xAxis.width * 0.9; // 80% da largura do contêiner
var graphHeight = yAxis.height * 0.87; // 80% da altura do contêiner
var graphX = xAxis.left + (xAxis.width * 0.05); // 10% de margem esquerda
var graphY = yAxis.top + (yAxis.height * 0.07); // 10% de margem superior
ctx.drawImage(img, graphX, graphY, graphWidth, graphHeight);
// Desenhar legenda por baixo
ctx.drawImage(legendImg, xAxis.left, yAxis.top, xAxis.width, yAxis.height);
                }
            }]
        });

        // Redimensionar o gráfico ao carregar a página
        resizeChart();

        window.addEventListener("beforeprint", () => {
            myChart.resize(960, 480);
        });

        window.addEventListener("afterprint", () => {
            resizeChart();
        });
    };
});