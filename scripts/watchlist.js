// Retrieve the value of "selectedCryptos" from localStorage
const selectedCryptos = localStorage.getItem('selectedCryptos');

// Check if the value is null or not a valid JSON string
if (selectedCryptos === null) {
  console.log("selectedCryptos does not exist in localStorage");
} else {
  try {
    // Attempt to parse the value as JSON
    const parsedCryptos = JSON.parse(selectedCryptos);
    // Do something with the parsedCryptos array
    parsedCryptos.forEach(crypto => {
      console.log(crypto);
      // You can perform any desired operation on each crypto value inside this loop
    });
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
}



