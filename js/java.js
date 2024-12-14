(() => {

  'use strict';

  const themeSwitcher = {

    init: function() {
      this.wrapper = document.getElementById('theme-switcher-wrapper');
      this.button = document.getElementById('theme-switcher-button');
      this.theme = this.wrapper.querySelectorAll('[data-theme]');
      this.themes = ['theme-orange', 'theme-purple', 'theme-green', 'theme-blue'];
      this.events();
      this.start();
    },
    
    events: function() {
      this.button.addEventListener('click', this.displayed.bind(this), false);
      this.theme.forEach(theme => theme.addEventListener('click', this.themed.bind(this), false));
    },

    start: function() {
      let randomTheme = this.themes[Math.floor(Math.random() * this.themes.length)];
      document.body.classList.add(randomTheme);
    },

    displayed: function() {
      this.wrapper.classList.toggle('is-open');
    },

    themed: function(e) {
      // Remove existing theme
      this.themes.forEach(theme => {
        if (document.body.classList.contains(theme)) {
          document.body.classList.remove(theme);
        }
      });
      // Add new theme based on clicked element's data attribute
      document.body.classList.add(`theme-${e.currentTarget.dataset.theme}`);
    }

  };

  themeSwitcher.init();

})();



function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const email = getQueryParam('email');

if (email) {
    console.log("Retrieved email:", email);

 
    const userData = JSON.parse(localStorage.getItem(email));
    if (userData) {
        console.log("User Data:", userData);
        
   
        document.getElementById('stdName').innerHTML = `
            <p> ${userData.fname} ${userData.lname}</p>
           
        `;
    } else {
        console.log("No user data found for this email.");
        document.getElementById('userInfo').innerText = "No user data found.";
    }
} else {
    console.log("No email found in the URL.");
    document.getElementById('userInfo').innerText = "No email found.";
}

 getQueryParam(name)


