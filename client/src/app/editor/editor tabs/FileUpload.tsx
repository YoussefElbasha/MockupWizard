import { useRef } from 'react'
import { Cloudinary } from '@cloudinary/url-gen'
import { Images } from 'react-ionicons'
import axios from 'axios'
import { useCanvasContext } from '../contexts/canvas-context'
import { set } from 'react-hook-form'

interface FileUploadProps {
  onClick(): void
}

const FileUpload = ({ onClick }: FileUploadProps) => {
  const { setDesigns, canvasObjects } = useCanvasContext()

  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    onClick()
    inputRef.current?.click()
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const image = event.target.files?.[0]

    if (!image) return

    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', 'model_designs')

    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/dfbid2goy/image/upload',
      formData
    )

    event.target.value = ''

    console.log(res.data)

    const path = res.data.url.replace('http://res.cloudinary.com/', '/image/')

    setDesigns((prev: any) => [
      ...canvasObjects,
      {
        url: path,
        top: 0,
        left: 0,
        scale: 100,
        rotation: 0,
      },
    ])

    //   setDesigns((prev: any) => [
    //     canvasObjects.map((obj: any, index: any) => {
    //       return {
    //         url: prev[index].url,
    //         top: obj.top,
    //         left: obj.left,
    //         scale: obj.scaleX,
    //         rotation: obj.angle,
    //       }
    //     }),
    //     {
    //       url: path,
    //       top: 0,
    //       left: 0,
    //       scale: 2,
    //       rotation: 0,
    //     },
    //   ])
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        hidden
        onChange={handleFileChange}
        accept="image/jpeg, image/png"
        max={1}
      />
      <button
        className="bg-white p-2 rounded-full w-[3.5em] h-[3.5em] drop-shadow-lg"
        onClick={handleClick}
      >
        <div className="translate-x-[0.20em] hover:scale-[1.1] transition-all ease-in-out duration-300">
          <Images style={{ fill: 'black', height: '2em', width: '2em' }} />
        </div>
      </button>
    </div>
  )
}

export default FileUpload
