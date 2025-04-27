import React, { useState, useEffect, useMemo } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import ReactPaginate from 'react-paginate';
import { FaCheck, FaXmark } from 'react-icons/fa6';
import './table.css'

const defaultEntries = 10;
const API_URL = "https://mcuconnect.com/dashboard-api/machines";

const MachinesTable = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [dataLimit, setDataLimit] = useState(defaultEntries);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({});

    const columns = useMemo(() => [
        {
            Header: 'SR.NO',
            accessor: (row, i) => i + 1, // Auto-generate serial numbers
        },
        {
            Header: 'Machine',
            accessor: 'serial_number',
        },
        {
            Header: 'Status',
            accessor: 'status',
            Cell: ({ value }) => (
                <span className={value === 'online' ? 'status-online' : 'status-offline'}>
                    {value}
                </span>
            )
        },
        {
            Header: 'Burning Status',
            accessor: 'burning_status',
        },
        {
            Header: 'INFO',
            accessor: 'info',
            Cell: ({ row }) => (
                <button
                    className="info-button"
                    onClick={() => {
                        setModalData(row.original);
                        setIsModalOpen(true);
                    }}
                >
                    View
                </button>
            )
        },
    ], []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL);
                const jsonData = await response.json();
                setData(jsonData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredData = useMemo(() => {
        return data.filter((row) => {
            return Object.values(row).some(
                val => String(val).toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
    }, [data, searchTerm]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        nextPage,
        previousPage,
        pageOptions,
        state: { pageIndex },
        gotoPage,
        setPageSize,
    } = useTable(
        {
            columns,
            data: filteredData,
            initialState: { pageIndex: 0, pageSize: dataLimit },
        },
        useSortBy,
        usePagination
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="responsive-table-container">
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} machineData={modalData} />

            <div className="table-controls">
                <div className="search-container">
                    <span className="show-entries">Show</span>
                    <select
                        className='limit-box'
                        value={dataLimit}
                        onChange={(e) => {
                            setDataLimit(Number(e.target.value));
                            setPageSize(Number(e.target.value));
                        }}
                    >
                        {[5, 10, 20, 50].map(size => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                    <span className="show-entries">entries</span>
                </div>

                <input
                    className='search-boxx'
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <table {...getTableProps()} className="responsive-table">
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th key={column.id} {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr key={row.id} {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td key={cell.column.id} {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="pagination">
                <div className="pageindex-div">
                    <strong className="show-entries">
                        <span className="show-entries">Showing page</span> {pageIndex + 1} of {pageOptions.length}
                    </strong>
                </div>

                <div className="pagination-div">
                    <ReactPaginate
                        pageCount={Math.ceil(filteredData.length / dataLimit)}
                        onPageChange={({ selected }) => gotoPage(selected)}
                        containerClassName={'react-paginate'}
                        activeClassName={'selected'}
                        previousLabel={'Previous'}
                        breakLabel="..."
                        nextLabel={'Next'}
                        disabledClassName={'disabled'}
                    />
                </div>
            </div>
        </div>
    );
};

const Modal = ({ isOpen, onClose, machineData }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="model-head">
                    <h3>Machine: {machineData.serial_number}</h3>
                    <div className="space-div"></div>
                    <div className="close-button" onClick={onClose}>
                        <FaXmark />
                    </div>
                </div>

                <div className="modal-details">
                    <p><strong>Status:</strong> {machineData.status}</p> <hr />
                    <p><strong>Burning Status:</strong> {machineData.burning_status}</p> <hr />
                    <p><strong>Items Burnt:</strong> {machineData.items_burnt || 'N/A'}</p> <hr />
                    <p><strong>Burning Cycles:</strong> {machineData.burning_cycles || 'N/A'}</p> <hr />
                    <p><strong>On Since:</strong> {machineData.on_since ? new Date(machineData.on_since).toLocaleString() : "N/A"}</p> <hr />
                    <p><strong>Location:</strong> {[machineData.zone_name, machineData.ward_name, machineData.beat_name].filter(Boolean).join(' / ') || 'N/A'}</p>
                </div>
            </div>
        </div>
    );
};

export default MachinesTable;