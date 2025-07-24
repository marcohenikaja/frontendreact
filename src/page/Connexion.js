import React, { useState, useEffect } from 'react';

const Connexion = () => {
  const [nom, setNom] = useState('');
  const [mdp, setMdp] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mampiditra = (e) => {
    e.preventDefault();
    alert(`Nom: ${nom}\nMot de passe: ${mdp}`);
  };

  const manadala = () => {
    alert('Créer un compte est désactivé dans cette démo.');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'center',
        alignItems: isMobile ? 'flex-start' : 'center',
        backgroundColor: '#f0f2f5',
        minHeight: '100vh',
        padding: isMobile ? '40px 20px' : '60px 40px',
        fontFamily: 'Helvetica, Arial, sans-serif',
      }}
    >
      {/* Section gauche */}
      <div
        style={{
          flex: 1,
          maxWidth: isMobile ? '100%' : '500px',
          paddingRight: isMobile ? '0' : '40px',
          marginBottom: isMobile ? '40px' : '0',
        }}
      >
        <h1
          style={{
            color: '#1877f2',
            fontSize: isMobile ? '48px' : '60px',
            fontWeight: 'bold',
            marginBottom: '10px',
            textAlign: isMobile ? 'center' : 'left',
          }}
        >
          facebook
        </h1>
        <p
          style={{
            fontSize: isMobile ? '20px' : '28px',
            color: '#1c1e21',
            textAlign: isMobile ? 'center' : 'left',
          }}
        >
          Avec Facebook, partagez et restez en contact avec votre entourage.
        </p>
      </div>

      {/* Section droite */}
      <div style={{ flex: 1, maxWidth: '400px', width: '100%' }}>
        <form
          onSubmit={mampiditra}
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <input
            type="text"
            placeholder="Adresse e-mail ou numéro de tél."
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            style={{
              padding: '14px',
              marginBottom: '10px',
              borderRadius: '6px',
              border: '1px solid #dddfe2',
              fontSize: '16px',
            }}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={mdp}
            onChange={(e) => setMdp(e.target.value)}
            style={{
              padding: '14px',
              marginBottom: '10px',
              borderRadius: '6px',
              border: '1px solid #dddfe2',
              fontSize: '16px',
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: '#1877f2',
              color: 'white',
              fontSize: '18px',
              padding: '14px',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginBottom: '10px',
            }}
          >
            Se connecter
          </button>
          <a
            href="#"
            style={{
              textAlign: 'center',
              color: '#1877f2',
              fontSize: '14px',
              marginBottom: '10px',
              textDecoration: 'none',
            }}
          >
            Mot de passe oublié ?
          </a>
          <div
            style={{
              height: '1px',
              backgroundColor: '#dddfe2',
              margin: '20px 0',
            }}
          />
          <button
            type="button"
            onClick={manadala}
            style={{
              backgroundColor: '#42b72a',
              color: 'white',
              fontSize: '16px',
              padding: '12px',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Créer un nouveau compte
          </button>
        </form>
        <p
          style={{
            marginTop: '20px',
            fontSize: '14px',
            textAlign: 'center',
            color: '#1c1e21',
          }}
        >
          <strong>Créer une Page</strong> pour une célébrité, une marque ou une entreprise.
        </p>
      </div>
    </div>
  );
};

export default Connexion;
