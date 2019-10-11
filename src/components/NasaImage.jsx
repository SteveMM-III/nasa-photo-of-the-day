import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Styled components used in the custom NasaImage component below
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

    ${props => {  // set up the toggle that is set by the onClick on line 118
        if (props.toggle) { // if true
            return `
                width: 60%;
                left: 20%;
            `;
        } else {            // if false
            return `
                left: calc(50% - 2rem);
            `;
        }
    } }
`;

const StyledH4 = styled.h4`
    width: 100%;
    margin: 0;
    ${props => {  // set up the toggle that is set by the onClick on line 119
        if (props.toggle) { // if true
            return `
                display: block;
            `;
        } else {            // if false
            return `
                display: none;
            `;
        }
    } }
`;

const StyledP = styled.p`
    text-align: start;
    ${props => {  // set up the toggle that is set by the onClick on line 120
        if (props.toggle) { // if true
            return `
                display: block;
            `;
        } else {            // if false
            return `
                display: none;
            `;
        }
    } }
`;

export default function NasaImage() {

    // Component States
    const [imgInfo,   setImgInfo  ] = useState( {}  );
    const [infoWidth, setInfoWidth] = useState(false);
    const [showH4,    setShowH4   ] = useState(true );
    const [showInfo,  setShowInfo ] = useState(false);

    // Get request to request info from NASA API, stored in imgInfo usestate
    useEffect( () => {
        axios.get( 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY' )
        .then( response => { setImgInfo( response.data ); } )
        .catch( err => {
            console.log( 'Error: ', err );
        } );
    }, [] );

    // return component
    return (
        // all the {imgInfo.something} below is pulled from the axios.get call above
        <StyledContainer>
            <StyledImg alt='nasa hd image of the day' src={ imgInfo.hdurl } />
            <StyledH1>{ imgInfo.title }</StyledH1>
            <StyledH3>{ imgInfo.date  }</StyledH3>
            <StyledInfo toggle={ infoWidth }        // watch infoWidth useState for change
                onClick={ () => {
                    setInfoWidth(!infoWidth);       // toggle true/false
                    setShowH4(!showH4);             // toggle true/false
                    setShowInfo(!showInfo);         // toggle true/false
                } } >
                <StyledH4 toggle={ showH4 }>INFO</StyledH4>
                <StyledP toggle={ showInfo }>{imgInfo.explanation}</StyledP>
            </StyledInfo>
        </StyledContainer>
    );
}

/*
    I tried putting the following comments on the lines above, but for whatever reason
    the comments were being rendered in the html. Rather than remove them completely,
    I've moved them here, along with their corosponding line numbers.
    lines: 123 & 124 - 
                // watch showH4 useState for change
                // watch showInfo useState for change

*/