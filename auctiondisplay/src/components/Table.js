import React, { Component } from "react";
import "./Table.css";

class Table extends Component {
    constructor(props) {
        super(props);
        const keys = [];
        if (props.projects.length > 0) {
            for (let key in props.projects[0]) {
                keys.push(key);
            }
        }
    }

    componentDidMount() { }

    render() {
        let values = [];
        if (this.props.projects.length > 0) {
            values = Object.keys(this.props.projects[0]).map((val, index) => {
                return <th key={index}>{val}</th>;
            });
        }
        return (
            <div className="col-sm-8 offset-2">
                <h5>Total Count: {this.props.totalCount} projects</h5>
                <table className="table">
                    {
                        <thead>
                            <tr>{values}</tr>
                        </thead>
                    }
                    <tbody>
                        {this.props.projects.map((project, index) => {
                            return (
                                <tr key={index}>
                                    <td>{project.ProjectTitle}</td>
                                    <td>{project.Username}</td>
                                    <td>{project.CategoryName}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Table;
