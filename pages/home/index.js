import styles from "styles/Homei.module.css"
import AppLayout from "components/Applayout"
import { useEffect, useState } from "react"
import Devit from "components/Devit/inde"
import useUser from "hooks/useUser"
import { fetchLasteDevits } from "firebas/client"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()
  useEffect(() => {
    user && fetchLasteDevits().then(setTimeline)
  }, [user])
  return (
    <>
      <AppLayout>
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
                key={devit.id}
                content={devit.content}
                userName={devit.userName}
                userId={devit.userId}
              />
            )
          })}
        </section>
        <nav className={styles.nav}></nav>
      </AppLayout>
    </>
  )
}
