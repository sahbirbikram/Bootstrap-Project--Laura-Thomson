


  function openNav() {
    document.querySelector('.mobile-nav-toggle').style.display = 'none';
    // document.querySelector('.fa-times-circle').style.display = 'block';
    document.querySelector('#header').style.left = '0px';
  };

  function closeNav() {
    document.querySelector('.mobile-nav-toggle').style.display = 'block';
    // document.querySelector('.fa-times-circle').style.display = 'none';
    document.querySelector('#header').style.left = '-200px';
  };


document.addEventListener('DOMContentLoaded', function(){
  // the JavaScript you want to run after the page loads
  //================= Toggle Navigation ============================


  //================== End of Navigation Toggle ===========================

  //================== Scroll Spy =========================================

  let home = document.querySelector('#home');
  let about = document.querySelector('#about');
  let resume = document.querySelector('#resume');
  let portfolio = document.querySelector('#portfolio');
  let services = document.querySelector('#services');
  let contact = document.querySelector('#contact');

  let navClass = document.querySelectorAll(".nav-menu > ul > li > a");

  function addActive(n) {
    for(var i = 0; i < navClass.length; i++) {
      if(i === n) {
        navClass[n].classList.add('active-scroll');
      } else {
        navClass[i].classList.remove('active-scroll');
      }
    }

  }

  window.addEventListener('scroll', () => {
    var windo = window.pageYOffset;
    if(about.offsetTop <= windo && resume.offsetTop > windo){
      addActive(1);
    }

    else if(resume.offsetTop <= windo && services.offsetTop > windo){
      addActive(2);
    }

    else if(services.offsetTop <= windo && portfolio.offsetTop > windo){
      addActive(3);
    }

    else if(portfolio.offsetTop <= windo && contact.offsetTop > windo){
      addActive(4);
    }

    else if(contact.offsetTop <= windo && footer.offsetTop > windo){
      addActive(5);
    }

    else {
      addActive(0);
    }
  });

  

  //=================== End of Scroll Spy ==================================


  //=================== Testimonial Carousel ============================
  $(document).ready(function(){
    $('.owl-carousel').owlCarousel({
      autoplay: true,
      dots: true,
      loop:true,
      margin:10,
      responsive:{
          0:{
              items:1
          },
          768:{
              items:2
          },
          992:{
              items:3
          }
      }
  });
  });

  //============ End of Testimonial Carousel =========================


  //================= Back to top=====================================

  //Get the Button
  myButton = document.getElementById('myBtn');

  //When the user scrolls down 50px from the top of the document, show the button
  window.onscroll = function() {
  scrollFunction();
  };

  function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    myButton.style.display = "block";
  } else {
    myButton.style.display = "none";
  }
  }
  //================= End of Back to Top ==================================




}, false);


//=========== TypeWritter Effect ======================================
  const TypeWritter = function(txtElement, words, wait = 100) {

  this.txtElement = txtElement;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
}

// Type Method

TypeWritter.prototype.type = function() {

  // console.log('hello');
  //current index of words
  const current = this.wordIndex % this.words.length;

  //get full text of current word
  const fullTxt = this.words[current];

  //Check if deleting
  if(this.isDeleting) {
    //remove char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    //Add char
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  //Insert txt into element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`

  //Initial Type Speed
  let typeSpeed = 100;

  if(this.isDeleting) {
    typeSpeed /= 3;

  }

  //Check if word is complete
  if(!this.isDeleting && this.txt === fullTxt) {

    //Make a pause at end
    typeSpeed = this.wait;
    //set delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {

    this.isDeleting = false;

    //move to next word
    this.wordIndex++;
    //Pause before start typing
    typeSpeed = 500;
  }


  setTimeout(() => this.type(), typeSpeed)
}

// Init on DOM load
document.addEventListener('DOMContentLoaded', init);

//Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');

  //Init TypeWritter
  new TypeWritter(txtElement, words, wait);

};


//================= Form Validation ==========================================

const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const message = document.getElementById('message');


//Show input error message
function showError(input, message) {
  const formGroup = input.parentElement;
  input.className = 'form-control error';
  const small = formGroup.querySelector('small');
  small.style.display = 'block';
  small.innerText = message;
};

// Show success outline
function showSuccess(input) {
  const formGroup = input.parentElement;
  input.className = 'form-control success';
  const small = formGroup.querySelector('small');
  small.style.display = 'none';
};

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(re.test(input.value.trim())) {
    showSuccess(input);
    
  } else {
    showError(input, 'Email is not valid !!!');
  }
    
};

function checkEmpty(inputArr) {
  inputArr.forEach(function(input) {

    if(input.value.trim() === '' && input.id === 'email') {
      showError(input, 'Please enter a valid email.');      
    } else if (input.id === 'email') {
      checkEmail(input);
    } else if(input.value.trim() === '' && input.id === 'message') {
      showError(input, 'Please write something for us.');
    } else if(input.id === 'name') {
      checkLength(input, 4, 15);
    } else if(input.id === 'subject') {
      checkLength(input, 4, 25);
    } else {
      showSuccess(input);
      console.log('I am active');
      
    }
  });
};

//Get FieldName
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

// Check Input Length
function checkLength(input, min, max) {
  if(input.value.length < min) {
    showError(input,  `${getFieldName(input)} must be atleast ${min} characters.`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  checkEmpty([name, email, subject, message]);

});

//==============================================================================================
















