import Avatar from "components/Avatar"
import useTimeAgo from "hooks/useTimeAgo"

import styles from "styles/Devit.module.css"

export default function Devit({ id, content, img, userName, avatar, createdAt }) {
  const timeAgo = useTimeAgo(createdAt)
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
            <span className={styles.date}>{timeAgo}</span>
          </header>
          <p className={styles.p}>{content}</p>
          {img && <img className={styles.img} src={img}/>}
        </section>
      </article>
    </>
  )
}
