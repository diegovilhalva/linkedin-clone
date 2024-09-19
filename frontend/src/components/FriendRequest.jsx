import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const FriendRequest = ({ request }) => {
    const queryClient = useQueryClient()
    const { mutate: acceptConnectRequest } = useMutation({
        mutationFn: (requestId) => axiosInstance.put(`/connections/accept/${requestId}`),
        onSuccess: () => {
            toast.success("Solicitação de conexão aceita")
            queryClient.invalidateQueries({ queryKey: ["connectionRequests"] })
        },
        onError: (error) => {
            toast.error(error.response.data.error)
        }
    })

    const { mutate: rejectConnectionRequest } = useMutation({
        mutationFn: (requestId) => axiosInstance.put(`/connections/reject/${requestId}`),
        onSuccess: () => {
            toast.success("solicitação de conexão rejeitada");
            queryClient.invalidateQueries({ queryKey: ["connectionRequests"] });
        },
        onError: (error) => {
            toast.error(error.response.data.error);
        },
    });

    return (
        <div className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-center justify-between transition-all hover:shadow-md space-y-4 sm:space-y-0">
            <div className="flex items-center gap-4">
                <Link to={`/profile/${request.sender.username}`}>
                    <img
                        src={request.sender.profilePicture || "/avatar.png"}
                        alt={request.sender.name}
                        className='w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover'
                    />
                </Link>
                <div>
                    <Link to={`/profile/${request.sender.username}`} className='font-semibold text-lg'>
                        {request.sender.name}
                    </Link>
                    <p className='text-gray-600 text-sm sm:text-base'>{request.sender.headline}</p>
                </div>
            </div>
            <div className="flex space-x-2">
                <button
                    className='bg-primary text-white px-3 py-2 sm:px-4 sm:py-2 rounded-md hover:bg-primary-dark transition-colors text-sm sm:text-base'
                    onClick={() => acceptConnectRequest(request._id)}
                >
                    Aceitar
                </button>
                <button
                    className='bg-gray-200 text-gray-800 px-3 py-2 sm:px-4 sm:py-2 rounded-md hover:bg-gray-300 transition-colors text-sm sm:text-base'
                    onClick={() => rejectConnectionRequest(request._id)}
                >
                    Rejeitar
                </button>
            </div>
        </div>
    )
}

export default FriendRequest
