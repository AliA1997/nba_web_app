import React, { Component } from 'react';
import './comments/Comment.css';

import Comment from './comments/Comment';
class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shwCmt: false,
            editComt: false,
            comment: '',
        }
        // this.create = this.create.bind(this);
        this.hanChgComt = this.hanChgComt.bind(this);
        this.show = this.show.bind(this);
        this.edit = this.edit.bind(this);
    }

    hanChgComt(val) {
        this.setState(() => {
            return {
                comment: val,
            }
        });

    }
    show() {
        this.setState(() => {
            return {
                shwCmt: true,
            }
        })
    }
    edit() {
        this.setState(() => {
            return {
                editComt: true,
            }
        })

    }

    crteCom(e, comment) {
        e.preventDefault();
        this.setState(() => {
            return {
                comment: '',
            };
        })
        this.props.crte(e, comment)
    }

    render() {
        console.log(this.props.comments);
        return (
        <div className='comments'>
            <h1>Comments</h1>
            <button onClick={() => {this.show()}}>Show Comments</button>
            <ul style={{'display': (this.state.shwCmt ? 'inline-block' : 'none')}}>
                <form id='comment-form'>
                    <textarea placeholder='Place your comment here....'
                     value={this.state.comment} onChange={e => this.hanChgComt(e.target.value)} />
                    <input type="submit" onClick={(e) => {this.crteCom(e, this.state.comment)}}/>
                </form>
                {this.props.comments.map(c => <li key={c.id}><Comment change={this.hanChgComt} editCom={this.props.edit}
                doEdit={this.props.doEdit} del={this.props.del} id={c.id} text={c.comment} time={c.date} /></li>)}
            </ul>
        </div>
        );
    }
}

export default Comments;