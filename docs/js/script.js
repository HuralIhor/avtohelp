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
        const newX = item.initialX + offsetX;
        const newY = item.initialY + offsetY;
        item.element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
}

function requestPermission() {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener('deviceorientation', handleOrientation);
                    removePermissionEventListeners();
                } else {
                    console.log('Доступ до DeviceOrientationEvent не наданий');
                }
            })
            .catch(console.error);
    } else {
        // Необхідний для пристроїв, які не потребують явного запиту дозволу (наприклад, Android)
        window.addEventListener('deviceorientation', handleOrientation);
        removePermissionEventListeners();
    }
}

function removePermissionEventListeners() {
    document.body.removeEventListener('click', requestPermission);
    document.body.removeEventListener('scroll', requestPermission);
}

// Запит дозволу при натисканні або скролі
document.body.addEventListener('click', requestPermission, { once: true });
document.body.addEventListener('scroll', requestPermission, { once: true });
