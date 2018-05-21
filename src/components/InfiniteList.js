import React from "react";
import { AutoSizer, InfiniteLoader, List } from "react-virtualized";

const InfiniteList = ({
  hasNextPage,
  isNextPageLoading,
  list,
  height,
  rowHeight,
  loadNextPage,
  rowRenderer,
  isRowLoaded
}) => {
  const rowCount = hasNextPage ? list.length + 1 : list.length;
  const loadMoreRows = isNextPageLoading ? () => {} : loadNextPage;

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={rowCount} // required rowCount 
    >
      {({ onRowsRendered, registerChild }) => (
        <AutoSizer disableHeight>
          {({ width }) => (
            <List
              width={width}
              height={height} // required height 
              ref={registerChild}
              onRowsRendered={onRowsRendered}
              rowCount={rowCount} // required rowCount 
              rowHeight={rowHeight} // required rowHeight 
              rowRenderer={rowRenderer} // required rowRenderer 
            />
          )}
        </AutoSizer>
      )}
    </InfiniteLoader>
  );
};

export default InfiniteList;
