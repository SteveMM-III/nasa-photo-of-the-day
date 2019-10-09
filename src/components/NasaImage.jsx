import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Nasa.css';

export default function NasaImage() {

    const [imgInfo, setImgInfo] = useState({});

    useEffect(() => {
        axios.get( 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY' )
        .then( response => { setImgInfo( response.data ); } )
        .catch( err => {
            console.log( 'Error: ', err );
        } );
    }, [] );

    return (
        <div className='nasa'>
            <img className='hd-image' alt='space' src={ imgInfo.hdurl } />
            <h1>{ imgInfo.title }</h1>
            <h3>{ imgInfo.date  }</h3>
            <div className='explanation'>
                <p>{imgInfo.explanation}</p>
            </div>
        </div>
    );
}