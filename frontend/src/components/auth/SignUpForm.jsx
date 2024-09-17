import { useState } from 'react'
import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"
import { toast } from "react-hot-toast"
import { Loader } from "lucide-react"
const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signupMutation, isLoading } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/auth/signup", data)
      return res.data
    },
    onSuccess: () => {
      toast.success("Cadastro feito com sucesso!")
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Ocorreu ume erro");
    }
  })
  const handleSignUp = (e) => {
    e.preventDefault()
    signupMutation({ name, username, email, password })
  }
  return (
    <form onSubmit={handleSignUp} className='flex flex-col gap-4' >
      <input
        type='text'
        placeholder='Nome'
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='input input-bordered w-full'
        required
      />
      <input
        type='text'
        placeholder='Usuário'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='input input-bordered w-full'
        required
      />
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='input input-bordered w-full'
        required
      />
      <input
        type='password'
        placeholder='Senha (+ de 6 caracteres)'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='input input-bordered w-full'
        required
      />

      <button type='submit' className='btn btn-primary w-full text-white'>
        {isLoading ? <Loader className='size-5 animate-spin' /> : "Aceite e cadastre-se"}
      </button>
    </form>
  )
}

export default SignUpForm