import React from 'react';
import { Segment, Button } from 'semantic-ui-react';
import { logOut } from '../../actions/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class HomePage extends React.Component {
    componentDidMount() {
        if (!this.props.checkLogin.email) {
            this.props.history.push('/')
        }
    }

    loggingOut = () => {
        const { logOutUser, history } = this.props;
        logOutUser();
        history.push('/')
    }
    render() {
        return (
            <div>
                <Segment style={{ height: "100vh" }}>
                    HomePage
                    <Button basic color='red' size="small" floated='right' onClick={() => this.loggingOut()}>
                        Sign - Out
                    </Button>
                </Segment>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        checkLogin: state.login
    }
}

const dispathToProps = {
    logOutUser: logOut,
}

export default withRouter(connect(mapStateToProps, dispathToProps)(HomePage));