import VideoCard from "./video-card"

const Tutorials = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <VideoCard
          videoId="heTxEsrPVdQ"
          title="Start a small farm"
          description="This is a description of the video, providing some context about the content."
        />
        <VideoCard
          videoId="buVwKU_mHOM"
          title="Learn truth about farming"
          description="This is a description of the video, providing some context about the content."
        />
        <VideoCard
          videoId="LGF33NN4B8U"
          title="Farming Science"
          description="This is a description of the video, providing some context about the content."
        />
        <VideoCard
          videoId="6_q_I5w8qOE"
          title="Learn Potato farming"
          description="This is a description of the video, providing some context about the content."
        />
      </div>
    </div>
  )
}

export default Tutorials