"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images, name, badge }) {
  const imageList = images && images.length > 0 ? images : ["/products/iphone-16-pro.jpg"];
  const [selectedImage, setSelectedImage] = useState(imageList[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image View */}
      <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-50/70 p-8 shadow-inner">
        {badge && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-[#0b1220] px-3 py-1.5 text-xs font-bold text-white shadow-md">
            {badge}
          </span>
        )}

        <div className="relative h-full w-full">
          <Image
            src={selectedImage}
            alt={name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-2 transition duration-500 hover:scale-105"
          />
        </div>
      </div>

      {/* Gallery Thumbnails */}
      {imageList.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {imageList.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedImage(img)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 bg-slate-50 p-2 transition ${
                selectedImage === img
                  ? "border-blue-600 shadow-md ring-2 ring-blue-500/20"
                  : "border-slate-200 opacity-70 hover:border-slate-300 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${name} thumbnail ${idx + 1}`}
                fill
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
