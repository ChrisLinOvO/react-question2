import { act, renderHook } from "@testing-library/react-hooks";
import useCalendar from "../../hooks/useCalendar";

describe("useCalendar hook", () => {
  it("當調用 getNextMonth 時，應更新 selectedDate", () => {
    const { result } = renderHook(() => useCalendar());
    const initialMonth = result.current.selectedDate.getMonth() + 1;
    act(() => {
      result.current.getNextMonth();
    });
    const updatedMonth = result.current.selectedDate.getMonth() + 1;
    expect(updatedMonth).toBe(initialMonth + 1);
  });

  it("當調用 getPrevMonth 時，應更新 selectedDate", () => {
    const { result } = renderHook(() => useCalendar());
    const initialMonth = result.current.selectedDate.getMonth() + 1;
    act(() => {
      result.current.getPrevMonth();
    });
    const updatedMonth = result.current.selectedDate.getMonth() + 1;
    expect(updatedMonth).toBe(initialMonth - 1);
  });

  it("應處理日期點擊並相應更新 startDate 和 endDate", () => {
    const wrapper = ({ children }) => <div>{children}</div>;
    const { result } = renderHook(() => useCalendar(), { wrapper });
    const date1 = "2023-01-01";
    const date2 = "2023-01-05";
    const date3 = "2023-01-10";

    act(() => {
      result.current.handleDateClick(date1);
    });
    expect(result.current.startDate).toBe(date1);
    expect(result.current.endDate).toBe(null);

    act(() => {
      result.current.handleDateClick(date3);
    });
    expect(result.current.startDate).toBe(date1);
    expect(result.current.endDate).toBe(date3);

    act(() => {
      result.current.handleDateClick(date2);
    });
    expect(result.current.startDate).toBe(date2);
    expect(result.current.endDate).toBe(null);
  });

  it("應生成正確的 calendarRows", () => {
    const { result } = renderHook(() => useCalendar());
    const { calendarRows, selectDateYear, selectDateMonth } = result.current;

    expect(calendarRows).toBeDefined();

    // 檢查第一行的結構和值，假設每一行有 7 列
    const firstRow = calendarRows[1];
    expect(firstRow).toHaveLength(7);

    // 檢查第一行中一個日期格子的值
    const firstDateCell = firstRow[0];
    expect(firstDateCell).toHaveProperty("classes");
    expect(firstDateCell).toHaveProperty("date");
    expect(firstDateCell).toHaveProperty("value");

    // 檢查第一行的第一個日期格子
    expect(firstDateCell.classes).toBe("in-prev-month");

    // 檢查最後一行
    const lastRow = calendarRows[6];
    expect(lastRow).toHaveLength(7);

    // 檢查最後一行的最後一個日期格子
    const lastDateCell = lastRow[6];
    expect(lastDateCell.classes).toBe("in-next-month");
  });

  it("應正確處理初始點擊情況", () => {
    const { result } = renderHook(() => useCalendar());
    const { handleDateClick } = result.current;

    const date = "2023-01-01";

    act(() => {
      handleDateClick(date);
    });

    expect(result.current.startDate).toBe(date);
    expect(result.current.endDate).toBe(null);
  });

  it("應正確處理開始日期已選擇的情況，下一次點擊日期與開始日期相同或晚於開始日期", () => {
    const { result } = renderHook(() => useCalendar());
    const { handleDateClick, setStartDate } = result.current;

    // 設置開始日期
    const startDate = "2023-01-01";
    act(() => {
      setStartDate(startDate);
    });

    // 模擬下一次點擊日期與開始日期相同或晚於開始日期的情況
    const nextDate = "2023-01-05";
    act(() => {
      handleDateClick(nextDate);
    });

    expect(result.current.startDate).toBe(nextDate);
  });

  it("應正確處理開始日期已選擇的情況，下一次點擊日期早於開始日期", () => {
    const { result } = renderHook(() => useCalendar());
    const { handleDateClick, setStartDate } = result.current;

    // 設置開始日期
    const startDate = "2023-01-05";
    act(() => {
      setStartDate(startDate);
    });

    // 模擬下一次點擊日期早於開始日期的情況
    const nextDate = "2023-01-01";
    act(() => {
      handleDateClick(nextDate);
    });

    expect(result.current.startDate).toBe(nextDate);
    expect(result.current.endDate).toBe(null);
  });

  it("應正確處理結束日期已選擇的情況", () => {
    const { result } = renderHook(() => useCalendar());
    const { handleDateClick, setEndDate } = result.current;

    // 設置結束日期
    const endDate = "2023-01-10";
    act(() => {
      setEndDate(endDate);
    });

    // 模擬點擊日期，應重新設定為開始日期，清空結束日期
    const nextDate = "2023-01-15";
    act(() => {
      handleDateClick(nextDate);
    });

    expect(result.current.startDate).toBe(nextDate);
    expect(result.current.endDate).toBe(null);
  });
});
