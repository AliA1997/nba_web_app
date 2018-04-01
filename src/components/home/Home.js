//IMport the react library via the import statement, import the library via the react keyword.
import React, { Component } from 'react';
//Import the static css file called App.css.
import '../../App.css';
//Import axios from the axios node package manager.
import axios from 'axios';
//Import the players component from the component folder, with the players file.
import Players from '../Players';
//Do the same for the header, slideshow, and comments components
//Not each component is using it's default name therefore no need for the curly braces around the component name.
import Header from '../Header';
import Slideshow from '../Slideshow';
import Comments from '../Comments';

class Home extends Component {
  //Invoke the constructor function or the initializer.  
  constructor() {
    super();
    //Invoke the initial state, that holds properties such as cs, input, images, 
    //players, playStor, myList, doEdit, comments.
    this.state = {
      cs: [],
      inp: '',
      imgs: [],
      currImg: '',
      plays: [],
      playStor: [],
      myList: [],
      doEdit: false,
      comments: [],
    }
    //Make sure to bind the componentDidMount method, so it can bind the component.
    this.componentDidMount = this.componentDidMount.bind(this);
    //Bind the component functions to the context of the App Component. 
    this.optSch = this.optSch.bind(this);
    this.hanChg = this.hanChg.bind(this);
    this.hanClk = this.hanClk.bind(this);
    this.crteComts = this.crteComts.bind(this);
    this.edtComts = this.edtComts.bind(this);
    this.delComts = this.delComts.bind(this);
    this.addToList = this.addToList.bind(this);
    this.delFrmList = this.delFrmList.bind(this);
  }
  //Use the componentDidMount to retrieve data for your homepage, and use axios call on the url.
  componentDidMount() {
    //Invoke date for yesterday and today.
    let date = new Date();
    let newDate = date.getDate() - 1;
    //Do axios calls on the componentDidMount.
    axios.get('/api/randomImage').then(res => {
      this.setState(() => {
        return {
          currImg: res.data,
        };
      })
    })
    axios.get('/api/home').then(res => {
      //Use this.setState inside promise

      this.setState(() => {
        return {
        plays: res.data[0],
        playStor: res.data[1],
        };
      })
    }).catch(err => console.log(err))
    axios.get(`https://newsapi.org/v2/everything?domains=nba.com&from=2018-03-26&to=${date}&sortBy=popularity&apiKey=d1642d3b4bed4f2aab806cc68e637563`).then(res => {
      this.setState(() => {
        return {
          imgs: res.data.articles,
        };
      })
    }).catch(err => console.log(err));
    //Make sure you mount the comments so you have the present commments.
    axios.get('/api/home/comments').then(res => {
      this.setState(() => {
        return {
          cs: res.data,
        };
      });
    }).catch(err => console.log(err));
    //Get your favorite list of plays.
    axios.get('/api/fav').then(res => {
      this.setState(() => {
        return {
          myList: res.data,
        };
      })
    }).catch(err => console.log(err))
  }
  //Invoke the hanChg, hanClk, optionChange function
  //Therefore enabling the searching of the items in the list.
  hanChg(val) {
    //Also changes the text in button based on if the user types in inp into the text field.
    let button = document.getElementById('search-button');
    //If val is truthy then change the innerHtml of the button to Search plays.
    if(val) {
      button.innerHTML = 'Search plays';
      this.setState(() => {
        return {
          inp: val,
        };
      });
    } else {
      button.innerHTML = 'All';
    }
  } 
  optSch(value) {

    //WHen searching through options filter out the values not equal to option.
    let arr = this.state.playStor.filter(p => {
      let name = `${p.firstName} ${p.lastName}`;
      return value === name;
    })
    this.setState({plays: arr});
  }
  //Invoke the handle click method, which  searches through array of values.
  hanClk(val) {
      let arr = this.state.playStor.map(p => {
        let name = `${p.firstName} ${p.lastName}`;
        name = name.toLowerCase();
          if(name.includes(this.state.inp.toLowerCase())) {
            return p; 
          }
        })
      arr = arr.sort((a, b) => a.id - b.id).filter((p, i, a) => p !== a[i + 2] || p !== a[i + 1]);
      console.log(arr);
      this.setState(() => {
          return {
            plays: arr,
            inp: '',
          };
      })
  }
  //Add to list functionality
  addToList(playerName, id) {

    let arr = playerName.split(' ');
    let firstName = arr[0];
    let lastName = arr[1];
    // let arr = this.state.myList.slice();
    //Do a post request that add a plays to the list.
    axios.post('/api/fav', {firstName: firstName, lastName: lastName, id: id}).then(res => {
      this.setState(() => {
        return {
          myList: res.data,
        }
      })
    })
    console.log(this.state.myList);
  }
  delFrmList(id) {
    //Use a delete request that deletes a player from the list.
    axios.delete(`/api/fav/`, {id}).then(res => {
      this.setState(() => {
        return {
          myList: res.data,
        }
      })
    })
  }
  //Invoke comments functions.
  edtComts(e, id, comment) {
    //Prevent the events default behavior
    e.preventDefault();
    if(this.state.doEdit) { 
      //Use a put request on the list or update the list using a axios call.
      //If the doEdit boolean state is true set it to false. 
      axios.put(`/api/home/${id}`, {comment: comment}).then(res => {
          this.setState(() => {
              return {
                  cs: res.data,
                  comment: '',
              };
          });
      });
      this.setState({doEdit: false});
      console.log(this.state.cs);
    } else {
      this.setState({doEdit: true});
    }
  }
  delComts(id) {
      axios.delete(`/api/home/${id}`).then(res => {
          this.setState(() => {
              return {
                  cs: res.data,
              };
          });
      });
  }
  crteComts(e, comment) {
    e.preventDefault();
    axios.post(`/api/home` , {comment}).then(res => {
            this.setState(() => {
                return {
                    cs: res.data,
                }
            })
        })
      console.log(this.state.cs);
  }
  //Add to list function
  render() {
    return (
      <div>
        <Header title='NBA APP' favList={this.state.myList} chg={this.optSch} />
          <input className='input-field' onChange={e => this.hanChg(e.target.value)} />
          <button id='search-button' onClick={this.hanClk}>Start Search</button>
        <div className='main-image-div'>
          <img className='main-image' src={this.state.currImg}
        alt='Lebron James Gif'/>
        </div>
        <Players storage={this.state.myList} list={this.state.plays} add={this.addToList} delete={this.delFrmList}/>
        <Slideshow imgs={this.state.imgs}/>    
        <br/>    
        <Comments comments={this.state.cs} del={this.delComts} edit={this.edtComts} 
        doEdit={this.state.doEdit} crte={this.crteComts}/>
      </div>
    );
  }
}

export default Home;