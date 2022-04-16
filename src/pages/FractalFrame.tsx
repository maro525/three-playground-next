import dynamic from 'next/dynamic'

const FractalFrame = dynamic(() => import('@/components/canvas/FractalFrame'), {
  ssr: false,
})

const DOM = () => {
  return (
    <></>
  )
}

const R3F = () => {
  return (
    <>
      <FractalFrame />
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
      title: 'FractalFrame',
    },
  }
}
