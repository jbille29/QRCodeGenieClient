import { useState, useEffect } from 'react';
import styles from './App.module.css';

function App() {
  const [text, setText] = useState('');
  const [qr, setQr] = useState('');

  useEffect(() => {
    if (text.trim() === '') {
      setQr('');
      return;
    }
  
    const generateQR = async () => {
      const QRCode = await import('qrcode');
      const formattedText = text.startsWith('http') ? text : `https://${text}`;
      try {
        const dataUrl = await QRCode.toDataURL(formattedText);
        setQr(dataUrl);
      } catch (err) {
        console.error(err);
      }
    };
  
    generateQR();
  }, [text]);
  

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.heading}>✨ QR Code Genie ✨</h1>
        <p className={styles.tagline}>
          Type anything below and get your magic QR instantly.
        </p>
        <input
          type="text"
          value={text}
          placeholder="Paste a link or message"
          onChange={(e) => setText(e.target.value)}
          className={styles.input}
        />
        <div style={{ marginTop: '30px' }}>
          {qr ? (
            <>
              <img src={qr} alt="QR Code" style={{ marginBottom: '10px' }} />
              <br />
              <a href={qr} download="qrcode.png" className={styles.download}>
                ⬇ Download QR
              </a>
            </>
          ) : (
            <p className={styles.placeholder}>Your QR will appear here 👀</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
