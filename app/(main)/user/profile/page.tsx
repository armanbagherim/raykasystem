const Profile = () => {
  return (
    <>
      <div className="md:col-span-3 shadow-md border  border-customGray bg-white text-sm rounded-3xl p-4 pb-10">
        <div className="grid grid-cols-3 gap-5 mt-5">
          <div>
            <input id="userFirstName" className="col-span-1 w-full p-2 text-gray-700 bg-[#F8F8F8]  rounded rounded-2xl py-3 px-4 mb-3 focus:outline-none" type="text" placeholder="نام" />
          </div>
          <div>
            <input id="userLastName" className="col-span-1 w-full p-2 text-gray-700 bg-[#F8F8F8]  rounded rounded-2xl py-3 px-4 mb-3 focus:outline-none " type="text" placeholder="نام خانوادگی" />
          </div>
          <div>
            <input id="userMobile" className="col-span-1 w-full p-2 text-gray-700 bg-[#F8F8F8]  rounded rounded-2xl py-3 px-4 mb-3 focus:outline-none" type="text" placeholder="موبایل" />
          </div>
        </div>
        <div className="text-left p-5">
            <button className="bg-primary p-4 rounded rounded-2xl text-white">ذخیره اطلاعات</button>
        </div>
      </div>
    </>
  );
};

export default Profile;
