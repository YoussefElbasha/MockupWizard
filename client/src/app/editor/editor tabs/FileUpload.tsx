import { useRef } from 'react'
import { Cloudinary } from '@cloudinary/url-gen'
import { Images } from 'react-ionicons'
import axios from 'axios'

interface FileUploadProps {
  onClick(): void
}

const FileUpload = ({ onClick }: FileUploadProps) => {
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

    console.log(res.data)

    console.log(res.data.url)

    event.target.value = ''
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
