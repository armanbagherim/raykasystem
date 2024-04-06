const Orders = () => {
  return (
    <>
      <div className="md:col-span-3">
        <div className="grid grid-cols-5 mt-5 text-[12px] font-bold p-5">
          <div className="col-span-1 font-bold text-sm">شماره سفارش</div>
          <div className="col-span-1 font-bold text-sm">کد رهگیری</div>
          <div className="col-span-1 font-bold text-sm">تاریخ سفارش</div>
          <div className="col-span-1 font-bold text-sm">مبلغ پرداختی</div>
        </div>
        <div className="grid grid-cols-5 shadow-lg bg-customGray text-xs rounded-3xl mt-2 p-5">
          <div className="col-span-1 text-sm">111222333</div>
          <div className="col-span-1 text-sm">998877445</div>
          <div className="col-span-1 text-sm">1403/01/02</div>
          <div className="col-span-1 text-sm">{Number(124666).toLocaleString()} تومان</div>
          <div className="col-span-1 text-sm text-left pl-2">
            <a
              className="bg-primary p-3 rounded rounded-xl text-white"
              href="#"
            >
              نمایش جزئیات
            </a>
          </div>
        </div>
        <div className="grid grid-cols-5 shadow-lg bg-customGray text-xs rounded-3xl mt-2 p-5">
          <div className="col-span-1 text-sm">251478461</div>
          <div className="col-span-1 text-sm">147852369</div>
          <div className="col-span-1 text-sm">1403/01/05</div>
          <div className="col-span-1 text-sm">{Number(124666).toLocaleString()} تومان</div>
          <div className="col-span-1 text-sm text-left pl-2">
            <a
              className="bg-primary p-3 rounded rounded-xl text-white"
              href="#"
            >
              نمایش جزئیات
            </a>
          </div>
        </div>
        <div className="grid grid-cols-5 shadow-lg bg-customGray text-xs rounded-3xl mt-2 p-5">
          <div className="col-span-1 text-sm">111222333</div>
          <div className="col-span-1 text-sm">998877445</div>
          <div className="col-span-1 text-sm">1403/01/02</div>
          <div className="col-span-1 text-sm">{Number(124666).toLocaleString()} تومان</div>
          <div className="col-span-1 text-sm text-left pl-2">
            <a
              className="bg-primary p-3 rounded rounded-xl text-white"
              href="#"
            >
              نمایش جزئیات
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
