function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function checkUserLogin() {
    const email = getQueryParam('email');
    let userData;

    if (email) {
        userData = JSON.parse(localStorage.getItem(email));
    }

    // Select necessary elements
    const loginButton = document.querySelector('.btn-custom-1');
    const signupButton = document.querySelector('.for-logging');
    const icon = document.querySelector('.profile-icon');
    const navLinks = document.querySelectorAll('.nav-link');

    if (userData && userData.logged === "Yes") {
        if (loginButton) {
            loginButton.style.display = "none";
        }

        if (signupButton) {
            signupButton.style.display = "none";
        }

        if (icon) {
            icon.style.display = "inline-block";
            icon.innerHTML = `
        <div class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src="../images/profile_icon.jpg" class="profile-img" alt="Profile Image"> 
                <i class="arrow-down"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="pages/profile.html?email=${encodeURIComponent(email)}">Profile</a>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item" onclick="logout('${email}')">Logout</button>
            </div>
        </div>
    `;
        }


        // Append email to all navigation links
        navLinks.forEach(link => {
            const url = new URL(link.href, window.location.origin);
            url.searchParams.set('email', email);
            link.href = url.toString();
        });
    } else {
        if (loginButton) {
            loginButton.style.display = "inline-block";
            loginButton.innerText = "Login";
            loginButton.onclick = () => {
                window.location.href = "pages/login.html";
            };
        }

        if (signupButton) {
            signupButton.style.display = "inline-block";
            signupButton.innerHTML = `<a href="pages/register.html" class="for-logging">SIGN UP</a>`;
        }

        // Hide profile icon and logout button
        if (icon) {
            icon.style.display = "none";
            icon.innerHTML = ""; // Clear the icon element
        }
    }
}

// Logout function
function logout(email) {
    if (email) {
        const userData = JSON.parse(localStorage.getItem(email));
        if (userData) {
            userData.logged = "no";
            localStorage.setItem(email, JSON.stringify(userData));
            console.log("User logged out.");

            window.location.href = "index.html";
        }
    }
}

// Call checkUserLogin when the window loads
window.onload = checkUserLogin;
