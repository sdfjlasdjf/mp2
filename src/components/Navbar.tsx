import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar(){
  return (
    <header className={styles.nav}>
      <div className="container">
        <div className={styles.row}>
          <NavLink to="/" className={styles.brand}>New Clear REACTive</NavLink>
          <nav className={styles.links}>
            <NavLink to="/" className={({isActive})=> isActive ? styles.active : undefined}>List</NavLink>
            <NavLink to="/gallery" className={({isActive})=> isActive ? styles.active : undefined}>Gallery</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
