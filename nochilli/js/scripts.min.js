document.addEventListener('DOMContentLoaded', () => {
   const frontPage = document.querySelector('.front-page');
   const burger = document.querySelector('[data-burger]');
   const nav = document.querySelector('[data-nav]');
   const navItems = nav.querySelectorAll('a');
   const body = document.body;
   const header = document.querySelector('.header');
   // const inputs = document.querySelectorAll('input');
   const headerHeight = header.offsetHeight;

   // const btnsPopup = document.querySelectorAll('.btn-popup');
   // const modalOverlay = document.querySelector('.modal-overlay');
   // const modalCloseAll = document.querySelectorAll('.modal-close');
   // const modalsWindows = document.querySelectorAll('.modal-wind');
   document.querySelector(':root').style.setProperty('--header-height', `${headerHeight}px`);

   window.addEventListener("scroll", function () {
      fixedHeader();

      if (frontPage) {
         let blocks = [];
         nav.querySelectorAll('a.link-button[href^="#"').forEach(el => {
            let id = el.getAttribute('href').substring(1);
            blocks.push({ block: document.getElementById(id) });
         })
         blocks.forEach(item => {
            if (window.scrollY >= item.block.offsetTop - (header.offsetHeight + 40)) {
               navItems.forEach((el) => {
                  el.classList.remove('active');
               });
               nav.querySelector(`[href="#${item.block.id}"]`).classList.add('active');
            }
            else if (window.scrollY < (blocks[0].block.offsetTop - (header.offsetHeight + 40))) {
               navItems.forEach((el) => {
                  el.classList.remove('active');
               });
               nav.querySelector(`[href="./"]`)?.classList.add('active');
            }
         });
      }
   });

   fixedHeader();
   function fixedHeader() {
      if (window.scrollY > 5) {
         header.classList.add("scrolled");
      } else {
         header.classList.remove("scrolled");
      }
   };

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

   // btnsPopup.forEach((el) => {
   //    el.addEventListener('click', (e) => {
   //       let path = e.currentTarget.getAttribute('data-path');
   //       openPopup(path)
   //    });
   // });

   // modalCloseAll.forEach((modalClose) => {
   //    modalClose.addEventListener('click', (e) => {
   //       if (e.target == modalClose) {
   //          modalOverlay.classList.remove('modal-overlay--visible');
   //          modalsWindows.forEach((el) => {
   //             el.classList.remove('modal--visible');
   //          });
   //          body.classList.remove('stop-scroll')
   //       }
   //    });
   // })

   // if (inputs) {
   //    inputs.forEach(input => {
   //       input.addEventListener("input", () => {
   //          input.classList.add("filled")
   //       })
   //       input.addEventListener("focus", () => {
   //          input.classList.add("filled")
   //       })
   //       input.addEventListener("blur", () => {
   //          if (input.value.length === 0) {
   //             input.classList.remove("filled")
   //          }
   //       })
   //    })
   // }

   document.querySelectorAll('.product-slider').forEach((slider, index) => {

      const main = slider.querySelector('.main-swiper');
      const thumbs = slider.querySelector('.thumbs-swiper');

      const thumbsSwiper = new Swiper(thumbs, {
         slidesPerView: 4,
         spaceBetween: 4,
         watchSlidesProgress: true,
      });

      const mainSwiper = new Swiper(main, {
         spaceBetween: 4,
         thumbs: {
            swiper: thumbsSwiper,
         },
      });

   });

   Fancybox.bind("[data-fancybox]", {
      on: {
         reveal: (fancybox, slide) => {
      if (!slide.el) return;

      const video = slide.el.querySelector("video");
      if (video) {
        video.play().catch(() => {});
      }
    },

    change: () => {
      document.querySelectorAll(".fancybox__container video").forEach(v => {
        v.pause();
        v.currentTime = 0;
      });
    },

         close: () => {
            document.querySelectorAll("video").forEach(v => {
               v.pause();
            });
         }
      },
   });

   const partnersSwiper = document.querySelector(".partners-swiper");
   if (partnersSwiper) {
      const partnersSwiperList = new Swiper(partnersSwiper, {
         slidesPerView: 3,
         spaceBetween: 20,
         watchOverflow: true,
         breakpoints: {
            320: {
               slidesPerView: 1.25,
               spaceBetween: 8,
               loop: true,
               initialSlide: 0,
            },
            578: {
               slidesPerView: 1.5,
               spaceBetween: 16,
            },
            778: {
               slidesPerView: 2,
            },
            992: {
               slidesPerView: 3,
               spaceBetween: 20,
               loop: false,
               initialSlide: 0
            },
         },
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