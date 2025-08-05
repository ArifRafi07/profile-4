// Fungsi untuk load data dari localStorage
function loadData() {
  const data = JSON.parse(localStorage.getItem('dataTamu')) || [];
  const tbody = document.querySelector('#tamu-table tbody');
  tbody.innerHTML = '';

  data.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.id}</td>
      <td>${item.nama}</td>
      <td>${item.instansi}</td>
      <td>${item.keperluan}</td>
      <td>${new Date(item.waktu).toLocaleString()}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Fungsi untuk simpan data ke localStorage
function saveData(data) {
  localStorage.setItem('dataTamu', JSON.stringify(data));
}

// Event form submit
document.getElementById('form-tamu').addEventListener('submit', function(e) {
  e.preventDefault();

  const nama = e.target.nama.value.trim();
  const instansi = e.target.instansi.value.trim();
  const keperluan = e.target.keperluan.value.trim();

  if (!nama || !instansi || !keperluan) {
    alert('Semua field harus diisi!');
    return;
  }

  const data = JSON.parse(localStorage.getItem('dataTamu')) || [];

  const newEntry = {
    id: Date.now(),
    nama,
    instansi,
    keperluan,
    waktu: new Date().toISOString()
  };

  data.push(newEntry);
  saveData(data);

  e.target.reset();
  loadData();
});

// Load data saat pertama buka halaman
loadData();
