import Avatar from "components/Avatar"
import useTimeAgo from "hooks/useTimeAgo"
import useDateTimeFormat from "hooks/useDateTimeFormat"
import Link from "next/link"
import { useRouter } from "next/router"

import styles from "styles/Devit.module.css"

export default function Devit({
  id,
  content,
  img,
  userName,
  avatar,
  createdAt,
}) {
  const timeAgo = useTimeAgo(createdAt)
  const createdAtFormated = useDateTimeFormat(createdAt)
  const router = useRouter()

  const handleArticleClick = (e) => {
    e.preventDefault()
    router.push(`/status/${id}`)
  }

  return (
    <>
      <article onClick={handleArticleClick }className={styles.article}>
        <div className={styles.div}>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section className={styles.section}>
          <header className={styles.header}>
            <strong>{userName}</strong>
            <span className={styles.punto}>·</span>
            <Link href={`/status/${id}`}>
              <a className={styles.date}>
            <time title={createdAtFormated} className={styles.time} >
              {timeAgo}
            </time>
            </a>
            </Link>
          </header>
          <p className={styles.p}>{content}</p>
          {img && <img className={styles.img} src={img} />}
        </section>
      </article>
    </>
  )
}
