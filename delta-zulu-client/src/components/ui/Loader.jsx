import React from 'react';
import { BsAirplaneFill } from 'react-icons/bs';

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: '#f4f6f9',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  spinnerContainer: {
    position: 'relative',
    width: '80px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    border: '3px solid rgba(32, 80, 120, 0.1)',
    borderTop: '3px solid #205078',
    borderRadius: '50%',
    animation: 'spin 1.5s linear infinite',
  },
  airplane: {
    fontSize: '2rem',
    color: '#205078',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
  text: {
    marginTop: '20px',
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#205078',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  }
};

const Loader = ({ text = "Cargando..." }) => {
  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.7; }
          }
        `}
      </style>
      <div style={styles.overlay}>
        <div style={styles.spinnerContainer}>
          <div style={styles.circle} />
          <div style={styles.airplane}>
            <BsAirplaneFill />
          </div>
        </div>
        <div style={styles.text}>{text}</div>
      </div>
    </>
  );
};

export default Loader;
