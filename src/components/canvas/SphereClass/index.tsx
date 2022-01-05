import { useEffect, useRef } from 'react'
import Artwork from './Artwork'

const SphereClassView: React.FC = () => {

  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const artwork = new Artwork(canvasRef.current, "#050505")
    artwork.init()
  }, [])

  return <div ref={canvasRef} style={{width: '100%', height: '100%'}}></div>
}

export default SphereClassView
