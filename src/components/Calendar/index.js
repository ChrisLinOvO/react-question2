import React from "react";
import useCalendar from "../../hooks/useCalendar";
import styles from "./index.module.scss";

const Calendar = () => {
  const {
    calendarRows,
    selectedDate,
    todayFormatted,
    monthNames,
    startDate,
    endDate,
    getNextMonth,
    getPrevMonth,
    handleDateClick,
  } = useCalendar();

  console.log(`開始日期: ${startDate} - 結束日期: ${endDate}`);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.calendarNext} onClick={getPrevMonth}>
          {"<"}
        </button>
        <div className={styles.month}>{`${selectedDate.getFullYear()}年${
          monthNames[selectedDate.getMonth()]
        }月`}</div>
        <button className={styles.calendarPrev} onClick={getNextMonth}>
          {">"}
        </button>
      </div>
      <div className={styles.days}>
        {Object.values(calendarRows).map((cols) => (
          <div key={cols[0].date}>
            {cols.map((col) => {
              const { classes = [], date, value } = col;
              const isNonCurrentMonth =
                classes.includes("in-prev-month") ||
                classes.includes("in-next-month");

              const startDateObj = new Date(startDate);
              const endDateObj = new Date(endDate);
              const currentDateObj = new Date(date);
              const classNames = [
                styles.col,
                date === todayFormatted && styles.today,
                isNonCurrentMonth && styles.nonCurrentMonth,
                currentDateObj >= startDateObj &&
                  currentDateObj <= endDateObj &&
                  styles.selectedRange,
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <span
                  key={date}
                  className={classNames}
                  onClick={() =>
                    isNonCurrentMonth ? null : handleDateClick(date)
                  }
                >
                  {`${value}日`}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
