import dynamic from 'next/dynamic'

const Triangle = dynamic(() => import('@/components/canvas/Triangle/index'), {
  ssr: false,
})

const R3F = () => {
  return (
    <>
      <Triangle />
    </>
  )
}

const Page = () => {
  return (
    <>
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
