import Devit from "components/Devit"
import { firestore } from "firebas/admin"
import { useRouter } from "next/router"

export default function DevitPage(props) {
  const router = useRouter()

  if (router.isFallback) return <h1>Cargando...</h1>

  return (
    <>
      <Devit {...props} />
      
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "YPsXtrQ4Z4oj2Z1Y6cTC" } },{ params: { id: "ZMKsgM6N0spjjl317Yc9" } }],
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const { params } = context
  const { id } = params

  return firestore
    .collection("devits")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data

      const props = {
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      }
      return { props }
    })
    .catch(() => {
      return { props: {} }
    })
}