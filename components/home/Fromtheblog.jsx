import React from "react";
import Container from "../common/Container";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Cards from "../common/Cards";
import Rightbar from "../common/Rightbar";
import data from "@/jason/rightbar.json";

export default function Fromtheblog() {
  const element = data.slice(0, 6);
  const element2 = data.slice(0, 3);
  return (
    <Container>
      <div className="flex justify-between items-center">
        <h3 className="text-3xl font-bold text-gray-700 py-10">Life style</h3>{" "}
        <Link
          href="/"
          className="bg-background3 flex items-center text-sm gap-2 py-1 px-4 rounded-full "
        >
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-6 lg:gap-14">
        <div className="md:w-[30%] lg:w-[23%] md:p-0 py-7  rounded-[5px]  ">
          <Rightbar
            data={element2}
            heading={"From the blog"}
            hiddennumber={"hidden"}
          />
        </div>
        <div className=" md:w-[70%] lg:w-[77%] flex flex-row gap-14">
          <Cards mdcol={2} lgcol={3} data={element} />
        </div>
      </div>
    </Container>
  );
}
