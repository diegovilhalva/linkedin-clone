import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import SignUpPage from "./pages/auth/SignUpPage"
import LoginPage from "./pages/auth/LoginPage"
import HomePage from "./pages/HomePage"
import toast, { Toaster } from "react-hot-toast"
import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "./lib/axios"


function App() {

  const {data:authUser} = useQuery({
    queryKey:["authUser"],
    queryFn:async () => {
      try {
        const res= await axiosInstance.get("/auth/me")
        return res.data
      } catch (error) {
          if (error.response && error.response.status  === 401) {
            return null
          }        
          toast.error(error.response.data.message || "Ocorreu um erro")
      }
    }
  })

  console.log(authUser)
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Toaster />
    </Layout>
  )
}

export default App
