import dynamic from 'next/dynamic'

const LineGrid = dynamic(() => import('@/components/canvas/LineGrid'), {
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
      <LineGrid />
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
