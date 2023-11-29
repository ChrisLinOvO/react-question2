import { useState, useMemo } from "react";

const monthNamesArr = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

const useCalendar = (monthNames = monthNamesArr) => {
  const today = new Date();
  const todayFormatted = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  const daysInWeek = [1, 2, 3, 4, 5, 6, 0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const selectDateYear = selectedDate.getFullYear();
  const selectDateMonth = selectedDate.getMonth();
  const selectedMonthLastDate = new Date(
    selectDateYear,
    selectDateMonth + 1,
    0
  );
  const prevMonthLastDate = new Date(selectDateYear, selectDateMonth, 0);
  const daysInMonth = selectedMonthLastDate.getDate();
  const firstDayInMonth = new Date(selectDateYear, selectDateMonth, 1).getDay();
  const startingPoint = daysInWeek.indexOf(firstDayInMonth) + 1;
  let prevMonthStartingPoint =
    prevMonthLastDate.getDate() - daysInWeek.indexOf(firstDayInMonth) + 1;
  let currentMonthCounter = 1;
  let nextMonthCounter = 1;

  const calendarRows = useMemo(() => {
    const rows = 6;
    const cols = 7;
    const newCalendarRows = {};
    // 生成日曆的每一個日期格子
    for (let i = 1; i <= rows; i++) {
      for (let j = 1; j <= cols; j++) {
        if (!newCalendarRows[i]) {
          newCalendarRows[i] = [];
        }

        if (i === 1) {
          if (j < startingPoint) {
            // 上個月的日期
            newCalendarRows[i] = [
              ...newCalendarRows[i],
              {
                classes: "in-prev-month",
                date: `${
                  selectDateMonth === 0 ? selectDateYear - 1 : selectDateYear
                }-${
                  selectDateMonth === 0 ? 12 : selectDateMonth
                }-${prevMonthStartingPoint}`,
                value: prevMonthStartingPoint,
              },
            ];
            prevMonthStartingPoint++;
          } else {
            // 本月的日期
            newCalendarRows[i] = [
              ...newCalendarRows[i],
              {
                classes: "",
                date: `${selectDateYear}-${
                  selectDateMonth + 1
                }-${currentMonthCounter}`,
                value: currentMonthCounter,
              },
            ];
            currentMonthCounter++;
          }
        } else if (i > 1 && currentMonthCounter <= daysInMonth) {
          // 本月的日期
          newCalendarRows[i] = [
            ...newCalendarRows[i],
            {
              classes: "",
              date: `${selectDateYear}-${
                selectDateMonth + 1
              }-${currentMonthCounter}`,
              value: currentMonthCounter,
            },
          ];
          currentMonthCounter++;
        } else {
          // 下個月的日期
          newCalendarRows[i] = [
            ...newCalendarRows[i],
            {
              classes: "in-next-month",
              date: `${
                selectDateMonth + 2 === 13 ? selectDateYear + 1 : selectDateYear
              }-${
                selectDateMonth + 2 === 13 ? 1 : selectDateMonth + 2
              }-${nextMonthCounter}`,
              value: nextMonthCounter,
            },
          ];
          nextMonthCounter++;
        }
      }
    }

    return newCalendarRows;
  }, [
    selectDateYear,
    selectDateMonth,
    startingPoint,
    prevMonthStartingPoint,
    daysInMonth,
    currentMonthCounter,
    nextMonthCounter,
  ]);

  // 處理日期點擊事件
  const handleDateClick = (date) => {
    // 最後一次點擊的行為（initial, start, end）
    const lastClickAction = endDate ? "end" : startDate ? "start" : "initial";

    switch (lastClickAction) {
      case "initial":
        // 初始情況：第一次點擊日期，設定為開始日期
        setStartDate(date);
        setEndDate(null);
        break;
      case "start":
        // 將日期字符串轉換為 Date 對象進行比較
        const startDateObj = new Date(startDate);
        const currentDateObj = new Date(date);

        // 開始日期已選擇，處理結束日期
        if (currentDateObj >= startDateObj) {
          // 情況2: 下一次點擊的日期與目前選擇的開始日期相同或晚於開始日期，設定為結束日期
          setEndDate(date);
        } else {
          // 情況3: 下一次點擊的日期早於開始日期，重新設定為開始日期，清空結束日期
          setStartDate(date);
          setEndDate(null);
        }
        break;
      case "end":
        // 結束日期已選擇，重新設定為開始日期，清空結束日期
        setStartDate(date);
        setEndDate(null);
        break;
      default:
        break;
    }
  };

  // 前一個月的操作
  const getPrevMonth = () => {
    setSelectedDate(
      (prevValue) =>
        new Date(prevValue.getFullYear(), prevValue.getMonth() - 1, 1)
    );
  };

  // 下一個月的操作
  const getNextMonth = () => {
    setSelectedDate(
      (prevValue) =>
        new Date(prevValue.getFullYear(), prevValue.getMonth() + 1, 1)
    );
  };

  return {
    monthNames,
    todayFormatted,
    calendarRows,
    selectedDate,
    startDate,
    endDate,
    getPrevMonth,
    getNextMonth,
    handleDateClick,
  };
};

export default useCalendar;
