'use client'
import React, { useState } from "react";

export default function SliderCard({
  components, // Danh sách các component (mảng các phần tử)
  totalSlide,
}: {
  components: React.ReactNode[]; // Mảng các React elements
  totalSlide: number;
}) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const nextSlide = () => {
    setCurrentSlide((prevIndex) =>
      prevIndex === totalSlide - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevIndex) =>
      prevIndex === 0 ? totalSlide - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className="slider-container"
      style={{ width: "70%", overflow: "hidden", position: "relative" }}
    >
      <div
        className="slider"
        style={{
          display: "flex",
          transform: `translateX(-${currentSlide * 100}%)`,
          transition: "transform 0.5s ease-in-out",
        }}
      >
        {components.map((component, index) => (
          <div key={index} style={{ minWidth: "100%" }}>
            {component}
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
      >
        &#10095;
      </button>
    </div>
  );
}
