// hardcoded json datas
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
let CurrentPlayList = [];//array for storing the songs at current playlist
let playlistsData = {};//contains each playlist name (as a key) along with its songs (as an array of song indices)
let Playlists = [];//contains an array with name of playlists

const listOfsongs = document.getElementById("AllSongs");

DisplayAllSongs();
InitializeFilterList();
PlaySong(CurrentPlayingSongs);
themechange();

// theme change
function themechange() {
    let themechange = document.querySelector(".form-check-input");//uses a checkbox internally
    themechange.addEventListener("change", function themechange(e) {
        if (this.checked) {
            document.body.style.backgroundColor = "black";
            let heading = document.querySelector(".heading");
            heading.style.color = "white";
            let theme = document.querySelector(".theme");
            theme.style.color = "white";
        } else {
            document.body.style.backgroundColor = "white";
            let heading = document.querySelector(".heading");
            heading.style.color = "black";
            let theme = document.querySelector(".theme");
            theme.style.color = "black";
        }
    });
}

// display all songs at left
function DisplayAllSongs(genre = "All") {
    listOfsongs.innerHTML = "";

    AllSongs.forEach((item, index) => {
        if (item.Genre == genre || genre == "All") {//if a specific genre is given it has to match the items genre,then 
            // only that item will be displayed this is used for filtering based on genres
            const li = document.createElement("li");
            li.innerHTML = `
            <button class="${item.Genre}" value="${item.Name}" onClick="PlaySong(${index})">${item.Name} - ${item.Singer}</button>
            `;
            listOfsongs.append(li);
        }
    });
}

// genre filter list dropdown
function InitializeFilterList() {
    const distinctGenres = [...new Set(AllSongs.map((song) => song.Genre))];//creates a new set of each genres only
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

// when each filter in dropdown is clicked,this function is called
// called at onChange prop directly on html file
function onFilterChanged(event) {
    DisplayAllSongs(event.target.value);//event.target is the dom ele triggered the event
}

// play the clicked song in middle
function PlaySong(index) {
    let audio = document.querySelector("#musiccards audio");
    let image = document.querySelector("#musiccards img");
    let author = document.querySelector("#musiccards .music-image h4");
    let currentSong = AllSongs[index];
    author.innerHTML = `${currentSong.Name} <span> - ${currentSong.Singer}</span>`;
    audio.src = currentSong.Audio;
    image.src = currentSong.Image;
    CurrentPlayingSongs = index;//indices are used to store in currentplaylist array to acces them later
}
// add to playlist button function
function AddCurrentSongToPlayList() {
    if (!CurrentPlayList.includes(CurrentPlayingSongs)) {
        CurrentPlayList.push(CurrentPlayingSongs);//add all current playlist songs indices in array
        DisplayPlaylistSongs();//display all added songs under current playlist section
    }
}

// display all added songs under current playlist section as we click add to playlist button
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

// left and right arrows to change songs
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

// create a new playlist 
function CreatePlaylist(event) {
    event.preventDefault();//used to prevent the default action of an event
    let playlistName = document.querySelector("#playlists input");
    if (!(Playlists.includes(playlistName.value)) && playlistName.value != "") {
        Playlists.push(playlistName.value);
        DisplayPlaylist(playlistName.value);
    }
}

// show all the created playlist buttons
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

// add all selected songs in current playlist to a playlist
function AddingSongsToPlaylist(playlistname) {
    const playlistSongEle = document.getElementById("playlistSongs");
    if (CurrentPlayList.length > 0) {
        CurrentPlayList.forEach((index) => {
            if (!(playlistsData[playlistname].includes(index)))
                playlistsData[playlistname].push(AllSongs[index].Name);
        });
        playlistSongEle.innerHTML = "";//to remove all playlists name from current playlists section
        CurrentPlayList = []; // make it empty so that for next playlist the current playlist doesnto contain the songs 
        // of prev playlists
    } else {
        if (playlistsData[playlistname].length > 0) {
            playlistSongEle.innerHTML = "";
            playlistsData[playlistname].forEach((data) => {
               
                let currentplaylistdata = document.createElement("li");
                currentplaylistdata.textContent = data;
                currentplaylistdata.style.fontWeight = "bold";
                currentplaylistdata.className = "current-playlist-data";
                playlistSongEle.append(currentplaylistdata);
            });
        }
    }
};