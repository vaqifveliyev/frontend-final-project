let btnSideBar = document.querySelector('.btnopen');
let sideBar = document.querySelector('.side-bar');
let btnClose = document.querySelector('.btnClose');
let sideBarSection = document.querySelector('.side-bar-menu-section');


btnSideBar.addEventListener('click', ()=> {
    sideBarSection.classList.add('open');
    sideBar.classList.add('open');
})

btnClose.addEventListener('click', ()=> {
    sideBar.classList.remove('open'); 
    sideBarSection.classList.remove('open');
})



/* SCROLL UP BUTTON SCRIPT */

let scrollUpButton = document.getElementById('scrollUpButton');


window.addEventListener('scroll', function() {
  if (window.pageYOffset > 100) {
    scrollUpButton.classList.add('active');
  } else {
    scrollUpButton.classList.remove('active');
  }
});


scrollUpButton.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

window.addEventListener('scroll', function() {
  let header = document.querySelector('header');
    let headerTop = document.querySelector('.header-top');
  
    if (window.pageYOffset > 100) {
      header.classList.add('pinned');
      headerTop.style.display = 'none';
    } else {
      header.classList.remove('pinned');
      headerTop.style.display = 'block';
    }
  });

  /*-------------------------------------------*/

var caretIcons = document.querySelectorAll('.fa-caret-down');

caretIcons.forEach(function(icon) {

    icon.addEventListener('click', function() {
      let parentLi = icon.closest('li'); 
      let dropdown = parentLi.querySelector('.mobile-dropdown'); 
        dropdown.classList.toggle('open');
        icon.classList.toggle('fa-caret-down');
        icon.classList.toggle('fa-caret-up');
    });
});


/* SWIPER AND CONTROL */

document.addEventListener("DOMContentLoaded", function() {
  let swiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
      nextEl: '.custom-swiper-button-next',
      prevEl: '.custom-swiper-button-prev',
    },
  });

  let nextButton = document.getElementById('nextButton');
  let prevButton = document.getElementById('prevButton');

  nextButton.addEventListener('click', function() {
    swiper.slideNext();
  });

  prevButton.addEventListener('click', function() {
    swiper.slidePrev();
  });
});

/* WHITE DIV */

document.addEventListener('DOMContentLoaded', function() {
  let divLeft = document.querySelector('.div-left');
  let divRight = document.querySelector('.div-right');

  setTimeout(function() {
    divLeft.style.width = '0%';
    divRight.style.width = '0%';
  }, 1000);
});


/*----------------------------------------------------------------------------------*/

  

let blogLinks = document.querySelectorAll('.blog-link');


blogLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault(); 


    let href = link.getAttribute('href');

    fetch(href)
      .then(response => response.text())
      .then(data => {

        let blogDetailsContainer = document.querySelector('.blog-details-container');
        blogDetailsContainer.innerHTML = data;
      })
      .catch(error => console.error(error));
  });
});



fetch('posts.json')
  .then(response => response.json())
  .then(data => {
    let articlesContainer = document.getElementById('articles-container');
    let articles = data.articles;

    articles.forEach(article => {
      let articleHTML = `
        <article>
          <div class="article-inner">
            <div class="blog-header">
              <div class="thumbnail">
                <img src="${article.thumbnail}" alt="">
              </div>
              <div class="blog-info">
                <div class="user">
                  <i class="fa-solid fa-circle-user"></i>
                  <span>by ${article.author}</span>
                </div>
                <div class="tag">
                  <i class="fa-solid fa-tag"></i>
                  <span>${article.category}</span>
                </div>
              </div>
              <div class="date">
                <h6>${article.date.day}</h6>
                <span>${article.date.month}</span>
              </div>
            </div>
            <div class="blog-body">
              <a class="blog-link" href="blog-details.html?slug=${encodeURIComponent(article.slug)}">${article.title}</a>
            </div>
          </div>
        </article>
      `;

      articlesContainer.innerHTML += articleHTML;
    });
  })
  .catch(error => console.error(error));


fetch('posts.json')
  .then(response => response.json())
  .then(data => {
    let recentPostsContainer = document.querySelector('.recent-section .body');
    let articles = data.articles;


    articles.sort((a, b) => {
      let dateA = new Date(`${a.date.month} ${a.date.day}, 2023 ${a.date.time}`);
      let dateB = new Date(`${b.date.month} ${b.date.day}, 2023 ${b.date.time}`);
      return dateB - dateA;
    });


    articles.slice(0, 4).forEach(article => {
      let recentPostHTML = `
        <article>
          <div class="thumbnail">
            <img src="${article.thumbnail}" alt="">
          </div>
          <div class="content-area">
            <div class="date">
              <i class="fa-regular fa-clock"></i>
              <span>${article.date.day} ${article.date.month}, 2023</span>
            </div>
            <div class="title">
              <h6>${article.title}</h6>
            </div>
          </div>
        </article>
      `;

      recentPostsContainer.innerHTML += recentPostHTML;
    });
  })
  .catch(error => console.error(error));

  



let urlParams = new URLSearchParams(window.location.search);
let slug = urlParams.get('slug');


fetch('posts.json')
  .then(response => response.json())
  .then(data => {
    let articles = data.articles;


    let article = articles.find(article => article.slug === slug);

    if (article) {

      let articleHTML = `
        <div class="blog-details-inner">
          <div class="thumbnail">
              <img src="${article.thumbnail}" alt="">
          </div>
          <div class="blog-content">
              <div class="user-info">
                  <div class="single">
                      <i class="fa-solid fa-circle-user"></i>
                      <span>by ${article.author}</span>
                  </div>
                  <div class="single">
                      <i class="fa-regular fa-clock"></i>
                      <span>${article.date.day} ${article.date.month}, ${article.date.time}</span>
                  </div>
                  <div class="single">
                      <i class="fa-solid fa-tag"></i>
                      <span>${article.category}</span>
                  </div>
              </div>
              <h3>${article.title}</h3>
              <p>
                  ${article.p1}
              </p>
              <p>
                  ${article.p2}
              </p>
              <div class="bottom-row">
                  <div class="left-side">
                      <div class="details-tag">
                          <h6>Tags:</h6>
                          <button>Services</button>
                          <button>Services</button>
                          <button>Services</button>
                      </div>
                  </div>
                  <div class="right-side">
                      <div class="details-share">
                          <h6>Share:</h6>
                          <i class="fa-brands fa-facebook-f"></i>
                          <i class="fa-brands fa-twitter"></i>
                          <i class="fa-brands fa-instagram"></i>
                          <i class="fa-brands fa-linkedin-in"></i>
                      </div>
                  </div>
              </div>
              <div class="author-area">
                  <div class="thumbnail">
                      <img src="./assets/images/backgrounds/author.jpg" alt="">
                  </div>
                  <div class="author-details">
                      <span>Brand Designer</span>
                      <h5>Angelina H. Dekato</h5>
                      <p>
                          Nullam varius luctus pharetra ultrices volpat facilisis donec tortor, nibhkisys
                          habitant curabitur at nunc nisl magna ac rhoncus vehicula sociis tortor nist
                          hendrerit molestie integer.
                      </p>
                  </div>
              </div>
          </div>
  </div>
      `;


      let blogDetailsContainer = document.querySelector('.blog-details-container');
      blogDetailsContainer.innerHTML = articleHTML;
    } else {

      let blogDetailsContainer = document.querySelector('.blog-details-container');
      blogDetailsContainer.innerHTML = `

      <style>
    .alert {
      padding: 15px;
      border: 1px solid transparent;
      border-radius: 4px;
      margin-bottom: 15px;
    }
    
    .alert-danger {
      color: #721c24;
      background-color: #f8d7da;
      border-color: #f5c6cb;
    }
    
    .alert strong {
      font-weight: bold;
    }
    
    .closebtn {
      float: right;
      font-size: 20px;
      font-weight: bold;
      line-height: 1;
      color: #000;
      text-decoration: none;
    }
    
    .closebtn:hover {
      color: #721c24;
    }
    
    </style>
    
      <div class="alert alert-danger">
      <b>Blog</b> not found!
    </div>

    
    `;
    }
  })
  .catch(error => console.error(error));
