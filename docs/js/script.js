const elements = document.querySelectorAll('.services > *');

function handleOrientation(event) {
  const beta = event.beta; // Обертання навколо X-осі (-180 до 180 градусів)
  const gamma = event.gamma; // Обертання навколо Y-осі (-90 до 90 градусів)

  // Обчислення зсуву з обмеженням до 5 пікселів і додавання 3D ефекту
  const offsetX = Math.min(Math.max(-gamma * 0.1, -5), 5); // Зсув по горизонталі, інвертований
  const offsetY = Math.min(Math.max(-beta * 0.1, -5), 5); // Зсув по вертикалі, інвертований

  // Оновлення позиції кожного елемента
  elements.forEach(item => {
    item.style.transform = `rotateY(${offsetX}deg) rotateX(${offsetY}deg) translateZ(${offsetX}px)`;
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
document.body.addEventListener('click', requestPermission, {
  once: true
});
document.body.addEventListener('scroll', requestPermission, {
  once: true
});


document.addEventListener('DOMContentLoaded', function () {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const swiperWrapper = document.getElementById('swiper-wrapper');

      data.forEach(slide => {
        const slideElement = document.createElement('div');
        slideElement.classList.add('swiper-slide');

        const nameEl = document.createElement('h3');
        nameEl.textContent = slide.name;

        const serviceEl = document.createElement('h4');
        serviceEl.textContent = slide.service;

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = slide.description;

        slideElement.appendChild(nameEl);
        slideElement.appendChild(serviceEl);
        slideElement.appendChild(descriptionElement);

        swiperWrapper.appendChild(slideElement);
      });

      // Initialize Swiper after dynamically adding slides
      new Swiper('.swiper-container', {
        slidesPerView: 1,
        loop: true,
        autoHeight: true,
        speed: 700,
        spaceBetween: 100,
        autoplay: {
          delay: 5000,
        },
        breakpoints: {
          1124: {
            slidesPerView: 3,
            spaceBetween: 30,
            autoHeight: false,
          },
        },
        speed: 400,
        spaceBetween: 100,
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
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();

  fetch('sendler/telegram.php', {
      method: 'POST',
      body: new FormData(this)
  })
  .then(response => {
      if (response.ok) {
          // document.querySelector('.overlay').style.display = 'block';
          // document.getElementById('thanks').style.display = 'block';
          document.querySelector('form').reset();
      } else {
          console.error('Server error:', response.statusText);
      }
  })
  .catch(error => console.error('Fetch error:', error));
});
