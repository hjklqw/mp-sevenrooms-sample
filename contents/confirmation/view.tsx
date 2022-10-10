import styles from './styles.module.scss'
import { store } from '/assets/data'

export const ConfirmationPage = () => (
  <div className={styles.wrapper} style={{ background: store.bgColorHex }}>
    <p>End of demo! 🎉</p>
    <p>Thank you!</p>
  </div>
)
