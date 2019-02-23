import React, { Component } from "react";
import Input from "../view/Input.js";
import axios from "axios"

class FormContainer extends Component {
    constructor() {
        super();

        this.state = {
            seo_title: "SEO Title",
            students: [{name:''}]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    handleClick(event) {
        event.preventDefault();

        axios.get("http://localhost:8080/students").then(res => {
            const students = res.data;
            this.setState({students});
        })
    }

    render() {
        const { seo_title, students } = this.state
        const listItems = students.map((d) => <li key={d.name}>{d.name}</li>);
        return (
            <div>
            <form id="article-form">
                <Input
                    text={seo_title}
                    label="seo title"
                    type="text"
                    id="seo_title"
                    value={seo_title}
                    handleChange={this.handleChange}
                    />
            </form>
                <button onClick={this.handleClick} type="submit">Get Students</button>
                <ul style={listItems[0].key ? {} : { display: 'none' }}>{listItems}</ul>
            </div>
    )}
}

export default FormContainer;