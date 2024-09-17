import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { axiosInstance } from "../lib/axios"
import {  Bell, Home, LogOut, User, Users } from "lucide-react"
import { Link } from "react-router-dom"


const Navbar = () => {

  const { data: authUser } = useQuery({
    queryKey: ["authUser"]
  })

  const queryClient = useQueryClient()


  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => axiosInstance.get("/notifications"),
    enabled: !!authUser,
  })

  const { data: connectionRequests } = useQuery({
    queryKey: ["connectionRequests"],
    queryFn: async () => axiosInstance.get("/connections/requests"),
    enabled: !!authUser,
  })

  const { mutate: logout } = useMutation({
    mutationFn: () => axiosInstance.post("/auth/logout"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const unreadNotificationCount = notifications?.data.filter((notif) => !notif.read).length
	const unreadConnectionRequestsCount = connectionRequests?.data?.length


  return (
    <nav className='bg-secondary shadow-md sticky top-0 z-10'>
    <div className='max-w-7xl mx-auto px-4'>
      <div className='flex justify-between items-center py-3'>
        <div className='flex items-center space-x-4'>
          <Link to='/'>
            <img className='h-8 rounded' src='/small-logo.png' alt='LinkedIn' />
          </Link>
        </div>
        <div className='flex items-center gap-2 md:gap-6'>
          {authUser ? (
            <>
              <Link to={"/"} className='text-neutral flex flex-col items-center'>
                <Home size={20} />
                <span className='text-xs hidden md:block'>Início</span>
              </Link>
              <Link to='/network' className='text-neutral flex flex-col items-center relative'>
                <Users size={20} />
                <span className='text-xs hidden md:block'>Minha rede</span>
                {unreadConnectionRequestsCount > 0 && (
                  <span
                    className='absolute -top-1 -right-1 md:right-4 bg-blue-500 text-white text-xs 
                  rounded-full size-3 md:size-4 flex items-center justify-center'
                  >
                    {unreadConnectionRequestsCount}
                  </span>
                )}
              </Link>
              <Link to='/notifications' className='text-neutral flex flex-col items-center relative'>
                <Bell size={20} />
                <span className='text-xs hidden md:block'>Notificações</span>
                {unreadNotificationCount > 0 && (
                  <span
                    className='absolute -top-1 -right-1 md:right-4 bg-blue-500 text-white text-xs 
                  rounded-full size-3 md:size-4 flex items-center justify-center'
                  >
                    {unreadNotificationCount}
                  </span>
                )}
              </Link>
              <Link
                to={`/profile/${authUser.username}`}
                className='text-neutral flex flex-col items-center'
              >
                <User size={20} />
                <span className='text-xs hidden md:block'>Eu</span>
              </Link>
              <button
                className='flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800'
                onClick={() => logout()}
              >
                <LogOut size={20} />
                <span className='hidden md:inline'>Sair</span>
              </button>
            </>
          ) : (
            <>
              <Link to='/login' className='btn btn-ghost'>
                Entrar
              </Link>
              <Link to='/signup' className='btn btn-primary'>
                Cadastrar
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  </nav>
  )
}

export default Navbar