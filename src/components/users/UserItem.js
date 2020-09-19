import React, { Component } from 'react'

class UserItem extends Component {

       state = {
            id: 'id',
            login: 'octocat',
            avatar_url: 'https://github.com/images/error/octocat_happy.gif',
            html_url: 'https://github.com/octocat'
        }
    render() {

        const  {avatar_url,login,html_url} = this.state;

        return (
            <div className="card text-center">
                <img src={avatar_url}  className="round-img" style={{width: '60px'}}/>
                 <h3>{login}</h3>
                 <div>
                     <a href={html_url} className="btn btn-dark btn-sm my-1">more</a>
                 </div>
            </div>
        )
    }
}

export default UserItem
