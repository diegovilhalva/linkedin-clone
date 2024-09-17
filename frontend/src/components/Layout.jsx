
import { useQuery } from '@tanstack/react-query'
import Navbar from './Navbar'

const Layout = ({ children }) => {
    const { data: authUser, isLoading } = useQuery({queryKey:["authUser"]})

    
    return (
        <div className="min-h-screen bg-base-100">
            <Navbar />
            <main className="max-w-7xl mx-auto px-45 py-6">
                {children}
            </main>
        </div>
    )
}

export default Layout