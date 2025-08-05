const scriptURL = 'https://script.google.com/macros/s/AKfyc.../exec'; // Ganti dengan URL Web App kamu

document.addEventListener("DOMContentLoaded", () => {
  fetchData();

  const form = document.getElementById("tamuForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {
      nama: formData.get("nama"),
      instansi: formData.get("instansi"),
      keperluan: formData.get("keperluan")
    };

    try {
      const res = await fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const result = await res.json();
      alert(result.message);

      form.reset();
      fetchData();
    } catch (error) {
      alert("Gagal mengirim data!");
      console.error("Error:", error);
    }
  });
});

async function fetchData() {
  try {
    const res = await fetch(scriptURL);
    const data = await res.json();
    const tbody = document.querySelector("#dataTamu tbody");

    tbody.innerHTML = "";
    data.forEach(row => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.id}</td>
        <td>${row.nama}</td>
        <td>${row.instansi}</td>
        <td>${row.keperluan}</td>
        <td>${new Date(row.waktu).toLocaleString("id-ID")}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error("Gagal memuat data:", error);
  }
}
