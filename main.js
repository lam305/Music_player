const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
var indexBackground = 1;


// xu ly doi background
changeBackground = function () {
  const backgroundImg = [
    'url("https://cdn.sforum.vn/sforum/wp-content/uploads/2023/02/hinh-nen-may-tinh-4k-5.jpg")',
    'url("https://mega.com.vn/media/news/0106_hinh-nen-4k-may-tinh12.jpg")',
    'url("https://phongvu.vn/cong-nghe/wp-content/uploads/sites/2/2018/07/hinh-nen-full-hd-cho-laptop-3.jpg")',
    'url("https://haycafe.vn/wp-content/uploads/2021/12/Hinh-nen-Full-HD-1080-cho-may-tinh-dep.jpg")',
    'url("https://hoanghapc.vn/media/news/0510_hinh_nen_phong_canh2.jpg")',
  ];

  $("body").style.backgroundImage = backgroundImg[indexBackground];
  indexBackground++;
  if (indexBackground > 4) indexBackground = 0;
};
setInterval(changeBackground, 120000);
$(".cd-round").style.animationPlayState = "paused";


const playlist = $(".list-music");
const cd = $(".cd");
const nameSong = $(".header .name-song");
const singer = $(".header .singer");
const cdThumb = $(".cd-round .img");
const audio = $("#audio");
const playBtn = $("#play");
const progress = $("#progress");
const rewind = $$(".rewind");
const nextBtn = $(".next-song");
const preBtn = $(".pre-song");
const repeatBtn = $(".repeat-song");
const randomBtn = $(".random-song");



const app = {
  currentIndex: 0,
  isRandom: false,
  isRepeat: false,
  isPlaying: false,
  song: [
    {
      name: "Ai chung tình được mãi",
      singer: "Đinh Tùng Huy",
      path: "./assets/music/aichungtinhduocmai.mp3",
      image: "./assets/image/imgs-song/aichungtinhduocmai.jpeg",
    },
    {
      name: "Chạy ngay đi",
      singer: "Sơn Tùng MTP",
      path: "./assets/music/chayngaydi.mp3",
      image: "./assets/image/imgs-song/chayngaydi.jpeg",
    },
    {
      name: "Chim điểu và ve sầu",
      singer: "Nhậm Nhiên",
      path: "./assets/music/chimdieuvesau.mp3",
      image: "./assets/image/imgs-song/phi-dieu-va-ve-sau.jpeg",
    },
    {
      name: "Hẹn em ở lần yêu thứ 2",
      singer: "Nguyễn Đặng Tuấn Vũ",
      path: "./assets/music/henemolanyeuthu2.mp3",
      image: "./assets/image/imgs-song/henemolanyeuthu2.jpeg",
    },
    {
      name: "Ichinen Nikagetsu Hatsuka",
      singer: "BRIGHT",
      path: "./assets/music/ichinen.mp3",
      image: "./assets/image/imgs-song/ichinen.jpeg",
    },
    {
      name: "Luyến",
      singer: "NHA",
      path: "./assets/music/luyen.mp3",
      image: "./assets/image/imgs-song/luyen.jpeg",
    },
    {
      name: "Nước ngoài",
      singer: "Phan Mạnh Quỳnh",
      path: "./assets/music/nuocngoai.mp3",
      image: "./assets/image/imgs-song/nuocngoai.jpeg",
    },
    {
      name: "Sài Gòn hôm nay mưa",
      singer: "Hoàng Duyên",
      path: "./assets/music/saigonhomnaymua.mp3",
      image: "./assets/image/imgs-song/Sghomnaymua.jpeg",
    },
    {
      name: "Thế Thôi",
      singer: "Hải Sâm",
      path: "./assets/music/thethoi.mp3",
      image: "./assets/image/imgs-song/thethoi.jpeg",
    },
    {
      name: "Khuôn mặt đáng thương",
      singer: "Sơn Tùng MTP",
      path: "./assets/music/khuonmatdangthuong.mp3",
      image: "./assets/image/imgs-song/khuonmatdangthuong.jpeg",
    },
  ],
  render: function () {
    const html = this.song.map((song, index) => {
      return `
      <div class="song ${index === this.currentIndex ? "playing" : ""}">
          <div class="avt">
            <img
              class="img"
              src="${song.image}"
              alt=""
            />
          </div>
          <div class="song-info">
            <div class="name">${song.name}</div>
            <div class="singer">${song.singer}</div>
          </div>
          <div class="icon">
            <i class="fa-solid fa-ellipsis"></i>
          </div>
        </div>
      `;
    });
    playlist.innerHTML = html.join("");
  },
  handleEvent: function () {
    const _this = this;
    // playlist.addEventListener("scroll", function () {
    //   // hàm giúp tìm vị trí của element
    //   const rect = $$(".song")[0].getBoundingClientRect();
    //   // Vị trí của phần tử đối với cửa sổ trình duyệt (tính từ phía trên)
    //   var elementTop = rect.top;
    //   // Vị trí của phần tử đối với cửa sổ trình duyệt (tính từ phía dưới)
    //   const elementBottom = rect.bottom;
    //   console.log(elementTop);
    // });
    // Xử lý khi click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
        //cho đĩa cd dừng khi audio dừng
        $(".cd-round").style.animationPlayState = "paused";
      } else {
        audio.play();
        //Cho đĩa quay tròn khi audio phát
        $(".cd-round").style.animationPlayState = "running";
      }
    };
    audio.onplay = function () {
      _this.isPlaying = true;
      playBtn.classList.add("pause");
      playBtn.classList.remove("play");
      $("#play i").classList.add("fa-pause");
      $("#play i").classList.remove("fa-play");
    };
    audio.onpause = function () {
      _this.isPlaying = false;
      playBtn.classList.add("play");
      playBtn.classList.remove("pause");
      $("#play i").classList.add("fa-play");
      $("#play i").classList.remove("fa-pause");
    };
    //tu dong next bai khi het audio
    audio.ontimeupdate = function () {
      const progressPercent = Math.floor(
        (audio.currentTime / audio.duration) * 100
      );
      progress.value = progressPercent;
    };
    // tua audio
    progress.onchange = function () {
      const seekTime = (progress.value * audio.duration) / 100;
      audio.currentTime = seekTime;
    };

    //tua back 5s
    rewind[0].onclick = function () {
      if (audio.currentTime > 5) {
        audio.currentTime -= 5;
      } else {
        audio.currentTime = 0;
      }
    };
    // tua lên 5s
    rewind[1].onclick = function () {
      audio.currentTime += 5;
    };

    //next bai
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandom();
      } else {
        _this.nextSong();
      }
      audio.play();
      //_this.render();
    };
    //quay lai bai truoc
    preBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandom();
      } else {
        _this.preSong();
      }
      //_this.render();
      audio.play();
    };
    // nut ramdom bai hat
    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      randomBtn.classList.toggle("active");
    };
    //xu ly next bai khi ket thuc bai hat
    audio.onended = function () {
      if (_this.isRepeat) {
        _this.loadCurrentSong();
        //_this.render();
        audio.play();
      } else {
        nextBtn.click();
        //_this.render();
      }
    };
    //xử lý khi repeat
    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      repeatBtn.classList.toggle("active");
    };
    // xu ly khi click vao playlist

    $$(".song").forEach((element, index) => {
      element.onclick = function () {
        _this.currentIndex = index;
        _this.loadCurrentSong();
        audio.play();
      };
    });
  },
  getCurrentSong: function () {
    return this.song[this.currentIndex];
  },
  loadCurrentSong: function () {
    nameSong.textContent = this.getCurrentSong().name;
    singer.textContent = this.getCurrentSong().singer;
    cdThumb.src = this.getCurrentSong().image;
    audio.src = this.getCurrentSong().path;
    this.scrollToActiveSong();
    // this.render();

    $(".song.playing").classList.remove("playing");
    $$(".song")[this.currentIndex].classList.add("playing");
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex > this.song.length - 1) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  preSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.song.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandom: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.song.length);
    } while (this.currentIndex == newIndex);
    this.currentIndex = newIndex;
    console.log(newIndex);
    this.loadCurrentSong();
  },
  scrollToActiveSong: function () {
    setTimeout(function () {
      $(".song.playing").scrollIntoView();
    }, 300);
  },
  start: function () {
    //render ra tất cả bài hát
    this.render();
    this.handleEvent();
    // chạy bài hát đầu tiên
    this.loadCurrentSong();
  },
};

app.start();
