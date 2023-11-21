// 다크모드
let wrapper = document.querySelector(".wrapper");
let darkModeToggle = document.getElementById("darkMode");
if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  wrapper.classList.add("dark");
  darkModeToggle.checked = true;
}
darkModeToggle.onchange = function () {
  if (darkModeToggle.checked) {
    wrapper.classList.add("dark");
  } else {
    wrapper.classList.remove("dark");
  }
};
function classToggle(target) {
  if (!target.classList.contains("active")) {
    target.classList.add("active");
  } else {
    target.classList.remove("active");
  }
}
// swiper
if (document.querySelector(".type-pc") != undefined) {
  let imgPcSwiper = new Swiper(".img-group.type-pc", {
    slidesPerView: 1,
    spaceBetween: 24,
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
    },
    loop: true,
    autoHeight: true,
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}
if (document.querySelector(".type-mo") != undefined) {
  let imgMoSwiper = new Swiper(".img-group.type-mo", {
    slidesPerView: 1,
    spaceBetween: 24,
    breakpoints: {
      410: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
    loop: true,
    autoHeight: true,
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}
