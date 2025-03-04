import React from 'react';
import { buy_song } from './near/utils'

function SongList({ song_catalog }) {
    const buySong = async (songinfo, artist) => {
        console.log(artist, " songname: ", songinfo.song_name, "| price: ", songinfo.price);
        await buy_song(artist, songinfo.song_name, songinfo.price);
    }
    //? setAccountId(catalog[0])
    //? setSongList(catalog[1])
    // let song_catalog= await get_song_catalog();
    console.log("song_catalog passsed to SongList component", song_catalog);
    //console.log(song_catalog[0][1].songs[0].song_name);
    //console.log("num of songs", await song_catalog[0][1].songs.length)
    return (
        <div style={songListStyle}>
            <table style={tableStyle}>
                <thead style={tableStyle}>
                    <tr>
                        <th>Artist</th>
                        {/*    <th>Song Number</th> */}
                        <th>Song Name</th>
                        <th>Price (NEAR)</th>
                    </tr>
                </thead>
                <tbody>
                    {song_catalog.map(catalog => (
                        <tr key={catalog[0]}>
                            <td>{catalog[0]}</td>{/*let AccountId = catalog[0], on line 31 add key? <td key=catalog[1].id>*/}
                            <td>{catalog[1].songs.map((songinfo, index) => (
                                <div key={index}>
                                    {songinfo.song_name}
                                </div>
                            ))}</td>
                            <td>{catalog[1].songs.map((songinfo, index) => (
                                <div key={index}>{songinfo.price}</div>
                            ))}</td>
                            <td>{catalog[1].songs.map((songinfo, index) => (
                                <button
                                    key={index}
                                    style={{ display: 'block' }}
                                    onClick={() => buySong(songinfo, catalog[0])}>
                                    Buy</button>

                            ))}</td>
                            <td>{catalog[1].songs.map((songinfo, index) => (
                                <div key={index}>
                                    {window.accountId == catalog[0] && <button>delete</button>}</div>
                            ))}</td>
                            {/* 
                            delete button only for song owner
                            {
                                window.accountId == catalog[0]
                                &&<button>delete</button>
                            }
                            catalog[0] = accountId (key)
                            catalog[1] = songList   (value)
                            <td>{catalog[1].songs[0].song_name}</td>
                            <td>{catalog[1].songs[0].price}</td>
                            */}

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
const songListStyle = {
    background: '#000',
    color: '#fff',
    padding: '10px'
}

const tableStyle = {
    width: '100%',
    border: '1px solid white'
}

export default SongList;