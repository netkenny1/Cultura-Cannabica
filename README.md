# Cultura Cannábica — E-Commerce Storefront

A complete e-commerce storefront for a specialty retailer, built from scratch with vanilla HTML/CSS/JavaScript on the front-end and a Node.js / Express server on the back-end. Implements the end-to-end shopping flow: product browsing, cart, checkout, order confirmation, and account management.

## Pages

| Page | Description |
|---|---|
| `index.html` | Landing page with hero, featured products, and navigation. |
| `shop.html` | Product catalogue with filtering. |
| `product.html` | Product-detail page. |
| `cart.html` | Cart with quantity controls and totals. |
| `checkout.html` | Checkout flow with customer + payment fields. |
| `order-success.html` | Post-purchase confirmation. |
| `account.html` | Customer account area. |

## Stack

- **Front-end:** HTML5, CSS3, vanilla JavaScript (`app.js`).
- **Back-end:** Node.js with Express (`server.js`).
- **Styling:** Custom CSS — no UI framework.

## Run locally

```bash
git clone https://github.com/netkenny1/Cultura-Cannabica.git
cd Cultura-Cannabica
npm install
node server.js
# open http://localhost:3000
```

## Project layout

```
index.html           # storefront entry
shop.html            # catalogue
product.html         # PDP
cart.html            # cart
checkout.html        # checkout
order-success.html   # confirmation
account.html         # account area
app.js               # client-side interactivity
server.js            # Express server
styles.css           # site styles
scripts/             # utility scripts
```

## Status

Functional storefront with the full purchase funnel wired up. Future work: payment-gateway integration, order persistence, and an admin dashboard.
