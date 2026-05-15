// Robust Authentication Logic
(function() {
    const AUTH_KEY = 'netflix_romance_auth';
    
    function check() {
        const auth = localStorage.getItem(AUTH_KEY);
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        
        console.log('Current Page:', page, 'Auth Status:', !!auth);

        // If not logged in and not on login page, go to login
        if (!auth && page !== 'login.html') {
            window.location.href = 'login.html';
        } 
        // If logged in and on login page, go to intro/home
        else if (auth && page === 'login.html') {
            window.location.href = 'index.html';
        }
    }

    window.loginUser = function() {
        localStorage.setItem(AUTH_KEY, 'true');
        window.location.href = 'index.html';
    };

    window.logoutUser = function() {
        localStorage.removeItem(AUTH_KEY);
        window.location.href = 'login.html';
    };

    // Run check immediately
    check();
})();
