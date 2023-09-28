import React from "react"
import "./pagination.css"
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'

function Pagination({ currentPage, totalPages, onPageChange }) {
    const renderPageNumbers = () => {
        const pageNumbers = []
        const maxPagesToShow = 5

        let startPage = currentPage - Math.floor(maxPagesToShow / 2)
        startPage = Math.max(1, startPage)
        const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages)

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={currentPage === i ? 'active' : ''}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers
    }

    return (
        <div className="pagination">
            <button className="arrow-btn"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <IoIosArrowBack/>
            </button>

            <div className="btn-separator">
                |
            </div>

            <p style={{marginLeft: '10px'}}>&nbsp;</p>
            {renderPageNumbers()}
            <p style={{marginRight: '10px'}}>&nbsp;</p>

            <div className="btn-separator">
                |
            </div>

            <button className="arrow-btn"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <IoIosArrowForward/>
            </button>
        </div>
    )
}

export default Pagination