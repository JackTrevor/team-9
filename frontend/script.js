const URL_PARAMS = new URLSearchParams(window.location.search);
const TOKEN = URL_PARAMS.get('token');


if (TOKEN) {
  // Show logout
  document.querySelector('.content.authorized').style.display = 'block';
  // Hide login
  document.querySelector('.content.unauthorized').style.display = 'none';
}
