import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

export default class Example extends Component {
    constructor() {
        super();
        this.state = {
            baseUrl: window.location.origin + '/',
            countrySet: [],
            categorySet: []

        }
    }
    componentDidMount() {
        axios.get('/country')
            .then(data => {                // <== Change is here
                console.log('data', data);
                this.setState({
                    countrySet: data.data
                });
            });

        axios.get('/category')
            .then(data => {                // <== Change is here
                console.log('data', data);
                this.setState({
                    categorySet: data.data
                });
            });
    }
    render() {

        var setdata = '';
        var setdata1 = '';
        if(typeof this.state.countrySet !== "undefined"){
            console.log('this.state.countrySet', this.state.countrySet);
            setdata = this.state.countrySet.map((aCountry, index) =>
                <option key={index} value={aCountry.id}>{aCountry.name}</option>
            )
        }

        if(typeof this.state.categorySet !== "undefined"){

            setdata1 = this.state.categorySet.map((aCategory, index) =>
                <option key={index} value={aCategory.id}>{aCategory.newsType}</option>
            )
        }

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <select className="form-control">
                                    {setdata}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <select className="form-control">
                                    {setdata1}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-default">Submit</button>
                        </form>
                    </div>
                    <div className="col-md-8">
                        <blockquote>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                            <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
                        </blockquote>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
