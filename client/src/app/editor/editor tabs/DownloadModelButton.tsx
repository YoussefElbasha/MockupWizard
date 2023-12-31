import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../../../components/Hover'
import { Download } from 'react-ionicons'
import {  } from '../contexts/canvas-context'
import { MutableRefObject, forwardRef } from 'react'
import { Mesh } from 'three'
import { GLTFExporter } from 'three-stdlib'

const DownloadModelButton = forwardRef<Mesh>((_props, ref) => {
  const exporter = new GLTFExporter()
  const meshRef = ref as MutableRefObject<Mesh>

  const handleClick = () => {
    if (meshRef.current) {
      exporter.parse(
        meshRef.current,
        (gltf) => {
          const link = document.createElement('a')
          link.style.display = 'none'
          document.body.appendChild(link)

          if (gltf instanceof ArrayBuffer) {
            link.href = URL.createObjectURL(
              new Blob([gltf], { type: 'application/octet-stream' })
            )
            link.download = 'scene.glb'
            link.click()
          }
        },
        (error) => {
          console.log(error)
        },
        { binary: true }
      )
    }
  }

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <button
              className="bg-white p-2 rounded-full w-[3.5em] h-[3.5em] drop-shadow-lg"
              onClick={() => handleClick()}>
              <div className="translate-x-[0.20em] hover:scale-[1.1] transition-all ease-in-out duration-300">
                <Download
                  style={{ fill: 'black', height: '2em', width: '2em' }}
                />
              </div>
            </button>
          </div>
        </TooltipTrigger>
        <TooltipContent
          sideOffset={-45}
          alignOffset={75}
          align="start"
          avoidCollisions={false}>
          <p>Download Model</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
})

DownloadModelButton.displayName = 'DownloadModelButton'

export default DownloadModelButton
