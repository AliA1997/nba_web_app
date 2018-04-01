import React, {Component} from 'react';
import './players/Player.css';
import Player from './players/Player';

class  Players extends Component {
    constructor() {
        super();
        this.state = {
        }
    } 

    render() {
        let copyOfPs = this.props.list.slice();
       return (
        <div>
            <ul>
                <li>
                    {
                    copyOfPs.map((p, i) => {
                    return <Player key={i}
                    stsUrl={p.url}
                    id={p.id}
                    img={p.image}
                    name={`${p.firstName} ${p.lastName}`}
                    yrsInLg={p.yearsInLeague}
                    ppg={p.ppg}
                    rpg={p.rpg}
                    apg={p.apg}
                    team={p.team} 
                    add={this.props.add}
                    del={this.props.delete}/>
                        })
                    }
                </li>
            </ul>
        </div>
        )
    }
}
export default Players;