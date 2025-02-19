import React from "react";
import data from "@/jason/latest.json";
import Container from "../common/Container";
import Rightbar from "../common/Rightbar";
import Cards from "../common/Cards";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import rightbardata from "@/jason/rightbar.json";

export default function Latest() {
  const element2 = rightbardata.slice(0, 4);
  return (
    <div>
      <Container>
        <div className="flex justify-between items-center">
          <h3 className="text-3xl font-bold text-gray-700 py-10">Latest</h3>{" "}
          <Link
            href="/"
            className="bg-background1 flex items-center text-sm gap-2 py-1 px-4 rounded-full "
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-14">
          <div className=" w-full lg:w-[77%]  flex flex-row gap-14">
            <Cards mdcol={2} lgcol={2} data={data} />
          </div>
          <div className="w-full lg:w-[23%]">
            <Rightbar data={element2} hiddencategories={"hidden"} hiddenimage={"hidden"} heading={"Most Viewed"} />
          </div>
        </div>
      </Container>
    </div>
  );
}
