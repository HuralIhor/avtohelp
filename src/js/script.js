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
    // Отримуємо значення полів форми
    let name = document.getElementById('name').value;
    let service = document.getElementById('service').value;
    let feedback = document.getElementById('feedback').value;

    // Формуємо повідомлення для надсилання в Telegram
    let message = `<b>Ім'я:</b> ${name}%0A<b>Послуга:</b> ${service}%0A<b>Відгук:</b> ${feedback}`;

    // Токен вашого Telegram бота
    const token = "7207235159:AAH3UHIuD6IZDkA8BxCl71nDad2pjyEY8PE"; // замініть на ваш токен
    // ID чату або каналу
    const chat_id = "6553863452"; // замініть на ваш chat_id

    // URL для надсилання повідомлення
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&parse_mode=html&text=${message}`;

    // Відправка запиту на Telegram API
    fetch(url, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert('Відгук надіслано успішно!');
            document.getElementById('feedbackForm').reset();
        } else {
            alert('Виникла помилка при надсиланні відгуку.');
            console.error('Telegram API error:', data);
        }
    })
    .catch(error => {
        alert('Помилка під час відправки. Перевірте з\'єднання з інтернетом.');
        console.error('Fetch error:', error);
    });

  // fetch('sendler/telegram.php', {
  //     method: 'POST',
  //     body: new FormData(this)
  // })
  // .then(response => {
  //     if (response.ok) {
  //         // document.querySelector('.overlay').style.display = 'block';
  //         // document.getElementById('thanks').style.display = 'block';
  //         document.querySelector('form').reset();
  //     } else {
  //         console.error('Server error:', response.statusText);
  //     }
  // })
  // .catch(error => console.error('Fetch error:', error));
});
