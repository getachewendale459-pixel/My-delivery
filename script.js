<script>
  const products = [
    { name: "coffee in kg", price: 700, image: "coffee.jpg" },
    { name: "honey in kg", price: 400, image: "honey.jpeg" },
    { name: "butter in kg", price: 300, image: "butter.jpeg" },
    { name: "milk in ltr.", price: 120, image: "milk.jpeg" }
  ];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  let found = false;

  for (const item of cart) {
    if (item.name === name) {
      item.qty = item.qty + 1;
      found = true;
    }
  }

  if (!found) {
    cart.push({ name: name, price: price, qty: 1 });
  }

  showCart();
}

function sendOrder() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;

  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }
  if (name === "" || phone === "" || address === "") {
    alert("Please fill all fields");
    return;
  }

  let message = "Order from " + name + "\nPhone: " + phone + "\nAddress: " + address + "\n";
  let total = 0;

  for (const item of cart) {
    message = message + item.name + " x" + item.qty + "\n";
    total = total + item.price * item.qty;
  }
  message = message + "Total: " + total + " birr";

    window.location.href = "sms:+251908930946?body=" + encodeURIComponent(message);
}

  function showCart() {
  let total = 0;
  let count = 0;
  const list = document.getElementById("cart-list");
  list.innerHTML = "";

  if (cart.length === 0) {
    list.innerHTML = "<li> no product</li>";
  }

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    const lineTotal = item.price * item.qty;

    list.innerHTML += `<li>${item.name} x${item.qty} - ${lineTotal} birr
      <button onclick="removeItem(${i})">x</button></li>`;

    total = total + lineTotal;
    count = count + item.qty;
  }

    document.getElementById("count").textContent = count;
  document.getElementById("total").textContent = total;
  localStorage.setItem("cart", JSON.stringify(cart));
}

  function clearCart() {
    cart = [];
    showCart();
    }
    function removeItem(index) {
  if (cart[index].qty > 1) {
    cart[index].qty = cart[index].qty - 1;
  } else {
    cart.splice(index, 1);
  }
  showCart();
}

  const box = document.getElementById("products");

  for (const item of products) {
    box.innerHTML += `
      <div class="card">
        <img src="${item.image}" alt="${item.name}" width="200">
        <h3>${item.name}</h3>
        <p class="price">${item.price} birr</p>
        <button onclick="addToCart('${item.name}', ${item.price})">add</button>
      </div>
    `;
  }
  showCart();
</script>
