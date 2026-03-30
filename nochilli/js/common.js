document.addEventListener('DOMContentLoaded', () => {
   const frontPage = document.querySelector('.front-page');
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

   btnsPopup.forEach((el) => {
      el.addEventListener('click', (e) => {
         let path = e.currentTarget.getAttribute('data-path');
         openPopup(path)
      });
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

   // const sliders = [];
   // const containers = document.querySelectorAll('.product-container');

   // containers.forEach(container => {
   //    const slider = new ProductSlider(container);
   //    sliders.push(slider);
   // });

   // // Обновляем все слайдеры при изменении размера окна
   // let resizeTimer;
   // window.addEventListener('resize', function () {
   //    clearTimeout(resizeTimer);
   //    resizeTimer = setTimeout(() => {
   //       sliders.forEach(slider => slider.update());
   //    }, 250);
   // });

   // console.log(`Инициализировано ${sliders.length} слайдеров`);
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

// Класс для управления независимыми слайдерами
// class ProductSlider {
//    constructor(container) {
//       this.container = container;
//       this.sliderId = container.getAttribute('data-slider-id');
//       this.mainSwiperElement = container.querySelector('[data-main-slider]');
//       this.thumbSwiperElement = container.querySelector('[data-thumb-slider]');
//       this.mainSwiper = null;
//       this.thumbSwiper = null;

//       this.init();
//    }

//    init() {
//       this.initSwipers();
//       this.bindEvents();
//       this.updateNavigationButtons();
//    }

//    initSwipers() {
//       // Настройки для thumbnails
//       let thumbConfig = {
//          slidesPerView: 4,
//          spaceBetween: 12,
//          grid: {
//             rows: 2,
//             fill: 'row'
//          },
//          navigation: {
//             nextEl: this.thumbSwiperElement.querySelector('.swiper-button-next'),
//             prevEl: this.thumbSwiperElement.querySelector('.swiper-button-prev'),
//          },
//          watchSlidesProgress: true,
//          watchSlidesVisibility: true,
//          scrollbar: {
//             el: this.thumbSwiperElement.querySelector('.swiper-scrollbar'),
//             hide: false,
//             draggable: true,
//          },
//          freeMode: true,
//          freeModeMomentum: true,
//          freeModeMomentumRatio: 0.5,
//          updateOnWindowResize: true
//       };

//       // Адаптивные настройки
//       thumbConfig.breakpoints = {
//          0: {
//             slidesPerView: 3,
//             grid: {
//                rows: 1,
//                fill: 'row'
//             },
//             spaceBetween: 8,
//             freeMode: true
//          },
//          768: {
//             slidesPerView: 4,
//             grid: {
//                rows: 2,
//                fill: 'row'
//             },
//             spaceBetween: 12,
//             freeMode: true
//          },
//          1024: {
//             slidesPerView: 4,
//             grid: {
//                rows: 2,
//                fill: 'row'
//             },
//             spaceBetween: 12,
//             freeMode: true
//          }
//       };

//       // Инициализация главного слайдера
//       this.mainSwiper = new Swiper(this.mainSwiperElement, {
//          loop: true,
//          spaceBetween: 20,
//          speed: 400,
//          thumbs: {
//             swiper: null
//          },
//          on: {
//             slideChange: () => {
//                // Останавливаем видео при смене слайда
//                const videos = this.mainSwiperElement.querySelectorAll('video');
//                videos.forEach(video => {
//                   video.pause();
//                   video.currentTime = 0;
//                });
//             }
//          }
//       });

//       // Инициализация слайдера миниатюр
//       this.thumbSwiper = new Swiper(this.thumbSwiperElement, thumbConfig);

//       // Связываем слайдеры
//       this.mainSwiper.params.thumbs.swiper = this.thumbSwiper;
//       this.mainSwiper.thumbs.init();
//    }

//    updateNavigationButtons() {
//       if (this.thumbSwiper) {
//          const updateButtons = () => {
//             const isBeginning = this.thumbSwiper.isBeginning;
//             const isEnd = this.thumbSwiper.isEnd;
//             const nextBtn = this.thumbSwiperElement.querySelector('.swiper-button-next');
//             const prevBtn = this.thumbSwiperElement.querySelector('.swiper-button-prev');

//             if (nextBtn) {
//                if (isEnd) {
//                   nextBtn.classList.add('swiper-button-disabled');
//                } else {
//                   nextBtn.classList.remove('swiper-button-disabled');
//                }
//             }

//             if (prevBtn) {
//                if (isBeginning) {
//                   prevBtn.classList.add('swiper-button-disabled');
//                } else {
//                   prevBtn.classList.remove('swiper-button-disabled');
//                }
//             }
//          };

//          this.thumbSwiper.on('slideChange', updateButtons);
//          this.thumbSwiper.on('reachBeginning', updateButtons);
//          this.thumbSwiper.on('reachEnd', updateButtons);
//          updateButtons();
//       }
//    }

//    bindEvents() {
//       // Получаем все слайды
//       const slides = this.mainSwiperElement.querySelectorAll('.swiper-slide');

//       // Добавляем обработчик клика на каждый слайд
//       slides.forEach((slide, index) => {
//          slide.addEventListener('click', (e) => {
//             e.stopPropagation();

//             // Получаем текущий активный индекс слайда
//             let activeIndex = this.mainSwiper.realIndex;

//             // Собираем все слайды для галереи
//             const items = [];
//             slides.forEach((item) => {
//                const type = item.getAttribute('data-type');

//                if (type === 'video') {
//                   const videoUrl = item.getAttribute('data-video-url');
//                   const poster = item.getAttribute('data-poster');

//                   if (videoUrl) {
//                      // Создаем HTML элемент для видео
//                      const videoHtml = `
//                                         <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #000;">
//                                             <video controls autoplay style="max-width: 90vw; max-height: 90vh; width: auto; height: auto; object-fit: contain;">
//                                                 <source src="${videoUrl}" type="video/mp4">
//                                                 Ваш браузер не поддерживает видео.
//                                             </video>
//                                         </div>
//                                     `;

//                      items.push({
//                         src: videoHtml,
//                         type: 'html',
//                         options: {
//                            width: 800,
//                            height: 600,
//                            autoSize: true
//                         }
//                      });
//                   }
//                } else if (type === 'image') {
//                   const imgUrl = item.getAttribute('data-src');
//                   if (imgUrl) {
//                      items.push({
//                         src: imgUrl,
//                         type: 'image'
//                      });
//                   } else {
//                      // Если нет data-src, берем из img
//                      const img = item.querySelector('img');
//                      if (img && img.src) {
//                         items.push({
//                            src: img.src,
//                            type: 'image'
//                         });
//                      }
//                   }
//                }
//             });

//             // Открываем fancybox
//             if (items.length > 0) {
//                console.log('Opening fancybox with items count:', items.length);

//                Fancybox.show(items, {
//                   startIndex: activeIndex,
//                   infinite: true,
//                   closeButton: true,
//                   dragToClose: true,
//                   Toolbar: {
//                      display: {
//                         left: ["infobar"],
//                         middle: ["zoomIn", "zoomOut", "toggle1to1", "rotateCCW", "rotateCW"],
//                         right: ["slideshow", "thumbs", "close"],
//                      },
//                   },
//                   on: {
//                      ready: (fancybox) => {
//                         console.log('Fancybox ready');
//                         // Находим видео в fancybox и запускаем его
//                         setTimeout(() => {
//                            const videoElement = fancybox.container.querySelector('video');
//                            if (videoElement) {
//                               videoElement.play().catch(err => {
//                                  console.log('Auto-play was prevented. Click play button to start video.');
//                               });
//                            }
//                         }, 300);
//                      },
//                      done: (fancybox) => {
//                         console.log('Fancybox done');
//                      }
//                   }
//                });
//             } else {
//                console.error('No items found for gallery');
//             }
//          });
//       });

//       // Предотвращаем воспроизведение видео в миниатюрах
//       const thumbSlides = this.thumbSwiperElement.querySelectorAll('.swiper-slide');
//       thumbSlides.forEach(thumb => {
//          thumb.addEventListener('click', (e) => {
//             const video = thumb.querySelector('video');
//             if (video) {
//                e.stopPropagation();
//                video.pause();
//             }
//          });
//       });
//    }

//    // Метод для обновления размеров
//    update() {
//       if (this.mainSwiper) this.mainSwiper.update();
//       if (this.thumbSwiper) {
//          this.thumbSwiper.update();
//          setTimeout(() => {
//             this.thumbSwiper.update();
//          }, 100);
//       }
//    }
// }

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