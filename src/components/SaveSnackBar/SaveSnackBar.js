import Snackbar from '@material-ui/core/Snackbar';
import React , {Component} from "react";

export default class SnackTop extends Component{


    state = {
        showSnack : true,
        snackClass : {
            background:'green'
        }
    }

    onClose = () => {
        this.setState({
            showSnack : false
        })
    }

    render(){

        return (
            <Snackbar
                anchorOrigin={{ vertical:'top', horizontal:'center' }}
                open={this.state.showSnack}
                onClose={ this.onClose }
                autoHideDuration={2000}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{ this.props.msg }</span>}
            />
        )
    }

}
