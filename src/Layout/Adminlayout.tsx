import { Outlet } from "react-router-dom"
import SideBar from "../Components/SideBar"
import { ToastContainer } from "react-toastify"

const LayOutAdmin = ()=>{
    return (
        <>
      <main>
        <div className="flex flex-row">
          <SideBar />
          <div className="p-6 bg-[#20354b] w-[100%]">
            <Outlet />
          </div>
        </div>
        <ToastContainer/>
      </main>
    </>
    )
}

export default LayOutAdmin