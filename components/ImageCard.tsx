'use client'

import { useState } from 'react'
import NextImage from 'next/image'
import { Image } from '@/lib/types'

export default function ImageCard({ image }: { image: Image }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [hovered, setHovered] = useState(false)

  function copy() {
    navigator.clipboard.writeText(image.prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative', aspectRatio: '1 / 1', cursor: 'pointer',
          overflow: 'hidden', borderRadius: 12, background: '#f0f0f0',
          transform: hovered ? 'scale(1.03)' : 'scale(1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          boxShadow: hovered
            ? '0 0 24px 8px rgba(66,153,225,0.5), 0 12px 40px rgba(0,0,0,0.1)'
            : 'none',
        }}
      >
        <NextImage
          src={image.url}
          alt={image.prompt}
          fill
          sizes="33vw"
          style={{ objectFit: 'cover', transition: 'transform 0.4s ease', transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
        />
        {hovered && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)',
            display: 'flex', alignItems: 'flex-end', padding: 14,
          }}>
            <p style={{ margin: 0, fontSize: 12, color: '#fff', lineHeight: 1.5,
              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {image.prompt}
            </p>
          </div>
        )}
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 50,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', padding: 16,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: 420, borderRadius: 20,
              background: '#fff', overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }}
          >
            <div style={{ position: 'relative', aspectRatio: '1 / 1', width: '100%' }}>
              <NextImage src={image.url} alt={image.prompt} fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: '#333', margin: 0 }}>{image.prompt}</p>
              <button
                onClick={copy}
                style={{
                  padding: '10px 16px', borderRadius: 10, border: 'none', cursor: 'pointer',
                  fontSize: 13, fontWeight: 600,
                  background: copied ? '#22c55e' : '#3b82f6',
                  color: '#fff',
                  transition: 'all 0.2s',
                }}
              >
                {copied ? '✓ Copiato!' : 'Copia prompt'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
