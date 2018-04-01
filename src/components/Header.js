import React from 'react';
import FavoritePlayers from './headers/FavoritePlayers';
function Header(props) {
    return (
        <header>
            <h1>{props.title}</h1>
            <FavoritePlayers favPlayers={props.favList} chg={props.chg}/>
        </header>
    )
}

export default Header;