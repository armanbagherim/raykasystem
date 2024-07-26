import { Cart } from "../../../Icons";

export const BigAddToCart = ({ status, handleClick }) => {
  return (
    <>
      <button
        onClick={handleClick}
        className={`${
          status ? "bg-primary" : "bg-[#484848]"
        } text-white py-3 text-sm rounded-xl px-4 md:px-5 md:text-md md:py-5 w-full md:rounded-3xl items-center flex-row flex justify-center`}
      >
        {/* <span className="ml-4">
          <Cart />
        </span> */}
        {status ? "افزودن به سبد خرید" : "ناموجود"}
      </button>
    </>
  );
};

// export BigAddToCart;
