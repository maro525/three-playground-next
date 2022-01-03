import dynamic from 'next/dynamic'

const Glitch = dynamic(() => import('@/components/canvas/Glitch'), {
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
      <Glitch />
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
