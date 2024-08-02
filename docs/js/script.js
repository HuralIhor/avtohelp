const elements = document.querySelectorAll('.animateMe');
const initialPositions = [];

// Збереження початкових позицій елементів
elements.forEach(element => {
    const rect = element.getBoundingClientRect();
    initialPositions.push({
        element: element,
        initialX: rect.left,
        initialY: rect.top
    });
});

function handleOrientation(event) {
    const beta = event.beta; // Обертання навколо X-осі (-180 до 180 градусів)
    const gamma = event.gamma; // Обертання навколо Y-осі (-90 до 90 градусів)

    // Обчислення зсуву
    const offsetX = gamma * 5; // Коефіцієнт 5 для масштабування
    const offsetY = beta * 5; // Коефіцієнт 5 для масштабування

    // Оновлення позиції кожного елемента
    initialPositions.forEach(item => {
        item.element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
}

// Перевірка підтримки події deviceorientation та запит дозволу
function requestPermission() {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener('deviceorientation', handleOrientation);
                } else {
                    console.log('Доступ до DeviceOrientationEvent не наданий');
                }
            })
            .catch(console.error);
    } else {
        // Необхідний для пристроїв, які не потребують явного запиту дозволу (наприклад, Android)
        window.addEventListener('deviceorientation', handleOrientation);
    }
}

// Запит дозволу при завантаженні сторінки
window.addEventListener('load', requestPermission);
