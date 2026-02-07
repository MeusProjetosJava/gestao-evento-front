const API_URL = "https://outward-unitable-colleen.ngrok-free.dev";

let token = null;
let html5QrCode = null;

// 🔐 LOGIN
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("login-error");

  error.innerText = "";

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();
    token = data.token;

    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("scanner-screen").classList.remove("hidden");
  } catch {
    error.innerText = "Usuário ou senha inválidos";
  }
}

// 📷 SCANNER
function startScanner() {
  if (html5QrCode) return;

  html5QrCode = new Html5Qrcode("reader");

  html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    async (qrText) => {
      await html5QrCode.stop();
      html5QrCode = null;
      await sendCheckin(qrText);
    },
  );
}

// 📡 CHECK-IN
async function sendCheckin(qrCode) {
  try {
    const response = await fetch(`${API_URL}/check-ins`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ qrCode }),
    });

    if (!response.ok) {
      throw new Error();
    }

    alert("Check-in realizado com sucesso!");
  } catch {
    alert("Erro ao realizar check-in");
  }
}

// 🚪 LOGOUT (AGORA CORRETO)
function logout() {
  token = null;

  if (html5QrCode) {
    html5QrCode.stop();
    html5QrCode = null;
  }

  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("login-error").innerText = "";

  document.getElementById("scanner-screen").classList.add("hidden");
  document.getElementById("login-screen").classList.remove("hidden");
}
