import React from "react";
import { AutoSizer, InfiniteLoader, List } from "react-virtualized";

const InfiniteList = ({
  /** Are there more items to load? (This information comes from the most recent API request.) */
  hasNextPage,
  /** Are we currently loading a page of items? (This may be an in-flight flag in your Redux store for example.) */
  isNextPageLoading,
  /** List of items loaded so far */
  list,
  height,
  rowHeight,
  /** Callback function (eg. Redux action-creator) responsible for loading the next page of items */
  loadNextPage,
  rowRenderer,
  isRowLoaded
}) => {
  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const rowCount = hasNextPage ? list.length + 1 : list.length;

  console.log(rowCount);
  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreRows = isNextPageLoading ? () => {} : loadNextPage;
  // Every row is loaded except for our loading indicator row.

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
