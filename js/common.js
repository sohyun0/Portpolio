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
