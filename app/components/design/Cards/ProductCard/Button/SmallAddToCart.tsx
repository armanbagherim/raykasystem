import { Cart } from "../../../Icons"

export const SmallAddToCart = () => {
    return (
        <>
            <button className="bg-primary text-slate-100 p-3 text-sm rounded-2xl items-center my-auto">
                <div className="flex gap-3">
                    <div>
                        <Cart />
                    </div>
                    <div className="items-center my-auto justify-start ml-0 mx-auto">
                        <div>افزودن به سبد خرید</div>
                    </div>
                </div>
            </button>
        </>
    )
}