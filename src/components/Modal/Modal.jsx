import { useEffect, useState } from "react";
import styles from "./Modal.module.css";

export default function Modal({
  onClose,
  onSave,
  backgroundOptions,
  editMode,
  editingLocalInfo,
}) {
  const [nome, setNome] = useState(editingLocalInfo ? editingLocalInfo.nome : "");
  const [endereco, setEndereco] = useState(
    editingLocalInfo ? editingLocalInfo.endereco : ""
  );
  const [link, setLink] = useState(editingLocalInfo ? editingLocalInfo.link : "");
  const [selectedBackground, setSelectedBackground] = useState(
    editingLocalInfo ? editingLocalInfo.background : backgroundOptions[0]
  );

  const handleSave = () => {
    onSave(nome, endereco, link, selectedBackground);
    setNome("");
    setEndereco("");
    setLink("");
  };

  const handleBackgroundClick = (background) => {
    setSelectedBackground(background);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedBackground(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (editMode && editingLocalInfo) {
      setNome(editingLocalInfo.nome);
      setEndereco(editingLocalInfo.endereco);
      setLink(editingLocalInfo.link);
      setSelectedBackground(editingLocalInfo.background);
    }
  }, [editMode, editingLocalInfo]);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <label className={styles.optionDiv}>
            Nome do Local:
            <input
              type="text"
              className={styles.input}
              placeholder="Ex: Balneário Camboriú"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </label>
          <label className={styles.optionDiv}>
            Endereço do Local:
            <input
              type="text"
              className={styles.input}
              placeholder="Ex. Santa Catarina"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
          </label>
          <label className={styles.optionDiv}>
            Link do Site:
            <input
              type="text"
              className={styles.input}
              placeholder="http://www.teste.com.br"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </label>
          Escolha um plano de fundo para o cartão:
          <div className={styles.backgroundOptions}>
            {backgroundOptions.map((option, index) => (
              <div
                key={index}
                className={`${styles.backgroundOption} ${
                  option === selectedBackground ? styles.selected : ''
                }`}
                style={{ backgroundImage: `url(${option})` }}
                onClick={() => handleBackgroundClick(option)}
              />
            ))}
          </div>
          <label className={styles.fileInputLabel}>
            Escolha seu próprio plano de fundo:
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>
        </div>
        <div className={styles.modalActions}>
          <button onClick={handleSave} className={styles.button}>
            Salvar
          </button>
          <button onClick={onClose} className={styles.button}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}