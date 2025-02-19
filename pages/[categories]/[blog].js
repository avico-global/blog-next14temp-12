import React from 'react'
import Navbar from '@/components/container/navbar/Navbar'
import Banner from '@/components/container/banner/Banner'
import data from '@/jason/banner.json'
import Footer from '@/components/container/footer/Footer'
import Text from '@/components/BLog/Text'
import YouMightLike from '@/components/BLog/YouMightLike'
export default function Blog() {
  return (
    <div>
      <Navbar/>
      <Banner data={data}/>
      <Text/>
      <YouMightLike/>
      <Footer/>
    </div>
  )
}
