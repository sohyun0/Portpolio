function getSiblings(target) {
  var children = target.parentElement.children;
  var tempArr = [];
  for (var i = 0; i < children.length; i++) {
    tempArr.push(children[i]);
  }
  return tempArr.filter(function (e) {
    return e != target;
  });
}
// 탭
createTab(".tab-line");
function createTab(tabWapper) {
  const TABHEADER = document.querySelectorAll(tabWapper + ".tab-header");
  TABHEADER.forEach((header, index) => {
    const TABCONTENT = getSiblings(header);
    let btnGroup = header.children;
    //   header button에 click 이벤트 부여
    for (let clickCount = 0; clickCount < btnGroup.length; clickCount++) {
      btnGroup[clickCount].onclick = function () {
        //  클릭할때마다  header 전체 순환해서 class remove
        for (let classAttr = 0; classAttr < btnGroup.length; classAttr++) {
          btnGroup[classAttr].classList.remove("active");
        }
        //  클릭할때마다  content 전체 순환해서 class remove
        TABCONTENT.forEach((content, index) => {
          let contentGroup = content.children;
          for (let classAttr = 0; classAttr < contentGroup.length; classAttr++) {
            contentGroup[classAttr].classList.remove("active");
          }
        });
        //  class 지워진 상태에서 this header 찾아서 클래스 부여 및 this 의 dataset 과 맞는 content dataset 찾아서 클래스 부여
        if (!this.classList.contains("active")) {
          let tabContent = document.querySelector('[data-tab-content="' + this.dataset.tabHeader + '"]');
          this.classList.add("active");
          tabContent.classList.add("active");
        }
      };
    }
  });
}
//드롭다운 셀렉트
createSelectBox();
function createSelectBox() {
  const SELECTBOX = document.querySelectorAll(".dropdown");
  SELECTBOX.forEach((select, selectIndex) => {
    select.onclick = function (e) {
      const OPTION = select.querySelectorAll(".option-list li");
      OPTION.forEach((item, itemIndex) => {
        item.onclick = function (e) {
          let item;
          if (this.classList.contains("item")) {
            item = this.innerText;
          } else {
            item = this.querySelector(".item").innerText;
          }

          let btn = this.parentElement.previousElementSibling;
          btn.innerText = item;
          if (btn.classList.contains("placeholder")) {
            btn.classList.remove("placeholder");
          }
          for (let index = 0; index < OPTION.length; index++) {
            if (OPTION[index] !== OPTION[itemIndex]) {
              OPTION[index].classList.remove("active");
            } else {
              this.classList.add("active");
              select.blur();
            }
          }
        };
      });
    };
  });
}
//팝업
function popToggle(_active, _target) {
  let pop = document.querySelector(".pop-wrapper" + _target);
  if (_active === "open") {
    pop.classList.add("active");
  } else {
    pop.classList.remove("active");
  }
}
function dimmedToggle(_active, _target) {
  let dimmed = document.querySelector(".dimmed" + _target);
  if (_active === "open") {
    dimmed.classList.add("active");
  } else {
    dimmed.classList.remove("active");
  }
}
function classToggle(_target) {
  let target = document.querySelector(_target);
  if (!target.classList.contains("active")) {
    target.classList.add("active");
  } else {
    target.classList.remove("active");
  }
}
