import { useState, useRef } from "react";
import QRCode from "qrcode.react";
import html2canvas from "html2canvas";
import styles from "./App.module.css";
import logoQuadrada from "../src/assets/logoQuadrada.png";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import defaultImage from "../src/assets/defaultImage.png";
import backgroundOption1 from "../src/assets/background1.jpg";
import backgroundOption2 from "../src/assets/background2.jpg";
import backgroundOption3 from "../src/assets/background3.jpg";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [localInfo, setLocalInfo] = useState({
    nome: "",
    endereco: "",
    link: "",
    background: defaultImage,
  });
  const [editMode, setEditMode] = useState(false);
  const cardRef = useRef(null);

  const handleCreateNew = () => {
    setEditMode(false);
    setShowModal(true);
  };

  const handleEdit = () => {
    setEditMode(true);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSaveLocalInfo = (nome, endereco, link, selectedBackground) => {
    if (editMode) {
      // Se estiver em modo de edição, atualize as informações existentes
      setLocalInfo((prevInfo) => ({
        ...prevInfo,
        nome,
        endereco,
        link,
        background: selectedBackground,
      }));
    } else {
      // Se estiver em modo de criação, salve as novas informações
      setLocalInfo({
        nome,
        endereco,
        link,
        background: selectedBackground,
      });
    }

    setShowModal(false);
  };

  const handleDownload = () => {
  if (cardRef.current) {
    html2canvas(cardRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "meu_card.png";
      link.click();
    });
  }
};
  

  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>
        <img
          src={logoQuadrada}
          alt="Logo do Site - Qr Places (Gerador de qr code)"
        />
      </div>
      <div className={styles.body}>
        <Button onClick={handleCreateNew} />
        {localInfo.nome && localInfo.endereco && localInfo.link && (
          <div
            ref={cardRef}
            className={`${styles.cardContainer} ${styles.centeredBackground}`}
            style={{ backgroundImage: `url(${localInfo.background})` }}
          >
            <div className={styles.cardInformationContainer}>
              <span className={styles.cardName}>{localInfo.nome}</span>
              <span className={styles.cardEndereco}>{localInfo.endereco}</span>
            </div>
            <div className={styles.QrContainer}>
              <QRCode value={localInfo.link} size={90} />
            </div>
          </div>
        )}
        {localInfo.nome && localInfo.endereco && localInfo.link && (
          <div className={styles.optionsDiv}>
            <button onClick={handleEdit} className={styles.button}>
              Editar
            </button>
            <button onClick={handleDownload} className={styles.button}>
              Baixar
            </button>
          </div>
        )}
      </div>
      <div className={styles.footer}> Created with ❤️ by Daniel Junior </div>
      {showModal && (
        <Modal
          onClose={handleModalClose}
          onSave={handleSaveLocalInfo}
          backgroundOptions={[
            defaultImage,
            backgroundOption1,
            backgroundOption2,
            backgroundOption3,
          ]}
          editMode={editMode}
          editingLocalInfo={localInfo}
        />
      )}
    </div>
  );
}

export default App;
