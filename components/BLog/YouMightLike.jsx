import React from 'react'
import Container from '../../components/common/Container'
import data from '@/jason/lifestyle.json'
import Cards from '../../components/common/Cards'
export default function YouMightLike() {
  const element = data.slice(0, 4);
  return (
    <Container className="flex flex-col gap-4">
      <h2 className="text-2xl md:text-3xl font-bold capitalize">You Might Like</h2>
      <Cards mdcol={3} lgcol={4} data={element} />
    </Container>
  )
}
