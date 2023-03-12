// Add an event listener to the form submit event
form.addEventListener('submit', (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the form data
  const formData = new FormData(event.target);
  
  console.log(formData); // Add this line to check if the form data is being retrieved correctly

  // Send an HTTP POST request to your server with the form data
  fetch('/submit-form', {
    method: 'POST',
    body: formData
  })
  .then((response) => {
    if (response.ok) {
      console.log('Form data sent successfully');
    } else {
      console.error('Failed to send form data');
    }
  })
  .catch((error) => {
    console.error(error);
  });
});
