import React from "react";
import Article from "./Article";
import Container from "../../common/Container";
import Link from "next/link";
import data from "@/jason/lifestyle";
import Populardata from "@/jason/popular";
export default function Footer() {
  const element = data.slice(0, 2);
  const element3 = Populardata.slice(0, 2);
  const categories = ["Life style", "Travel", "Art and Design", "Beauty"];
  return (
    <Container className="py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* popular */}
        <div className="pb-10 md:pb-0">
          <h3 className="text-xl font-bold">You might like</h3>
          <h4 className="text-sm font-bold text-gray-500 pb-6">
            Our favourites
          </h4>
          <Article data={element} />
        </div>

        {/* latest */}
        <div className="pb-10 md:pb-0">
          <h3 className="text-xl font-bold">You might like</h3>
          <h4 className="text-sm font-bold text-gray-500 pb-6">
            Our favourites
          </h4>
          <Article data={element} />
        </div>

        {/* most viewed */}
        <div className="pb-10 md:pb-0">
          <h3 className="text-xl font-bold">You might like</h3>
          <h4 className="text-sm font-bold text-gray-500 pb-6">
            Our favourites
          </h4>
          <Article data={element3} />
        </div>

        {/* categories */}
        <div className="ml-6 flex flex-col gap-[10px] text-left  bg-gray-100 rounded-[5px] p-5">
          <h3 className="text-xl font-bold">Help & Info</h3>
          {categories.map((category, index) => (
            <div className="border-b pb-[10px]">
              <Link href={`/${category}`} key={index}>
                {category}
              </Link>
            </div>
          ))}
          <h3 className="border-b pb-2  text-xl font-bold">Subscribe</h3>
        </div>
      </div>
    </Container>
  );
}
