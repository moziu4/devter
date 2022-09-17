import styles from "styles/AppLayout.module.css"

export default function AppLayout({ children }) {
  return (
    <>
      <div className={styles.div}>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  )
}
