import dynamic from 'next/dynamic'

const Sphere = dynamic(() => import('@/components/canvas/Sphere'), {
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
      <Sphere />
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
      title: 'Sphere',
    },
  }
}
