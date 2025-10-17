document.addEventListener('DOMContentLoaded', () => {
   const burger = document.querySelector('[data-burger]');
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

   window.addEventListener("scroll", function () {
      fixedHeader();
   });
   fixedHeader();
   function fixedHeader() {
      if (window.scrollY > 5) {
         header.classList.add("scrolled");
      } else {
         header.classList.remove("scrolled");
      }
   };

   // scroll into block class link-button
   document.querySelectorAll('a.link-button[href^="#"').forEach(link => {
      link.addEventListener('click', function (e) {
         e.preventDefault();

         let href = this.getAttribute('href').substring(1);
         const scrollTarget = document.getElementById(href);
         const topOffsetHeader = header.offsetHeight;
         const elementPosition = scrollTarget.getBoundingClientRect().top;
         const offsetPosition = elementPosition - (topOffsetHeader + 30);

         window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
         });
      });
   });

   burger.addEventListener('click', (e) => {
      body.classList.toggle('stop-scroll');
      header.classList.toggle('header-open');
      burger.classList.toggle('burger--active');
      nav.classList.toggle('nav--visible');
   });

   navItems.forEach(el => {
      el.addEventListener('click', () => {
         body.classList.remove('stop-scroll');
         header.classList.remove('header-open');
         burger.classList.remove('burger--active');
         nav.classList.remove('nav--visible');
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

   if (inputs) {
      inputs.forEach(input => {
         input.addEventListener("input", () => {
            input.classList.add("filled")
         })
         input.addEventListener("focus", () => {
            input.classList.add("filled")
         })
         input.addEventListener("blur", () => {
            if (input.value.length === 0) {
               input.classList.remove("filled")
            }
         })
      })
   }

   const productsSwiper = document.querySelector(".product-swiper");
   if (productsSwiper) {
      const productsSwiperList = new Swiper(productsSwiper, {
         slidesPerView: 3,
         spaceBetween: 20,
         freeMode: true,
         watchOverflow: true,
         watchSlidesVisibility: true,
         watchSlidesProgress: true,
         breakpoints: {
            320: {
               slidesPerView: 2,
               spaceBetween: 8,
            },
            578: {
               slidesPerView: 2.5,
               spaceBetween: 16,
            },
            992: {
               slidesPerView: 3,
               spaceBetween: 20,
            },
         },

      });
   }

   const partnersSwiper = document.querySelector(".partners-swiper");
   if (partnersSwiper) {
      const partnersSwiperList = new Swiper(partnersSwiper, {
         slidesPerView: 4,
         spaceBetween: 20,
         watchOverflow: true,
         breakpoints: {
            320: {
               slidesPerView: 2,
               spaceBetween: 8,
               loop: true,
               initialSlide: 1,
            },
            578: {
               slidesPerView: 3,
               spaceBetween: 16,
            },
            992: {
               slidesPerView: 4,
               spaceBetween: 20,
               loop: false,
               initialSlide: 0
            },
         },
      });
   }

   const detailBlock = document.querySelector('.detail');
   if (detailBlock) {
      const moreText = detailBlock.querySelector('.detail__content-description p');
      const moreButton = detailBlock.querySelector('.btn-more');
      if (moreText.scrollHeight > 55) {
         moreButton.style.display = 'inline-block';
         moreText.style.position = 'relative';
         moreButton.addEventListener('click', function (e) {
            e.preventDefault()
            moreText.classList.toggle('open');
            
            if (moreText.classList.contains('open')) {
               moreText.style.maxHeight = moreText.scrollHeight + 'px';
               moreButton.textContent = 'Скрыть';
            } else {
               moreText.style.maxHeight = 55 + 'px'
               moreButton.textContent = 'Подробнее';
            }
         });

      } else {
         moreButton.style.display = 'none';
      }
      const detailSwiper = detailBlock.querySelector('.detail-images');
      if (detailSwiper) {
         const detailImagesThumbs = new Swiper(".detail-images__thumb", {
            spaceBetween: 9,
            slidesPerView: 5.2,
            freeMode: true,
            speed: 600,
            centeredSlides: true,
            centeredSlidesBounds: true,
            watchOverflow: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            slideToClickedSlide: true,
            direction: 'vertical',
            breakpoints: {
               992: {
                  spaceBetween: 10,
                  slidesPerView: 5.22,
               }
            }
         });
         const detailImagesMain = new Swiper(".detail-images__swiper", {
            spaceBetween: 0,
            slidesPerView: 1,
            effect: 'fade',
            fadeEffect: {
               crossFade: true
            },
            speed: 600,
            watchOverflow: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            preventInteractionOnTransition: true,
            navigation: {
               nextEl: detailSwiper.querySelector('.swiper-button-next.detail-images-next'),
               prevEl: detailSwiper.querySelector('.swiper-button-prev.detail-images-prev'),
            },
            pagination: {
               el: '.swiper-pagination.banner-swiper-pagination',
               type: 'bullets',
               clickable: true,
            },
            thumbs: {
               swiper: detailImagesThumbs,
            },
         });
      }

      const checkboxes = detailBlock.querySelectorAll('.custom-control-input');
      const fullPrice = detailBlock.querySelector('.detail__total-price span');

      const priceWithoutSpaces = (str) => {
         return str.replace(/\s/g, '');
      };

      const normalPrice = (str) => {
         return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
      };

      const printFullPrice = (data) => {
         let totalSum = data + price;
         fullPrice.textContent = `${normalPrice(totalSum)} ₽`;
      };

      checkboxes.forEach(checkbox => {
         checkbox.addEventListener('click', function () {
            var price = 0;
            let currentPrice = parseInt(priceWithoutSpaces(fullPrice.textContent));

            if (checkbox.checked) {
               // Получаем цену из data-атрибута и преобразуем ее в число
               price += parseFloat(checkbox.dataset.price);
            } else {
               price -= parseFloat(checkbox.dataset.price);

            }
            totalSum = currentPrice + price;
            fullPrice.textContent = `${normalPrice(totalSum)}`;
         })
      });
   }

   const telSelectorS = document.querySelectorAll('.j-phone-mask');
   if (telSelectorS) {
      telSelectorS.forEach(item => {
         const inputMask = new Inputmask('+7 (999) 999-99-99');
         inputMask.mask(item);
      })
   }

   const feedbackForm = document.querySelector('.form-feedback');
   if (feedbackForm) {
      const telFeedback = feedbackForm.querySelector('input[type="tel"]');

      const validator = new JustValidate('.form-feedback', {
         validateBeforeSubmitting: true,
         testingMode: true,
      });

      validator
         .addField(document.querySelector('#input-feedback-name'), [
            {
               rule: 'minLength',
               value: 3,
               errorMessage: 'Введите минимум 3 символа',
            },
            {
               rule: 'maxLength',
               value: 20,
               errorMessage: 'Введите не больше 20 символов',
            },
            {
               rule: 'required',
               value: true,
               errorMessage: 'Поле обязательно для заполнения',
            }
         ])
         .addField(document.querySelector('#input-feedback-tel'), [
            {
               rule: 'required',
               value: true,
               errorMessage: 'Поле обязательно для заполнения',
            },
            {
               rule: 'function',
               validator: function () {
                  const phoneBackForm = document.querySelector('.input-feedback-tel').inputmask.unmaskedvalue();
                  return phoneBackForm.length === 10;
               },
               errorMessage: 'Введите корректный номер',
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
                     // openPopup('popup-success')
                  } else {
                     // openPopup('popup-success-error')
                  }
               }
            }
            xhr.open('POST', feedbackForm.action, true);
            xhr.send(formData);
            event.target.reset();
         });
   }
});

function initSlider(slider, options) {
   if (!slider.classList.contains('swiper-container-initialized') && !slider.classList.contains('swiper-initialized')) {
      new Swiper(slider, options)
   }
}

function destroySlider(slider) {
   if (slider.classList.contains('swiper-container-initialized') || slider.classList.contains('swiper-initialized')) {
      slider.swiper.destroy()
   }
}