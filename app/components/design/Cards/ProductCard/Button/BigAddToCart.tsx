import { Cart } from "../../../Icons";

export const BigAddToCart = ({ status, handleClick }) => {
  return (
    <>
      <button
        onClick={handleClick}
        className={`${
          status ? "bg-primary" : "bg-[#484848]"
        } text-white py-3 text-sm rounded-xl px-4 md:px-5 md:text-md md:py-4 w-full md:rounded-2xl items-center flex-row flex justify-center`}
      >
        {status ? "افزودن به سبد خرید" : "ناموجود"}
      </button>
    </>
  );
};

// export BigAddToCart;
