
const USERS_KEY = "myAppUsers";
const SESSION_KEY = "myAppSession";

// Ambil data pengguna
function getUsers() {
  return JSON.parse(
    localStorage.getItem(USERS_KEY) || "[]"
  );
}

// Tampilkan halaman register
function showRegister() {
  document.getElementById("loginForm").classList.add("hidden");
  document.getElementById("registerForm").classList.remove("hidden");
}

// Tampilkan halaman login
function showLogin() {
  document.getElementById("registerForm").classList.add("hidden");
  document.getElementById("loginForm").classList.remove("hidden");
}

// Daftar akun
function register() {
  const username = document.getElementById("regUser").value.trim();
  const password = document.getElementById("regPass").value;

  if (!username || !password) {
    alert("Isi semua data terlebih dahulu!");
    return;
  }

  if (password.length < 6) {
    alert("Password minimal 6 karakter!");
    return;
  }

  const users = getUsers();

  const exists = users.some(
    user => user.username.toLowerCase() === username.toLowerCase()
  );

  if (exists) {
    alert("Username sudah digunakan!");
    return;
  }

  users.push({ username, password });

  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  alert("Pendaftaran berhasil!");

  document.getElementById("regUser").value = "";
  document.getElementById("regPass").value = "";

  showLogin();
}

// Login akun
function login() {
  const username = document.getElementById("loginUser").value.trim();
  const password = document.getElementById("loginPass").value;

  const users = getUsers();

  const user = users.find(
    u => u.username.toLowerCase() === username.toLowerCase()
      && u.password === password
  );

  if (!user) {
    alert("Username atau password salah!");
    return;
  }

  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ username: user.username })
  );

  showDashboard(user.username);
}

// Dashboard
function showDashboard(username) {
  document.getElementById("authCard").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");

  document.getElementById("welcomeUser").textContent = username;
}

// Logout
function logout() {
  localStorage.removeItem(SESSION_KEY);

  document.getElementById("dashboard").classList.add("hidden");
  document.getElementById("authCard").classList.remove("hidden");

  document.getElementById("loginUser").value = "";
  document.getElementById("loginPass").value = "";

  showLogin();
}

// Periksa sesi ketika halaman dibuka
window.onload = function() {
  const session = JSON.parse(
    localStorage.getItem(SESSION_KEY) || "null"
  );

  if (session) {
    showDashboard(session.username);
  }
};
