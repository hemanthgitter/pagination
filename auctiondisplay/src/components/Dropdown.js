import React, { Component } from 'react';
import './Dropdown.css';

class DropDown extends Component{

    constructor(props){
        super(props);
        this.state = {
            orderedBy: 0
        }
    }

    optionChanged(index, e) {
        e.preventDefault();
        console.log(this.props.dropDownProps[index]);
        this.setState({
            orderedBy: index
        });
        this.props.orderByProps(index);
    }

    render() {
        return(
            <div className="col-sm-8 offset-2 dropdownWrapper">
                <p>
                    Ordered by: {this.props.dropDownProps[this.state.orderedBy]['title']}
                </p>
                <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {
                        this.props.dropDownProps.map((option, index) => {
                            return(
                                <button className="dropdown-item" key={index} onClick={(e) => this.optionChanged(index, e)}>{option.title}</button>
                            )
                        })
                    }
                </div>
                </div>
            </div>
        );
    }
}

export default DropDown;