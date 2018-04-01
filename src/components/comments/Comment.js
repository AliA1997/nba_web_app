import React,{Component} from 'react';
import FaTrash from 'react-icons/lib/fa/trash';
import FaEdit from 'react-icons/lib/fa/edit';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentComment: this.props.text,
        }
        this.handleEdit = this.handleEdit.bind(this);
    }
    handleEdit(val) {
        this.setState(() => {
            return {
                currentComment: val,
            }
        })
    }
    render() {
        return (
            <span className='comment-area'>
                <form>
                    <textarea placeholder='Edit Comment' onChange={(e) => {this.handleEdit(e.target.value)}} 
                    value={this.state.currentComment} style={{'display': (this.props.doEdit ? 'inline-block': 'none')}}></textarea>
                    <button onClick={e => {this.props.editCom(e, this.props.id, this.state.currentComment)}}>Edit<FaEdit /></button>
                </form>
                <p>Time: {this.props.time}</p>
                <p>{this.state.currentComment}</p><button onClick={() => {this.props.del(this.props.id)}}>Delete<FaTrash /></button>
            </span>
        )
    }
}

export default Comment;