import dynamic from 'next/dynamic'

const PixelDistortion = dynamic(() => import('@/components/canvas/PixelDistortion'), {
  ssr: false,
})

const DOM = () => {
  return (
    <>
    </>
  )
}


const R3F = () => {
  return (
    <>
      <PixelDistortion />
    </>
  )
}

const Page = () => {
  return (
    <>
      <DOM />
      {/* @ts-ignore */}
      <R3F r3f />
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
