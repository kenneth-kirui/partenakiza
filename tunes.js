// const navToggle = document.querySelector(".nav-toggle");
// const links = document.querySelector(".links");
// navToggle.addEventListener("click", function(){
//     links.classList.toggle("show-links");
// })

// fetch data from tune api endpoint
let currentAudio = null;
let currentIcon = null;

function fetchData() {
    const endpoint = 'http://134.122.74.239:8003/tunes'
    
    fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('cards-container');
            console.log("The data:" + data)

            data.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('card')

                card.innerHTML = `
                <h2>${item.name}</h2>
                <i class="fa-solid fa-circle-play play-icon fa-2x fa-fw" onclick = "togglePlay('${item.file_name}', this)"></i>
                <button onclick = "subscribe('${item.code}')">Subscribe</button>`
                
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetchng data:', error);
            const container = document.getElementById('cards-container');
            container.innerHTML = '<p> Faiilde to load tunes. Please try agin later.'
        });
}

function togglePlay(fileUrl, icon) {
    if (currentAudio && currentAudio.src === fileUrl) {
        if (currentAudio.paused) {
            currentAudio.play();
            icon.classList.remove('fa-circle-play')
            icon.classList.add('fa-circle-pause')
        } else {
            currentAudio.pause();
            icon.classList.remove('fa-circle-pause');
            icon.classList.add('fa-circle-play');
        }
    } else {
        if (currentAudio) {
            currentAudio.pause();
            currentIcon.classList.remove('fa-circle-pause');
            currentIcon.classList.add('fa-circle-play');
        }

        currentAudio = new Audio(fileUrl)
        currentAudio.play();

        currentIcon = icon;
        
        currentIcon.classList.remove('fa-circle-play');
        currentIcon.classList.add('fa-circle-pause');
        console.log(`This is the current icon: ${currentIcon.classList}`)
    }

    currentAudio.onended = () => {
        icon.classList.remove('fa-circle-pause');
        icon.classList.add('fa-circle-play')
        currentAudio = null;
    };
}

function subscribe(code) {
    const codeLength = code.toString().length;
    console.log(`This is the code ${code}`)
    if (codeLength <= 3) {
      window.location.href = `tel:*812*${code}#`
    } else if (codeLength>3){
      window.location.href = `sms:811?&body= ${code}`;
    }
}
  
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const links = document.querySelectorAll('.links a');

    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const currentScrollTop = window.scrollY;

        if (currentScrollTop > lastScrollTop) {
            navbar.style.backgroundColor = 'rgba(0,0,0,0.5)';
             links.forEach(link => {
        link.style.color = 'white'; 
      });
        } else {
            navbar.style.backgroundColor = 'transparent';
            links.forEach(link => {
                link.style.color = 'hsl(205, 86%, 17%)';
            })
            
        }
        lastScrollTop = 0
    })
})
 
window.onload = fetchData;