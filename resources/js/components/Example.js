import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import Pagination from "react-js-pagination";

export default class Example extends Component {
    constructor() {
        super();
        this.state = {
            baseUrl: window.location.origin + '/',
            countrySet: [],
            categorySet: [],
            news: [],
            countryId: null,
            pagination : [],
            url : '',
            activePage : 1,
            itemsCountPerPage : 1,
            totalItemsCount : 1,
            pageRangeDisplayed:10
        }
        this.countryHandleChange = this.countryHandleChange.bind(this);
        this.countryWiseCategoryHandleChange = this.countryWiseCategoryHandleChange.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }


    componentDidMount() {
        axios.get('/news')
            .then(data => {
                this.setState({
                    news: data.data.data,
                    url:data.data.path,
                    itemsCountPerPage : data.data.per_page,
                    totalItemsCount : data.data.total,
                    activePage : data.data.current_page
                });
            });
        axios.get('/country')
            .then(data => {
                this.setState({
                    countrySet: data.data
                });
            });

        axios.get('/category')
            .then(data => {
                this.setState({
                    categorySet: data.data
                });
            });
    }



    countryHandleChange(event) {

        this.setState({countryId : event.target.value});
        axios.get('/news/'+ event.target.value)
            .then(data => {
                if(data.data.data != null){
                    this.setState({
                        news: data.data.data,
                        url:data.data.path,
                        itemsCountPerPage : data.data.per_page,
                        totalItemsCount : data.data.total,
                        activePage : data.data.current_page
                    });
                }
                return;
            });

    }

    countryWiseCategoryHandleChange(event) {

        axios.get('/news/'+ this.state.countryId +'/'+ event.target.value)
            .then(data => {
                if(data.data != null){
                    this.setState({
                        news: data.data.data,
                        url:data.data.path,
                        itemsCountPerPage : data.data.per_page,
                        totalItemsCount : data.data.total,
                        activePage : data.data.current_page
                    });
                }
                return;
            });
    }

    handlePageChange(pageNumber) {

        //http://blog.test:88/news?page=1

        axios.get(this.state.url+'?page=' + pageNumber)
            .then(data => {
                this.setState({
                    news: data.data.data,
                    itemsCountPerPage : data.data.per_page,
                    totalItemsCount : data.data.total,
                    activePage : data.data.current_page
                });
            });
    }

    render() {
        var setdata = '';
        var setdata1 = '';
        var newsText = '';
        if(typeof this.state.countrySet !== "undefined"){
            setdata = this.state.countrySet.map((aCountry, index) =>
                <option key={index} value={aCountry.id}>{aCountry.name}</option>
            )
        }

        if(typeof this.state.categorySet !== "undefined"){

            setdata1 = this.state.categorySet.map((aCategory, index) =>
                <option key={index} value={aCategory.id}>{aCategory.newsType}</option>
            )
        }

        if(typeof this.state.news !== "undefined"){
            newsText = this.state.news.map( (aNew, index) => {
                    return <div className="media" key={index}>
                        <div className="media-left">
                            <a href="#">
                                <img className="media-object" src="..." alt="..."/>
                            </a>
                        </div>
                        <div className="media-body">
                            <h4 className="media-heading">{aNew.newsTitle}</h4>
                            {aNew.description}
                        </div>
                    </div>
                }

            )
        }

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Country</label>
                                <select className="form-control" onChange={this.countryHandleChange}>
                                    <option value="">--- select country ----</option>
                                    {setdata}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Category</label>
                                <select className="form-control" onChange={(e) => this.countryWiseCategoryHandleChange(e)}>
                                    <option value="">--- select country ----</option>
                                    {setdata1}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-default">Submit</button>
                        </form>
                    </div>
                    <div className="col-md-8">
                        {newsText}



                        <br/>
                        <br/>

                        <div className="d-flex justify-content-center">
                            <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={this.state.itemsCountPerPage}
                                totalItemsCount={this.state.totalItemsCount}
                                pageRangeDisplayed={this.state.pageRangeDisplayed}
                                onChange={this.handlePageChange}
                                itemClass ='page-item'
                                linkClass = 'page-link'
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
