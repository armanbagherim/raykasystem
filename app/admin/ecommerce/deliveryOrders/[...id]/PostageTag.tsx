import React, { useState } from "react";
import { Button } from "@mui/material";

const PostageTag = ({ data }) => {
  const englishToPersianDigits = (str) => {
    return Number(str).toLocaleString("fa-ir");
  };

  const [print, setPrint] = useState(false);

  const handlePrint = () => {
    setPrint(true);
    window.print();
    window.addEventListener("beforeprint", handleAfterPrint);
  };
  const handleAfterPrint = () => {
    setPrint(true);
    //
    // setPrint(false);
  };
  return (
    <div>
      <Button onClick={handlePrint} className={"no-print mb-8"}>
        تگ پستی
      </Button>
      <div
        className={`invisible h-0 ${print ? "print:visible print:h-full" : ""}`}
      >
        <table dir="rtl" className={""} width={"100%"} border={0}>
          <tbody>
            <td>
              کد پیگیری {data?.id}
              <br />
              شماره تراکنش {data?.transactionId}
            </td>
            <td style={{ textAlign: "center", margin: "0 auto" }}></td>
            <td style={{ textAlign: "left" }}>
              تاریخ پرداخت سفارش
              <br />
              {new Date(data?.createdAt).toLocaleDateString("fa-ir")}
            </td>
          </tbody>
        </table>
        <table dir="rtl" border={0} width={"100%"}>
          <tbody>
            <tr>
              <td className={""}>فروشنده</td>
              <td>
                <span> فروشنده: رایکا سیستم </span>

                <span>
                  میدان ولیعصر، چهارراه طالقانی، مجتمع تجاری اداری نور تهران
                </span>
                <span>تلفن: 02188227209</span>
              </td>
            </tr>
            <tr>
              <td className={""}>خریدار</td>
              <td>
                <span>
                  نام و نام خانوادگی: {data.user.firstname} {data.user.lastname}
                </span>
                <span>آدرس: asd</span>
                <span>شماره تماس: {data.user.phoneNumber}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <table dir="rtl" className={""} border={0} width={"100%"}>
          <thead>
            <td className={""}>ردیف</td>
            <td className={""}>شرح کالا</td>
            <td className={""}>تعداد</td>
            <td>مبلغ واحد (تومان)</td>
            <td>مبلغ کل (تومان)</td>
          </thead>
          <tbody>
            {data?.details.map((value, key) => (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{value.product.title}</td>
                <td>{englishToPersianDigits(value.qty)}</td>
                <td>{englishToPersianDigits(value.productPrice)}</td>
                <td>{englishToPersianDigits(value.totalPrice)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default PostageTag;
