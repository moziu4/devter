import styles from "styles/Homei.module.css"
import AppLayout from "components/Applayout"
import { useEffect, useState } from "react"
import Devit from "components/Devit"
import useUser from "hooks/useUser"
import { fetchLasteDevits } from "firebas/client"
import Link from "next/link"
import Create from "components/icon/Create"
import Home from "components/icon/Home"
import Search from "components/icon/Search"
import Head from "next/head"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()
  useEffect(() => {
    user && fetchLasteDevits().then(setTimeline)
  }, [user])
  return (
    <>
      <AppLayout>
        <Head>
          <title>Home / Devter</title>
        </Head>
        <header className={styles.header}>
          <h2 className={styles.h2}>Inicio</h2>
        </header>

        <section className={styles.section}>
          {timeline.map((devit) => {
            return (
              <Devit
                avatar={devit.avatar}
                createdAt={devit.createdAt}
                id={devit.id}
                img={devit.img}
                key={devit.id}
                content={devit.content}
                userName={devit.userName}
                userId={devit.userId}

              />
            )
          })}
        </section>
        <nav className={styles.nav}>
          <Link href="/home">
            <a>
              <Home width={32} height={32} stroke="#09f" />
            </a>
          </Link>
          <Link href="/search">
            <a>
              <Search width={32} height={32} stroke="#09f" />
            </a>
          </Link>
          <Link href="/compose/tweet">
            <a>
              <Create width={32} height={32} stroke="#09f" />
            </a>
          </Link>
        </nav>
      </AppLayout>
    </>
  )
}
