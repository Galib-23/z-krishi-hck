import React from 'react'

const VideoCard = ({ videoId, title, description }: any) => {
  return (
    <div className="w-80 mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="mt-2 text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  )
}

export default VideoCard