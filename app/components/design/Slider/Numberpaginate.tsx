
const Numberpaginate=()=>{
    return(
        <>
        <div className="flex mt-3 justify-start mx-auto gap-2" dir="ltr">
          <div>
            <button className="bg-[#B8B8B8] p-2 text-white pl-5 pr-5 rounded-lg hover:bg-slate-600 text-2xl">
              1
            </button>
          </div>
          <div>
            <button className="bg-[#B8B8B8] p-2 text-white pl-5 pr-5 rounded-lg hover:bg-slate-600 text-2xl">
              2
            </button>
          </div>
          <div>
            <button className="bg-primary p-2 text-white pl-5 pr-5 rounded-lg hover:bg-slate-600 text-2xl">
              3
            </button>
          </div>
        </div>
        </>
    )
}

export default Numberpaginate;