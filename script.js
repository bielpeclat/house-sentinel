// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDPf6nIAhImKHYACYV0llFnPq-NUwGt5yg",
  authDomain: "house-sentinel-grok.firebaseapp.com",
  databaseURL: "https://house-sentinel-grok-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "house-sentinel-grok",
  storageBucket: "house-sentinel-grok.firebasestorage.app",
  messagingSenderId: "852892732950",
  appId: "1:852892732950:web:7857494fbe4b09296def37",
  measurementId: "G-8GW1CKRMHR"
};

// Inicializar o Firebase
firebase.initializeApp(firebaseConfig);

// Referência ao Realtime Database
const database = firebase.database();

// Selecionar elementos do HTML onde os dados serão exibidos
const tempElement = document.querySelector(".box1 .number"); // Para temperatura
const humidityElement = document.querySelector(".box2 .number"); // Para umidade

// Função para atualizar os dados no dashboard
function updateDashboard() {
  // Buscar os dados do Firebase
  database.ref("sensor").on("value", (snapshot) => {
    const data = snapshot.val();
    if (data) {
      // Atualizar os valores no HTML
      tempElement.textContent = data.temperature || "N/A"; // Exibe temperatura ou "N/A" se não houver dado
      humidityElement.textContent = data.humidity || "N/A"; // Exibe umidade ou "N/A" se não houver dado
    } else {
      tempElement.textContent = "N/A";
      humidityElement.textContent = "N/A";
    }
  });
}

// Chamar a função para começar a atualizar os dados
updateDashboard();

// Código existente para o modo escuro e sidebar
const body = document.querySelector("body"),
  modeToggle = body.querySelector(".mode-toggle"),
  sidebar = body.querySelector("nav"),
  sidebarToggle = body.querySelector(".sidebar-toggle");

// Verificar e aplicar o modo salvo (dark/light)
let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
  body.classList.toggle("dark");
}

// Verificar e aplicar o estado da sidebar (open/close)
let getStatus = localStorage.getItem("status");
if (getStatus && getStatus === "close") {
  sidebar.classList.toggle("close");
}

// Alternar modo escuro/claro e salvar no localStorage
modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    localStorage.setItem("mode", "dark");
  } else {
    localStorage.setItem("mode", "light");
  }
});

// Alternar sidebar aberta/fechada e salvar no localStorage
sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
  if (sidebar.classList.contains("close")) {
    localStorage.setItem("status", "close");
  } else {
    localStorage.setItem("status", "open");
  }
});
