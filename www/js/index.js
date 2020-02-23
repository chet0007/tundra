const app = {

  globalStart: false,
  profiles: [],
  path: null,
  savedProfiles: [],

  init: () =>{
    app.fetchCall()

    //navigation
    document.querySelectorAll('.tab').forEach((btn)=>{
      // let tsBtn = new tinyshell(btn)
      // tsBtn.addEventListener('tap', app.nav)
      btn.addEventListener('click', app.nav)
    })   
  },

  nav: function(ev){
    ev.preventDefault();
    let currentPage = ev.target.getAttribute('data-target')
   
    //had to add .page otherwise it deleted the active
    //off of the card class before the page class, causing 
    //glitches when navigating between the two tabs. Solid 
    //high five to myself! extra makrs?? Steve ?
    document.querySelector('.page.active').classList.remove('active')
    document.getElementById(currentPage).classList.add('active')
  },

  fetchCall: () =>{
    let url = `http://griffis.edumedia.ca/mad9022/tundra/get.profiles.php?gender=female`
    fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data.profiles)
      app.profiles = app.profiles.concat(data.profiles)
      app.path = "https://" + decodeURIComponent(data.imgBaseURL)
      // console.log(app.path)
      if (app.globalStart === false){
        app.buildCard()
        app.globalStart = true
      }
    })
    .catch(err =>{
      console.log(err)
    })
  },

  buildCard: () => {
    let homeDiv = document.getElementById('home')

    let cardDiv = document.createElement('div')
    cardDiv.setAttribute("class", 'card fixed active')
    homeDiv.appendChild(cardDiv)

    let header = document.createElement('header')
    
    let h2Content = document.createElement('h2')
    header.appendChild(h2Content)

    let imgContent = document.createElement('img')
    imgContent.setAttribute("src", '=/www/img/logo.png')
    imgContent.setAttribute("alt", 'Emoji')
    imgContent.setAttribute("class", 'round')
   
    let pContent = document.createElement('p')

    cardDiv.appendChild(header)
    cardDiv.appendChild(imgContent)
    cardDiv.appendChild(pContent)
    // console.log(cardDiv)

    let person = app.profiles[0];
    let firstName = person.first
    let lastName  = person.last
    let distnce = person.distance
    let h2 = document.querySelector('h2')
    h2.textContent = firstName + " " +lastName
    let p = document.querySelector('p')
    p.textContent = "Distance: " + distnce
    let img = document.querySelector('img')
    img.src = app.path + person.avatar;

    // swiper no swiping
    document.querySelectorAll('.card').forEach((swipe)=>{
    let tsSwiper = new tinyshell(swipe)
    tsSwiper.addEventListener('swipeleft', app.left)
    tsSwiper.addEventListener('swiperight', app.right)
  })
  },

  left: function(ev){
    let cardInfo = ev.currentTarget
    // console.log(cardInfo)
    cardInfo.classList.remove('active')
    cardInfo.classList.add('goleft')
    console.log(app.profiles)
    app.spliceCall()
    document.getElementById("negative-swipe").classList.remove('hideSwipe');
    document.getElementById("negative-swipe").classList.add('showSwipe');

    setTimeout((function () {
      this.parentElement.removeChild(this)
      document.getElementById("negative-swipe").classList.remove('showSwipe');
      document.getElementById("negative-swipe").classList.add('hideSwipe');
      app.buildCard()
    }).bind(ev.currentTarget), 500)    
  },

  right: function(ev){
    let cardInfo = ev.currentTarget
    // console.log(cardInfo)
    cardInfo.classList.remove('active')
    cardInfo.classList.add('goright')
    console.log(app.profiles)
    app.createList(ev)
    app.spliceCall()
    document.getElementById("positive-swipe").classList.remove('hideSwipe');
    document.getElementById("positive-swipe").classList.add('showSwipe');
    setTimeout((function () {
      this.parentElement.removeChild(this)
      document.getElementById("positive-swipe").classList.remove('showSwipe');
      document.getElementById("positive-swipe").classList.add('hideSwipe');
      app.buildCard()
    }).bind(ev.currentTarget), 500)
  },
  
  createList: function(ev){
    prof = app.profiles[0]
    // console.log(prof)
    let str = JSON.stringify(prof)
    sessionStorage.setItem("cardProfile", str)
    let crdProf = sessionStorage.getItem("cardProfile")
    savedCard = JSON.parse(crdProf)
    console.log(savedCard)
     
    //to delete use li.innerhtml=
    //creating the list item
    let ul = document.querySelector('.list-view')
    let li = document.createElement('li')
    li.setAttribute("class", 'list-item')
    li.setAttribute("id", savedCard.id)
    ul.appendChild(li)
    
    let divTwo = document.createElement('div')
    divTwo.setAttribute("class", 'list-text')
    let firstN = savedCard.first
    let lastN = savedCard.last
    divTwo.textContent = firstN + " " + lastN

    let divThree = document.createElement('div')
    divThree.setAttribute("class", 'action-left')
    let avatar = document.createElement('img')
    avatar.setAttribute("src", '')
    avatar.setAttribute("alt", 'happy')
    avatar.setAttribute("class", 'avatar')
    avatar.src = app.path + savedCard.avatar
    divThree.appendChild(avatar)

    let divOne = document.createElement('div')
    divOne.setAttribute("class", 'action-right')
    let icon = document.createElement('i')
    icon.setAttribute("class", 'icon delete')

    divOne.appendChild(icon)
    
    li.appendChild(divTwo)
    li.appendChild(divThree)
    li.appendChild(divOne)

  
    icon.addEventListener('click', function(ev){
      let elementId = ev.currentTarget.parentElement.parentElement.getAttribute('id')
      app.removeElement(elementId)
    })     
  },

  removeElement: function(elementId) {
    // Removes an element from the document
    let element = document.getElementById(elementId)
    element.parentNode.removeChild(element)
  },

  spliceCall: function(){
    app.profiles.splice(0, 1)
    if (app.profiles < 3){
      app.fetchCall()
    }
  }
};

document.addEventListener("DOMContentLoaded", app.init);