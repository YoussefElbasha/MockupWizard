import axios from 'axios'
import { MutableRefObject, forwardRef, useRef } from 'react'
import { Camera } from 'react-ionicons'
import { useScreenshot, createFileName } from 'use-react-screenshot'

interface ScreenshotProps {
  onClick(): void
}

const Screenshot = forwardRef<HTMLCanvasElement, ScreenshotProps>(
  (props, ref) => {
    const screenShotRef = ref as MutableRefObject<HTMLCanvasElement>
    const [image, takeScreenshot] = useScreenshot()

    const download = (image: any, { name = 'img', extension = 'jpg' } = {}) => {
      const a = document.createElement('a')
      a.href = image
      a.download = createFileName(extension, name)
      a.click()
    }

    const uploadScreenshot = async (
      image: any,
      { name = 'img', extension = 'jpg' } = {}
    ) => {
      const formData = new FormData()
      formData.append('file', image)
      formData.append('upload_preset', 'project_screenshots')

      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dfbid2goy/image/upload',
        formData
      )
      const path = res.data.url.replace('http://res.cloudinary.com/', '/image/')

      console.log(res.data.secure_url)
    }

    const handleClick = () => {
      props.onClick()
      if (screenShotRef !== null) {
        takeScreenshot(screenShotRef.current).then(uploadScreenshot)
      }
    }

    return (
      <div>
        <button
          onClick={handleClick}
          className="bg-white p-2 rounded-full w-[3.5em] h-[3.5em] drop-shadow-lg"
        >
          <div className="translate-x-[0.20em] hover:scale-[1.1] transition-all ease-in-out duration-300">
            <Camera style={{ fill: 'black', height: '2em', width: '2em' }} />
          </div>
        </button>
      </div>
    )
  }
)

Screenshot.displayName = 'Screenshot'

export default Screenshot
