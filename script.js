const API_URL = 'https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLiM9lwCqN2hZ6qdMlob4Q6dCzMVK6U9-v6jxFAa9WaWJYAzsS57nEfbLMkkbwyaPruYNvP0xrQuaGVjUuNtwJa3bJW_CdK_eLVYK26Bl6t-3qYYL-u_nrBH_P5t5pW54MaoyyGpD-BYLgA5ydEAPS4nBvbgA3njr94DkafMk18ZSzd7e4iVM0kB8icg4cuu67BQbW5KZyMNZ7gmosjgM_ZtO-ll3CX-BADOIrczULmK55qo8uU3xJyl0-AxwnuQJ7vfmi3nD8w_GBf6r7S9E0KXRvqtag&lib=MODR6MWyPflLq6dDg5Gc5XXNiaCb_EVGq';

document.getElementById("formData").addEventListener("submit", handleSubmit);

function loadData() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("dataBody");
      tbody.innerHTML = "";
      data.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${row.ID}</td>
          <td>${row.NAMA}</td>
          <td>${row.INSTANSI}</td>
          <td>${row.KEPERLUAN}</td>
          <td>${row.WAKTU}</td>
          <td>
            <button onclick="editData('${row.ID}', \${row.NAMA}\, \${row.INSTANSI}\, \${row.KEPERLUAN}\, \${row.WAKTU}\)">Edit</button>
            <button onclick="deleteData('${row.ID}')">Hapus</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    });
}

function handleSubmit(e) {
  e.preventDefault();
  const ID = document.getElementById("ID").value;
  const data = {
    NAMA: document.getElementById("NAMA").value,
    INSTANSI: document.getElementById("INSTANSI").value,
    KEPERLUAN: document.getElementById("KEPERLUAN").value,
    WAKTU: document.getElementById("WAKTU").value,
  };

  if (ID) {
    data.method = "PUT";
    data.ID = ID;
  }

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(() => {
    document.getElementById("formData").reset();
    loadData();
  });
}

function editData(ID, NAMA, INSTANSI, KEPERLUAN, WAKTU) {
  document.getElementById("ID").value = ID;
  document.getElementById("NAMA").value = NAMA;
  document.getElementById("INSTANSI").value = INSTANSI;
  document.getElementById("KEPERLUAN").value = KEPERLUAN;
  document.getElementById("WAKTU").value = WAKTU;
}

function deleteData(ID) {
  if (!confirm("Yakin ingin menghapus data ini?")) return;

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ method: "DELETE", ID }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(() => loadData());
}

window.onload = loadData;
