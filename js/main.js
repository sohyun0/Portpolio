import { classToggle } from "./common.js";

// accordion ui
const moreContentBtn = document.querySelectorAll(".more-content");
moreContentBtn.forEach((btn) => {
  btn.onclick = function (e) {
    classToggle(this);
  };
});
//  filter layer pop open
const filterBtn = document.querySelector(".filter-btn");
filterBtn.onclick = function (e) {
  classToggle(filterBtn);
};

//  filter button
const filterButtons = document.querySelectorAll(".filter-wrapper  .tag-wrapper .tag");
filterButtons.forEach((button) => {
  button.onclick = function () {
    const filterValue = button.getAttribute("data-filter"); //필터값 가져오기
    filterWorkList(filterValue); // 필터링
    filterBtn.classList.remove("active"); // 레이어팝업 닫기
  };
});
//  filter
function filterWorkList(filterValue) {
  const workListItems = document.querySelectorAll(".work-list .tag-wrapper "); //필터 할 대상
  workListItems.forEach((item) => {
    const tags = Array.from(item.children); // 배열로 받기
    if (filterValue === "All" || tags.some((tag) => tag.getAttribute("data-filter") === filterValue)) {
      // 필터값이 all 이거나 태그 중 필터값이 최소 1개이상  일치하는지 확인
      item.parentElement.style.display = "flex";
    } else {
      item.parentElement.style.display = "none";
    }
  });
}
