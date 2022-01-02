import dynamic from 'next/dynamic'

const Triangle = dynamic(() => import('@/components/canvas/Triangle/'), {
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
      <Triangle />
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
