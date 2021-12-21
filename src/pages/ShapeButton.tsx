import dynamic from 'next/dynamic'
import ShapeButton from "@/components/dom/ShapeButton"

const DOM = () => {
  return (
    <>
      <ShapeButton />
    </>
  )
}

const Page = () => {
  return (
    <>
      <DOM />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Triangle',
    },
  }
}
