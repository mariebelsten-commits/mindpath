function saveToServer(data) {
  fetch('/.netlify/functions/saveWorksheet', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).catch(console.error);
}
