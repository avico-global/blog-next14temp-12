import React from 'react'
import { useRouter } from 'next/router';
import BlogGrid from '@/components/categoriy/BlogGrid';
import Container from '../../components/common/Container';
import Navbar from '../../components/container/navbar/Navbar';
import Footer from '../../components/container/footer/Footer';
import Rightbar from '../../components/common/Rightbar';
import element from '../../jason/rightbar.json';
export default function index() {
  const router = useRouter();
  const { categories } = router.query;
  const data = element.slice(0, 3);
  return (
    <>
      <Navbar />
      <Container>
        <div className="pt-20 grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-12">
          <div className='flex flex-col gap-6 md:gap-9 lg:gap-12 col-span-1  md:col-span-2 lg:col-span-3'>
            <div className='flex flex-col gap-4'>
              <h2 className="text-5xl md:text-6xl font-bold capitalize">{categories}</h2>
              <p className='text-xl text-gray-500'>Pianoforte solicitude so decisively unpleasing conviction is partiality he. Or particular so diminution entreaties oh do. Real he me fond show gave shot plan. Mean are sons too sold nor said</p>
            </div>
            <BlogGrid />
          </div>
          <div className='  col-span-1 rounded-[5px]'>
            <Rightbar
              className={`md:sticky md:top-14`}
              hiddennumber={"hidden"}
              data={data}
              heading={"Most viewed"} />
          </div>
        </div>
      </Container>
      <Footer />
    </>
  )
}
