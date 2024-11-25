import Link from "next/link"

const Simulation = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl text-teal-500 font-semibold">Learn Farming by simulation</h2>
      <p className="text-sm mt-2 max-w-[600px] text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, ratione quisquam consequuntur architecto dolore at sapiente fugiat asperiores natus unde.</p>
      <Link href={'/simulate'} className="mt-4 px-3 py-2 bg-teal-400 rounded-md hover:bg-teal-450 shadow-md">
        Simulate Now
      </Link>
    </div>
  )
}

export default Simulation