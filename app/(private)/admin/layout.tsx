import { ReactNode } from "react"
import Sidebar from "../../../components/sidebar"

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex gap-2">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 ml-72 z-10 min-h-screen">
        {children}
      </div>
    </div>
  )
}

export default AdminLayout