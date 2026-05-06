function saveToServer(data) {
  console.log("saveToServer called", data);
  fetch('/.netlify/functions/saveWorksheet', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(result => console.log("Server response:", result))
  .catch(err => console.error("Fetch error:", err));
}
