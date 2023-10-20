/**
 * @param {HTMLElement} _isCalendar 캘린더가 생성될 선택자
 * @param {Object} _isOption 캘린더 옵션설정
 * @param {HTMLElement} _isOption.container -캘린더가 생성될 컨테이너
 * @param {HTMLElement} _isOption.type -연,월,일 (year,month, date) --> 기능 x
 * @param {HTMLElement} _isOption.currentDateDisplay -년,월 생성위치 -->  현재는 클래스명이 지정되어있음 추후 변경해야할 때 변경가능
 * @param {Boolean} _isOption.yearMonthReverse - 년-월 표기 순서 true : 월 - 년 false : 년-월
 * @param {String} _isOption.yearSuffix - 년도 뒤에 붙을 글자
 * @param {Array | String} _isOption.monthNames - 월 표기
 * @param {Array | String} _isOption.dayNames - 요일 표기
 * @param {Boolean} _isOption.showOtherMonths - 이전달, 다음달 날짜 표기
 * @param {Number} _isOption.firstDay - 시작요일 선택  0 : 일요일
 * @param {HTMLElement} _isOption.prev - 이전달 버튼
 * @param {HTMLElement} _isOption.next - 다음달 버튼
 * @param {HTMLElement} _isOption.popup - 팝업 wrapper
 * @param {HTMLElement} _isOption.popupDimmed - 팝업 dimmed
 * @param {Boolean} _isOption.datePicker.picker - 날짜 선택기능
 * @param {Boolean} _isOption.datePicker.rangePicker - 날짜기간 선택기능
 * @param {String} _isOption.datePicker.dateFormat - datePicker 날짜 포멧 (yyyymm, yymm, yyyym, yym)
 * @param {String} _isOption.datePicker.activeClassName - datePicker 활성화 클래스 네임
 * @param {HTMLElement} _isOption.datePickerInput - datePicker input 위치
 *
 */

function Calendar(_isElement, _isOption) {
  // <------ 날짜 정보 가져오기  ------->
  const GETDATE = new Date(); // 현재 날짜(로컬 기준)
  const UTC = GETDATE.getTime() + GETDATE.getTimezoneOffset() * 60 * 1000; // uct 표준시
  const KSTGAP = 9 * 60 * 60 * 1000; // 한국 kst 기준시간
  const TODAY = new Date(UTC + KSTGAP); // 한국 시간으로 date 객체 만들기(오늘)

  // 달력에서 표기하는 날짜 객체 (현재날짜)
  let thisDate = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate());
  // 달력 이동시 보여지는 날짜
  let viewYear;
  let viewMonth;
  let viewDate;
  // default 설정
  _isOption.firstDay ??= 0; //undefined 면 0 할당
  _isOption.yearSuffix ??= "년";
  _isOption.showOtherMonths ??= true;
  _isOption.yearMonthReverse ??= false;
  _isOption.monthNames ??= ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
  _isOption.dayNames ??= ["일", "월", "화", "수", "목", "금", "토"];
  _isOption.prev ??= _isOption.container + " .cal-go-prev";
  _isOption.next ??= _isOption.container + " .cal-go-next";

  // <------ 캘린더 랜더링  ------->
  renderCalender(thisDate);
  /**
   *  @param {string} _isCurViewDate - 현재시간
   */
  function renderCalender(_isCurViewDate) {
    // const _curDateDisplay = $selector(_isOption.currentDateDisplay); // 년월 표시 => 클래스명 지정이 아닐 시 해당 기능 사용
    const _curDateDisplay = document.querySelector(_isOption.container + " .month-year");

    // <------ 년월 표기  ------->
    // 달력 이동시 보여지는 날짜
    viewYear = _isCurViewDate.getFullYear();
    viewMonth = _isCurViewDate.getMonth();
    viewDate = _isCurViewDate.getDate();

    // 이전 달의 마지막 날 날짜와 요일
    const _startDay = new Date(viewYear, viewMonth, 0);
    let _prevDate = _startDay.getDate();
    let _prevDay = _startDay.getDay();
    // 현재 월의 첫 날을 설정
    const _firstDay = new Date(viewYear, viewMonth, 1);
    // 이번 달의 마지막날 날짜와 요일
    const _endDay = new Date(viewYear, viewMonth + 1, 0);
    let _nextDate = _endDay.getDate();
    let _nextDay = _endDay.getDay();

    // 현재 년월 표기
    let _markYear = new String(viewYear);
    let _markMonth = new String(viewMonth + 1); //viewMonth + 1 숫자표기시
    let _day = _firstDay; //현재 요일
    let _markDate;
    let _createCalNavHtml = "";
    let _createMonth;
    _curDateDisplay.innerHTML = "";
    for (let _i = 0; _i <= _isOption.monthNames.length; _i++) {
      if (_markMonth - 1 == _i) {
        _createMonth = _isOption.monthNames[_i];
      }
    }

    if (_isOption.yearMonthReverse) {
      _createCalNavHtml += `<span class="month">${_createMonth}</span><span class="year">${_markYear + _isOption.yearSuffix}</span>`;
    } else {
      _createCalNavHtml += `<span class="year">${_markYear + _isOption.yearSuffix}</span><span class="month">${_createMonth}</span>`;
    }
    _curDateDisplay.innerHTML = _createCalNavHtml;

    // <------ 랜더링 html 요소 생성  ------->
    const _calendarContainer = $selector(_isOption.container); // 캘린더컨테이너
    const _calendarDisplay = $selector(_isElement); // 캘린더
    let _createHtml = "";
    _calendarDisplay.innerHTML = "";
    // 요일 생성
    _createHtml += `<div class="weekday-wrapper">`;
    for (let i = 0; i < _isOption.dayNames.length; i++) {
      if (_isOption.firstDay == 1 && i > 4) {
        _createHtml += `<span class="weekday weekend">${_isOption.dayNames[i]}</span>`;
      } else if ((_isOption.firstDay == 0 && i == 0) || (_isOption.firstDay == 0 && i == 6)) {
        _createHtml += `<span class="weekday weekend">${_isOption.dayNames[i]}</span>`;
      } else {
        _createHtml += `<span class="weekday">${_isOption.dayNames[i]}</span>`;
      }
    }
    _createHtml += `</div>`;
    // 지난달 html  요소 생성 , firstDay 가 0 이면 일요일시작 1이면 월요일시작
    if (_isOption.showOtherMonths) {
      _createHtml += `<div class="day-wrapper">`;
    } else {
      _createHtml += `<div class="day-wrapper opacity">`;
    }
    for (let _i = _prevDate - _prevDay + _isOption.firstDay; _i <= _prevDate; _i++) {
      if ((_isOption.firstDay == 0 && _prevDay !== 6) || _isOption.firstDay == 1) {
        if (_isOption.showOtherMonths) {
          _createHtml += `<span class="day prev disabled">${_i}</span>`;
        } else {
          _createHtml += `<span class="day prev disabled"></span>`;
        }
      }
    }

    //  daterpicker 일때  dateset으로 해당 날짜 주입.
    let _format; // 년월 표시방법
    let _formatSeparator; // 년월 구분자
    if (_isOption.datePicker !== undefined) {
      _isOption.datePicker.dateFormat ??= "yyyy-mm";
      _format = _isOption.datePicker.dateFormat;
      if (_format !== undefined) {
        const _formatCountY = _format.split("y").length - 1;
        const _formatCountM = _format.split("m").length - 1;
        if (_formatCountY < 3) {
          // yy
          _markYear = _markYear.substring(2, 4);
          _formatSeparator = _format.charAt(2);
        } else {
          // yyyy
          _formatSeparator = _format.charAt(4);
        }
        if (_formatCountM == 2) {
          // mm
          if (_markMonth.length == 1) {
            _markMonth = "0" + _markMonth;
          }
        }
      }
    }
    // 토요일(6) 또는 일요일(0)인 경우  구분
    let _weekArr = [];
    while (_day <= _endDay) {
      var dayOfWeek = _day.getDay(); // 0(일요일)부터 6(토요일)까지의 값을 반환
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        _weekArr.push(_day.getDate().toString());
      }
      _day.setDate(_day.getDate() + 1); // 다음 날짜로 이동
    }
    // 이번달 html  요소 생성
    for (let _i = 1; _i <= _nextDate; _i++) {
      _createHtml += `<span class="day current`;
      for (let _j = 0; _j < _weekArr.length; _j++) {
        if (_weekArr[_j] == _i) {
          _createHtml += ` weekend`;
        }
      }
      _createHtml += `"`;
      if (_i < 10) {
        _markDate = "0" + _i;
      } else {
        _markDate = _i;
      }
      if (_isOption.datePicker !== undefined) {
        _createHtml += ` data-date="${_markYear}${_formatSeparator}${_markMonth}${_formatSeparator}${_markDate}"`;
      }
      _createHtml += `>${_i}</span>`;
    }

    // 다음달 html  요소 생성
    if (_isOption.firstDay == 0) {
      _nextDay += 1;
    }
    for (let _i = 1; _i <= (7 - _nextDay == 7 ? 0 : 7 - _nextDay); _i++) {
      if (_isOption.showOtherMonths) {
        _createHtml += `<span class="day next disabled">${_i}</span>`;
      } else {
        _createHtml += `<span class="day next disabled"></span>`;
      }
    }
    _createHtml += `</div>`;
    _calendarDisplay.innerHTML = _createHtml;
    // 오늘 날짜 표기
    if (TODAY.getMonth() == viewMonth) {
      const _todayDate = TODAY.getDate();
      const _currentMonthDate = $selectorAll(_isElement + " .current");
      _currentMonthDate[_todayDate - 1].classList.add("today");
    }
  }
  // <------ datePicker 설정  ------->

  datePicker();
  function datePicker() {
    if (_isOption.datePicker == undefined) {
      return false;
    }
    if (_isOption.datePicker.picker == undefined) {
      return false;
    }
    _isOption.datePicker.activeClassName ??= "active";
    let _pickerItem = document.querySelectorAll(_isOption.container + " .day.current");
    let _pickerInput = document.querySelector(_isOption.datePicker.input);
    let _pickerActive = _isOption.datePicker.activeClassName;
    let _picCalData, _picInputData;
    for (let _i = 0; _i < _pickerItem.length; _i++) {
      // 선택 후 다른 달로 넘기고 다시 돌아왔을 때 활성화 표시 다시해주기
      if (_pickerInput.value.trim() !== undefined && _pickerInput.value.trim() !== "") {
        _picCalData = _pickerItem[_i].dataset.date;
        _picInputData = _pickerInput.value;
        if (_picCalData === _picInputData) {
          if (!_pickerItem[_i].classList.contains(_pickerActive)) {
            _pickerItem[_i].classList.add(_pickerActive);
          }
        }
      }
      // 선택 시 활성화 및 input 표기
      _pickerItem[_i].onclick = function () {
        for (let _j = 0; _j < _pickerItem.length; _j++) {
          if (_pickerItem[_j].classList.contains(_pickerActive)) {
            _pickerItem[_j].classList.remove(_pickerActive);
          }
        }
        _pickerInput.value = this.dataset.date;
        picData = _pickerInput.value;
        this.classList.add(_pickerActive);
        if (_isOption.popup !== undefined) {
          document.querySelector(_isOption.popup).classList.remove("active");
          document.querySelector(_isOption.popupDimmed).classList.remove("active");
        }
      };
    }
  }
  dateRangePicker();
  let _clickCount = 0;
  function dateRangePicker() {
    if (_isOption.datePicker == undefined) {
      return false;
    }
    if (_isOption.datePicker.rangePicker == undefined) {
      return false;
    }
    _isOption.datePicker.activeClassName ??= "active";
    let _pickerItem = document.querySelectorAll(_isOption.container + " .day");
    let _startInput = document.querySelector(_isOption.datePicker.startInput);
    let _endInput = document.querySelector(_isOption.datePicker.endInput);
    let _pickerActive = _isOption.datePicker.activeClassName;
    let _picStartDate, _picStartEle, _picEndDate, _picEndEle;
    let _activeElArr = [];
    let startIndex = -1;
    let endIndex = -1;
    function findStartIndex() {
      for (let _j = 0; _j < _pickerItem.length; _j++) {
        if (_pickerItem[_j].classList.contains("start")) {
          startIndex = _j;
          break;
        }
      }
      return startIndex;
    }
    function findEndIndex() {
      for (let _j = 0; _j < _pickerItem.length; _j++) {
        if (_pickerItem[_j].classList.contains("end")) {
          endIndex = _j;
          break;
        }
      }
      return endIndex;
    }
    if (_pickerActive == undefined) {
      _pickerActive = "";
    }
    for (let _i = 0; _i < _pickerItem.length; _i++) {
      // 선택 후 다른 달로 넘기고 다시 돌아왔을 때 활성화 표시 다시해주기
      let _picStartCalData, _picStartInputData, _picEndCalData, _picEndInputData;
      if (_startInput.value.trim() !== undefined && _startInput.value.trim() !== "") {
        _picStartCalData = _pickerItem[_i].dataset.date;
        _picStartInputData = _startInput.value;
        if (_picStartCalData === _picStartInputData) {
          if (!_pickerItem[_i].classList.contains(_pickerActive)) {
            _pickerItem[_i].classList.add(_pickerActive);
            _pickerItem[_i].classList.add("start");
            startIndex = findStartIndex();
            //start 이후 태그에게 active 클래스 보여
            if (startIndex !== -1) {
              for (let _j = startIndex + 1; _j < _pickerItem.length; _j++) {
                _pickerItem[_j].classList.add(_pickerActive);
              }
            }
          }
        }
      }
      if (_endInput.value.trim() !== undefined && _endInput.value.trim() !== "") {
        _picEndCalData = _pickerItem[_i].dataset.date;
        _picEndInputData = _endInput.value;
        if (_picEndCalData === _picEndInputData) {
          if (!_pickerItem[_i].classList.contains(_pickerActive)) {
            _pickerItem[_i].classList.add(_pickerActive);
            _pickerItem[_i].classList.add("end");
            endIndex = findEndIndex();
            //end 이전 태그에게 active 클래스 보여
            if (endIndex !== -1) {
              for (let _j = 0; _j < endIndex; _j++) {
                _pickerItem[_j].classList.add(_pickerActive);
              }
            }
          }
        }
      }
      _pickerItem[_i].onclick = function () {
        _clickCount++;
        // 다시 선택 시 리셋
        if (_clickCount > 2) {
          _clickCount = 1;
          _startInput.value = "";
          _endInput.value = "";
          for (let _j = 0; _j < _pickerItem.length; _j++) {
            _pickerItem[_j].classList.remove("start");
            _pickerItem[_j].classList.remove("end");
            _pickerItem[_j].classList.remove(_pickerActive);
          }
        }
        let _thisDate = this.dataset.date;
        // 시작일 선택
        if (_clickCount == 1) {
          _picStartEle = this;
          _picStartDate = new Date(_thisDate);
          _startInput.value = _thisDate;
          if (this.classList.contains("end")) {
            this.classList.remove("end");
          }
          this.classList.add("start");
          this.classList.add(_pickerActive);
        } else if (_clickCount == 2) {
          //종료일 선택
          _picEndDate = new Date(_thisDate);
          // 종료일이 시작일 보다 빠를 때
          if (_picStartDate > _picEndDate) {
            _startInput.value = _thisDate;
            _endInput.value = "";
            for (let _j = 0; _j < _pickerItem.length; _j++) {
              if (_pickerItem[_j].classList.contains(_pickerActive)) {
                _pickerItem[_j].classList.remove(_pickerActive);
                if (_pickerItem[_j].classList.contains("start")) {
                  _pickerItem[_j].classList.remove("start");
                }
              }
            }
            _picStartEle = this;
            _picStartDate = new Date(_thisDate);
            _picEndDate = "";
            this.classList.add("start");
            this.classList.add(_pickerActive);
            _clickCount = _clickCount - 1;
          } else {
            _picEndEle = this;
            this.classList.add("end");
            this.classList.add(_pickerActive);
            _endInput.value = _thisDate;
            // 시작일 - 종료일 설정이 완료 되었을 때
            // 시작일 - 종료일이 해당 달 안에 모두 표현 되었을때
            // 시작일 - 종료일이 다른 달에 표현 되었을때
            if (_picStartEle !== undefined && _picEndEle !== undefined) {
              startIndex = findStartIndex();
              endIndex = findEndIndex();
              // start 와 end 사이의 태그에게 active클래스 부여
              if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
                for (let _j = startIndex + 1; _j < endIndex; _j++) {
                  _pickerItem[_j].classList.add(_pickerActive);
                }
              }
            } else if (_picStartEle !== undefined) {
              startIndex = findStartIndex();
              //start 이후 태그에게 active 클래스 보여
              if (startIndex !== -1) {
                for (let _j = startIndex + 1; _j < _pickerItem.length; _j++) {
                  _pickerItem[_j].classList.add(_pickerActive);
                }
              }
            } else if (_picEndEle !== undefined) {
              endIndex = findEndIndex();
              //end 이전 태그에게 active 클래스 보여
              if (endIndex !== -1) {
                for (let _j = 0; _j < endIndex; _j++) {
                  _pickerItem[_j].classList.add(_pickerActive);
                }
              }
            }
            //팝업으로 들어갈때 선택 시 팝업닫기
            if (_isOption.popup !== undefined) {
              document.querySelector(_isOption.popup).classList.remove("active");
              document.querySelector(_isOption.popupDimmed).classList.remove("active");
            }
          }
        }
      };
    }
  }
  // <------ 날짜이동  ------->

  const PREVBTN = $selector(_isOption.prev);
  const NEXTBTN = $selector(_isOption.next);
  // 이전달로 이동
  PREVBTN.onclick = function () {
    thisDate = new Date(viewYear, viewMonth - 1, 1);
    renderCalender(thisDate);
    datePicker();
    dateRangePicker();
  };
  // 다음달로 이동
  NEXTBTN.onclick = function () {
    thisDate = new Date(viewYear, viewMonth + 1, 1);
    renderCalender(thisDate);
    datePicker();
    dateRangePicker();
  };
}
// calendar  ---- >
// <------ 선택자 함수  ------->
function $selector(isElement, isTarget) {
  if (isTarget === undefined) {
    isTarget = document;
  } else {
    isTarget = document.querySelector(isTarget);
  }
  return isTarget.querySelector(isElement);
}
function $selectorAll(isElement, isTarget) {
  if (isTarget === undefined) {
    isTarget = document;
  } else {
    isTarget = document.querySelectorAll(isTarget);
  }
  return isTarget.querySelectorAll(isElement);
}
