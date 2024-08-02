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

// Перевірка підтримки події deviceorientation
if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', handleOrientation);
} else {
    console.log("DeviceOrientationEvent не підтримується вашим пристроєм.");
}

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
        item.element.style.transform = `translate(${newX}px, ${newY}px)`;
    });
}