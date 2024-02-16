import { FaFacebook, FaInstagram, FaTwitch } from "react-icons/fa";
import styles from "./Footer.module.css";
function Footer() {
    return (
        <footer>
          <h2>Rodapé</h2>
          <ul className={styles.list}>
            <li><FaFacebook/></li>
            <li><FaInstagram/></li>
            <li><FaTwitch/></li>
          </ul>
        </footer>
        

    )
}

export default Footer