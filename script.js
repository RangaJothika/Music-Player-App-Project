let AllSongs = [
    {
        Name: "Rise-Of-Dragon",
        Singer: "Anirudh",
        Image: "Multimedia/images/Rise-Of-Dragon.jpg",
        Audio: "Multimedia/audios/Rise-Of-Dragon.mp3",
        Genre: "pop",
    },
    {
        Name: "Kan-Imaikayile",
        Singer: "Saindhavi",
        Image: "Multimedia/images/kan-Imaikayile.jpg",
        Audio: "Multimedia/audios/kan-Imaikayile.mp3",
        Genre: "melody",
    },
    {
        Name: "Vazhithunaiye",
        Singer: "Sid Sriram",
        Image: "Multimedia/images/Vazhithunaiye.jpg",

        Audio: "Multimedia/audios/Vazhithunaiye.mp3",
        Genre: "melody",
    },
    {
        Name: "Haiyo-Saachitaale",
        Singer: "Aditya Rk",
        Image: "Multimedia/images/Haiyo-Saachitaale.jpg",
        Audio: "Multimedia/audios/Haiyo-Saachitaale.mp3",
        Genre: "gaana",
    },
    {
        Name: "Golden-Sparrow",
        Singer: "G.V.Prakash",
        Image: "Multimedia/images/Golden-Sparrow.jpg",
        Audio: "Multimedia/audios/Golden-Sparrow.mp3",
        Genre: "gaana",
    },
];
let CurrentPlayingSongs = 0;
let CurrentPlayList = []
let playlistsData = {};
let Playlists = [];

const listOfsongs = document.getElementById("AllSongs");

DisplayAllSongs();
InitializeFilterList();
PlaySong(CurrentPlayingSongs);
themechange();

function themechange() {
    let themechange = document.querySelector(".form-check-input");
    themechange.addEventListener("change", function themechange(e) {
        if (this.checked) {
            document.body.style.backgroundColor = "black";
            let heading = document.querySelector(".heading");
            heading.style.color = "white";
            let theme = document.querySelector(".theme");
            theme.style.color = "white";
            //    console.log(e.target)
        } else {
            document.body.style.backgroundColor = "white";
            let heading = document.querySelector(".heading");
            heading.style.color = "black";
            let theme = document.querySelector(".theme");
            theme.style.color = "black";
        }
    });
}

function DisplayAllSongs(genre = "All") {
    listOfsongs.innerHTML = "";

    AllSongs.forEach((item, index) => {
        if (item.Genre == genre || genre == "All") {
            const li = document.createElement("li");
            li.innerHTML = `
            <button class="${item.Genre}" value="${item.Name}" onClick="PlaySong(${index})">${item.Name} - ${item.Singer}</button>
            `;
            listOfsongs.append(li);
        }
    });
}

function InitializeFilterList() {
    const distinctGenres = [...new Set(AllSongs.map((song) => song.Genre))];
    let FilterList = document.getElementById("genersfilter");
    const Opt = document.createElement("option");
    Opt.textContent = "All";
    FilterList.append(Opt);
    distinctGenres.forEach((genre) => {
        const Opt = document.createElement("option");
        Opt.textContent = genre;
        FilterList.append(Opt);
    });
}

function onFilterChanged(event) {
    DisplayAllSongs(event.target.value);
}

function PlaySong(index) {
    let audio = document.querySelector("#musiccards audio");
    let image = document.querySelector("#musiccards img");
    let author = document.querySelector("#musiccards .music-image h4");
    let currentSong = AllSongs[index];
    author.innerHTML = `${currentSong.Name} <span> - ${currentSong.Singer}</span>`;
    audio.src = currentSong.Audio;
    image.src = currentSong.Image;
    CurrentPlayingSongs = index;
}

function AddCurrentSongToPlayList() {
    if (!CurrentPlayList.includes(CurrentPlayingSongs)) {
        CurrentPlayList.push(CurrentPlayingSongs);
        DisplayPlaylistSongs();
    }
}

function DisplayPlaylistSongs() {
    const playlistSongEle = document.getElementById("playlistSongs");
    playlistSongEle.innerHTML = "";
    CurrentPlayList.forEach((ItemIndex) => {
        let songToAdd = AllSongs[ItemIndex];
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${songToAdd.Name} - ${songToAdd.Singer}</span>
            `;
        li.className = "current-playlist-data";
        playlistSongEle.append(li);
    });
}

function ChangeSong(isleft) {
    if (isleft) {
        if (CurrentPlayingSongs > 0) {
            CurrentPlayingSongs -= 1;
            PlaySong(CurrentPlayingSongs);
        } else if (CurrentPlayingSongs == 0) {
            CurrentPlayingSongs = AllSongs.length - 1;
            PlaySong(CurrentPlayingSongs);
        }
    }
    else {
        if (CurrentPlayingSongs < AllSongs.length - 1) {
            ++CurrentPlayingSongs;
            PlaySong(CurrentPlayingSongs);
        } else if (CurrentPlayingSongs == AllSongs.length - 1) {
            CurrentPlayingSongs = 0;
            PlaySong(CurrentPlayingSongs);
        }
    }
}


function CreatePlaylist(event) {
    event.preventDefault();
    let playlistName = document.querySelector("#playlists input");
    if (!(Playlists.includes(playlistName.value)) && playlistName.value != "") {
        Playlists.push(playlistName.value);
        DisplayPlaylist(playlistName.value);
    }
}

function DisplayPlaylist(playlistname) {
    const playlistEle = document.getElementById("playlistitems");
    let playlist = document.createElement("li");
    playlist.style.display = "block";
    playlist.style.marginBottom = "10px";
    playlist.innerHTML = `<button>${playlistname}</button>`;
    playlistsData[playlistname] = [];
    playlist.onclick = () => AddingSongsToPlaylist(playlistname);
    playlistEle.append(playlist);
};

function AddingSongsToPlaylist(playlistname) {
    let currentplaylistdatas = document.querySelectorAll(
        ".current-playlist-data"
    );
    if (currentplaylistdatas.length > 0) {
        currentplaylistdatas.forEach((data) => {
            if (!(playlistsData[playlistname].includes(data.textContent)))
                playlistsData[playlistname].push(data.textContent);
            data.remove();
        });
        // console.log(playlistsData[playlistname]);
        // console.log("Array Updated!");
    } else {
        if (playlistsData[playlistname].length > 0) {
            playlistsData[playlistname].forEach((data) => {
                const playlistSongEle = document.getElementById("playlistSongs");
                let currentplaylistdata = document.createElement("li");
                currentplaylistdata.textContent = data;
                currentplaylistdata.style.fontWeight = "bold";
                currentplaylistdata.className = "current-playlist-data";
                playlistSongEle.append(currentplaylistdata);
            });
        }
    }
};