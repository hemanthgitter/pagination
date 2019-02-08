import React, { Component } from "react";
import Table from "./components/Table";
import Dropdown from "./components/Dropdown";
import Pages from "./components/Pages";
import axios from "axios";
import './App.css';

class App extends Component {
	state = {
		totalProjects: 0,
		currentProjects: [],
		currentPage: 1,
		totalPages: null,
		pageLimit: 1,
		orderBy: 0
	};

	dropDownOptions = [
		{
			"title": "Recent Projects",
			"value": "recent",
			"key": 0
		},
		{
			"title": "Category Name Asc",
			"value": "category",
			"key": 1
		},
		{
			"title": "Username Asc",
			"value": "username",
			"key": 2
		},
		{
			"title": "Project Title Asc",
			"value": "project",
			"key": 3
		}
		
	];

	orderBy = (index) => {
		this.setState({
			orderBy: index
		}, this.getData);
	}

	handlePage = (pageNumber) => {
		this.setState({
			currentPage: pageNumber
		}, this.getData);
	}

	componentDidMount() {
		this.totalCount();
		this.getData();
	}

	totalCount = () => {
		axios.get('/app').then(response => {
			const totalCount = response.data[0].totalCount;
			this.setState({
				totalProjects: totalCount
			});
		});
	}

	getData = () => {
		const pageLimit = this.state.pageLimit;
		const orderBy = this.dropDownOptions[this.state.orderBy].value;
		axios.get(`/projects?page=${this.state.currentPage}&limit=${pageLimit}&orderBy=${orderBy}`).then(response => {
			this.setState({
				currentProjects: response.data
			});
		});
	}

	render() {
		return (
			<div className="container">
				<Dropdown dropDownProps={this.dropDownOptions} orderByProps={this.orderBy} />
				{
					<h5 className="offset-4">
						Current Page: {this.state.currentPage}
					</h5>
				}
				<Table totalCount={this.state.totalProjects} projects={this.state.currentProjects} />
				<Pages projectCount={this.state.totalProjects} pageLimit={this.state.pageLimit} handlePage={this.handlePage}/>
			</div>
		)
	}
}

export default App;
