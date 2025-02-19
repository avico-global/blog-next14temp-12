import React from "react";
import Cards from "../common/Cards";
import data from "@/jason/popular.json";
import Container from "../common/Container";
import { ChevronRight } from "lucide-react";

import Link from "next/link";
export default function Popular() {
  const element = data.slice(0, 3);
  return (
    <Container>
      <div className="flex justify-between items-center">
        <h3 className="text-3xl font-bold text-gray-700 py-10">Popular</h3>{" "}
        <Link
          href="/"
          className="bg-background1 flex items-center text-sm gap-2 py-1 px-4 rounded-full "
        >
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <Cards mdcol={3} lgcol={3} data={element} />
    </Container>
  );
}
