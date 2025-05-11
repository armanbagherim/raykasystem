import React, { useState } from "react";
import { Button } from "@mui/material";

const PrintPage = ({ data }) => {
  const englishToPersianDigits = (str) => {
    return Number(str).toLocaleString("fa-ir");
  };
  const [printArea, setPrintArea] = useState(null);

  const handlePrint = async (area) => {
    setPrintArea(area);
    window.addEventListener("beforeprint", beforePrintFunction);
    window.addEventListener("afterprint", afterPrintFunction);
    const result = await setTimeout(() => {
      window.print();
    }, 600);
    window.removeEventListener("beforeprint", beforePrintFunction);
    window.removeEventListener("afterprint", afterPrintFunction);
  };

  const beforePrintFunction = () => {
    setPrintArea(null);
  };
  const afterPrintFunction = () => {};
  return (
    <>
      <Button
        variant="contained"
        color="info"
        onClick={(e) => handlePrint("all")}
        className={"iranSans no-print mb-8"}
      >
        پرینت سفارش
      </Button>
      <Button
        variant="contained"
        color="info"
        onClick={(e) => handlePrint("limited")}
        className={"iranSans no-print mb-8"}
      >
        برچسب پستی
      </Button>

      <div
        className={`invisible md:hidden print:block h-0 iranSans ${
          printArea ? "print:visible print:h-full" : ""
        }`}
      >
        <p className="iranSans mb-4">رایکا سیستم</p>
        <table dir="rtl" className={"iranSans "} width={"100%"} border={0}>
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
              <td className={"iranSans "}>فروشنده</td>
              <td>
                <span> فروشنده: رایکا سیستم </span>

                <span>
                  میدان شوش، خیابان صابونیان، مجتمع الماس، طبقه سوم، پلاک 796
                </span>
                <span>تلفن: ۰۲۱۵۵۳۴۳۸۱۹</span>
              </td>
            </tr>
            <tr>
              <td className={"iranSans "}>خریدار</td>
              <td>
                <span>
                  نام و نام خانوادگی: {data?.user?.firstname}{" "}
                  {data?.user?.lastname} {""}
                </span>
                <span>
                  آدرس: <span>استان: {data?.address?.province.name} </span>
                  <span>شهر: {data?.address?.city.name} </span>
                  <span>
                    محله:
                    {data?.address?.neighborhood?.name}{" "}
                  </span>
                  <span>خیابان: {data?.address?.street} </span>
                  <span>پلاک: {data?.address?.plaque} </span>
                  <span>طبقه: {data?.address?.floorNumber} </span>
                </span>
                <span>شماره تماس: {data?.user?.phoneNumber}</span>
                <span>کدپستی: {data?.address?.postalCode}</span>
              </td>
            </tr>
          </tbody>
        </table>
        {printArea === "all" ? (
          <table dir="rtl" className={"iranSans "} border={0} width={"100%"}>
            <thead>
              <td className={"iranSans "}>ردیف</td>
              <td className={"iranSans "}>شرح کالا</td>
              <td className={"iranSans "}>تعداد</td>
              <td>مبلغ واحد (تومان)</td>
              <td>مبلغ کل (تومان)</td>
            </thead>
            <tbody>
              {data?.details.map((value, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>
                    {value.product.title}

                    {value.product.inventories[0].color !== null
                      ? ` - ${value.product.inventories[0].color.name}`
                      : ""}
                  </td>
                  <td>{englishToPersianDigits(value.qty)}</td>
                  <td>{englishToPersianDigits(value.productPrice)}</td>
                  <td>{englishToPersianDigits(value.totalPrice)}</td>
                </tr>
              ))}

              <tr>
                <td style={{ textAlign: "left" }} colSpan={9}>
                  تخفیف سفارش
                </td>
                <td colSpan={1}>
                  {englishToPersianDigits(data?.totalDiscountFee)}
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }} colSpan={9}>
                  هزینه بسته بندی و ارسال
                </td>
                <td colSpan={1}>
                  {englishToPersianDigits(data?.totalShipmentPrice)}
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }} colSpan={9}>
                  جمع کل پس از کسر تخفیف با احتساب مالیات و عوارض (تومان)
                </td>
                <td colSpan={1}>{englishToPersianDigits(data.totalPrice)}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
export default PrintPage;
