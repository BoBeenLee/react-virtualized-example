import _ from 'lodash';
import React, { Component } from 'react';
import { SortDirection } from 'react-virtualized';
import SortedTable from '../components/SortedTable';
import { generateRandomList } from '../utils';

const FIXED_HEIGHT = 100;

const makeRandomList = generateRandomList();

class SortedPage extends Component {
    state = {
        list: makeRandomList(),
        sortByKey: "index",
        sortDirection: SortDirection.ASC,
        columns: [
            {
                dataKey: "index", label: "Index", cellDataGetter: ({ rowData }) => rowData.index, disableSort: false, width: 70,
            },
            { dataKey: "name", label: "Name", disableSort: false, width: 90 },
            {
                dataKey: "random",
                label: "Description",
                disableSort: true, cellRenderer: ({ cellData, rowData }) => <div>{cellData}<button>{rowData.name}</button></div>, width: 200, flexGrow: 1
            },
            {
                dataKey: "date",
                label: "Date",
                disableSort: false, cellRenderer: ({ cellData }) => cellData.format("YYYY-MM-DD"), width: 200
            }
        ]
    };



    render() {
        const { list, sortByKey, sortDirection, columns } = this.state;
        return (
            <div>
                <h1>Sorted Table Size:{list.length}</h1>
                <SortedTable
                    rowHeight={FIXED_HEIGHT}
                    headerHeight={50}
                    height={600}
                    list={list}
                    sortByKey={sortByKey}
                    sortDirection={sortDirection}
                    renderSort={this.renderSort}
                    columns={columns}
                />
                <button onClick={this.loadMore}>Load More</button>
            </div>
        );
    }

    renderSort = ({ sortBy, sortDirection }) => {
        const { list } = this.state;

        this.setState((prevState) => ({
            list: _.orderBy(list, [sortBy], [_.lowerCase(sortDirection)]),
            sortByKey: sortBy,
            sortDirection
        }));
    }

    loadMore = () => {
        const { sortByKey, sortDirection } = this.state;
        this.setState((prevState) => ({
            list: [...prevState.list, ...makeRandomList()]
        }), _.partial(this.renderSort, { sortBy: sortByKey, sortDirection }));
    }
}

export default SortedPage;
