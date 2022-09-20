import Avatar from "components/Avatar"

import styles from "styles/Devit.module.css"

export default function Devit({ id, content, userName, avatar, createdAt }) {
  return (
    <>
      <article className={styles.article}>
        <div className={styles.div}>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section className={styles.section}>
          <header className={styles.header}>
            <strong>{userName}</strong>
            <span className={styles.punto}>.</span>
            <span className={styles.date}>{createdAt}</span>
          </header>
          <p className={styles.p}>{content}</p>
        </section>
      </article>
    </>
  )
}
