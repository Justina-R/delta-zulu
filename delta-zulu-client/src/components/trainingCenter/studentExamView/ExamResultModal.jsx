import React from 'react';
import { Modal } from 'react-bootstrap';
import { Clipboard, PartyPopper } from 'lucide-react';

const ExamResultModal = ({ show, onHide, score, onReturn }) => {
  const isPassed = score >= 6;
  
  const styles = {
    modal: {
      borderRadius: '28px',
      border: 'none',
    },
    content: {
      padding: '48px 40px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    },
    iconCircle: {
      width: '90px',
      height: '90px',
      borderRadius: '50%',
      background: isPassed ? '#e8f5e9' : '#fff5f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '32px',
      boxShadow: '0 10px 20px rgba(0,0,0,0.02)',
    },
    score: {
      fontSize: '5.5rem',
      fontWeight: '800',
      color: isPassed ? '#198754' : '#e53e3e',
      lineHeight: '1',
      margin: '0',
    },
    scoreLabel: {
      fontSize: '0.85rem',
      fontWeight: '700',
      color: '#a0aec0',
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
      marginTop: '12px',
      marginBottom: '32px',
    },
    divider: {
      width: '100%',
      height: '1px',
      background: '#f0f2f5',
      margin: '0 0 32px 0',
      border: 'none',
    },
    title: {
      fontSize: '1.85rem',
      fontWeight: '800',
      color: isPassed ? '#198754' : '#1a2a3a',
      marginBottom: '16px',
      letterSpacing: '-0.02em',
    },
    description: {
      fontSize: '1rem',
      color: '#718096',
      lineHeight: '1.6',
      maxWidth: '340px',
      marginBottom: '40px',
    },
    button: {
      background: isPassed ? '#198754' : '#205078',
      color: '#fff',
      border: 'none',
      borderRadius: '14px',
      padding: '16px 48px',
      fontSize: '1rem',
      fontWeight: '700',
      cursor: 'pointer',
      width: '100%',
      transition: 'all 0.2s ease',
      boxShadow: isPassed ? '0 10px 20px rgba(25, 135, 84, 0.2)' : '0 10px 20px rgba(32, 80, 120, 0.2)',
    }
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered 
      contentClassName="border-0 shadow-lg" 
      style={{ borderRadius: '28px' }}
      backdrop="static"
    >
      <div style={styles.content}>
        <div style={styles.iconCircle}>
          {isPassed ? (
            <PartyPopper size={44} color="#198754" strokeWidth={2.5} />
          ) : (
            <Clipboard size={44} color="#e53e3e" strokeWidth={2.5} />
          )}
        </div>
        
        <h2 style={styles.score}>{score % 1 === 0 ? score : score.toFixed(1)}</h2>
        <div style={styles.scoreLabel}>Puntos sobre 10</div>
        
        <div style={styles.divider} />
        
        <h3 style={styles.title}>
          {isPassed ? '¡Módulo aprobado!' : 'No aprobaste esta vez'}
        </h3>
        
        <p style={styles.description}>
          {isPassed 
            ? 'Superaste el mínimo requerido (6 puntos). El siguiente módulo ya está disponible para vos.'
            : 'Necesitás al menos 6 puntos para aprobar. Podés repasar el material y volver a tomar el examen cuando quieras.'
          }
        </p>
        
        <button 
          style={styles.button} 
          onClick={onReturn}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.filter = 'brightness(1.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.filter = 'brightness(1)';
          }}
        >
          Volver al curso
        </button>
      </div>
    </Modal>
  );
};

export default ExamResultModal;
