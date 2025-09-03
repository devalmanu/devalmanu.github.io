document.addEventListener('DOMContentLoaded', () => {
   const burger = document.querySelector('[data-burger]');
   const overlayMenu = document.querySelector('.overlay-menu');
   const nav = document.querySelector('[data-nav]');
   const navItems = nav.querySelectorAll('a');
   const body = document.body;
   const header = document.querySelector('.header');
   const inputs = document.querySelectorAll('input');
   const headerHeight = header.offsetHeight;

   const btnsPopup = document.querySelectorAll('.btn-popup');
   const modalOverlay = document.querySelector('.modal-overlay');
   const modalCloseAll = document.querySelectorAll('.modal-close');
   const modalsWindows = document.querySelectorAll('.modal-wind');

   document.querySelector(':root').style.setProperty('--header-height', `${headerHeight}px`);
   // burder open/close
   burger.addEventListener('click', (e) => {
      body.classList.toggle('stop-scroll');
      burger.classList.toggle('burger--active');
      nav.classList.toggle('nav--visible');
   });

   // click item menu -> no-scroll + close menu
   navItems.forEach(el => {
      el.addEventListener('click', () => {
         body.classList.remove('stop-scroll');
         burger.classList.remove('burger--active');
         nav.classList.remove('nav--visible');
      });
   });

   // click overlay - burder close
   overlayMenu.addEventListener('click', (e) => {
      if (e.target == overlayMenu) {
         body.classList.remove('stop-scroll');
         burger.classList.remove('burger--active');
         nav.classList.remove('nav--visible');
      }
   });

   // scroll into block class link-button
   document.querySelectorAll('a.link-button[href^="#"').forEach(link => {
      link.addEventListener('click', function (e) {
         e.preventDefault();

         let href = this.getAttribute('href').substring(1);

         const scrollTarget = document.getElementById(href);
         const topOffsetHeader = document.querySelector('.header').offsetHeight;
         const elementPosition = scrollTarget.getBoundingClientRect().top;
         const offsetPosition = elementPosition - topOffsetHeader;

         window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
         });
      });
   });

   function openPopup(path) {
      modalsWindows.forEach((el) => {
         el.classList.remove('modal--visible');
      });
      document.querySelector(`[data-target=${path}]`).classList.add('modal--visible');
      body.classList.add('stop-scroll')
      modalOverlay.classList.add('modal-overlay--visible');
   }

   btnsPopup.forEach((el) => {
      el.addEventListener('click', (e) => {
         let path = e.currentTarget.getAttribute('data-path');

         openPopup(path)
      });
   });

   modalOverlay.addEventListener('click', (e) => {

      if (e.target == modalOverlay) {
         modalOverlay.classList.remove('modal-overlay--visible');
         modalsWindows.forEach((el) => {
            el.classList.remove('modal--visible');
         });
         body.classList.remove('stop-scroll')
      }
   });

   modalCloseAll.forEach((modalClose) => {
      modalClose.addEventListener('click', (e) => {

         if (e.target == modalClose) {
            modalOverlay.classList.remove('modal-overlay--visible');
            modalsWindows.forEach((el) => {
               el.classList.remove('modal--visible');
            });
            body.classList.remove('stop-scroll')
         }
      });
   })

   const defaultSelect = () => {
      const elementSelects = document.querySelectorAll('.select-default');
      elementSelects.forEach(select => {
         new Choices(select, {
            searchEnabled: false,
            shouldSort: false,
         });

         let ariaLabel = select.getAttribute('aria-label');
         select.closest('.choices').setAttribute('aria-label', ariaLabel);
      });

   };

   defaultSelect();
   // animate input
   if (inputs) {
      inputs.forEach(input => {
         input.addEventListener('input', (e) => {
            if (input.value !== '') {
               input.classList.add('filled');
            }
         });
      })
   }

   const range = document.querySelector('.range-input');
   if (range) {
      range.addEventListener('input', handleInputRange)

      function handleInputRange() {
         event.target.parentNode.style.setProperty(
            '--value',
            event.target.value
         )
         event.target.nextElementSibling.value = event.target.value
      }
   }


   const costForm = document.querySelector('.form-сost-calculation');

   if (costForm) {
      let btnCostForm = costForm.querySelector('.btn-submit');
      const validationCost = new JustValidate('.form-сost-calculation', {
         validateBeforeSubmitting: true,
         testingMode: true,
      });

      validationCost
         .addField('.select-default__cost', [
            {
               rule: 'function',
               validator: function (value) {
                  if (value == '' || value == null || value == undefined) {
                     costForm.classList.add('form-error');
                  } else {
                     costForm.classList.remove('form-error');
                  }
                  return value !== undefined && value !== '' && value.length !== 0;
               },
               errorMessage: 'Выберите интересующую услугу',
            },
         ])
         .addField('.input-name', [
            {
               rule: 'minLength',
               value: 3,
               errorMessage: 'Введите минимум 3 символа',
            },
            {
               rule: 'maxLength',
               value: 30,
               errorMessage: 'Введите не больше 30 символов',
            },
            {
               rule: 'required',
               value: true,
               errorMessage: 'Поле обязательно для заполнения',
            }
         ])

         .addField('.input-mail', [
            {
               rule: 'required',
               value: true,
               errorMessage: 'Поле обязательно для заполнения',
            },
            {
               rule: 'email',
               value: true,
               errorMessage: 'Введите корректный e-mail',
            },
            {
               rule: 'function',
               validator: function (value) {
                  return value !== undefined && value !== '';
               },
               errorMessage: 'Поле обязательно для заполнения',
            },
         ])
         
         .onSuccess((event) => {

            console.log('Проверка проходит и форма отправлена', event);
            // если проверка прошла показать popup
            openPopup('popup-success')

            let formData = new FormData(event.target);
            console.log(...formData);

            let xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
               if (xhr.readyState === 4) {
                  // let response = JSON.parse(xhr.responseText);
                  if (xhr.status === 200) {
                     console.log('Отправлено');
                     // если проверка прошла показать popup
                     openPopup('popup-success')
                  } else {
                     // openPopup('popup-success-error')
                     openPopup('popup-success')
                  }
               }
            }

            xhr.open('POST', costForm.action, true);
            xhr.send(formData);

            event.target.reset();
         });
   }
});


