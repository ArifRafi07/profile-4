document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('dataForm');
  const statusMessage = document.getElementById('statusMessage');
  const dataTableBody = document.querySelector('#dataTable tbody');
  const loadingData = document.getElementById('loadingData');

  // Fungsi untuk mengambil dan menampilkan data
  function fetchData() {
    loadingData.style.display = 'block';
    fetch(location.href)
      .then(response => response.json())
      .then(data => {
        dataTableBody.innerHTML = ''; // Kosongkan tabel
        if (data.length > 0) {
          data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
              <td>${row.ID}</td>
              <td>${row.Nama}</td>
              <td>${row.Instansi}</td>
              <td>${row.Keperluan}</td>
              <td>${row.Waktu}</td>
            `;
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

  // Panggil fungsi fetchData saat halaman dimuat
  fetchData();

  // Handle form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const data = {
      nama: document.getElementById('nama').value,
      instansi: document.getElementById('instansi').value,
      keperluan: document.getElementById('keperluan').value
    };

    statusMessage.innerHTML = 'Mengirim data...';
    statusMessage.classList.remove('green-text', 'red-text');

    fetch(location.href, {
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
        form.reset(); // Reset form setelah berhasil
        fetchData(); // Muat ulang data setelah data baru ditambahkan
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
