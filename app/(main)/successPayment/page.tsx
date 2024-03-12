


const SuccessPay=()=>{
    return(
        <>
            <div className="container justify-center mx-auto">
                <div className="mt-20">
                    <img className="justify-center mx-auto" src="/images/tick-circle.png" alt="" />
                    <div className="text-center font-bold text-3xl mt-7">پرداختِ شما با موفقیت انجام شد :)</div>
                    <div className="text-center text-sm mt-3 font-normal"><span>شماره پیگیری:</span><span>&nbsp;</span><span className="text-primary">465498X4SF654W</span></div>
                    <div className="text-center mt-8">
                        <button className="bg-primary hover:bg-green-700 text-slate-100 p-3 w-64 rounded-2xl">پیگیری پرداخت</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SuccessPay;