
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('comment-form');
    const commentsList = document.getElementById('comments-list');

    // Cargar comentarios desde localStorage
    const loadComments = () => {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        commentsList.innerHTML = comments.map((comment, index) => `
            <div class="comment">
                <button class="delete-btn" data-index="${index}">Eliminar</button>
                <div class="username">${comment.username}</div>
                <div class="timestamp">${comment.timestamp}</div>
                <div class="text">${comment.comment}</div>
            </div>
        `).join('');
        addDeleteEventListeners();
    };

    // Guardar comentario en localStorage
    const saveComment = (username, commentText) => {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push({
            username: username,
            comment: commentText,
            timestamp: new Date().toLocaleString()
        });
        localStorage.setItem('comments', JSON.stringify(comments));
    };

    // Eliminar comentario del localStorage
    const deleteComment = (index) => {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.splice(index, 1);  // Elimina el comentario en la posición indicada
        localStorage.setItem('comments', JSON.stringify(comments));
        loadComments();  // Recargar comentarios después de eliminar uno
    };

    // Manejar el envío del formulario
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = form.username.value.trim();
        const commentText = form.comment.value.trim();

        if (username && commentText) {
            saveComment(username, commentText);
            form.reset();
            loadComments();
        }
    });

    // Añadir los event listeners para los botones de eliminar
    const addDeleteEventListeners = () => {
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                deleteComment(index);
            });
        });
    };

    // Inicializar la sección de comentarios
    loadComments();
});



// Datos para el primer gráfico (Número de Barrios Populares por Zona)
const ctx1 = document.getElementById('myChart1').getContext('2d');
new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: ['Zona Sur', 'Zona Este', 'Zona Oeste', 'Zona Norte'],
        datasets: [{
            label: 'Número de Barrios Populares',
            data: [15, 20, 8, 12],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Zonas'
                },
                ticks: {
                    font: { size: 12 },
                    autoSkip: true,
                    maxTicksLimit: 5
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Número de Barrios Populares'
                },
                ticks: {
                    font: { size: 12 }
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    font: { size: 14 }
                }
            }
        }
    }
});

// Datos para el segundo gráfico (Barrios por Año de Creación)
const ctx2 = document.getElementById('myChart2').getContext('2d');
new Chart(ctx2, {
    type: 'pie',
    data: {
        labels: ['Antes del 2000', 'Después del 2010'],
        datasets: [{
            label: 'Distribución por Año de Creación',
            data: [2275, 749],
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                return '${tooltipItem.label}: ${tooltipItem.raw}'}
                    }
                }
            }
        }
    }
);

// Datos para el tercer gráfico (Distribución por Grupo de Edad)
const ctx3 = document.getElementById('myChart3').getContext('2d');
new Chart(ctx3, {
    type: 'pie',
    data: {
        labels: ['Menores de 20 años', 'Mayores de 65 años', 'Entre 20 y 64 años'],
        datasets: [{
            label: 'Distribución por Grupo de Edad',
            data: [0.38 * 1.3e6, 0.03 * 1.3e6, 0.59 * 1.3e6],  // Datos en número absoluto
            backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(255, 205, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgba(255, 159, 64, 1)', 'rgba(255, 205, 86, 1)', 'rgba(75, 192, 192, 1)'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: true,
                position: 'top'
        },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return $;{Math.round(tooltipItem.raw / 1e3)}K;  // Formato K para miles';
                    }
                }
            }
        }
    }
});

// Menú hamburguesa
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('nav ul').classList.toggle('show');
});
