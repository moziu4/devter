import styles from "../../styles/Home.module.css"

export default function Button({ children, onClick, disabled }) {
  return (
    <>
      <button onClick={onClick} disabled={disabled} className={styles.button}>
        {children}
      </button>
    </>
  )
}
