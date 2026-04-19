import { Image } from '@/lib/types'
import ImageCard from './ImageCard'

export default function ImageGrid({ images }: { images: Image[] }) {
  if (images.length === 0) {
    return <p style={{ textAlign: 'center', color: '#999', fontSize: 14 }}>Nessuna immagine trovata.</p>
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  )
}
