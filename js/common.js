function classToggle(target) {
  if (!target.classList.contains("active")) {
    target.classList.add("active");
  } else {
    target.classList.remove("active");
  }
}
export { classToggle };

// 다크모드
darkMode();
function darkMode() {
  let wrapper = document.querySelector("html");
  let darkModeToggle = document.getElementById("darkMode");
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    wrapper.dataset.theme = "dark";
    darkModeToggle.checked = true;
  } else {
    wrapper.dataset.theme = "light";
    darkModeToggle.checked = false;
  }
  darkModeToggle.onchange = function () {
    if (darkModeToggle.checked) {
      wrapper.dataset.theme = "dark";
    } else {
      wrapper.dataset.theme = "light";
    }
  };
}

// more content
moreContent();
function moreContent() {
  const moreBtn = document.querySelector(".more-btn");
  if (!moreBtn) return false;
  moreBtn.onclick = function () {
    classToggle(this);
  };
}

// scroll-progress
scrollGageBar();
function scrollGageBar() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let scrollHeight = document.documentElement.scrollHeight;
  let clientHeight = document.documentElement.clientHeight;
  let height = scrollHeight - clientHeight;
  let scrolled = (winScroll / height) * 100;
  let bar = document.querySelector(".bar");
  let fixContent = document.querySelector(".fix-content");
  if (!bar) return false;
  if (scrollHeight === clientHeight) {
    fixContent.classList.add("top");
  } else {
    bar.style.width = scrolled + "%";
    if (scrolled > 1) {
      fixContent.classList.add("top");
      if (scrolled > 99) {
        bar.style.borderRadius = 0;
      } else {
        bar.style.borderRadius = "0 5px 5px 0";
      }
    } else {
      fixContent.classList.remove("top");
    }
  }
}
window.onresize = function () {
  scrollGageBar();
};
window.onscroll = function () {
  scrollGageBar();
};

// swiper
breakpointsSwiper();
function breakpointsSwiper() {
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
}
