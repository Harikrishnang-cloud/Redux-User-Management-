import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Api } from "../Api/userApi"
import { login } from "../store/user/AuthSlice"



function useRefreshUser () {
  const dispatch=useDispatch()

  useEffect(()=>{
    const refreshUser=async()=>{
        try {
            const res=await Api.get('/user/refresh')
            dispatch(login(res.data.user))
        } catch (error:unknown) {
            if(error instanceof Error)
            console.log("No active session", error.message)
        }
    }
    refreshUser()
  },[dispatch])
}

export default useRefreshUser 