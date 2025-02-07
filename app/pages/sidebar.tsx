import Link from "next/link";

const Links = [
  {"name": "Home", "icon": "bi bi-house", "url": "/"},
  {"name": "Kamero official site", "icon": "bi bi-globe", "url": "https://kamero.rw"},
  {"name": "Login", "icon": "bi bi-box-arrow-right", "url": "https://krbdash.vercel.app/auth/login"},
]


const SideBar = () => {
  return (
    <div className="fixed top-0 left-0 shadow-md shadow-slate-400 bg-white w-[18vw] h-full z-20">
      <div className="flex flex-col py-7">
        <div className="logo border-b pb-3 px-2  border-slate-300">
          <div className="flex">
            <img src="/logo.svg" alt="logo" className="w-12 h-8 mr-1"/>
            <h4 className="text-xl font-semibold text-teal-600">
              <span >K </span> 
              <span >Research </span> 
              <span >Base </span>
            </h4>
          </div>
        </div>
        {Links.map((link, key) =>(
          <Link key={key} href={link.url} className="my-1 mx-3 py-1 px-2 text-slate-700 font-semibold rounded-md hover:text-[#00796b] hover:bg-slate-100">
            <i className={`${link.icon} mr-2 text-xl`}></i>
            <span>{link.name }</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default SideBar;