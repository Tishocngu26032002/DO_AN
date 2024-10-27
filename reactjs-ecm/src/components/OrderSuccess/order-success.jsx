import React from "react";
import { Link } from "react-router-dom";
import { PiShoppingCartBold } from "react-icons/pi";

export default function OrderSuccess() {
  return (
    <>
      <div className="mx-auto mb-[40px] mt-[30px] w-[1160px] min-w-[320px] rounded-[4px] border border-solid bg-white">
        <div className="text-text_color flex flex-col px-[45px] py-[65px] text-[13px] font-normal leading-[1] tracking-[0.02em]">
          <div className="flex flex-col items-center">
            <PiShoppingCartBold size={60} className="fill-current" />
            <h2 className="mt-[25px] text-center text-[32px] font-bold leading-[1.125] tracking-[-0.015em]">
              Cảm ơn bạn. Đơn hàng của bạn đã được tiếp nhận.
            </h2>
          </div>

          <ul className="mt-[50px] flex justify-between text-left">
            <li className="mb-[35px] flex-1">
              <span className="block pb-[15px] pr-[15px] uppercase">
                Order Code :
              </span>
              <span className="mt-[20px] block pr-[15px] text-[15px] tracking-[0.01em]">
                #PH1244721
              </span>
            </li>

            <li className="mb-[35px] flex-1">
              <span className="block pb-[15px] pr-[15px] uppercase">
                Date :
              </span>
              <span className="mt-[20px] block pr-[15px] text-[15px] tracking-[0.01em]">
                Sunday, April 21, 2024
              </span>
            </li>

            <li className="mb-[35px] flex-1">
              <span className="block pb-[15px] pr-[15px] uppercase">
                Payment Method :
              </span>
              <span className="mt-[20px] block pr-[15px] text-[15px] tracking-[0.01em]">
                Direct bank transfer
              </span>
            </li>

            <li className="mb-[35px]">
              <span className="block pb-[15px] pr-[15px] uppercase">
                Total :
              </span>
              <span className="mt-[20px] block pr-[15px] text-[15px] tracking-[0.01em]">
                15.550.000 VND
              </span>
            </li>
          </ul>

          <div className="mx-auto max-w-[530px]">
            <div className="mb-[45px] mt-[30px] flex flex-col">
              <h2 className="mb-[35px] text-[22px] font-medium leading-[28px]">
                Order Details
              </h2>

              <table className="">
                <thead className="">
                  <tr className="uppercase">
                    <th className="w-[70%] border-b border-solid pb-[15px] text-left text-[13px] font-normal leading-[1]">
                      product
                    </th>
                    <th className="border-b border-solid pb-[15px] text-right text-[13px] font-normal leading-[1]">
                      total
                    </th>
                  </tr>
                </thead>

                <tbody className="">
                  <tr className="">
                    <td className="w-[70%] pb-[6px] pt-[15px] text-left text-[13px] font-normal leading-[1]">
                      <div className="flex flex-col">
                        <div className="text-[14px] leading-[1.27]">
                          <Link to="/animals/1" className="">
                            Pig food
                          </Link>
                          <span> ×&nbsp;3 </span>
                        </div>
                      </div>
                    </td>

                    <td className="font-quicksand pb-[6px] pt-[15px] text-right text-[17px] font-bold leading-[1] tracking-[0.01em]">
                      <span>15.000.000</span>&nbsp;VND
                    </td>
                  </tr>

                  <tr className="">
                    <td className="w-[70%] border-b border-solid pb-[15px] pt-[6px] text-left text-[13px] font-normal leading-[1]">
                      <div className="flex flex-col">
                        <div className="text-[14px] leading-[1.27]">
                          <Link
                            to="/animals/2"
                            className="hover:text-secondary"
                          >
                            Fish food
                          </Link>
                          <span> ×&nbsp;2 </span>
                        </div>
                        <ul className="mt-[5px] flex gap-[10px]">
                          <li>
                            <span className="capitalize">weight : </span>
                            <span className=""> 5kg </span>
                          </li>
                          <li>
                            <span className="capitalize">Ingredient : </span>
                            <span className=""> beef </span>
                          </li>
                        </ul>
                      </div>
                    </td>

                    <td className="border-b border-solid pb-[15px] pt-[6px] text-right text-[17px] font-bold leading-[1] tracking-[0.01em]">
                      <span>500.000</span>&nbsp;VND
                    </td>
                  </tr>
                </tbody>

                <tfoot className="">
                  <tr className="uppercase">
                    <th className="w-[70%] border-b border-solid text-left text-[13px] font-normal leading-[1]">
                      subtotal :
                    </th>

                    <td className="w-auto border-b border-solid py-[15px] text-right text-[17px] font-bold leading-[1] tracking-[0.01em]">
                      <span>15.500.000</span> vnd
                    </td>
                  </tr>

                  <tr className="uppercase">
                    <th className="w-[70%] border-b border-solid text-left text-[13px] font-normal leading-[1]">
                      Shipping :
                    </th>

                    <td className="w-[30%] border-b border-solid py-[15px] text-right text-[17px] font-bold leading-[1] tracking-[0.01em]">
                      <span>50.000</span> vnd
                    </td>
                  </tr>

                  <tr className="">
                    <th className="w-[70%] border-b border-solid text-left text-[13px] font-normal uppercase leading-[1]">
                      payment method :
                    </th>
                    <td className="border-b border-solid py-[15px] text-right text-[15px] font-normal leading-[1.5] tracking-[0.01em]">
                      Direct bank transfer
                    </td>
                  </tr>

                  <tr className="">
                    <th className="w-[70%] border-b border-solid text-left text-[13px] font-normal uppercase leading-[1]">
                      total :
                    </th>
                    <td className="py-[15px] text-right text-[17px] font-bold leading-[1] tracking-[0.01em]">
                      <span>15.550.000</span> vnd
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
