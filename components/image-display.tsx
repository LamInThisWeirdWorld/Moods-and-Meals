'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import right_arrow from '../public/fi-sr-angle-right.svg';
import left_arrow from '../public/fi-sr-angle-left.svg';
import matcha from '../public/matcha.jpg';
import priceTag from '../public/price_tag.svg';

const ImagesDisplay = ({ images, price }: { images: any[]; price: number }) => {
  const [display, setDisplay] = useState(0);

  const moveRight = () => {
    if (display < images.length - 1) {
      setDisplay((display + 1) % images.length);
    }

    console.log(display);
  };

  const moveLeft = () => {
    if (display > 0) {
      setDisplay((display - 1) % images.length);
    }

    console.log(display);
  };

  return (
    <div className="relative mt-5 flex flex-col gap-5">
      {/* showing image */}
      <div className="flex flex-row gap-2">
        <Image
          src={left_arrow}
          alt="lefr-arrow"
          onClick={moveLeft}
          className="cursor-pointer"
        />
        <div className="relative flex items-center justify-center">
          <div className="h-110 w-110 bg-[#F0E7D5]">
            <div className="absolute inset-0 m-auto flex h-105 w-105">
              <Image
                src={images.length > 0 ? images[display].image_url : matcha}
                alt="pic"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        {/* RIGHT ARROW */}
        <Image
          src={right_arrow}
          alt="right-arrow"
          onClick={moveRight}
          className="cursor-pointer"
        />
      </div>

      <div className="absolute top-100 left-80 flex w-50 items-center justify-center">
        <Image src={priceTag} alt="price" />
        <span className="font-jersey15 absolute ml-8 text-4xl text-[#F0E7D5]">
          ${price}
        </span>
      </div>

      {/* other images */}
      <div className="ml-9 flex flex-row gap-4">
        {images && images.length > 0 ? (
          images.map((image, index) => (
            <div
              key={image.id ?? index}
              className="relative h-20 w-20 bg-[#F0E7D5]"
            >
              <div className="absolute inset-0 m-auto flex h-18 w-18">
                <Image
                  src={image.image_url}
                  alt="pic"
                  fill
                  className="cursor-pointer object-cover"
                  onClick={() => setDisplay(index)}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="relative h-20 w-20 bg-[#F0E7D5]">
            <div className="absolute inset-0 m-auto flex h-18 w-18">
              <Image
                src={matcha} // placeholder
                alt="placeholder"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagesDisplay;
