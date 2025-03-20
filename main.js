// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Adding event listener to all hearts
document.addEventListener('DOMContentLoaded', () => {
  const hearts = document.querySelectorAll('.like-glyph');

  hearts.forEach(heart => {
    heart.addEventListener('click', async () => {
      if (heart.textContent === EMPTY_HEART) {
        // empty heart clicked
        try {
          // Invoke mimicServerCall to simulate making a server request
          await mimicServerCall();

          // When the "server" returns a success status:
          heart.textContent = FULL_HEART;
          heart.classList.add('activated-heart');
        } catch (error) {
          // When the "server" returns a failure status:
          const modal = document.getElementById('modal');
          const modalMessage = document.getElementById('modal-message');

          //Display the error modal by removing the .hidden class
          modalMessage.textContent = error;
          modal.classList.remove('hidden');

          // Use setTimeout to hide the modal after 3 seconds (add the .hidden class)
          await delay(3000);
          modal.classList.add('hidden');
        }
      } else {
        //  full heart
        heart.textContent = EMPTY_HEART;
        heart.classList.remove('activated-heart');
      }
    });
  });
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
