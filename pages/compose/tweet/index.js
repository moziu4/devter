import Button from "components/Button"
import styles from "styles/Tweet.module.css"
import useUser from "hooks/useUser"
import { useState, useEffect } from "react"
import { addDevit, uploadImage } from "firebas/client"
import { useRouter } from "next/router"
import Head from "next/head"
import Avatar from "components/Avatar"
import { getDownloadURL } from "firebase/storage"

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

const DRAG_IMAGE_STATE = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

export default function ComposeTweet() {
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)

  const [drag, setDrag] = useState(DRAG_IMAGE_STATE.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState("")

  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (task) {
      const onProgress = () => {}
      const onError = () => {}
      const onComplete = () => {
        console.log("onComplete")
        getDownloadURL(task.snapshot.ref).then((downloadURL) => {
          setImgURL(downloadURL)
        })
      }

      task.on("state_changed", onProgress, onError, onComplete)
    }
  }, [task])

  const handleChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
      img: imgURL,
    })
      .then(() => {
        router.push("/home")
      })
      .catch((err) => {
        console.error(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATE.DRAG_OVER)
  }
  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATE.NONE)
  }
  const handleDrop = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATE.NONE)
    const file = e.dataTransfer.files[0]

    const task = uploadImage(file)
    setTask(task)
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      
        <Head>
          <title>Crear un Devit / Devter</title>
        </Head>
        <section className={styles.formContainer}>
          {user && <Avatar src={user.avatar} />}
        </section>
        <form className={styles.form} onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            placeholder="¿Qué esta pasando?"
            value={message}
            className={
              drag === DRAG_IMAGE_STATE.DRAG_OVER
                ? styles.textAreaHover
                : styles.textArea
            }
          ></textarea>
          {imgURL && (
            <section className={styles.removeImg}>
              <button
                className={styles.buttonClose}
                onClick={() => setImgURL(null)}
              >
                x
              </button>
              <img className={styles.img} src={imgURL} />
            </section>
          )}
          <div>
            <Button className={styles.boton} disabled={isButtonDisabled}>
              Devitear
            </Button>
          </div>
        </form>
      
    </>
  )
}
