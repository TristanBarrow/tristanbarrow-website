import React, { Component } from 'react';
import Sidebar from './Sidebar';
import sidebarJson from '../../cradle/sidebarJson.js';
import '../styles/Sidebar.scss';

class Blog extends Component {
    constructor(props) {
        super(props);
        this.sidebarCallback = this.sidebarCallback.bind(this);
    }

    sidebarCallback(id) {
        console.log(id);
    }
    
    render() {
        return (
            <Sidebar 
                callback={this.sidebarCallback}
                json={sidebarJson}
                baseColor='#000000'
            />
        );
    }
}



export default Blog;