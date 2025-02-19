import React from "react";
import Image from "next/image";
import Container from "../../common/Container";
import Link from "next/link";

export default function Banner({data}) {
  return (
    <Container className="pt-20">
      <div className="rounded-[5px]  bg-background1  flex flex-col md:flex-row justify-between my-4 h-[screen]  md:h-[600px]">
        <Link href={`/${data.category} /${data.title}`} className="w-full md:w-1/2   ">
          <Image
            src={data.image}  
            alt="hero"
            width={600}
            height={500}
            className="object-covers h-full w-full"
          />
        </Link>
        <div className="w-full  md:w-1/2 py-7 md:py-16  px-6 flex justify-between flex-col gap-5">
          <div className="flex justify-between text-lg leading-5 flex-col  text-gray-700">
            <h3>by {data.postby}</h3>
            <h3>{data.date}</h3>
          </div>
          <h2 className="text-3xl leading-9 md:text-[60px] md:leading-[55px] pr-0 md:pr-24 text-gray-700 font-bold">
            {data.title}
          </h2>
          <Link
            href={`/${data.category}`}
            className="text-gray-700 bg-white px-4 py-2 rounded-[4px] inline-block w-fit "
          >
            {data.category}
          </Link>
        </div>
      </div>
    </Container>
  );
}
