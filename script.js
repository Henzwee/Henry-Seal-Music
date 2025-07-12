// ——— Global helper functions ———

function handleHeaderVideoScroll() {
  const scrollY   = window.scrollY;
  const maxScroll = 1400;
  const darkness  = Math.min(scrollY / maxScroll, 1);
  const video     = document.querySelector('.header-video') || document.querySelector('.header-video.mobile');
  const overlay   = document.getElementById('headerOverlay');
  const body      = document.body;

  if (!video || !overlay || !body) return;

  if (body.classList.contains('home-page')) {
    const blur = Math.min(scrollY / 40, 8);
    video.style.filter = `blur(${blur}px)`;
    overlay.style.opacity = darkness;
  } else if (body.classList.contains('listen-page')) {
    video.style.filter = `blur(8px)`;
    overlay.style.opacity = darkness; // ✅ fade to black on scroll
  } else if (body.classList.contains('contact-page')) {
    video.style.filter = `blur(8px)`;
    overlay.style.opacity = 0; // 🚫 no fade on contact page
  }
}



function setFixedVH() {
  const vh = window.innerHeight;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  const header = document.querySelector('.header');
  if (header) {
    header.style.height    = `${vh}px`;
    header.style.maxHeight = `${vh}px`;
  }
}

function handleScroll(albumTexts) {
  const windowHeight = window.innerHeight;
  albumTexts.forEach(text => {
    const rect = text.parentElement.getBoundingClientRect();
    text.style.opacity = (rect.top < windowHeight * 0.9 && rect.bottom > -windowHeight * 0.4)
      ? '1'
      : '0';
  });
}

// ——— Main initialization ———

document.addEventListener('DOMContentLoaded', () => {
  handleHeaderVideoScroll();
  window.addEventListener('scroll', handleHeaderVideoScroll);
  window.addEventListener('load', handleHeaderVideoScroll);
  setFixedVH();
  window.addEventListener('resize', setFixedVH);

  // Contact form logic
  const form = document.querySelector('.contact-form');
  const successMsg = document.getElementById('successMessage');
  const errorMsg = document.getElementById('errorMessage');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        if (response.ok) {
          successMsg.style.display = 'block';
          errorMsg.style.display = 'none';
          form.reset();
        } else {
          throw new Error('Submission failed');
        }
      } catch (error) {
        successMsg.style.display = 'none';
        errorMsg.style.display = 'block';
      }
    });
  }

  // Stop if not listen page
  if (!document.body.classList.contains('listen-page')) return;

  // --- Music Player Setup ---

  const songs = [
    {
        title: "Father Time",
        album: "Everything We've Learned So Far",
        file: "website-music/fatherTime.mp3",
        image: "EWLSF.png",
        lyrics: `Smaller percentage \nyear by year\nYou must take advantage\nit will soon be near\nInevitable sleep\nInevitable weeping\n\nThe price of a thing\nis the life we exchange\nThrough the joy and the pain\nwe try our best to arrange\nAs if we had control\nAs if there was a loophole\n\nFather Time doesn't care\nI'm not invincible\nAnymore\nOh no not anymore\n\nI get the dilemma\nIt can feel like a chore\nIt's a rough rough river\nI'll be down by the shore\n\nFather Time doesn't care\nI'm not invincible\nNot like I used to be\nNo, not like I used to be\n\nFather Time doesn't care\nI'm not invincible\nAnymore\nAnd I won't be ever again`
      },
      {
        title: "Take it Easy",
        album: "Everything We've Learned So Far",
        file: "website-music/takeItEasy.mp3",
        image: "EWLSF.png",
        lyrics: `Just take it easy\nYou need to take it slow\nYou've been acting crazy\nAnd you don't even seem to know\n\nIt doesn't have to end this way\nBut you don't seem to care\n\nYou broke my illusion\nOf what it means to live\nMaybe I should thank you\nI'm tough but negative\n\nI've built my walls high\nNothing in or out\nBut you won't turn me\nI've got no more doubt\n\nJust make this breezy\nDon't make it a show\nThe past now getting hazy\nI never thought you'd go so low\n\nAre you the hunter or the prey?\nDo you really think this is fair?\nNo don't you dare\n\nYou broke my illusion\nOf what it means to live\nMaybe I should thank you\nI'm tough but negative\n\nI've built my walls high\nNothing in or out\nBut you won't turn me\nI've got no more doubt`
      },
      {
        title: "Wasting Away",
        album: "Everything We've Learned So Far",
        file: "website-music/wastingAway.mp3",
        image: "EWLSF.png",
        lyrics: `Washing away your sins\nIn the shower and sink\nAs if that could make a difference\n\nTrying to slow down the future\nLike a master of time\nBut looks to me like you're wasting away\n\nGoodbye dear life\nIs what I hear you say when you're\nWasting away\n\nI know it's been a hard hard time\nBut if you don't move on you'll be\nWasting away\n\nIf it were a perfect world\nI'd have no problem with it but you're\nWasting away\n\nYou can hide in your dark room\nBut the world goes on\nBest join too while you still can\n\nOr just sit down and ponder\nYour next move or two\nBut if you don't act you'll be wasting away\n\nGoodbye dear life\nIs what I hear you say when you're\nWasting away\n\nI know it's been a hard hard time\nBut if you don't move on you'll be\nWasting away\n\nIf it were a perfect world\nI'd have no problem with it but you're\nWasting away\n\nWasting away`
      },
      {
        title: "Breathe",
        album: "Everything We've Learned So Far",
        file: "website-music/breathe.mp3",
        image: "EWLSF.png",
        lyrics: "stay sharp"
      },
      {
        title: "Digital Lies",
        album: "Everything We've Learned So Far",
        file: "website-music/digitalLies.mp3",
        image: "EWLSF.png",
        lyrics: `The glass slides on your skin\nDo you know its origin?\nJust wait\nThere'll be a post about it soon.\n\nHours feel like minutes\nThanks to a couple digits\nIn the blink of an eye\nRecognize a tune\n\nBuilding your whole image\nForgetting the real privilege\nBut I'm glad we know\nhow you spent the afternoon\n\nTo make it all easy\nIs that what you see?\nIt's like a disease and\nNobody is immune\n\nYour fake life\nYour constant highs\nWhat do you have to gain from\nThese Digital Lies?\n\nRemember the good old days\nSitting in the backyard dreaming\nWith your eyes still open.\n\nOr the figure\nJumping and swinging right by the car\nBoy how he could move\nWhile still looking right at you\n\nBut now we are mature\nThis is how we learn\nOr at least it's how\nWe debate on what is real\n\nWe're so connected\nThat's if you've been selected\nAnd even then\nI'm not sure if that's really how you feel\n\nYour fake life\nYour constant highs\nWhat do you have to gain from\nThese Digital Lies?\n\nRealize\nIt's no prize\nEvery time you post your cries\nIt's to no one's surprise\n\nThe power that we hold\nIt can make us bold\nBut it takes real thought\nTo decide in what way\n\nYou can spot the craze\nAnd feel your sinking gaze\nHard part is\nCan you step away?\n\nRemember it's a tool\nOne that can make you a fool\nYou just can't believe\nWhatever people say\n\nYour fake life\nYour constant highs\nWhat do you have to gain from\nThese Digital Lies?\n\nRealize\nIt's no prize\nEvery time you post your cries\nIt's to no one's surprise`
      },
      {
        title: "Lay it Down",
        album: "Everything We've Learned So Far",
        file: "website-music/layItDown.mp3",
        image: "EWLSF.png",
        lyrics: `Damned if you don't\nDamned if you do\n\nAlways greener\nOn the other side\n\nLay it down\nMake a sound\nIf you don't\nIt will go round\n\nAnd round\nAnd round\nAnd round\nAnd round\nAnd lay it down\n\nNo one cares if you\nTry or not so try\n\nEither way your\nHappiness lays inside\nInside\n\nLay it down\nMake a sound\nIf you don't\nIt will go round\n\nAnd round\nAnd round\nAnd round\nAnd round\nAnd lay it down\n\nIt will go round\nAnd round\nAnd round\nAnd round\nAnd round\nAnd round\nIt goes`
      },
      {
        title: "Everything We've Learned So Far",
        album: "Everything We've Learned So Far",
        file: "website-music/ewlsf.mp3",
        image: "EWLSF.png",
        lyrics: `I've got a rough angry letter\nthat I wrote for god\nbut when I learned she wouldn't read it\nI resorted to song\n\nwhen I said that I could sing\nyou asked if I was insane\nyou said the cut throat business\nis always the same\n\nhere I thought\n20 years was a plenty long while\nto get your shit together\nand stop acting like a child\n\nbut I can see\nthat it's longer than that\nmatter fact it's how you act\nwhen you're given a chance\n\ncause it's only everything\nwe've learned so far\nI've got more in the chamber\nI'm not the one who's in danger\n\ncause it's only everything\nwe've feared so far\nthere's an endless remainder\nif I'm the wall you're the painter\n\ndo you ever look back\nwonder what you could do\na new plan of attack\na different point of view\n\nit's too late\nthere's a path sitting in front of you\nyou can't get too attached\nlearn to enjoy the few\n\nbut I can see\nthat it's harder than that\nmatter fact it's harder yet\nwhen you're given a chance\n\ncause it's only everything\nwe've learned so far\nI've got more in the chamber\nI'm not the one who's in danger\n\ncause it's only everything\nwe've feared so far\nthere's an endless remainder\nif I'm the wall you're the painter\n\ncause it's only everything\nwe've learned so far\nI've got more in the chamber\nI'm not the one who's in danger\n\ncause it's only everything\nwe've feared so far\nthere's an endless remainder\nif I'm the wall you're the painter` 
      },
      {
        title: "On and On",
        album: "On and On - Single",
        file: "website-music/onAndOn.mp3",
        image: "OnAndOn.png",
        lyrics: `Why have you\ntaken me to this place?\nBlaming you\nfor making me a disgrace\n\nYou have ruined love\nbefore for me\nI'm begging you now\nwon't you set me free?\n\nThis could just go on and on forever\nI surely will not make it out of this endeavor\n\nThis could just go on and on\nwhen will it be over?\nThis could just go on and on\nwhen will it be over?\nThis could just go on and on\nwhen will it be over?\nThis could just go on and on\nwhen will it be over?\n\nYou're haunting me\nwhen I am trying to sleep\nIs there hope\nor am I in too deep?\n\nMy heart is racing,\nand it's getting faster.\nWhen it comes to fear\noh baby, you are the master.\n\nThis could just go on and on forever.\nI surely will not make it out of this endeavor.\n\nThis could just go on and on\nwhen will it be over?\nThis could just go on and on\nwhen will it be over?\nThis could just go on and on\nwhen will it be over?\nThis could just go on and on\nwhen will it be over?\nThis could just go on and on\nwhen will it be over?\nThis could just go on and on\nwhen will it be over?\nThis could just go on and on\nwhen will it be over?\nThis could just go on and on\nwhen will it be over?`
      },
      {
        title: "The Fool",
        album: "Public Outrage",
        file: "website-music/theFool.mp3",
        image: "outrage.jpg",
        lyrics: `Look in the mirror\nWhat do I see\nI see a man there\nAnd he's looking at me\nAnd he's wondering\nWhat he's supposed to be\n\nHit on the beat\nStrum on the beat\nYou're going to need this\nWhen cowering\nAnd left wondering\nWhat is left to see\n\nBeautiful girl\nWhat in the world\nAm I supposed to do\n\nDon't look at me\nPlease set me free\nI'm sinking in your eyes\n\nI am a joke\nPlease let me choke\nEven if it's you\n\nI don't mind\nI just hope I find\nWhatever it is\n\nI'm such a fool\nI fell for it\nAm I a tool for your game\n\nI am too cruel to myself\nAnd I'm curious\nPlease tell me you know\n\nMade it so far\nWas it so hard\nI barely made it\n\nI'm just a shell\nI feel like hell\nDon't lose hope in me\n\nI'm on the hunt\nLet's keep this blunt\nI need to chase it\n\nI don't need your talk of greed\nWe are not the same\n\nI'm such a fool\nI fell for it\nAm I a tool for your game\n\nI am too cruel to myself\nAnd I'm curious\nPlease tell me you know`
      },
      {
        title: "Confessions",
        album: "Public Outrage",
        file: "website-music/Confessions.mp3",
        image: "outrage.jpg",
        lyrics: `I'm happy to pay for my shit\nBut sometimes I still don't\nHalf of the time I'm not broke\nJust rather spend my money on dope\n\nI waste all my time\nAnd ask the wrong questions\nIf my heart says it's fine\nI'll follow directions\n\nBut I tell nobody\nThey need not worry\n\nMy heart beats faster than it used to\nIt's catching up now\nI used to give others a chance\nBut it was too much a mental dance\n\nOh no\nI didn't plan this far\nIt's no show\nI really am bizarre\n\nBut I tell nobody\nThey need not worry\nI tell nobody\nThey need not worry\nI tell no—`
      },
      {
        title: "Fork in the Road",
        album: "Public Outrage",
        file: "website-music/forkInTheRoad.mp3",
        image: "outrage.jpg",
        lyrics: `Who's ready to start a fight\nWho's ready to win\nThe cheaters will be prosecuted\nThe truth will always stand strong\n\nThese days been going by slower\nI think I finally woke up\nOr maybe I'm still fast asleep\nAnd no one's calling my name\n\nI won't be some bitter man\nWell at least I will try my best\nEvery fork in the road that I've\nCome to so far I got it wrong\n\nI may be fast to conclusions\nBut I know to take a breath\nMaybe I don't hate my family\nI just hate what it became\n\nThis world needs no more posers\nCome on now think for yourself\nYou'll know advice when you hear it\nYou'll know when you set your goal\n\nI won't be some bitter man\nWell at least I will try my best\nEvery fork in the road that I've\nCome to so far I got it wrong`
      }
];


  const wrapper    = document.querySelector('.album-carousel-wrapper');
  const carousel   = document.getElementById('albumCarousel');
  const leftArrow  = document.getElementById('scrollLeft');
  const rightArrow = document.getElementById('scrollRight');
  const backBtn         = document.getElementById('backBtn');
  const playPauseBtn    = document.getElementById('playPauseBtn');
  const skipBtn         = document.getElementById('skipBtn');
  const shuffleBtn      = document.getElementById('shuffleBtn');
  const timestamp       = document.getElementById('timestamp');
  const progressBar     = document.getElementById('progressBar');
  const progressFilled  = document.getElementById('progressFilled');
  const progressKnob    = document.getElementById('progressKnob');
  const playIcon        = document.getElementById('playIcon');
  const pauseIcon       = document.getElementById('pauseIcon');
  const songTitle       = document.getElementById('songTitle');
  const lyricsContainer = document.getElementById('lyricsContainer');

  const audio        = new Audio();
  let currentIndex   = -1;
  let isShuffling    = false;

  songs.forEach((song, index) => {
    const albumDiv = document.createElement('div');
    albumDiv.classList.add('album');
    albumDiv.innerHTML = `
      <img src="${song.image}" alt="${song.album}">
      <div class="album-text">
        <strong>${song.title}</strong><br>${song.album}
      </div>
    `;
    albumDiv.addEventListener('click', () => playSong(index));
    carousel.appendChild(albumDiv);
  });
  

  if (wrapper && leftArrow && rightArrow) {
    leftArrow.addEventListener('click', () => wrapper.scrollBy({ left: -400, behavior: 'smooth' }));
    rightArrow.addEventListener('click', () => wrapper.scrollBy({ left: 400, behavior: 'smooth' }));
  }

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function updateProgress() {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    progressFilled.style.width = `${pct}%`;
    progressKnob.style.left = `${pct}%`;
    timestamp.textContent = formatTime(audio.currentTime);
  }

  function playSong(idx) {
    const s = songs[idx];
    audio.src = encodeURI(s.file);
    audio.load();
    audio.play().catch(console.warn);
    songTitle.textContent = `${s.title} – ${s.album}`;
    lyricsContainer.textContent = s.lyrics || '';
    currentIndex = idx;
  }

  function playNext() {
    const next = isShuffling
      ? (function pick() {
          const r = Math.floor(Math.random() * songs.length);
          return r === currentIndex ? pick() : r;
        })()
      : (currentIndex + 1) % songs.length;
    playSong(next);
  }

  backBtn.addEventListener('click', () =>
    playSong(currentIndex > 0 ? currentIndex - 1 : songs.length - 1)
  );
  skipBtn.addEventListener('click', playNext);
  shuffleBtn.addEventListener('click', () => {
    isShuffling = !isShuffling;
    shuffleBtn.classList.toggle('active', isShuffling);
  });
  playPauseBtn.addEventListener('click', () =>
    audio.paused ? audio.play() : audio.pause()
  );

  audio.addEventListener('play', () => {
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'inline';
  });
  audio.addEventListener('pause', () => {
    playIcon.style.display = 'inline';
    pauseIcon.style.display = 'none';
  });
  audio.addEventListener('timeupdate', updateProgress);
  audio.addEventListener('loadedmetadata', () => {
    timestamp.textContent = formatTime(0);
    progressFilled.style.width = '0%';
    progressKnob.style.left = '0%';
  });
});
