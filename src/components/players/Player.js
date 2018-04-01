import React, {Component} from 'react';
import FaPlusCircle from 'react-icons/lib/fa/plus-circle';
import FaMinusCircle from 'react-icons/lib/fa/minus-circle';
import FaEye from 'react-icons/lib/fa/eye';
import  './Player.css';
class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favP: false,
            clckd: false,
        }
    }
    bio(url) {
        if(window.confirm('You sure you want to go to a third party site?')) {
            window.open(url, '_blank');
        } 
    }
    showStats() {
        this.setState(() => {
            return {
                clckd: true,
            }
        })
        if(this.state.clckd) {
            this.setState(() => {
                return {
                    clckd: false,
                }
            })
        }
    }
    favP() {
        this.setState({favP: true});
        this.props.add(this.props.name, this.props.id);
    }
    delFavP() {
        window.confirm('You are sure you want to delete this favorite player?');
        this.props.del(this.props.id);
        this.setState({favP: false});
    }
    render() {
        return (
            <div className='player-div'>
                <img className='playerImage' src={this.props.img} alt={`${this.props.name}`}/>
                <div>
                    <span className='player-info'>
                        <h3>{this.props.name}</h3>
                        <h5>{this.props.team}</h5>
                        <h6>{this.props.yrsInLg}</h6>
                        <span>
                            <button className='player-button' onClick={() => {this.bio(this.props.stsUrl)}}>See Info<FaEye /></button>
                            <button className='show-stats-button' onClick={() => {this.showStats()}}>See Stats</button>
                            <button className='add-player-button' style={{'display': (this.state.favP ? 'none': 'inline-block')}}
                            onClick={() => {this.favP()}}>Add Player<FaPlusCircle /></button>
                            <button className='del-player-button' style={{'display': (this.state.favP ? 'inline-block' : 'none')}}
                            onClick={() => {this.delFavP()}}>He is your Favorite Player!!!!<FaMinusCircle /></button>
                        </span>
                    </span>
                </div>
                        <span className='stats-div' style={{'display': (this.state.clckd ? 'inline-block' : 'none')}}>
                            <h3>PPG:</h3>
                            <p>{this.props.ppg}</p>
                            <h3>RPG:</h3>
                            <p>{this.props.rpg}</p>                            
                            <h3>APG:</h3>
                            <p>{this.props.apg}</p>                                                        
                        </span>
            </div>
        )
    }
}
//Export Player
export default Player;