// const elements = document.querySelectorAll('.animateMe');
// const initialPositions = [];

// // Збереження початкових позицій елементів
// elements.forEach(element => {
//     const rect = element.getBoundingClientRect();
//     initialPositions.push({
//         element: element,
//         initialX: rect.left,
//         initialY: rect.top
//     });
// });

// function handleOrientation(event) {
//     const beta = event.beta; // Обертання навколо X-осі (-180 до 180 градусів)
//     const gamma = event.gamma; // Обертання навколо Y-осі (-90 до 90 градусів)

//     // Обчислення зсуву
//     const offsetX = gamma * 5; // Коефіцієнт 5 для масштабування
//     const offsetY = beta * 5; // Коефіцієнт 5 для масштабування

//     // Оновлення позиції кожного елемента
//     initialPositions.forEach(item => {
//         const newX = item.initialX + offsetX;
//         const newY = item.initialY + offsetY;
//         item.element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
//     });
// }

// function requestPermission() {
//     if (typeof DeviceMotionEvent.requestPermission === 'function') {
//         DeviceMotionEvent.requestPermission()
//             .then(permissionState => {
//                 if (permissionState === 'granted') {
//                     window.addEventListener('deviceorientation', handleOrientation);
//                     removePermissionEventListeners();
//                 } else {
//                     console.log('Доступ до DeviceOrientationEvent не наданий');
//                 }
//             })
//             .catch(console.error);
//     } else {
//         // Необхідний для пристроїв, які не потребують явного запиту дозволу (наприклад, Android)
//         window.addEventListener('deviceorientation', handleOrientation);
//         removePermissionEventListeners();
//     }
// }

// function removePermissionEventListeners() {
//     document.body.removeEventListener('click', requestPermission);
//     document.body.removeEventListener('scroll', requestPermission);
// }

// // Запит дозволу при натисканні або скролі
// document.body.addEventListener('click', requestPermission, { once: true });
// document.body.addEventListener('scroll', requestPermission, { once: true });






const elements = document.querySelectorAll('.services > *');

function handleOrientation(event) {
    const beta = event.beta; // Обертання навколо X-осі (-180 до 180 градусів)
    const gamma = event.gamma; // Обертання навколо Y-осі (-90 до 90 градусів)

    // Обчислення зсуву з обмеженням до 5 пікселів
    const offsetX = Math.min(Math.max(gamma * 0.1, -5), 5);
    const offsetY = Math.min(Math.max(beta * 0.1, -5), 5);

    // Оновлення позиції кожного елемента
    elements.forEach(item => {
        item.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
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


document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        const swiperWrapper = document.getElementById('swiper-wrapper');
  
        data.forEach(slide => {
          const slideElement = document.createElement('div');
          slideElement.classList.add('swiper-slide');
  
          const imgElement = document.createElement('img');
          imgElement.src = slide.image;
          imgElement.alt = slide.title;
  
          const titleElement = document.createElement('h3');
          titleElement.textContent = slide.title;
  
          const descriptionElement = document.createElement('p');
          descriptionElement.textContent = slide.description;
  
          slideElement.appendChild(imgElement);
          slideElement.appendChild(titleElement);
          slideElement.appendChild(descriptionElement);
  
          swiperWrapper.appendChild(slideElement);
        });
  
        // Initialize Swiper after dynamically adding slides
        new Swiper('.swiper-container', {
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });
      })
      .catch(error => console.error('Error loading JSON data:', error));
  });
  