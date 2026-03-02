// Dynamically set backend URL based on current domain
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.BACKEND_URL = 'http://localhost:8000';
} else {
    window.BACKEND_URL = window.location.origin;
}
