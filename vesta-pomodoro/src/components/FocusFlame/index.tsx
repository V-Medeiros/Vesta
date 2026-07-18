import flameImage from '../../assets/vesta-flame-symbol-redesign-512.png';
import styles from './style.module.css';

export function FocusFlame() {
  return (
    <div className={styles.focusFlame} aria-hidden='true'>
      <img className={styles.flameImage} src={flameImage} alt='' />
    </div>
  );
}
