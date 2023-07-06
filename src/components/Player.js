import React from 'react';

const Player = (props) => {
    return (
        <div className='grid grid-cols-3 gap-4 flex-wrap m-10 p-8'>
              {props.data.map((r) => (
            <div className='border-2 p-2 rounded-md'>
              <img className=' rounded-md' src={r.album.images[0].url} alt="" />
              <h1 className='font-semibold'>
                {r.album.name}
              </h1>
              <h1>
                {r.artists[0].name}
              </h1>
              <a target='_blank' className='text-center w-[100px] cursor-pointer border-2 rounded-md bg-green-400 p-4 my-4 inline-block' href={r.album.external_urls.spotify}>PLAY</a>

            </div>
          ))}
        </div>
    );
};

export default Player;