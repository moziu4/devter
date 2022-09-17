import Avatar from "components/Avatar"

import styles from "styles/Devit.module.css"

export default function Devit({ id, message, username, avatar }) {
  return (
    <>
      <article className={styles.article}>
        <div className={styles.div}>
          <Avatar alt={username} src={avatar} />
        </div>
        <section className={styles.section}>
          <strong>{username}</strong>
          <p className={styles.p}>{message}</p>
        </section>
      </article>
    </>
  )
}
