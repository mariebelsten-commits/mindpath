exports.handler = async (event) => {
  let data = null;

  try {
    if (event.body) {
      data = JSON.parse(event.body);
      console.log("Worksheet received:", data);
    } else {
      console.log("No data received");
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Function is working" }),
  };
};
