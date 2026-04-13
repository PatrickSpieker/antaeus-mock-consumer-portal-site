// --- Credentials ---
var CREDENTIALS = { username: 'admin', password: 'password123' };
var TWO_FA_CODE = '123456';

// --- Mock Data ---
var STATS = [
  { label: 'Total Users',     value: '12,847', trend: '+14.2%', dir: 'up' },
  { label: 'Revenue',         value: '$48,352', trend: '+8.1%', dir: 'up' },
  { label: 'Active Sessions', value: '1,024',  trend: '-3.4%',  dir: 'down' },
  { label: 'Conversion Rate', value: '3.24%',  trend: '+1.7%',  dir: 'up' }
];

var CHART_DATA = [
  { month: 'Jan', value: 18400 },
  { month: 'Feb', value: 22100 },
  { month: 'Mar', value: 19800 },
  { month: 'Apr', value: 31500 },
  { month: 'May', value: 28700 },
  { month: 'Jun', value: 48352 }
];

var TRANSACTIONS = [
  { id: 'TXN-1001', customer: 'Alice Johnson',  amount: '$1,250.00', status: 'Completed', date: '2026-04-12' },
  { id: 'TXN-1002', customer: 'Bob Martinez',   amount: '$430.50',   status: 'Completed', date: '2026-04-12' },
  { id: 'TXN-1003', customer: 'Carol White',    amount: '$2,100.00', status: 'Pending',   date: '2026-04-11' },
  { id: 'TXN-1004', customer: 'David Lee',      amount: '$870.25',   status: 'Completed', date: '2026-04-11' },
  { id: 'TXN-1005', customer: 'Emily Chen',     amount: '$315.00',   status: 'Failed',    date: '2026-04-10' },
  { id: 'TXN-1006', customer: 'Frank Wilson',   amount: '$1,680.00', status: 'Completed', date: '2026-04-10' },
  { id: 'TXN-1007', customer: 'Grace Kim',      amount: '$945.75',   status: 'Pending',   date: '2026-04-09' },
  { id: 'TXN-1008', customer: 'Henry Brown',    amount: '$2,340.00', status: 'Completed', date: '2026-04-09' },
  { id: 'TXN-1009', customer: 'Irene Davis',    amount: '$560.00',   status: 'Failed',    date: '2026-04-08' },
  { id: 'TXN-1010', customer: 'Jack Taylor',    amount: '$1,125.50', status: 'Completed', date: '2026-04-08' }
];

// --- Screen Management ---
function showScreen(id) {
  var screens = document.querySelectorAll('.screen');
  for (var i = 0; i < screens.length; i++) {
    screens[i].classList.remove('active');
  }
  document.getElementById(id).classList.add('active');
}

// --- Render Dashboard ---
function renderStats() {
  var grid = document.getElementById('stats-grid');
  var html = '';
  for (var i = 0; i < STATS.length; i++) {
    var s = STATS[i];
    html += '<div class="stat-card">' +
      '<div class="stat-label">' + s.label + '</div>' +
      '<div class="stat-value">' + s.value + '</div>' +
      '<div class="stat-trend ' + s.dir + '">' +
        (s.dir === 'up' ? '&#9650; ' : '&#9660; ') + s.trend +
      '</div>' +
    '</div>';
  }
  grid.innerHTML = html;
}

function renderChart() {
  var chart = document.getElementById('chart');
  var max = 0;
  for (var i = 0; i < CHART_DATA.length; i++) {
    if (CHART_DATA[i].value > max) max = CHART_DATA[i].value;
  }
  var html = '';
  for (var i = 0; i < CHART_DATA.length; i++) {
    var d = CHART_DATA[i];
    var pct = Math.round((d.value / max) * 100);
    var display = '$' + d.value.toLocaleString();
    html += '<div class="bar-row">' +
      '<span class="bar-label">' + d.month + '</span>' +
      '<div class="bar-track">' +
        '<div class="bar-fill" style="width: ' + pct + '%">' + display + '</div>' +
      '</div>' +
    '</div>';
  }
  chart.innerHTML = html;
}

function renderTransactions() {
  var tbody = document.getElementById('transactions-body');
  var html = '';
  for (var i = 0; i < TRANSACTIONS.length; i++) {
    var t = TRANSACTIONS[i];
    var badgeClass = 'badge ';
    if (t.status === 'Completed') badgeClass += 'badge-success';
    else if (t.status === 'Pending') badgeClass += 'badge-warning';
    else badgeClass += 'badge-danger';

    html += '<tr>' +
      '<td>' + t.id + '</td>' +
      '<td>' + t.customer + '</td>' +
      '<td>' + t.amount + '</td>' +
      '<td><span class="' + badgeClass + '">' + t.status + '</span></td>' +
      '<td>' + t.date + '</td>' +
    '</tr>';
  }
  tbody.innerHTML = html;
}

// --- Init ---
document.addEventListener('DOMContentLoaded', function () {
  var loginForm = document.getElementById('login-form');
  var loginError = document.getElementById('login-error');
  var twofaForm = document.getElementById('twofa-form');
  var twofaError = document.getElementById('twofa-error');
  var twofaBack = document.getElementById('twofa-back');
  var logoutBtn = document.getElementById('logout-btn');

  // Login
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var user = document.getElementById('username').value;
    var pass = document.getElementById('password').value;

    if (user === CREDENTIALS.username && pass === CREDENTIALS.password) {
      loginError.hidden = true;
      showScreen('screen-2fa');
      document.getElementById('twofa-code').value = '';
      document.getElementById('twofa-code').focus();
    } else {
      loginError.hidden = false;
      var card = loginForm.closest('.auth-card');
      card.classList.remove('shake');
      // Force reflow to restart animation
      void card.offsetWidth;
      card.classList.add('shake');
    }
  });

  // 2FA
  twofaForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var code = document.getElementById('twofa-code').value;

    if (code === TWO_FA_CODE) {
      twofaError.hidden = true;
      renderStats();
      renderChart();
      renderTransactions();
      showScreen('screen-dashboard');
    } else {
      twofaError.hidden = false;
      var card = twofaForm.closest('.auth-card');
      card.classList.remove('shake');
      void card.offsetWidth;
      card.classList.add('shake');
    }
  });

  // 2FA code input: digits only
  document.getElementById('twofa-code').addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
  });

  // Back to login from 2FA
  twofaBack.addEventListener('click', function () {
    twofaError.hidden = true;
    showScreen('screen-login');
  });

  // Logout
  logoutBtn.addEventListener('click', function () {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('twofa-code').value = '';
    loginError.hidden = true;
    twofaError.hidden = true;
    showScreen('screen-login');
  });
});
