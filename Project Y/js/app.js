document.addEventListener('DOMContentLoaded', () => {
    // Mobile Sidebar Toggle
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menuToggle');
    const closeSidebar = document.getElementById('closeSidebar');

    menuToggle.addEventListener('click', () => {
        sidebar.classList.add('open');
    });

    closeSidebar.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target) && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        }
    });

    // Chart.js Configuration
    const ctx = document.getElementById('progressChart').getContext('2d');
    
    // Gradient for the chart fill
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(139, 92, 246, 0.5)'); // Purple
    gradient.addColorStop(1, 'rgba(139, 92, 246, 0.0)');

    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Study Hours',
            data: [4, 6, 5, 8, 3, 7, 5],
            borderColor: '#8b5cf6', // accent-purple
            backgroundColor: gradient,
            borderWidth: 3,
            pointBackgroundColor: '#0f111a',
            pointBorderColor: '#8b5cf6',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            fill: true,
            tension: 0.4 // Smooth curves
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false // Hide legend for cleaner look
                },
                tooltip: {
                    backgroundColor: 'rgba(26, 29, 45, 0.9)',
                    titleColor: '#f8fafc',
                    bodyColor: '#94a3b8',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} Hours`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            family: "'Outfit', sans-serif"
                        }
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            family: "'Outfit', sans-serif"
                        },
                        stepSize: 2
                    },
                    beginAtZero: true
                }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },
        }
    };

    new Chart(ctx, config);

    // Interactive Task Checkboxes
    const checkBtns = document.querySelectorAll('.check-btn');
    checkBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const taskItem = this.closest('.task-item');
            
            // Toggle completed state
            if (taskItem.style.opacity === '0.5') {
                taskItem.style.opacity = '1';
                taskItem.style.transform = 'scale(1)';
                this.innerHTML = '<i class="ph ph-check"></i>';
                this.style.background = 'rgba(255, 255, 255, 0.05)';
                this.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                this.style.color = '#94a3b8';
            } else {
                taskItem.style.opacity = '0.5';
                taskItem.style.transform = 'scale(0.98)';
                this.innerHTML = '<i class="ph-fill ph-check-circle"></i>';
                this.style.background = '#10b981'; // accent-green
                this.style.borderColor = '#10b981';
                this.style.color = 'white';
            }
        });
    });
});
