document.addEventListener('DOMContentLoaded', () => {
   const burger = document.querySelector('[data-burger]');
   const nav = document.querySelector('[data-nav]');
   const navItems = nav.querySelectorAll('a');
   const body = document.body;
   const header = document.querySelector('.header');
   const inputs = document.querySelectorAll('input');
   const headerHeight = header.offsetHeight;

   // const btnsPopup = document.querySelectorAll('.btn-popup');
   // const modalOverlay = document.querySelector('.modal-overlay');
   // const modalCloseAll = document.querySelectorAll('.modal-close');
   // const modalsWindows = document.querySelectorAll('.modal-wind');

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

   // function openPopup(path) {
   //    modalsWindows.forEach((el) => {
   //       el.classList.remove('modal--visible');
   //    });
   //    document.querySelector(`[data-target=${path}]`).classList.add('modal--visible');
   //    body.classList.add('stop-scroll')
   //    modalOverlay.classList.add('modal-overlay--visible');
   // }

   // btnsPopup.forEach((el) => {
   //    el.addEventListener('click', (e) => {
   //       let path = e.currentTarget.getAttribute('data-path');
   //       openPopup(path)
   //    });
   // });

   // modalOverlay.addEventListener('click', (e) => {
   //    if (e.target == modalOverlay) {
   //       modalOverlay.classList.remove('modal-overlay--visible');
   //       modalsWindows.forEach((el) => {
   //          el.classList.remove('modal--visible');
   //       });
   //       body.classList.remove('stop-scroll')
   //    }
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

   const tabs = document.querySelector('.tabs');
   const tabsBtn = document.querySelectorAll('.tabs__btn');
   const tabsContent = document.querySelectorAll('.tabs__content');

   if (tabs) {
      tabs.addEventListener('click', (e) => {
         if (e.target.classList.contains('tabs__btn')) {
            const tabsPath = e.target.dataset.tabsPath;
            tabsBtn.forEach(el => { el.classList.remove('tabs__btn--active') });
            document.querySelector(`[data-tabs-path="${tabsPath}"]`).classList.add('tabs__btn--active');
            tabsHandler(tabsPath);
         }
      });
   }

   const tabsHandler = (path) => {
      tabsContent.forEach(el => { el.classList.remove('tabs__content--active') });
      document.querySelector(`[data-tabs-target="${path}"]`).classList.add('tabs__content--active');
   };

   const portfolioSwiper = document.querySelector(".portfolio-swiper");
   if (portfolioSwiper) {
      const portfolioSwiperList = new Swiper(portfolioSwiper, {
         slidesPerView: 1,
         spaceBetween: 50,
         freeMode: true,
         watchOverflow: true,
         watchSlidesVisibility: true,
         watchSlidesProgress: true,
         navigation: {
            prevEl: ".portfolio-prev-swipe",
            nextEl: ".portfolio-next-swipe"
         },
         breakpoints: {
            320: {
               spaceBetween: 16,
            },
            578: {
               spaceBetween: 32,
            },
            992: {
               spaceBetween: 50,
            },
         },
      });
   }

      const servicesSwiper = document.querySelector(".services-swiper");
   if (servicesSwiper) {
      const servicesSwiperList = new Swiper(servicesSwiper, {
         slidesPerView: 2,
         spaceBetween: 84,
         freeMode: true,
         watchOverflow: true,
         watchSlidesVisibility: true,
         watchSlidesProgress: true,
         navigation: {
            prevEl: ".services-prev-swipe",
            nextEl: ".services-next-swipe"
         },
         breakpoints: {
            320: {
               slidesPerView: 1,
               spaceBetween: 16,
            },
            578: {
               slidesPerView: 1.5,
            },
            768: {
               slidesPerView: 2,
               spaceBetween: 32,
            },
            992: {
               spaceBetween: 60,
            },
            1280: {
               spaceBetween: 84,
            },
         },

      });
   }
});