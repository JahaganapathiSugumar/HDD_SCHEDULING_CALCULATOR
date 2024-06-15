document.addEventListener("DOMContentLoaded", function() {
    const result = sessionStorage.getItem('result');
    const movements = JSON.parse(sessionStorage.getItem('movements'));
    const direction = sessionStorage.getItem('direction');
    const algorithm = sessionStorage.getItem('algorithm');

    const ctx = document.getElementById('diskChart').getContext('2d');

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: movements.map((_, index) => index),
            datasets: [{
                label: 'Disk Head Movements',
                data: movements,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                lineTension: 0,
                borderWidth: 2,
                pointRadius: 5,
                pointBackgroundColor: 'rgb(75, 192, 192)',
                pointHoverRadius: 7,
                pointHoverBackgroundColor: 'rgb(75, 192, 192)',
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Sequence of Movements'
                    }
                },
                y: {
                    min: 0,
                    max: Math.max(...movements) + 10, // Adjust the max value to ensure it covers the disk size
                    title: {
                        display: true,
                        text: 'Disk Cylinder Number'
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y;
                            }
                            if (direction) {
                                label += ` (${direction})`;
                            }
                            return label;
                        }
                    }
                }
            },
            interaction: {
                mode: 'index',
                intersect: false,
            }
        }
    });

    document.getElementById('algorithmUsed').innerText = `Algorithm Used: ${algorithm}`;
    document.getElementById('totalMovement').innerText = `Total Movement: ${result}`;
});

function goBack() {
    window.history.back();
}
