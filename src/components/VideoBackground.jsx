import React, { useEffect, useRef } from 'react'

const VideoBackground = ({ className }) => {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8 // Slightly slower playback for better visual effect
    }
  }, [])

  return (
    <div className={`relative overflow-hidden ${className || ''}`}>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://file.garden/aPuNvU9PkXWKuLlQ/tk1kx5.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/40 to-green-800/30"></div>
    </div>
  )
}

export default VideoBackground
