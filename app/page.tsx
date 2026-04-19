import fs from 'fs'
import path from 'path'
import { Image } from '@/lib/types'
import ImageGrid from '@/components/ImageGrid'

const IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|webp|gif|avif)$/i

function getGalleryImages(): Image[] {
  const galleryDir = path.join(process.cwd(), 'public', 'gallery')

  if (!fs.existsSync(galleryDir)) return []

  const folders = fs.readdirSync(galleryDir).filter((f) =>
    fs.statSync(path.join(galleryDir, f)).isDirectory()
  )

  return folders
    .map((folder, i) => {
      const folderPath = path.join(galleryDir, folder)
      const files = fs.readdirSync(folderPath)

      const imageFile = files.find((f) => IMAGE_EXTENSIONS.test(f))
      if (!imageFile) return null

      const promptPath = path.join(folderPath, 'prompt.txt')
      const prompt = fs.existsSync(promptPath)
        ? fs.readFileSync(promptPath, 'utf-8').trim()
        : folder

      return {
        id: i + 1,
        created_at: '',
        url: `/gallery/${folder}/${imageFile}`,
        prompt,
      }
    })
    .filter(Boolean) as Image[]
}

export default function Home() {
  const images = getGalleryImages()

  return (
    <>
      {/* <div className="dot-bg" /> */}
      <main style={{ padding: '48px 60px' }}>
        <div style={{ marginBottom: 40, textAlign: 'center' }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, margin: 0, letterSpacing: '-0.5px' }}>AI Gallery</h1>
          <p style={{ fontSize: 13, color: '#999', marginTop: 8 }}>Clicca un&apos;immagine per vedere il prompt</p>
        </div>
        <ImageGrid images={images} />
      </main>
    </>
  )
}
