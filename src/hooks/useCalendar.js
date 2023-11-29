import { useState } from 'react';
import _ from 'lodash';

const monthNamesArr = [
  '1', '2', '3', '4',
  '5', '6', '7', '8',
  '9', '10', '11', '12'
];

const useCalendar = (monthNames = monthNamesArr) => {
  const today = new Date();
  const todayFormatted = today.toISOString().split('T')[0];
  const daysInWeek = [1, 2, 3, 4, 5, 6, 0];
  const [selectedDate, setSelectedDate] = useState(today);
  const selectedMonthLastDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
  const prevMonthLastDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0);
  const daysInMonth = selectedMonthLastDate.getDate();
  const firstDayInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
  const startingPoint = _.indexOf(daysInWeek, firstDayInMonth) + 1;
  let prevMonthStartingPoint = prevMonthLastDate.getDate() - _.indexOf(daysInWeek, firstDayInMonth) + 1;
  let currentMonthCounter = 1;
  let nextMonthCounter = 1;

  const rows = 5;
  const cols = 7;
  const calendarRows = {};

  // 使用 _.times 簡化外層迴圈
  _.times(rows, (i) => {
    // 使用 _.times 簡化內層迴圈
    _.times(cols, (j) => {
      if (!calendarRows[i + 1]) {
        calendarRows[i + 1] = [];
      }

      if (i === 0) {
        if (j < startingPoint) {
          calendarRows[i + 1] = [...calendarRows[i + 1], {
            classes: 'in-prev-month',
            date: `${selectedDate.getMonth() === 0 ? selectedDate.getFullYear() - 1 : selectedDate.getFullYear()}-${selectedDate.getMonth() === 0 ? 12 : selectedDate.getMonth()}-${prevMonthStartingPoint}`,
            value: prevMonthStartingPoint
          }];
          prevMonthStartingPoint++;
        } else {
          calendarRows[i + 1] = [...calendarRows[i + 1], {
            classes: '',
            date: `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${currentMonthCounter}`,
            value: currentMonthCounter
          }];
          currentMonthCounter++;
        }
      } else if (i > 0 && currentMonthCounter <= daysInMonth) {
        calendarRows[i + 1] = [...calendarRows[i + 1], {
          classes: '',
          date: `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${currentMonthCounter}`,
          value: currentMonthCounter
        }];
        currentMonthCounter++;
      } else {
        calendarRows[i + 1] = [...calendarRows[i + 1], {
          classes: 'in-next-month',
          date: `${selectedDate.getMonth() + 2 === 13 ? selectedDate.getFullYear() + 1 : selectedDate.getFullYear()}-${selectedDate.getMonth() + 2 === 13 ? 1 : selectedDate.getMonth() + 2}-${nextMonthCounter}`,
          value: nextMonthCounter
        }];
        nextMonthCounter++;
      }
    });
  });

  const getPrevMonth = () => {
    setSelectedDate(prevValue => new Date(prevValue.getFullYear(), prevValue.getMonth() - 1, 1));
  };

  const getNextMonth = () => {
    setSelectedDate(prevValue => new Date(prevValue.getFullYear(), prevValue.getMonth() + 1, 1));
  };

  return {
    monthNames,
    todayFormatted,
    calendarRows,
    selectedDate,
    getPrevMonth,
    getNextMonth
  };
};

export default useCalendar;
