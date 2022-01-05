import dynamic from 'next/dynamic'

const SphereClass = dynamic(() => import('@/components/canvas/SphereClass/'), {
  ssr: false,
})

const Page = () => {

  return (
    <>
      <SphereClass />
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
