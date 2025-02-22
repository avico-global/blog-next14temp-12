import React from "react";
import Image from "next/image";
import Container from "../../common/Container";

export default function Banner({ myblog, imagePath }) {
  return (
    <Container className="pt-20">
      <div className="rounded-xl bg-background1 flex flex-col md:flex-row justify-between my-4 min-h-[400px] md:h-[600px] overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl">
        <div className="w-full md:w-1/2 relative overflow-hidden group">
          <Image
            src={`${imagePath}/${myblog?.file_name}`}
            alt={
              myblog?.value.imageAltText ||
              myblog?.value?.tagline ||
              "No Banner Found"
            }
            title={
              myblog?.value.imageTitle || myblog?.value.title || "Banner Image"
            }
            width={600}
            height={500}
            className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-110"
            priority
          />
        </div>
        <div className="w-full md:w-1/2 py-8 md:py-16 px-8 flex justify-between flex-col gap-8 bg-gradient-to-br ">
          <h1
            className="text-4xl leading-tight md:text-[60px] md:leading-[1.1] pr-0 md:pr-24 text-gray-800 font-bold hover:text-gray-700 transition-colors duration-300"
            title={myblog?.value.title}
          >
            {myblog?.value.title}
          </h1>
          <p
            className="text-gray-700 bg-white px-6 py-4 rounded-lg inline-block w-fit hover:bg-gray-50 transition-all duration-300 font-medium shadow-md hover:shadow-lg cursor-pointer"
            title={myblog?.value.tagline}
          >
            {myblog?.value.tagline}
          </p>
        </div>
      </div>
    </Container>
  );
}
