exports.handler = async (event) => {
  const data = JSON.parse(event.body);

  console.log("Worksheet received:", data);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Saved successfully" }),
  };
};
