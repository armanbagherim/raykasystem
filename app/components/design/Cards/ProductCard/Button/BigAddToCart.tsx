import { Cart } from "../../../Icons";

export const BigAddToCart=()=>{
    return(
        <>
        <button className="bg-primary text-white p-4 w-full rounded-3xl items-center flex-row flex justify-center">
                <span className="ml-4">
                  <Cart />
                </span>
                افزودن به سبد خرید
              </button>
        </>
    )
}

// export BigAddToCart;