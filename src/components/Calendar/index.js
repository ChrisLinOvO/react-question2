import React from "react";
import clx from "classnames";
import _ from "lodash";
import useCalendar from "../../hooks/useCalendar";
import styles from "./index.module.scss";

const Calendar = () => {
  const {
    calendarRows,
    selectedDate,
    todayFormatted,
    monthNames,
    getNextMonth,
    getPrevMonth,
  } = useCalendar();

  const dateClickHandler = (date) => {
    console.log(date);
  };

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
        {_.map(calendarRows, (cols, i) => (
          <div key={_.get(cols, "[0].date")}>
            {_.map(cols, (col) => {
              const { classes = [], date, value } = col;
              return (
                <span
                  key={date}
                  className={clx(
                    styles.col,
                    { [styles.today]: date === todayFormatted },
                    {
                      [styles.nonCurrentMonth]:
                        _.includes(classes, "in-prev-month") ||
                        _.includes(classes, "in-next-month"),
                    }
                  )}
                  onClick={() => dateClickHandler(date)}
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
