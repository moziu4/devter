import styles from "styles/Homei.module.css"
import AppLayout from "components/Applayout"
import { useEffect, useState } from "react"
import Devit from "components/Devit/inde"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/api/statuses/home_timeline")
      .then((res) => res.json())
      .then(setTimeline)
  }, [])
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
                id={devit.id}
                key={devit.id}
                message={devit.message}
                username={devit.username}
              />
            )
          })}
        </section>
        <nav className={styles.nav}></nav>
      </AppLayout>
    </>
  )
}
