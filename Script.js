document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('dataForm');
  const statusMessage = document.getElementById('statusMessage');
  const dataTableBody = document.querySelector('#dataTable tbody');
  const loadingData = document.getElementById('loadingData');

  // Ganti URL ini dengan URL API Anda
  const API_URL = 'https://script.google.com/macros/s/AKfycbzFEybNFT5R061-UIVtoqpy-M0hKUN7Op-HBAAKbDemKeLK4f2uksOjUgFGhXUXyTeH/exec';

  function fetchData() {
    loadingData.style.display = 'block';
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        dataTableBody.innerHTML = '';
        if (data && data.length > 1) {
          const headers = data[0]; // Ambil baris pertama sebagai header
          const tableData = data.slice(1); // Ambil data mulai dari baris kedua

          tableData.forEach(row => {
            const tr = document.createElement('tr');
            headers.forEach((header, index) => {
              const td = document.createElement('td');
              td.textContent = row[index] || ''; // Tampilkan data per kolom
              tr.appendChild(td);
            });
            dataTableBody.appendChild(tr);
          });
        } else {
          dataTableBody.innerHTML = '<tr><td colspan="5" class="center-align">Belum ada data.</td></tr>';
        }
        loadingData.style.display = 'none';
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        loadingData.style.display = 'none';
        dataTableBody.innerHTML = '<tr><td colspan="5" class="center-align red-text">Gagal memuat data.</td></tr>';
      });
  }

  fetchData();

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
        fetchData();
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
});\
