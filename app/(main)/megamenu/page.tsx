import React from 'react';

const Megamenu = () => {
  return (
    <div className="bg-gray-800 text-white">
      <div className="container mx-auto py-4">
        <ul className="flex space-x-4">
          <li className="relative group">
            <a href="#" className="hover:text-gray-300">دسته بندی</a>
            <div className="absolute bg-customGray rounded rounded-3xl text-lg text-slate-500 p-4 mt-10 w-64 hidden group-hover:block">
                <p className='p-4 border-l'>آشپزخانه</p>
                <p className='p-4 border-t border-l'>سرو و پذیرایی</p>
                <p className='p-4 border-t border-l'>لوازم برقی</p>
                <p className='p-4 border-t border-l'>لوازم خانه</p>
                <p className='p-4 border-t border-l'>لوازم دکوری</p>
                <p className='p-4 border-t border-l'>محصولات استوک</p>
                <p className='p-4 border-t border-l'>تخفیفات ویژه</p>
                <p className='p-4 border-t border-l'>سه شنبه های تخفیفی</p>
                <p className='p-4 border-t border-l'>مقالات</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Megamenu;
