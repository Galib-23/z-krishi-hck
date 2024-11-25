import Image from "next/image"

const Testimonials = () => {
  return (
    <div className="p-4 font-[sans-serif]">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl font-extrabold text-gray-800">Testimonials</h2>
        <p className="text-sm mt-6 leading-relaxed text-gray-800">Veniam proident aute magna anim excepteur et ex consectetur velit ullamco veniam minim aute sit. Elit occaecat officia et laboris Lorem minim. Officia do aliqua adipisicing ullamco in</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex">
            <Image alt="image" height={100} width={100} src='https://readymadeui.com/profile_2.webp' className="w-10 h-10 rounded-full" />
            <div className="ml-4 text-left">
              <p className="text-sm font-bold text-gray-800">John Doe</p>
              <p className="text-xs text-gray-400 mt-0.5">johndoe23@gmail.com</p>
            </div>
          </div>

          <div className="col-span-2">
            <p className="text-sm leading-relaxed text-gray-800">The service was amazing. I never had to wait that long for my food. The staff was friendly and attentive, and the delivery was impressively prompt.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex">
            <Image alt="image" height={100} width={100} src='https://readymadeui.com/profile_3.webp' className="w-10 h-10 rounded-full" />
            <div className="ml-4 text-left">
              <p className="text-sm font-bold text-gray-800">Mark Adair</p>
              <p className="text-xs text-gray-400 mt-0.5">mark23@gmail.com</p>
            </div>
          </div>

          <div className="col-span-2">
            <p className="text-sm leading-relaxed text-gray-800">Veniam proident aute magna anim excepteur et ex consectetur velit ullamco veniam minim aute sit. Elit occaecat officia et laboris Lorem minim. Officia do aliqua adipisicing ullamco in Veniam proident aute magna anim excepteur et ex consectetur velit ullamco veniam minim aute sit.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex">
            <Image alt="image" height={100} width={100} src='https://readymadeui.com/profile_4.webp' className="w-10 h-10 rounded-full" />
            <div className="ml-4 text-left">
              <p className="text-sm font-bold text-gray-800">Simon Konecki</p>
              <p className="text-xs text-gray-400 mt-0.5">simon23@gmail.com</p>
            </div>
          </div>

          <div className="col-span-2">
            <p className="text-sm leading-relaxed text-gray-800">The service was amazing. I never had to wait that long for my food. The staff was friendly and attentive, and the delivery was impressively prompt.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonials