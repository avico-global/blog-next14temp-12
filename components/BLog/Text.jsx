import React from "react";
import Container from "../../components/common/Container";
import Rightbar from "../../components/common/Rightbar";
import data from "../../jason/lifestyle.json";

export default function Text() {
  const element = data.slice(0, 4);
  return (
    <Container className="py-20">
      <div className="relative flex flex-col lg:flex-row gap-6 lg:gap-14">
        {/* text */}
        <div className="w-full lg:w-[77%]">
           <h1 className="text-4xl font-bold">Lorem Ipsum - Dummy Text</h1>
           <p className="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget velit nec felis ultrices vulputate. Integer a felis nec sapien consequat suscipit. Vivamus vestibulum, felis ac fringilla dignissim, nulla ligula gravida nulla, nec fermentum ex dui et nisl.</p>
           <p className="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget velit nec felis ultrices vulputate. Integer a felis nec sapien consequat suscipit. Vivamus vestibulum, felis ac fringilla dignissim, nulla ligula gravida nulla, nec fermentum ex dui et nisl.</p>
           <p className="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget velit nec felis ultrices vulputate. Integer a felis nec sapien consequat suscipit. Vivamus vestibulum, felis ac fringilla dignissim, nulla ligula gravida nulla, nec fermentum ex dui et nisl.</p>    
           <h2 className="text-3xl font-bold pt-10">Lorem Ipsum - Dummy Text</h2>    
           <p className="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget velit nec felis ultrices vulputate. Integer a felis nec sapien consequat suscipit. Vivamus vestibulum, felis ac fringilla dignissim, nulla ligula gravida nulla, nec fermentum ex dui et nisl.</p>
           <p className="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget velit nec felis ultrices vulputate. Integer a felis nec sapien consequat suscipit. Vivamus vestibulum, felis ac fringilla dignissim, nulla ligula gravida nulla, nec fermentum ex dui et nisl.</p>
           <p className="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget velit nec felis ultrices vulputate. Integer a felis nec sapien consequat suscipit. Vivamus vestibulum, felis ac fringilla dignissim, nulla ligula gravida nulla, nec fermentum ex dui et nisl.</p>
           <h3 className="text-2xl font-bold pt-10">Lorem Ipsum - Dummy Text</h3>
           <p className="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget velit nec felis ultrices vulputate. Integer a felis nec sapien consequat suscipit. Vivamus vestibulum, felis ac fringilla dignissim, nulla ligula gravida nulla, nec fermentum ex dui et nisl.</p>
           <p className="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget velit nec felis ultrices vulputate. Integer a felis nec sapien consequat suscipit. Vivamus vestibulum, felis ac fringilla dignissim, nulla ligula gravida nulla, nec fermentum ex dui et nisl.</p>
           <p className="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget velit nec felis ultrices vulputate. Integer a felis nec sapien consequat suscipit. Vivamus vestibulum, felis ac fringilla dignissim, nulla ligula gravida nulla, nec fermentum ex dui et nisl.</p>
           <h3 className="text-2xl font-bold pt-10">Lorem Ipsum - Dummy Text</h3>
           <p className="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget velit nec felis ultrices vulputate. Integer a felis nec sapien consequat suscipit. Vivamus vestibulum, felis ac fringilla dignissim, nulla ligula gravida nulla, nec fermentum ex dui et nisl.</p>
           <p className="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget velit nec felis ultrices vulputate. Integer a felis nec sapien consequat suscipit. Vivamus vestibulum, felis ac fringilla dignissim, nulla ligula gravida nulla, nec fermentum ex dui et nisl.</p>
           <p className="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget velit nec felis ultrices vulputate. Integer a felis nec sapien consequat suscipit. Vivamus vestibulum, felis ac fringilla dignissim, nulla ligula gravida nulla, nec fermentum ex dui et nisl.</p>
        </div>
        <div className="w-full lg:w-[23%]">
          <div className="sticky top-20">
            <div className="">
              <Rightbar
                data={element}
                hiddencategories={" "}
                hiddennumber={"hidden"}
                heading={"Most Viewed"}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
