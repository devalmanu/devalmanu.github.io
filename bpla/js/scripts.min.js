document.addEventListener('DOMContentLoaded', () => {
   const burger = document.querySelector('[data-burger]');
   const burgerClose = document.querySelector('.burger-close');
   const nav = document.querySelector('[data-nav]');
   const navItems = nav.querySelectorAll('a');
   const body = document.body;
   const header = document.querySelector('.header');
   const inputs = document.querySelectorAll('input');
   const textareas = document.querySelectorAll('textarea');
   const headerHeight = header.offsetHeight;
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

   burger.addEventListener('click', (e) => {
      body.classList.add('stop-scroll');
      burger.classList.add('burger--active');
      nav.classList.add('nav--visible');
   });
   burgerClose.addEventListener('click', (e) => {
      body.classList.remove('stop-scroll');
      burger.classList.remove('burger--active');
      nav.classList.remove('nav--visible');
   });
   navItems.forEach(el => {
      el.addEventListener('click', () => {
         body.classList.remove('stop-scroll');
         burger.classList.remove('burger--active');
         nav.classList.remove('nav--visible');
      });
   });

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
      if (moreText.offsetHeight > 53) {
         moreButton.style.display = 'inline-block';
         moreButton.addEventListener('click', function () {
            if (moreText.style.webkitLineClamp == '3') {
               moreText.style.webkitLineClamp = 'inherit';
               moreButton.textContent = 'Скрыть';
            } else {
               moreText.style.webkitLineClamp = '3';
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
   }

   // const telSelectorS = document.querySelectorAll('.j-phone-mask');
   // if (telSelectorS) {
   //    telSelectorS.forEach(item => {
   //       const inputMask = new Inputmask('+7 (999) 999-99-99');
   //       inputMask.mask(item);
   //    })
   // }
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