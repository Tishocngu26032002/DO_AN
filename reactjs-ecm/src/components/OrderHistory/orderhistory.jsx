import React from "react";

function OrderHistory() {
  return (
    <div className="mx-auto mb-[40px] mt-[30px] w-[1160px] min-w-[320px] rounded-[4px] border border-solid bg-white">
      <div className="text-text_color flex flex-col px-[45px] py-[65px] text-[13px] font-normal leading-[1] tracking-[0.02em]">
        <h1 className="mt-[25px] text-center text-[32px] font-bold leading-[1.125] tracking-[-0.015em]">
          Order History
        </h1>

        {/* Bảng thông tin đơn hàng */}
        <table className="mt-[50px] w-full text-left text-[15px]">
          {/* Phần tiêu đề của bảng */}
          <thead>
            <tr>
              <th className="pb-[15px] pr-[15px] uppercase">Order Code</th>
              <th className="pb-[15px] pr-[15px] uppercase">Date</th>
              <th className="pb-[15px] pr-[15px] uppercase">Payment Method</th>
              <th className="pb-[15px] pr-[15px] uppercase">Total</th>
            </tr>
          </thead>

          {/* Phần nội dung của bảng */}
          <tbody>
            <tr>
              <td className="pb-[15px] pr-[15px]">#PH1244721</td>
              <td className="pb-[15px] pr-[15px]">Sunday, April 21, 2024</td>
              <td className="pb-[15px] pr-[15px]">Direct bank transfer</td>
              <td className="pb-[15px] pr-[15px]">15.550.000 VND</td>
            </tr>
            <tr>
              <td className="pb-[15px] pr-[15px]">#PH1244721</td>
              <td className="pb-[15px] pr-[15px]">Sunday, April 21, 2024</td>
              <td className="pb-[15px] pr-[15px]">Direct bank transfer</td>
              <td className="pb-[15px] pr-[15px]">15.550.000 VND</td>
            </tr>
            <tr>
              <td className="pb-[15px] pr-[15px]">#PH1244721</td>
              <td className="pb-[15px] pr-[15px]">Sunday, April 21, 2024</td>
              <td className="pb-[15px] pr-[15px]">Direct bank transfer</td>
              <td className="pb-[15px] pr-[15px]">15.550.000 VND</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderHistory;
