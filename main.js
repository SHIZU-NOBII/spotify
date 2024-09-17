// PLAY MUSIC 
let curruntSong = new Audio()

let songs;

  // TIME TO MINTUES SECONDS FUNCTION 

function secondsToMintuesSecond(second){

  if (isNaN(second) || second < 0){
    return 'Invalid Input'
  }else{

  const mintues = Math.floor(second / 60)
  const remainingSeconds = Math.floor(second % 60)

  
  const formatedMintues = String(mintues).padStart(2, '0')    
  const formatedSeconds = String(remainingSeconds).padStart(2, '0')

  return `${formatedMintues}:${formatedSeconds}`
  }
}



// GET SONGS FROM URL 

async function getSongs() {
  let a = await fetch('http://127.0.0.1:5500/songs/')
  let response = await a.text();
  let div = document.createElement('div')
  div.innerHTML = response;
  let as = div.getElementsByTagName('a')
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith('.mp3')) {
      songs.push(element.href.split('/songs/')[1].replaceAll('%20', ' '))
    }

  }

  return songs;

}

// PLAY MUSIC FUNCTION
let playMusic = (track, pause=false)=>{
  curruntSong.src ='/songs/' + track;
  if(!pause){
    curruntSong.play();
    play.src = ('img/pause.svg');
  }
  document.querySelector('.songName').innerHTML = track;
  document.querySelector('.songTime').innerHTML = '00:00 / 00:00';
  
}


async function main() {

  
  // SONG LIST
  songs = await getSongs();
  // PLAY THE FIRST SONG AUTO MATCI WHEN USER CLICK ON PLAY BUTTON 
  playMusic(songs[0], true)

  // SHOW SONG IN THE MUSIC LIBRARY

  let songUl = document.querySelector('.songList').getElementsByTagName('ul')[0]
  for (const song of songs) {
    songUl.innerHTML = songUl.innerHTML + `
                              <li>
                                <img src="./img/music.svg" alt="" class="invert">
                                <div class="info">
                                   <div>${song}</div>
                                    <div>Bilal Hassan</div>
                                </div>
                                <div class="playnow">
                                   <span>Play Now</span>
                                   <img src="./img/play.svg" alt="" class="invert">
                                 </div>
                              </li>`
  }

  // ATTACH EVENT LISTENER TO EACH SONG

  Array.from(document.querySelector('.songList').getElementsByTagName('li')).forEach(e=>{
    e.addEventListener('click', ()=>{
      playMusic(e.querySelector('.info').firstElementChild.innerHTML.trim());
      
      
    })
})

// ATTACH AN EVEMT LISTENER TO PREVIOUS NEXT AND PLAY BUTTON

play.addEventListener('click', ()=>{
  if(curruntSong.paused){
    curruntSong.play();
    play.src = ('img/pause.svg')
    
  }else {
    curruntSong.pause()
    play.src = ('img/play.svg')
    
  }
  
})

 // NEXT PREVUORS SONG FUNCTION

previous.addEventListener('click', ()=>{
  console.log('Previous Clicked');
  let index = songs.indexOf(  curruntSong.src.replaceAll('%20', ' ').split('/').slice(-1)[0])
  console.log(songs, index);
  if((index-1) >= length){
        playMusic(songs[index-1])
  }
  
  
 })

 next.addEventListener('click', ()=>{
  console.log('Next Clicked');
  let index = songs.indexOf(  curruntSong.src.replaceAll('%20', ' ').split('/').slice(-1)[0])
  console.log(songs, index);
  if((index+1) > length){
        playMusic(songs[index+1])
  }
  
  
 })

 //CRUNNT SONG TIME UPDATE FUNCTION
curruntSong.addEventListener('timeupdate' ,()=>{
  document.querySelector('.songTime').innerHTML = `${
    secondsToMintuesSecond(curruntSong.currentTime)
  }:${secondsToMintuesSecond(curruntSong.duration)}`

  document.querySelector('.circle').style.left = (curruntSong.currentTime / curruntSong.duration) * 100 + '%';
  
})
  document.querySelector('.seekbar').addEventListener('click', e=>{
    let percent = (e.offsetX/e.target.getBoundingClientRect().width)* 100;
    document.querySelector('.circle').style.left = percent + '%';
    curruntSong.currentTime = (curruntSong.duration * percent) / 100 ;
   
})



}

document.querySelector('.hamburger').addEventListener('click', ()=>{
  document.querySelector('.left-side').style.left = '0';
})

document.querySelector('.close').addEventListener('click', ()=>{
  document.querySelector('.left-side').style.left = `-100%`
})


main()