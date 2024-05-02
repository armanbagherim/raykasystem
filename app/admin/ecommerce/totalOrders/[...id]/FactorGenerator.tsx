import { Button } from "@mui/material";
import html2canvas from "html2canvas";
import JsPDF from "jspdf";
import React, { useState } from "react";

const FactorGenerator = ({ data }) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const generatePDF = () => {
    setIsGeneratingPDF(true);
    const content = document.getElementById("printIt");
    html2canvas(content, {
      dpi: 800,
      scale: 5,
      logging: true,
      letterRendering: true,
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      const pdf = new JsPDF("p", "mm", "a4", true);
      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position += heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save("generated.pdf");
      setIsGeneratingPDF(false);
    });
  };
  const englishToPersianDigits = (str) => {
    return Number(str).toLocaleString("fa-ir");
  };

  return (
    <div style={{ width: "600px", margin: "0 auto" }} className="pdf">
      <Button onClick={generatePDF} className={""}>
        تولید فاکتور
      </Button>
      <div id="printIt" className={`p-8 ${!isGeneratingPDF ? "" : ""}`}>
        <table dir="rtl" className={""} width={"100%"} border={0}>
          <tbody>
            <td>
              کد پیگیری asd
              <br />
              شماره فاکتور asd
            </td>
            <td style={{ textAlign: "center", margin: "0 auto" }}></td>
            <td style={{ textAlign: "left" }}>
              تاریخ پرداخت سفارش
              <br />
              asd
            </td>
          </tbody>
        </table>
        <table dir="rtl" border={0} width={"100%"}>
          <tbody>
            <tr>
              <td className={""}>فروشنده</td>
              <td>
                <span> فروشنده: جهیزان </span>

                <span>
                  میدان شوش، خیابان صابونیان، مجتمع الماس، طبقه سوم، پلاک 796
                </span>
                <span>تلفن: ۰۲۱۵۵۳۴۳۸۱۹</span>
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
            <td>مبلغ واحد (ریال)</td>
            <td>مبلغ کل (ریال)</td>
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

            <tr>
              <td style={{ textAlign: "left" }} colSpan={9}>
                تخفیف سفارش
              </td>
              <td colSpan={1}>۰</td>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }} colSpan={9}>
                هزینه بسته بندی و ارسال
              </td>
              <td colSpan={1}>
                {/* {englishToPersianDigits(data?.shippingPrice.gross.amount)} */}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }} colSpan={9}>
                جمع کل پس از کسر تخفیف با احتساب مالیات و عوارض (ریال)
              </td>
              <td colSpan={1}>
                {/* {englishToPersianDigits(data?.total.gross.amount)} */}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FactorGenerator;
