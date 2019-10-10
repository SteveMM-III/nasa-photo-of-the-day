import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styled, { css } from 'styled-components';

const StyledContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    color: white;
`;

const StyledImg = styled.img`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -3;
`;

const StyledH1 = styled.h1`
    margin: 1rem auto;
    padding: 0.4rem;
    border-radius: 0.3rem;
    background-color: rgba( 5, 5, 5, 0.5 );
`;

const StyledH3 = styled.h3`
    margin: 1rem auto;
    padding: 0.4rem;
    border-radius: 0.3rem;
    background-color: rgba( 5, 5, 5, 0.5 );
`;

const StyledInfo = styled.div`
    position: fixed;
    bottom: 3rem;
    left: calc(50% - 2rem);
    padding: 0.5% 2%;
    line-height: 1.5rem;
    border-radius: 1rem;
    background-color: rgba( 5, 5, 5, 0.5 );

    &:hover {
        cursor: pointer;
    }

    ${props => {
        if (props.toggle) {
            return `
                width: 60%;
                left: 20%;
            `;
        } else {
            return `
                left: calc(50% - 2rem);
            `;
        }
    } }
`;

const StyledH4 = styled.h4`
    width: 100%;
    margin: 0;
    ${props => {
        if (props.toggle) {
            return `
                display: block;
            `;
        } else {
            return `
                display: none;
            `;
        }
    } }
`;

const StyledP = styled.p`
    text-align: start;
    ${props => {
        if (props.toggle) {
            return `
                display: block;
            `;
        } else {
            return `
                display: none;
            `;
        }
    } }
`;

export default function NasaImage() {

    const [imgInfo,   setImgInfo  ] = useState( {}  );
    const [infoWidth, setInfoWidth] = useState(false);
    const [showH4,    setShowH4   ] = useState(true );
    const [showInfo,  setShowInfo ] = useState(false);

    useEffect(() => {
        axios.get( 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY' )
        .then( response => { setImgInfo( response.data ); } )
        .catch( err => {
            console.log( 'Error: ', err );
        } );
    }, [] );

    return (
        <StyledContainer>
            <StyledImg alt='space' src={ imgInfo.hdurl } />
            <StyledH1>{ imgInfo.title }</StyledH1>
            <StyledH3>{ imgInfo.date  }</StyledH3>
            <StyledInfo toggle={ infoWidth }
                onClick={ () => {
                    setInfoWidth(!infoWidth);
                    setShowH4(!showH4);
                    setShowInfo(!showInfo);
                } } >
                <StyledH4 toggle={ showH4 }>INFO</StyledH4>
                <StyledP toggle={ showInfo }>{imgInfo.explanation}</StyledP>
            </StyledInfo>
        </StyledContainer>
    );
}