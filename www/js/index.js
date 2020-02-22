const app = {

  globalStart: false,
  profiles: [],
  path: null,

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
    console.log(cardDiv)

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
    console.log(cardInfo)
    cardInfo.classList.remove('active')
    cardInfo.classList.add('goleft')
    console.log(app.profiles)
    app.spliceCall()
    setTimeout((function () {
      this.parentElement.removeChild(this)
      app.buildCard()
    }).bind(ev.currentTarget), 500)    
  },

  right: function(ev){
    let cardInfo = ev.currentTarget
    console.log(cardInfo)
    cardInfo.classList.remove('active')
    cardInfo.classList.add('goright')
    console.log(app.profiles)
    app.createList(ev)
    app.spliceCall()
    setTimeout((function () {
      this.parentElement.removeChild(this)
      app.buildCard()
    }).bind(ev.currentTarget), 500)
  },
  
  createList: function(ev){
    prof = app.profiles[0]
    // console.log(prof)
   
    let str = JSON.stringify(prof)
    sessionStorage.setItem("cardProfile", str)
    let crdProf = sessionStorage.getItem("cardProfile")
    console.log(crdProf)
     
    //to delete use li.innerhtml=
     
    //creating the list item
    let ul = document.querySelector('.list-view')
      
    let li = document.createElement('li')
    li.setAttribute("class", 'list-item has-reveal-left')
    ul.appendChild(li)
    let divOne = document.createElement('div')
    divOne.setAttribute("class", 'reveal-left')
    let icon = document.createElement('i')
    icon.setAttribute("class", 'icon delete')
    divOne.appendChild(icon)

    let divTwo = document.createElement('div')
    divTwo.setAttribute("class", 'list-text')

    let divThree = document.createElement('div')
    divThree.setAttribute("class", 'action-right')
    let avatar = document.createElement('img')
    avatar.setAttribute("src", '')
    avatar.setAttribute("alt", 'happy')
    avatar.setAttribute("class", 'avatar')
    divThree.appendChild(avatar)
    li.appendChild(divOne)
    li.appendChild(divTwo)
    li.appendChild(divThree)

    app.profiles.forEach((crdProf) => {
      let firstN = crdProf.first
      let lastN = crdProf.last
      let textDiv = document.querySelector('.list-text')
      textDiv.textContent = firstN + " " + lastN
      
      let imG = document.querySelector('.avatar')
      imG.src = app.path + crdProf.avatar
      
      // console.log(ul)
      console.log(textDiv)
    })
   

  },

  spliceCall: function(){
    app.profiles.splice(0, 1)
    if (app.profiles < 3){
      app.fetchCall()
    }
  }

};

document.addEventListener("DOMContentLoaded", app.init);



//////////////////////////////////////////////////////////////////
/////////////////////88888888888888888888888//////////////////////
/////////////////////////888888----888888/////////////////////////
/////////////////////88888888888888888888888//////////////////////

// document.addEventListener("DOMContentLoaded", () => {
//   let second = document.querySelector(".list-item:nth-of-type(2)")
//   let secondTinyShell = new tinyshell(second);
//   secondTinyShell.addEventListener("revealleft", one);

//   let third = document.querySelector('.list-item:nth-child(3)');
//   let thirdTinyShell = new tinyshell(third);
//   thirdTinyShell.addEventListener('tap', one);

//   let fourth = document.querySelector('.list-item:nth-child(4)');
//   let fourthTinyShell = new tinyshell(fourth);
//   fourthTinyShell.addEventListener('swipeleft', left);
//   fourthTinyShell.addEventListener('swiperight', right);
// });

// function one(ev) {
//   console.log("function one called by event ", ev);
//   let p = document.querySelector('.content p').textContent = JSON.stringify(ev, '\t', 2);
// }

// function left(ev) {
//   //swiped left... add the class 'goleft' to the element
//   let li = ev.currentTarget;
//   console.log(li);
//   li.classList.add('goleft');
//   setTimeout((function () {
//     this.parentElement.removeChild(this);
//   }).bind(ev.currentTarget), 500);
// }

// function right(ev) {
//   //swiped left... add the class 'goleft' to the element
//   let li = ev.currentTarget;
//   console.log(li);
//   li.classList.add('goright');
//   setTimeout((function () {
//     this.parentElement.removeChild(this);
//   }).bind(ev.currentTarget), 500);
// }
