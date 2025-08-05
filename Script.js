document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('dataForm');
  const statusMessage = document.getElementById('statusMessage');

  const API_URL = 'https://script.google.com/macros/s/AKfycbzFEybNFT5R061-UIVtoqpy-M0hKUN7Op-HBAAKbDemKeLK4f2uksOjUgFGhXUXyTeH/exec';

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const data = {
      nama: document.getElementById('nama').value,
      instansi: document.getElementById('instansi').value,
      keperluan: document.getElementById('keperluan').value
    };

    statusMessage.innerHTML = 'Mengirim data...';
    statusMessage.classList.remove('green-text', 'red-text');

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      if (result.status === 'success') {
        statusMessage.innerHTML = '✅ ' + result.message;
        statusMessage.classList.add('green-text');
        form.reset();
        // Alihkan pengguna ke halaman data.html setelah submit berhasil
        window.location.href = 'data.html';
      } else {
        statusMessage.innerHTML = '❌ ' + (result.message || 'Gagal menyimpan data.');
        statusMessage.classList.add('red-text');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      statusMessage.innerHTML = '❌ Terjadi kesalahan. Periksa koneksi Anda.';
      statusMessage.classList.add('red-text');
    });
  });
});
