import React, { Component } from "react";
import './Pages.css';

class Pages extends Component {

    pageNumbers = (start, end) => {
        const pages = [];
        for(let i=start; i<=end; ++i){
            pages.push(i);
        }
        return pages;
    };

    constructor(props) {
        super(props);
        this.pageNeighbours = 1;
        let totalPages = 0;
        if(props.projectCount > 0){
            totalPages = Math.ceil(props.projectCount / props.pageLimit);
        }
        this.state = {
            currentPage: 1,
            totalPages: totalPages
        };
    }

    generatePageNumbers(){
        const totalPages = this.state.totalPages;
        const start = 1;
        const end = totalPages;
        // return this.pageNumbers(start, end);

        const currentPage = this.state.currentPage;
        const pageNeighbours = 1;

        const totalNumbers = (pageNeighbours*2)+1 //<nei>{curr}<nei>;
        const totalNumbersWithArrows = totalNumbers + 2; //(<<)<nei>{curr}<nei>(>>);

        if(totalPages > totalNumbersWithArrows){ //1 < 2 3 4 >  6    1,2,3,4,5,6
            const start = Math.max(2, currentPage - pageNeighbours);
            const end = Math.min(totalPages-1, currentPage + pageNeighbours);

            let pageNums = this.pageNumbers(start, end);

            const hasPagestoLeft = start > 2;
            const hasPagestoRight = (totalPages - end) > 1;
            const hiddenPages = totalPages - (pageNums.length + 1);

            switch(true) {
                case(hasPagestoLeft && !hasPagestoRight): {
                    const extraPages = this.pageNumbers(start - hiddenPages, start-1);
                    pageNums = ['left', ...extraPages, ...pageNums];
                    break;
                }

                case (!hasPagestoLeft && hasPagestoRight): {
                    const extraPages = this.pageNumbers(end + 1, end + hiddenPages);
                    pageNums = [...pageNums, ...extraPages, 'right'];
                    break;
                }

                case (hasPagestoLeft && hasPagestoRight):
                default: {
                    pageNums = ['left', ...pageNums, 'right'];
                    break;
                }
            }

            return [1, ...pageNums, totalPages];
        }
        return this.pageNumbers(start, end);
    }

    componentWillReceiveProps(nextprops) {
        if (this.props.projectCount !== nextprops.projectCount) {
            const totalPages = Math.ceil(nextprops.projectCount / this.props.pageLimit);
            this.setState({
                totalPages: totalPages
            });
        }
    }

    handleClick = (pageNum, e) => {
        e.preventDefault();
        this.setState({
            currentPage: pageNum
        }, this.props.handlePage(pageNum))
    }

    render() {
        const pages = this.generatePageNumbers();
        console.log("pages", pages);
        return (
            <div className="offset-4 pages">
                <p>
                    {"Total Pages state: " + this.state.totalPages}
                </p>
                {/* <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item">
                            <button className="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </button>
                        </li>
                        {
                            this.props.projectCount>0 && this.generatePageNumbers().map((num, index) => {
                                return (
                                    <li key={index} className={this.state.currentPage-1 === index ? 'active page-item':'page-item'}>
                                        <button className="page-link" onClick={(e) => this.handleClick(num, e)}>{num}</button>
                                    </li>
                                )
                            })
                        }
                        <li className="page-item">
                            <button className="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </button>
                        </li>
                    </ul>
                </nav> */}

                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {
                            this.props.projectCount>0 && pages.map((num, index) => {
                                if(num === "left") return (
                                    <li key={index} className="page-item">
                                        <button className="page-link" href="#" aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                            <span className="sr-only">Previous</span>
                                        </button>
                                    </li>
                                );
                                if(num === "right") return (
                                    <li key={index} className="page-item">
                                        <button className="page-link" href="#" aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                            <span className="sr-only">Next</span>
                                        </button>
                                    </li>
                                );
                                return (
                                    <li key={index} className={this.state.currentPage-1 === index ? 'active page-item':'page-item'}>
                                        <button className="page-link" onClick={(e) => this.handleClick(num, e)}>{num}</button>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Pages;
