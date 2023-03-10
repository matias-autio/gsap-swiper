import "./index.scss";

import { gsap } from "gsap";

// import Swiper JS
import Swiper from "swiper/swiper-bundle";

const createPagination = () => {
  const pagination = document.querySelector(".swiper-pagination");
  const slides = document.querySelectorAll(".swiper-slide");
  slides.forEach((slide, index) => {
    const span = document.createElement("span");
    const text = document.createTextNode("Slide " + (index + 1));
    span.appendChild(text);
    span.classList.add("swiper-pagination-bullet");
    span.setAttribute("data-index", index);
    pagination.appendChild(span);
  });
  const bullets = document.querySelectorAll(".swiper-pagination-bullet");
  bullets[0].classList.add("swiper-pagination-bullet-active");
  bullets.forEach((bullet) => {
    bullet.addEventListener("click", () => {
      bullets.forEach((bullet) => {
        bullet.classList.remove("swiper-pagination-bullet-active");
      });

      bullet.classList.add("swiper-pagination-bullet-active");
      const index = bullet.getAttribute("data-index");
      // console.log(index);
      swiper.slideTo(index);
    });
  });
};

const swiper = new Swiper(".swiper", {
  virtualTranslate: true,
  on: {
    init: function () {
      const left = this.slides[0].querySelector(".left");
      gsap.set(left, {
        autoAlpha: 1,
      });
      this.slides.forEach((slide, index) => {
        gsap.set(slide, {
          zIndex: () => this.slides.length - index,
        });
      });
      createPagination();
    },
  },
});

// Virtual translate + loop
// https://github.com/nolimits4web/swiper/issues/3070

const handleBullets = (index) => {
  const bullets = document.querySelectorAll(".swiper-pagination-bullet");
  bullets.forEach((bullet) => {
    bullet.classList.remove("swiper-pagination-bullet-active");
  });
  bullets[index].classList.add("swiper-pagination-bullet-active");
};

swiper.on("slideChange", function () {
  handleBullets(this.activeIndex);
});
swiper.on("slideNextTransitionStart", function () {
  const clickedSlideIndex = this.activeIndex;
  const clickedSlide = this.slides[clickedSlideIndex];
  const clickedSlideLeft = clickedSlide.querySelector(".left");
  const elementsBeforeClickedSlide = this.slides.slice(0, clickedSlideIndex);
  elementsBeforeClickedSlide.forEach((element) => {
    const right = element.querySelector(".right");
    gsap.to(right, {
      clipPath: "inset(0% 0% 100% 0%)",
      duration: 1,
      ease: "power3.inOut",
    });
    const left = element.querySelector(".left");
    gsap.to(left, {
      autoAlpha: 0,
      y: -100,
      duration: 0.4,
      ease: "power1.out",
    });
  });

  gsap.fromTo(
    clickedSlideLeft,
    {
      autoAlpha: 0,
      y: 100,
    },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.4,
      ease: "power1.out",
      delay: 0.2,
    }
  );
});
swiper.on("slidePrevTransitionStart", function () {
  const clickedSlideIndex = this.activeIndex;
  const clickedSlide = this.slides[clickedSlideIndex];
  const clickedSlideLeft = clickedSlide.querySelector(".left");
  const elementsAfterClickedSlide = this.slides.slice(clickedSlideIndex);
  elementsAfterClickedSlide.forEach((element) => {
    const right = element.querySelector(".right");
    const left = element.querySelector(".left");
    gsap.to(right, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1,
      ease: "power3.inOut",
    });
    gsap.to(left, {
      autoAlpha: 0,
      y: 100,
      duration: 0.4,
      ease: "power1.out",
    });
    gsap.fromTo(
      clickedSlideLeft,
      {
        autoAlpha: 0,
        y: -100,
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.4,
        ease: "power1.out",
        delay: 0.2,
      }
    );
  });
});
