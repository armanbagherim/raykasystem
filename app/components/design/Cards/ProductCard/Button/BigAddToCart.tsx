import { Cart } from "../../../Icons";

export const BigAddToCart = ({ status, handleClick }) => {
  return (
    <>
      <button
        onClick={handleClick}
        className={`${
          status ? "bg-primary" : "bg-[#484848]"
        } text-white p-5 w-full rounded-3xl items-center flex-row flex justify-center`}
      >
        <span className="ml-4">
          <Cart />
        </span>
        {status ? "افزودن به سبد خرید" : "ناموجود"}
      </button>
    </>
  );
};

// export BigAddToCart;
