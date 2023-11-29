import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Calendar from "../../components/Calendar";

describe("Calendar component", () => {
  it("應正確渲染日曆組件", () => {
    const { getByText } = render(<Calendar />);

    // 檢查上一月按鈕是否存在
    expect(getByText("<")).toBeInTheDocument();

    // 檢查下一月按鈕是否存在
    expect(getByText(">")).toBeInTheDocument();

    // 檢查年月份顯示是否存在
    expect(getByText(/年\d+月/)).toBeInTheDocument();
  });
});
