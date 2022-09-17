import styles from "../../styles/Avatar.module.css"

export default function Avatar({ alt, src, text, withtext }) {
  return (
    <div className={styles.container}>
      <img alt={alt} className={styles.avatar} src={src} title={alt} />
      {text && <strong>{text}</strong>}
    </div>
  )
}
