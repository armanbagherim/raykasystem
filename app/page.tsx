import Image from 'next/image'
import ProductCard from './components/design/ProductCard'
import fetcher from './components/global/fetcher'

export default async function Home() {

  return (

    <>

      <ProductCard type="small" />
    </>
  )
}
