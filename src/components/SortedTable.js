import _ from 'lodash';
import React from 'react';
import { Column, Table, AutoSizer } from 'react-virtualized';

import styled from 'styled-components';

const ColumnView = styled.div`
    flex-direction: column;
`;

const SortedTable = ({
    rowHeight,
    headerHeight,
    height,
    list,
    sortByKey,
    sortDirection,
    renderSort,
    columns
}) => {
    const rowGetter = ({ index }) => list[index];
    const rowCount = list.length;

    return (
        <AutoSizer disableHeight>
            {({ width }) => (
                <Table
                    width={width}
                    headerHeight={headerHeight}
                    height={height}
                    noRowsRenderer={() => <div>No Render</div>}
                    rowHeight={rowHeight}
                    rowGetter={rowGetter}
                    overscanRowCount={20}
                    rowCount={rowCount}
                    sort={renderSort}
                    sortBy={sortByKey}
                    sortDirection={sortDirection}
                >
                    {_.map(columns, column => (
                        <Column key={column.dataKey} {...column} />
                    ))}
                </Table>
            )
            }
        </AutoSizer >
    );
};

export default SortedTable;
