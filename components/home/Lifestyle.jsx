import React from "react";
import Container from "../common/Container";
import Cards from "../common/Cards";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import data from "@/jason/lifestyle.json";
import rightbardata from "@/jason/rightbar.json";
import Rightbar from "../common/Rightbar";

export default function Lifestyle({
  articles,
  categories,
  imagePath,
  blog_list,
}) {
  const element = data.slice(0, 3);
  const element2 = rightbardata.slice(0, 3);
  return (
    <Container>
      <div className="flex justify-between items-center">
        <h3 className="text-3xl font-bold text-gray-700 py-10">Life style</h3>{" "}
        <Link
          href="/"
          className="bg-background1 flex items-center text-sm gap-2 py-1 px-4 rounded-full "
        >
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-14">
        <div className=" w-full lg:w-[77%]">
          
          <Cards mdcol={3} lgcol={3} data={element} />
        </div>
        <div className="w-full lg:w-[23%] bg-gray-100 p-7 rounded-[5px] ">
          <Rightbar
            
            articles={articles}
               categories={categories}
               imagePath={imagePath}
                heading="Editors Choice"

          />
        </div>
      </div>
    </Container>
  );
}
