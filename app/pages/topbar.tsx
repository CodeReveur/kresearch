import Link from "next/link";

interface TopbarProps {
  onClickSideBar: () => void;
}

const TopBar = ({onClickSideBar}: TopbarProps) => {
  return (
    <div className="m-0 py-3 px-5">
      <div className="flex justify-center items-center">
        <div className="sidemenu flex items-center flex-1 text-slate-500">
          <div className="w-12 h-12 rounded-full">
            <img src="/logo.svg" alt="logo" className="w-full h-full rounded-full"/>
          </div>
          <div className="mx-1 cursor-pointer" onClick={onClickSideBar}>
            <i className="bi bi-list text-2xl text-teal-800"></i>
          </div>
          <Link href={""} className="mx-5 flex items-center">
            <i className="bi bi-question-circle-fill text-2xl mr-2"></i> 
            <span> Help </span>
          </Link>
        </div>
        <div className="login flex space-x-4">
          <div className="flex border border-teal-600 py-1 px-2 rounded-md text-teal-600">
            <i className="bi bi-globe"> </i>
            <select name="" id="">
              <option value="">English</option>
            </select>
          </div>
          {false ? (
          <div className="w-10 h-10 rounded-full p-1 bg-teal-100 flex justify-center items-center">
            <i className="bi bi-person text-2xl  text-teal-600"></i>
          </div>
          ) : (
          <div className="flex space-x-4 items-center">
            <Link href={"/w-page/auth/join"} className="border border-teal-300 py-1 px-6 rounded-md bg-teal-600 text-white">Join for free</Link>
          </div>
          )}
          
          
        </div>
      </div>
    </div>
  );
}
export default TopBar;