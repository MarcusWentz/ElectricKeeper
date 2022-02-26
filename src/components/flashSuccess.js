import React, {useEffect, useState} from 'react';
import styles from "./flashSuccess.module.css";

export default function FlashSuccess({show, onClose, msg}) {
  const [showFlash, setShowFlash] = useState();

  useEffect(() => {
    setTimeout(() => {
      console.log("timout");
      onClose()
    }, 7000)
  }, [showFlash]);

  useEffect(() => {
    if (show) {
      setShowFlash(true);
    }
  }, [])

  return (
    showFlash ? (
    <div className={styles.flashSuccess}>
      <h2 className={styles.title}>
        Success
      </h2>
      <p style={{padding: "5px 6px"}}>
        {msg}
      </p>
    </div>) : ""
  )
}
