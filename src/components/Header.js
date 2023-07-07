import axios from "axios";
import React, { useEffect, useState } from "react";
import Player from "./Player";
const Header = () => {
  // const cloudName = "dirbibxzp";
  // const uploadPreset = "hsolam4w";
  const [url, setUrl] = useState(
    "https://assets.materialup.com/uploads/77a5d214-0a8a-4444-a523-db0c4e97b9c0/preview.jpg"
  );
  const [text, setText] = useState("");
  const [spotifyRes, setspotifyRes] = useState([]);
  const [data, setData] = useState(["upload your image first", 1]);
  const [started,setStarted] = useState(false)
  const [spotkey,setSpotkey] = useState("BQA60068n6PaajttBMi5flF0SczLIQxd0pRrnch7muNJms2ZClhsk-EJtR5JhwStfCoQ9RK4KBjL9Kojzg4k_TklDP8qJ8ykQ-Zir_IMl67zY7Czot4")
  useEffect(() => {
    console.log(data);
    setText(data[0]);
    spotify(data);
    console.log(spotifyRes);
    console.log(spotkey);
    
  }, [data,spotkey]);

  const cloudName = "hzxyensd5";
  const uploadPreset = "aoh4fpwm";

  async function spotify(data) {
    // spotify

    var p = parseInt(data[1].pos_percent);
    var n = parseInt(data[1].neg_percent);
    console.log(data[1].pos_percent);
    // var p = 12;
    // var n = 6;
    var valance = (p * (100 / (p + n))) / 100;

    var spotifyResponse = await axios.get(
      "https://api.spotify.com/v1/recommendations",
      {
        params: {
          limit: "9",
          market: "BD",
          seed_artists: "4NHQUGzhtTLFvgF5SZesLK",
          seed_genres: "classical,country",
          seed_tracks: "0c6xIDDpzE81m2q797ordA",
          target_valence: `${valance}`,
        },
        headers: {
          Authorization:`Bearer BQA60068n6PaajttBMi5flF0SczLIQxd0pRrnch7muNJms2ZClhsk-EJtR5JhwStfCoQ9RK4KBjL9Kojzg4k_TklDP8qJ8ykQ-Zir_IMl67zY7Czot4`,
        },
      }
    );

    setspotifyRes(spotifyResponse.data.tracks);
    
  }
  var myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: cloudName,
      uploadPreset: uploadPreset,
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        var newurl = result.info.secure_url;
        var otherUrl = encodeURIComponent(result.info.secure_url);
        setUrl(newurl);
        server(otherUrl);
        spotkeyGen()
       
      }
    }
  );

  // fetfching  data from my server 
  async function server(url) {
    await fetch(`https://musicrecom.onrender.com/test/${url}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .then( setStarted(true))

      .catch(function (error) {
        console.log(error);
      });
  }
  async function spotkeyGen() {
    await fetch('https://musicrecom.onrender.com/spotkey')
      .then((res) => res.json())
      .then((data) => setSpotkey(data))
      .catch(function (error) {
        console.log(error);
      });
      console.log(spotkey)
  }
  return (
    <div className="flex flex-col justify-center content-center">
      <div>
        <h1 className="text-4xl text-center m-4">Song Recomentation</h1>
      </div>

      <div className="flex flex-col gap-4 border-2 p-10 m-10">
        <h2 className="text-center">upload your image here</h2>

        <button
          id="upload_widget"
          onClick={() => myWidget.open()}
          className="cloudinary-button bg-red-400"
        >
          Upload
        </button>
      </div>

      <div className="flex mx-auto">
        <div className=" w-[50vw]">
            <h1 className="text-center font-semibold text-xl">Music based on your mood</h1>
        {
            started&&<Player data={spotifyRes}></Player>
        }
        </div>
        <div className="w-[30vw] border-2 p-2 m-2 rounded-md">
          <img
            id="uploadedimage"
            className="rounded-md"
            src={url}
            alt="name"
          ></img>
          <h1 className="text-center m-5 font-bold">OCR RESULT</h1>
          <h2 className="text-center m-5">{text}</h2>
          <div className="border-2 rounded-md p-3">
            <h2 className="text-green-500">
              Positive Emotion : {data[1].pos_percent}
            </h2>
            <h2 className="text-red-500">
              Negative Emotion : {data[1].neg_percent}
            </h2>
            <h2>Nutral Emotion : {data[1].mid_percent}</h2>
            {/* <h2>Spotify Valnace :</h2> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
