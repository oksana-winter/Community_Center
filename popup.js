const openBtn = document.getElementById('openPopup');
const closeBtn = document.getElementById('closePopup');
const popup = document.getElementById('popup');

openBtn.addEventListener('click', () => {
   popup.classList.remove('hidden');
});

closeBtn.addEventListener('click', () => {
  popup.classList.add('hidden');
});

// Optional: close popup if you click outside the content
popup.addEventListener('click', (e) => {
  if (e.target === popup) {
    popup.classList.add('hidden');
  }
});
