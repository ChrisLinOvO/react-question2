import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import useCalendar from '../../hooks/useCalendar';

// 模擬當前日期
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (initialValue) => [initialValue, jest.fn()],
}));

describe('useCalendar', () => {
  it('渲染當前月份的行事曆', () => {
    const { getByText } = render(<TestComponent />);
    
    // 使用你的邏輯來確認當前月份的渲染
    // 例如，你可以檢查當前月份名稱是否存在
    expect(getByText('十二月')).toBeInTheDocument();
  });

  it('點擊日期更新選擇的日期', () => {
    const { getByText, getByTestId } = render(<TestComponent />);
    
    // 點擊行事曆中的某一天
    fireEvent.click(getByText('15'));

    // 使用你的邏輯確認選擇的日期是否更新
    // 例如，你可以檢查選擇的日期是否變為 15 號
    expect(getByTestId('selected-date')).toHaveTextContent('2023-12-15');
  });

  // 根據需要添加更多測試用例
});

// 一個用於包裹 useCalendar hook 的測試組件
const TestComponent = () => {
  const {
    calendarRows,
    selectedDate,
    startDate,
    endDate,
    getPrevMonth,
    getNextMonth,
    handleDateClick,
  } = useCalendar();

  return (
    <div>
      {/* 在這裡使用 hook 的值來渲染你的行事曆 UI */}
      <div data-testid="selected-date">{selectedDate.toISOString().split('T')[0]}</div>
    </div>
  );
};
