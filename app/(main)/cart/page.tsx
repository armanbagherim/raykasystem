import { Minus, PlusBig, PlusSmall, Trash } from "@/app/components/design/Icons";
import Link from "next/link";

const Cart = () => {
    return (
        <>
            <div className="container justify-center mx-auto">
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                        <div className="grid grid-cols-5 gap-2 text-sm font-bold p-2">
                            <div className="p-1">محصول</div>
                            <div className="p-1">تعداد</div>
                            <div className="p-1">قیمت محصول</div>
                            <div className="p-1">فروشنده</div>
                            <div className="p-1">مبلغ کل</div>
                        </div>

                        <div className="grid grid-cols-5 bg-customGray text-xs rounded-3xl mt-2 p-2">
                            <div className="flex">
                                <div><img src="/images/product-2.png" /></div>
                                <div className="p-1 gap-1"><span></span><span>محصول آزمایشی با حدود 2 خط متن یه کم طولانی</span><span>&nbsp;</span><Link className="text-primary" href="#">رنگ طلایی</Link></div>
                            </div>

                            <div className="p-1 flex gap-1"><div><PlusBig /></div><div className="font-bold items-center my-auto">2</div><div><Minus /></div></div>
                            <div className="p-1">
                                <span className="block">
                                    <span className="opacity-75 text-xs line-through">
                                        {Number(125000).toLocaleString()}
                                    </span>
                                </span>
                                <p className="text-sm">{Number(125000).toLocaleString()} تومان</p>
                            </div>
                            <div className="p-1"><Link className="text-primary" href="#">جهیزان</Link></div>
                            <div className="p-1 text-sm">{Number(125000).toLocaleString()} تومان</div>
                        </div>

                        <div className="grid grid-cols-5 gap-2 bg-customGray text-xs rounded-3xl mt-2 p-2">
                            <div className="flex">
                                <div><img src="/images/product-2.png" /></div>
                                <div className="p-1 gap-1"><span></span><span>محصول آزمایشی با حدود 2 خط متن یه کم طولانی</span><span>&nbsp;</span><Link className="text-primary" href="#">رنگ طلایی</Link></div>
                            </div>

                            <div className="p-1 flex gap-1"><div><PlusBig /></div><div className="font-bold items-center my-auto">1</div><div><Trash /></div></div>
                            <div className="p-1">
                                <span className="block">
                                    <span className="opacity-75 text-xs line-through">
                                        {Number(125000).toLocaleString()}
                                    </span>
                                </span>
                                <p className="text-sm">{Number(125000).toLocaleString()} تومان</p>
                            </div>
                            <div className="p-1"><Link className="text-primary" href="#">آریان گستر</Link></div>
                            <div className="p-1 text-sm">{Number(125000).toLocaleString()} تومان</div>
                        </div>

                        <div className="grid grid-cols-5 gap-2 bg-customGray text-xs rounded-3xl mt-2 p-2">
                            <div className="flex">
                                <div><img src="/images/product-2.png" /></div>
                                <div className="p-1 gap-1"><span></span><span>محصول آزمایشی با حدود 2 خط متن یه کم طولانی</span><span>&nbsp;</span><Link className="text-primary" href="#">رنگ طلایی</Link></div>
                            </div>                            <div className="p-1 flex gap-1"><div><PlusBig /></div><div className="font-bold items-center my-auto">2</div><div><Minus /></div></div>
                            <div className="p-1">
                                <span className="block">
                                    <span className="opacity-75 text-xs line-through">
                                        {Number(125000).toLocaleString()}
                                    </span>
                                </span>
                                <p className="text-sm">{Number(125000).toLocaleString()} تومان</p>
                            </div>
                            <div className="p-1"><Link className="text-primary" href="#">جهیزان</Link></div>
                            <div className="p-1 text-sm">{Number(125000).toLocaleString()} تومان</div>
                        </div>

                        <div className="grid grid-cols-5 gap-2 bg-customGray text-xs rounded-3xl mt-2 p-2">
                            <div className="flex">
                                <div><img src="/images/product-2.png" /></div>
                                <div className="p-1 gap-1"><span></span><span>محصول آزمایشی با حدود 2 خط متن یه کم طولانی</span><span>&nbsp;</span><Link className="text-primary" href="#">رنگ طلایی</Link></div>
                            </div>                            <div className="p-1 flex gap-1"><div><PlusBig /></div><div className="font-bold items-center my-auto">1</div><div><Trash /></div></div>
                            <div className="p-1">
                                <span className="block">
                                    <span className="opacity-75 text-xs line-through">
                                        {Number(125000).toLocaleString()}
                                    </span>
                                </span>
                                <p className="text-sm">{Number(125000).toLocaleString()} تومان</p>
                            </div>
                            <div className="p-1"><Link className="text-primary" href="#">آریان گستر</Link></div>
                            <div className="p-1 text-sm">{Number(125000).toLocaleString()} تومان</div>
                        </div>

                    </div>

                    <div className="col-span-1 bg-slate-300 text-xs rounded-3xl mt-8 p-3">
                        <div className="text-sm mt-4">
                            <div className="grid grid-cols-2">
                                <div className="col-span-1">
                                    نام
                                </div>
                                <div className="col-span-1">
                                    نام خانوادگی
                                </div>
                            </div>
                            <div className="grid grid-cols-2 p-3">
                                <div className="col-span-1">
                                    <input className="bg-gray-100 text-gray-700 rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white" type="text" value="مهراد" readOnly />
                                </div>
                                <div className="col-span-1">
                                    <input className="bg-gray-100 text-gray-700 rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white" type="text" value="مهراد" readOnly />
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="col-span-1">
                                    انتخاب آدرس
                                </div>
                                <div className="col-span-1 flex gap-2 justify-end">
                                    <span><PlusSmall /></span><span>افزودن آدرس</span>
                                </div>

                                <div className="inline-block col-span-2 relative w-full mt-4">
                                    <div className="relative">
                                        <div className="pointer-events-none border border-2 justify-center mx-auto w-10 absolute inset-y-0 left-0 flex items-center text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </div>
                                        <select className="appearance-none  h-20 w-full bg-white border border-gray-400 hover:border-gray-500 pl-8 pr-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                            <option>شوش، خیابان مولوی، خیابان امیر المومنین پلاک 14 طبقه 2</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-5 mt-4">
                                <div className="col-span-1 items-center my-auto">
                                    کد تخفیف
                                </div>
                                <div className="col-span-3 items-center my-auto">
                                    <input className="bg-gray-100 text-gray-700  rounded px-4 focus:outline-none focus:bg-white" type="text" value="" />
                                </div>
                                <div className="col-span-1 justify-end mx-auto">
                                    <button className="bg-primary p-2 pl-3 pr-3 rounded-xl text-slate-100">بررسی کد</button>
                                </div>
                            </div>

                            <div className="mt-3">روش پرداخت</div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
