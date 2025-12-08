import {useSelector } from "react-redux"
import NavBar from "./NavBar"
import type { RootState } from "../../store/Store";


function Home() {
  const user=useSelector((state:RootState)=>state.auth.user)

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-emerald-200 text-center py-12 shadow-sm">
        <img src={user?.profileImage || ""} className="w-24 h-24 mx-auto rounded-full mb-4 shadow-lg"/>
        <h2 className="text-3xl font-bold text-gray-800">Welcome, {user?.name || 'Guest'}!</h2>
        <p className="text-gray-600 mt-2">We are happy to see you.</p>
      </div>
    </>
  )
}

export default Home