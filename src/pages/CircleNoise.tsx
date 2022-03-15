import dynamic from 'next/dynamic'

const CircleNoise = dynamic(() => import('@/components/canvas/CircleNoise'), {
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
      <CircleNoise />
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
      title: 'LineGrid',
    },
  }
}
