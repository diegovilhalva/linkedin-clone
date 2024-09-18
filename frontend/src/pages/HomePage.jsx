import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { axiosInstance } from '../lib/axios'
import toast from "react-hot-toast"
import Sidebar from '../components/Sidebar'
import PostCreation from '../components/PostCreation'
import Post from '../components/Post'
import { Users } from 'lucide-react'
const HomePage = () => {

  const { data: authUser } = useQuery({ queryKey: ["authUser"] })

  const { data: recommendedUsers } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/users/suggestions")
        return res.data
      } catch (error) {
        toast.error(error.response.data.message || "Ocorreu um erro")
      }
    }
  })

  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/posts");
      return res.data;
    },
  });
  console.log(posts)
  console.log(recommendedUsers)
  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
      <div className="hidden lg:block lg:col-span-1">
        <Sidebar user={authUser} />
      </div>
      <div className="col-span-1 lg:col-span-2 order-first lg:order-none">
        <PostCreation user={authUser} />
        {posts?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
        {posts?.length === 0 && (
          <div className='bg-white rounded-lg shadow p-8 text-center'>
            <div className='mb-6'>
              <Users size={64} className='mx-auto text-blue-500' />
            </div>
            <h2 className='text-2xl font-bold mb-4 text-gray-800'>Ainda não há publicações</h2>
            <p className='text-gray-600 mb-6'>Conecte-se com outras pessoas para começar a ver publicações no seu feed!</p>

          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage