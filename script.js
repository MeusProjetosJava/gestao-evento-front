const API_URL = "https://outward-unitable-colleen.ngrok-free.dev";

let html5QrCode = null;
let scanning = false;

// 🔐 LOGIN
async function login() {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const errorElement = document.getElementById("login-error");

  errorElement.innerText = "";

  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error("Erro de autenticação");
    }

    const responseBody = await response.json();

    // ✅ TOKEN RETORNADO PELO BACKEND
    const accessToken = responseBody.accessToken;

    if (!accessToken) {
      throw new Error("Token não retornado pelo backend");
    }

    // ✅ SALVA TOKEN DE FORMA CONFIÁVEL
    sessionStorage.setItem("authToken", accessToken);

    // 🔄 TROCA DE TELA
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("scanner-screen").classList.remove("hidden");
  } catch (error) {
    errorElement.innerText = "Usuário ou senha inválidos";
  }
}

// 📷 SCANNER
function startScanner() {
  if (html5QrCode !== null || scanning === true) {
    return;
  }

  html5QrCode = new Html5Qrcode("reader");

  html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    async (decodedText) => {
      if (scanning === true) {
        return;
      }

      scanning = true;

      try {
        await html5QrCode.stop();
      } catch (error) {
        // ignora erro de parada da câmera
      }

      html5QrCode = null;

      await sendCheckin(decodedText);

      scanning = false;
    },
  );
}

// 📡 CHECK-IN
async function sendCheckin(qrCode) {
  const token = sessionStorage.getItem("authToken");

  if (!token) {
    alert("Sessão expirada. Faça login novamente.");
    logout();
    return;
  }

  try {
    const response = await fetch(`${API_URL}/check-ins`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        qrCode: qrCode,
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao realizar check-in");
    }

    alert("Check-in realizado com sucesso!");
  } catch (error) {
    alert("Erro ao realizar check-in");
  }
}

// 🚪 LOGOUT
function logout() {
  sessionStorage.removeItem("authToken");

  if (html5QrCode !== null) {
    try {
      html5QrCode.stop();
    } catch (error) {
      // ignora erro
    }
    html5QrCode = null;
  }

  scanning = false;

  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("login-error").innerText = "";

  document.getElementById("scanner-screen").classList.add("hidden");
  document.getElementById("login-screen").classList.remove("hidden");
}
