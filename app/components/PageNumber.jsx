import { Tooltip } from 'flowbite-react';
import React, { useEffect, useState } from 'react'

function PageNumber(props) {

    const list = props.list;
    const page = 10;

    const [currentPage, setCurrentPage] = useState(1);
    const [displayedItems, setDisplayedItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [displayFailedText, setDisplayFailedText] = useState(false);

    useEffect(() => {
        if (list.length > 0) {
            const startIndex = page * (currentPage - 1);
            const endIndex = startIndex + page;

            setDisplayedItems(list.slice(startIndex, endIndex));
        }
        else {
            setLoading(true);
        }
    }, [list, currentPage]);

    const handlePageChange = (PageNumber) => {
        setCurrentPage(PageNumber);
    }

    useEffect(() => {
        let timeoutId;

        if (loading) {
            timeoutId = setTimeout(() => {
                setDisplayFailedText(true);
            }, 10000);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [loading]);

    return (
        <tbody>

            {displayedItems.length > 0 ? (
                displayedItems.map((product, index) => (
                    <tr
                        className={`${index & 1 ? "bg-gray-100" : "bg-white"
                            } table-row`}
                        key={product.name}
                    >
                        <td className="p-2 border-b">
                            <input
                                className={`${index & 1 ? "bg-gray-100" : "bg-white"
                                    } border-none input-field`}
                                type="text"
                                disabled
                                value={product.name}
                            />
                        </td>
                        <td className="p-2 border-b">
                            <input
                                className={`${index & 1 ? "bg-gray-100" : "bg-white"
                                    } border-none input-field`}
                                type="number"
                                disabled
                                value={product.quantity}
                            />
                        </td>
                        <td className="p-2 border-b">
                            <Tooltip content={`Edit ${product.name} details`}>
                                <svg
                                    onClick={() => {
                                        console.log(`Editing ${product.name} details`);
                                        handleEdit(product.name, product.quantity);
                                    }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 32 32"
                                    width="32px"
                                    height="32px"
                                    data-tooltip-target="tooltip-dark"
                                    className="cursor-pointer ml-4 hover:bg-gray-200"
                                >
                                    <path d="M 23.90625 3.96875 C 22.859375 3.96875 21.8125 4.375 21 5.1875 L 5.1875 21 L 5.125 21.3125 L 4.03125 26.8125 L 3.71875 28.28125 L 5.1875 27.96875 L 10.6875 26.875 L 11 26.8125 L 26.8125 11 C 28.4375 9.375 28.4375 6.8125 26.8125 5.1875 C 26 4.375 24.953125 3.96875 23.90625 3.96875 Z M 23.90625 5.875 C 24.410156 5.875 24.917969 6.105469 25.40625 6.59375 C 26.378906 7.566406 26.378906 8.621094 25.40625 9.59375 L 24.6875 10.28125 L 21.71875 7.3125 L 22.40625 6.59375 C 22.894531 6.105469 23.402344 5.875 23.90625 5.875 Z M 20.3125 8.71875 L 23.28125 11.6875 L 11.1875 23.78125 C 10.53125 22.5 9.5 21.46875 8.21875 20.8125 Z M 6.9375 22.4375 C 8.136719 22.921875 9.078125 23.863281 9.5625 25.0625 L 6.28125 25.71875 Z" />
                                </svg>
                            </Tooltip>
                        </td>
                    </tr>
                ))
            ) : (
                <tr className='text-center'>
                    <td colSpan="2" className="p-2">
                        {loading ? (
                            <>
                                {displayFailedText ? 'Failed to fetch Products' : (<img src="1487.gif" alt="Loading.." className="h-8 m-auto" />)}
                               
                            </>
                        ) : (
                            <>
                               <img src="1487.gif" alt="Loading.." className="h-8 m-auto" />
                            </>
                        )}
                    </td>
                </tr>
            )}
            {
                list.length > 0 && (
                    <tr>
                        <td className='flex justify-start'>
                            {
                                Array(Math.ceil(list.length / page)).fill().map((_, index) => (
                                    <button key={index} onClick={() => {
                                        handlePageChange(index + 1)
                                    }} className={`p-4 mt-5 border-black ${(currentPage === index + 1 ? 'bg-gray-200' : '')} `}>{index + 1}</button>
                                ))
                            }
                        </td>
                    </tr>
                )
            }
        </tbody>
    )
}

export default PageNumber