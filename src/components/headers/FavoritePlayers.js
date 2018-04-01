import React, {Component} from 'react';
class FavoritePlayers extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handCh() {
        //To retrieve the select dropdown menu select item value use the options array property on the element, and the selected Elements
        //selectedIndex value.
        let selElem = document.getElementById('selectDropDown');
        
        let val = selElem.options[selElem.selectedIndex].value;
        this.props.chg(`${val}`);
    }
    render() {
        return (
            <div>
                <select id='selectDropDown' onChange={() => {this.handCh()}}>
                    {this.props.favPlayers.map(fp => <option
                    val={`${fp.firstName} ${fp.lastName}`} key={fp.id}>{`${fp.firstName} ${fp.lastName}`}</option>)}
                </select>
            </div>
        );
    }
}

export default FavoritePlayers;