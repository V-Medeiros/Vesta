import flameImage from '../../assets/vesta-flame-symbol-redesign-512.png';
import styles from './style.module.css';

export function FocusFlame() {
  return (
    <a href='#' className={styles.focusFlame} aria-hidden='true'>
      <img className={styles.flameImage} src={flameImage} alt='' />
    </a>
  );
}
