import { BoxIcon, ShoppingBag, ShoppingBasket, ShoppingCart } from 'lucide-react'
import React from 'react'

const ManageProducts = () => {
  return (
      <section className="main-content w-full px-6">
        <div className="my-6 px-2">
          <div className="flex items-start gap-6 flex-wrap">
            <div
              className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-6 w-full max-w-sm rounded-lg overflow-hidden">
              <div className="inline-block bg-[#edf2f7] rounded-lg py-2 px-3">
                <ShoppingBag />
              </div>

              <div className="mt-4">
                <h3 className="text-xl font-bold text-gray-800">Products overview</h3>
                <p className="mt-2 text-sm text-gray-800">Lorem ipsum dolor sit amet, consectetur.</p>
              </div>

              <div className="mt-6">
                <div className="flex mb-2">
                  <p className="text-sm text-gray-800 flex-1">25 GB</p>
                  <p className="text-sm text-gray-800">50 GB</p>
                </div>
                <div className="bg-gray-300 rounded-full w-full h-2.5">
                  <div className="w-1/2 h-full rounded-full bg-blue-600 flex items-center">
                  </div>
                </div>
              </div>
            </div>
            <div
              className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-6 w-full max-w-sm rounded-lg overflow-hidden">
              <div className="inline-block bg-[#edf2f7] rounded-lg py-2 px-3">
                <ShoppingBasket />
              </div>

              <div className="mt-4">
                <h3 className="text-xl font-bold text-gray-800">Products summary</h3>
                <p className="mt-2 text-sm text-gray-800">Lorem ipsum dolor sit amet, consectetur.</p>
              </div>

              <div className="mt-6">
                <div className="flex mb-2">
                  <p className="text-sm text-gray-800 flex-1">25 GB</p>
                  <p className="text-sm text-gray-800">50 GB</p>
                </div>
                <div className="bg-gray-300 rounded-full w-full h-2.5">
                  <div className="w-1/2 h-full rounded-full bg-blue-600 flex items-center">
                  </div>
                </div>
              </div>
            </div>
            <div
              className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-6 w-full max-w-sm rounded-lg overflow-hidden">
              <div className="inline-block bg-[#edf2f7] rounded-lg py-2 px-3">
                <ShoppingCart />
              </div>

              <div className="mt-4">
                <h3 className="text-xl font-bold text-gray-800">Product Managing</h3>
                <p className="mt-2 text-sm text-gray-800">Lorem ipsum dolor sit amet, consectetur.</p>
              </div>

              <div className="mt-6">
                <div className="flex mb-2">
                  <p className="text-sm text-gray-800 flex-1">25 GB</p>
                  <p className="text-sm text-gray-800">50 GB</p>
                </div>
                <div className="bg-gray-300 rounded-full w-full h-2.5">
                  <div className="w-1/2 h-full rounded-full bg-blue-600 flex items-center">
                  </div>
                </div>
              </div>
            </div>
            <div
              className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-6 w-full max-w-sm rounded-lg overflow-hidden">
              <div className="inline-block bg-[#edf2f7] rounded-lg py-2 px-3">
                <BoxIcon />
              </div>

              <div className="mt-4">
                <h3 className="text-xl font-bold text-gray-800">Parcel Management</h3>
                <p className="mt-2 text-sm text-gray-800">Lorem ipsum dolor sit amet, consectetur.</p>
              </div>

              <div className="mt-6">
                <div className="flex mb-2">
                  <p className="text-sm text-gray-800 flex-1">25 GB</p>
                  <p className="text-sm text-gray-800">50 GB</p>
                </div>
                <div className="bg-gray-300 rounded-full w-full h-2.5">
                  <div className="w-1/2 h-full rounded-full bg-blue-600 flex items-center">
                  </div>
                </div>
              </div>
            </div>
            <div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default ManageProducts