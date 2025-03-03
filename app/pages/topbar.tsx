import Link from "next/link";

interface TopbarProps {
  onClickSideBar: () => void;
}

const TopBar = ({ onClickSideBar }: TopbarProps) => {

  return (
    <div className="m-0 py-3 px-5">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="sidemenu flex items-center flex-1 text-slate-500">
          <Link href="/" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full">
            <img
              src="/logo.svg"
              alt="logo"
              className="w-full h-full rounded-full"
            />
          </Link>
          <div className="mx-2 cursor-pointer" onClick={onClickSideBar}>
            <i className="bi bi-list text-xl sm:text-2xl text-teal-800"></i>
          </div>
          <Link href={"/w-page/help"} className="hidden sm:flex items-center text-slate-500">
            <i className="bi bi-question-circle-fill text-2xl mr-2"></i>
            <span> Help </span>
          </Link>
        </div>
        <div className="login flex items-center space-x-3 sm:space-x-4">
          <div className="flex border border-teal-600 py-1 px-2 rounded-md text-teal-600 items-center">
            <i className="bi bi-globe mr-1"></i>
            <select className="text-sm outline-none bg-transparent">
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="kiny">Kiny</option>
            </select>
          </div>
          {false ? (
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full p-1 bg-teal-100 flex justify-center items-center">
              <i className="bi bi-person text-lg sm:text-2xl text-teal-600"></i>
            </div>
          ) : (
            <Link
              href="/w-page/auth/join"
              className="border border-teal-300 py-1 px-4 sm:px-6 rounded-md bg-teal-600 text-white text-sm sm:text-base"
            >
              Join for free
            </Link>
          )}
        </div>
      </div>
    </div>
    
  );
};

export default TopBar;
