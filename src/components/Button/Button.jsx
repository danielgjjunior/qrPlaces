import styles from './Button.module.css';

export default function Button({ onClick }) {
    return (
        <div className={styles.main} onClick={onClick}>
            Criar Novo
        </div>
    );
}
