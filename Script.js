document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('dataForm');
  const statusMessage = document.getElementById('statusMessage');

  const API_URL = 'https://script.google.com/macros/s/AKfycbzFEybNFT5R061-UIVtoqpy-M0hKUN7Op-HBAAKbDemKeLK4f2uksOjUgFGhXUXyTeH/exec';

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    statusMessage.textContent = "Mengirim data...";

    fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          statusMessage.textContent = "Data berhasil dikirim!";
          form.reset();
        } else {
          statusMessage.textContent = "Gagal mengirim data.";
        }
      })
      .catch(error => {
        console.error('Error:', error);
        statusMessage.textContent = "Terjadi kesalahan saat mengirim data.";
      });
  });
});
