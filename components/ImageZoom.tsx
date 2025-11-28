'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ZoomIn, ZoomOut, X } from 'lucide-react';

interface ImageZoomProps {
  src: string;
  alt: string;
  className?: string;
}

/**/ **
* Renders an image with clickable zoom behavior and accessible controls for opening and closing the enlarged view.
* @example
* ImageZoom({ src: '/assets/photo.jpg', alt: 'Product photo' })
* <JSX.Element>
* @param {{ImageZoomProps}} props - ImageZoom component props including src, alt, and optional className.
* @returns {{JSX.Element}} A React element containing the thumbnail and modal zoomed image overlays.
**/*/
export default function ImageZoom({ src, alt, className = '' }: ImageZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <div
        className={`relative cursor-zoom-in ${className}`}
        onClick={() => setIsZoomed(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsZoomed(true);
          }
        }}
        aria-label="Click to zoom image"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity flex items-center justify-center">
          <ZoomIn className="size-8 text-white opacity-0 hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {isZoomed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setIsZoomed(false);
            }
          }}
          aria-label="Close zoomed image"
        >
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors p-2"
            aria-label="Close"
          >
            <X className="size-6" />
          </button>
          <div className="relative max-w-7xl max-h-full size-full">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}

