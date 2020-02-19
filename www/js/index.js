const app = {
  pages: [],
  show: new Event('show'),
  init: () =>{
    app.fetchCall()

    //navigation
    app.pages = document.querySelectorAll('.page')
    app.pages.forEach((pg)=>{
      pg.addEventListener('show', app.pageShown)
    })
    document.querySelectorAll('.tab').forEach((btn)=>{
      let tsBtn = new tinyshell(btn)
      tsBtn.addEventListener('tap', app.nav)
      // btn.addEventListener('click', app.nav)
    })
    history.replaceState({}, 'home', '#home')
    
    // swiper 
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
    setTimeout((function () {
      this.parentElement.removeChild(this)
    }).bind(ev.currentTarget), 2500)
    app.nextProfile(ev)
    
  },
  right: function(ev){
    let cardInfo = ev.currentTarget
    console.log(cardInfo)
    cardInfo.classList.remove('active')
    cardInfo.classList.add('goright')
    setTimeout((function () {
      this.parentElement.removeChild(this)
    }).bind(ev.currentTarget), 2500)
    app.nextProfile(ev)
    //than have to add funcionality to save info to display on second page
  },
  nextProfile: function(ev){
    let nextCard = document.querySelector('.dot')
    nextCard.classList.remove('dot')
    nextCard.classList.add('active')
  },

  nav: function(ev){
    ev.preventDefault();
    let currentPage = ev.target.getAttribute('data-target')
    document.querySelector('.active').classList.remove('active')
    document.getElementById(currentPage).classList.add('active')
    history.replaceState({}, currentPage, `#${currentPage}`)
    document.getElementById(currentPage).dispatchEvent(app.show)
  },
  pageShown: function(ev){
    console.log('Page', ev.target.id, 'just shown')
  },

  fetchCall: () =>{
    let url = `http://griffis.edumedia.ca/mad9022/tundra/get.profiles.php?gender=female`
    fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      app.getData(data)
    })
    .catch(err =>{
      console.log(err)
    })
  },

  getData: (data) => {
    console.log(data)
                                          //im not calling this anywhere
    // document.querySelectorAll('.card').forEach((div)=>{
      let path = data.imgBaseURL

      data.profiles.forEach(element => {
        let decodedURL = decodeURIComponent(path);
        // console.log(decodedURL)
        let firstName = element.first
        let lastName  = element.last
        let distnce = element.distance
        // console.log(lastName)

        document.querySelectorAll('.card').forEach(()=>{
          let h2 = document.querySelector('h2')
          h2.textContent = firstName + " " +lastName
          let p = document.querySelector('p')
          p.textContent = "Distance: " + distnce
          let img = document.querySelector('img')
          img.src =  "https://" + decodedURL + element.avatar
          // console.log(img.src)
      })
    })
    // data.profiles.forEach(element => {
    //   let decodedURL = decodeURIComponent(path);
    //   // console.log(decodedURL)
    //   let firstName = element.first
    //   let lastName  = element.last
    //   let distnce = element.distance
    //   // console.log(lastName)
    //   let h2 = document.querySelector('h2')
    //   h2.textContent = firstName + " " +lastName
    //   let p = document.querySelector('p')
    //   p.textContent = "Distance: " + distnce
    //   let img = document.querySelector('img')
    //   img.src =  "https://" + decodedURL + element.avatar
    //   // console.log(img.src)
    // })
  }

};

document.addEventListener("DOMContentLoaded", app.init);



//////////////////////////////////////////////////////////////////
/////////////////////88888888888888888888888//////////////////////
/////////////////////////888888----888888/////////////////////////
/////////////////////88888888888888888888888//////////////////////

// document.addEventListener("DOMContentLoaded", () => {
//   let first = document.querySelector(".list-item:nth-of-type(1)");
//   let firstTinyShell = new tinyshell(first);
//   firstTinyShell.addEventListener("revealright", one);

//   let second = document.querySelector(".list-item:nth-of-type(2)");
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
