var app = {
    baseURL: null,
    active:"search",
    media:null,
    show: new Event('show'),//for Spa
    currentTrack: 1,
    pages: [],
    track: [
    {
        id: 0,
        artist: "Wu-Tang Clan",
        album: "Enter the Wu-Tang",
        title: 'C.R.E.A.M',
        duration: "4:06",
        seconds: 246,
        volume:0.5,
        src: 'file:///android_asset/www/media/cream.mp3'
    },
    {
        id: 1,
        artist: "Mac Miller",
        album: "Single",
        title: "Programs",
        duration: "3:10",
        seconds: 190,
        volume:0.5,
        src: 'file:///android_asset/www/media/programs.mp3'
    },
    {
        id: 2,
        artist: "The Bob Cats",
        album: "Bob Crosby & The Bob Cats",
        title: "Dear Hearts And Gentle People",
        duration: "2:33",
        seconds: 153,
        volume:0.5,
        src: 'file:///android_asset/www/media/DearHeartsAndGentlePeople.mp3'
    },
    {
        id: 3,
        artist: "Bon Jovi",
        album: "Slippery When Wet",
        title: "Wanted Dead Or Alive",
        duration: "5:07",
        seconds: 307,
        volume:0.5,
        src: 'file:///android_asset/www/media/WantedDeadOrAlive.mp3'
    },
    {
        id: 4,
        artist: "Dr. Dre",
        album: "Friday",
        title: "Keep Their Heads Ringin",
        duration: "3:30",
        seconds: 210,
        volume:0.5,
        src: 'file:///android_asset/www/media/KeepTheirHeadsRingin.mp3'
    }],

    status:{           //status and error codes
        '0':'MEDIA_NONE',
        '1':'MEDIA_STARTING',
        '2':'MEDIA_RUNNING',
        '3':'MEDIA_PAUSED',
        '4':'MEDIA_STOPPED'
    },
    err:{
        '1':'MEDIA_ERR_ABORTED',
        '2':'MEDIA_ERR_NETWORK',
        '3':'MEDIA_ERR_DECODE',
        '4':'MEDIA_ERR_NONE_SUPPORTED'
    },

    createElem: ()=>{     //creates all the elemnts on first page
        printSong = document.getElementById("songs");
        incrementVar = 0;
        app.track.forEach(element => {
            printLi = document.createElement("li");
            printSong.appendChild(printLi);
            printLi.setAttribute('data-id', incrementVar);
            printLi.setAttribute('data-href', "#");
            printLi.setAttribute('data-class', "listItms");
            incrementVar++;
            console.log(printLi);
            console.log(element);
            let img = document.createElement('img');
            img.src = "./img/music-icon.svg";
            let info = document.createElement('p');
            info.innerText = "Song name: " + element.title + "\n" + "Artist name: " + element.artist + "\n" + "Song duration: " + element.duration;
            printLi.appendChild(img);
            printLi.appendChild(info);
            console.log('li');
            printLi.addEventListener('click', function(ev){
                app.ready(ev);
                app.songInformation(element);
                document.querySelector('.active').classList.remove('active');
                document.getElementById("currentPlaying").classList.add('active');
            }); 
        });
    }, 

    songInformation: function(element){
        songInfo = document.getElementById("displayInfo"); 
        let artistInfo = document.createElement('h2'); //artist
        songInfo.appendChild(artistInfo);
        artistInfo.innerText = element.artist;
        let songName = document.createElement('h3');//song
        songInfo.appendChild(songName);
        songName.innerText = element.title;
        songDur = document.getElementById("songDuration");//durations
        let songLngth = document.createElement('p');
        songDur.appendChild(songLngth);
        other = "00:00 |~|_________________________|~| ";
        songLngth.innerText = other + element.duration;
    },

    init: function() { 
        //main function that makes sure all plugins are ready
        document.addEventListener('deviceready', app.ready, false);
        app.createElem();
        app.pages = document.querySelectorAll('.page');
        app.pages.forEach((pg)=>{
            pg.addEventListener('show', app.pageShown);
        })
        document.querySelectorAll('.menu-btn').forEach((link)=>{
            link.addEventListener('click',function(ev){
                app.nav(ev);
                document.getElementById('displayInfo').textContent="";
                document.getElementById('songDuration').innerText="";
            } );
        });
        history.replaceState({}, 'Home', '#home');
        window.addEventListener('hashchange', app.poppin);
    },

    nav: ev => {
        ev.preventDefault();
        let currentPage = ev.target.getAttribute('data-target');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(currentPage).classList.add('active');
        console.log(currentPage)
        history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById(currentPage).dispatchEvent(app.show);
    },
    pageShown: ev => {
        console.log('Page', ev.target.id, 'just shown')
        // let pageAnimate = ev.target.querySelector()
    },
    poppin: ev => {
        console.log(location.hash, 'popstate event')
    },

    ready: function(ev) {
        ev.preventDefault();
        let wasClicked = ev.target; //Wrong target?
        console.log("wasClicked is", wasClicked);
        let li = wasClicked.closest('[data-id]');
        let id = li.getAttribute('data-id');
        app.currentTrack = id;
        console.log(id);
        app.addListeners();
        let src = app.track[app.currentTrack].src;
        if(app.media !== null){  //makes sure two traks dont play simoltaniously
            app.media.release();
            app.media = null;
        }
        console.log(src);
        app.media = new Media(src, app.ftw, app.wtf, app.statusChange);  //play audio with plugin
        app.play();
        // app.timer();  
        // app.timerR();
    },

    isPaused : false,

    timer: function(ev){
            let timy = setInterval(app.showTime, 1000);
        // app.timerR();
    },
    showTime: function(ev){
            let playSec = app.track[app.currentTrack-1].seconds-- +0.5;
            let hours = Math.floor(playSec / 3600);
            let mins = Math.floor(playSec / 60);
            let secs = Math.floor(playSec % 60);
            let output = mins.toString().padStart(2, '0') + ':' + secs.toString().padStart(2, '0');
            console.log(output);
            songDur = document.getElementById("songDuration");//durations
            // let songDrtion = document.createElement('p');
            // songDrtion.setAttribute('data-id', "timeR");
            // songDrtion.setAttribute('data-class', "timER");
            // songDur.appendChild(songDrtion);
            other = "00:00 ~ ||___________________________________|| ~  ";
            songDur.innerText = other + output;
    },

    // timerStop: function(ev){
    //     let removeTimr = setInterval(app.showTime, 1000000);
    // },
    // // removeTimer: function(ev){        
    //     document.getElementById('songDuration').innerHTML= "";
    // },

    ftw: function(){
        console.log('success doing something');
        app.next();
    },
    next: ()=>{
        app.currentTrack++;
        if(app.currentTrack >= app.track.length){
            currentTrack=0;
        }
        app.play();
    },

    // prev: ()=>{
    //     app.currentTrack--;
    //     if(app.currentTrack < 0){
    //         app.currentTrack = app.track.length-1;
    //     }
    // },

    wtf: function(err){
        //failure of playback of media object
        console.warn('failure');
        console.error(err);
    },
    statusChange: function(status){
        // 
        if(app.status[status] === "MEDIA_STARTING"){
            let timy = setInterval(app.showTime, 1000);
            // app.timer();
        }else { //if(app.status[status] === "MEDIA_PAUSED")
            clearInterval(app.timy);
        }
        

        console.log('media status is now ' + app.status[status] );
    },

    addListeners: function(){
        document.querySelectorAll('#play-btn').forEach((link)=>{
            link.addEventListener('click', app.play);
        });
        document.querySelectorAll('#pause-btn').forEach((link)=>{
            link.addEventListener('click', app.pause);
        });
        // document.querySelector('#up-btn').addEventListener('click', app.volumeUp);
        // document.querySelector('#down-btn').addEventListener('click', app.volumeDown);
        document.querySelector('#ff-btn').addEventListener('click', app.ff);
        document.querySelector('#rew-btn').addEventListener('click', app.rew);
        document.addEventListener('pause', ()=>{
            app.media.release();
        });
        document.addEventListener('menubutton', ()=>{
            console.log('clicked the menu button');
        });
        document.addEventListener('resume', ()=>{
            app.media = new Media(src, app.ftw, app.wtf, app.statusChange);
        })
    },
    
    // media controls
    play: function(){
        app.media.play();
        app.isPaused == false;
    },
    pause: function(ev){
        app.media.pause();
        app.isPaused == true;
        console.log(app.isPaused)
        // app.isPaused = true;
        
        // app.timerStop();
    },
    ff: function(){
        app.media.getCurrentPosition((pos)=>{
            let dur = app.media.getDuration();
            console.log('current position', pos);
            console.log('duration', dur);
            pos += 10;
            if(pos < dur){
                app.media.seekTo( pos * 1000);
            }
        });
    },
    rew: function(){
        app.media.getCurrentPosition((pos)=>{
            let dur = app.media.getDuration();
            console.log('current position', pos);
            console.log('duration', dur);
            pos -= 10;
            if( pos > 0){
                app.media.seekTo( pos * 1000 );
            }
            else{
                app.media.seekTo(0);
            }
        });
    }
    // volumeUp: function(){
    //     app.track.forEach(element => {
    //         vol = element.volume;
    //         console.log('current volume', vol);
    //         vol += 0.1;
    //         if(vol > 1){
    //             vol = 1.0;
    //         }
    //         console.log(vol);
    //         app.media.setVolume(vol);
    //         element.volume = vol;
    //     });
    // },
    // volumeDown: function(){
    //     app.track.forEach(element => {
    //         vol = element.volume;
    //         console.log('current volume', vol);
    //         vol -= 0.1;
    //         if(vol < 0){
    //             vol = 0;
    //         }
    //         console.log(vol);
    //         app.media.setVolume(vol);
    //         element.volume = vol;
    //     });
    // },

};

document.addEventListener("DOMContentLoaded", app.init);