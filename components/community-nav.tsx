import { Plus } from "lucide-react";
import Link from "next/link";

const CommunityNav = () => {
  return (
    <div className='w-full bg-slate-100 px-4 py-4 flex justify-center'>
      <div className='max-w-6xl w-full flex justify-between'>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Community <span className='text-purple-450'>Forum</span></h1>
        </div>
        <Link href={'/community/create'}>
          <button className='flex items-center gap-2 text-sm bg-transparent text-purple-450 border-2 hover:bg-purple-450 hover:text-black border-purple-450 shadow-md hover:shadow-lg transition duration-300 px-3 py-2 rounded-md'><Plus /> Create Post</button>
        </Link>
      </div>
    </div>
  )
}

export default CommunityNav