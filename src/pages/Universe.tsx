import dynamic from 'next/dynamic'

const Universe = dynamic(() => import('@/components/canvas/Universe'), {
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
      <Universe />
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
      title: 'Universe',
    },
  }
}
