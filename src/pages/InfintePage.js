import React, { Component } from "react";
import styled from "styled-components";

import InfinteList from "../components/InfiniteList";
import { generateRandomList } from "../utils";
import { flickrSearchByTag } from "../apis";

const CatItemView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.div`
  padding-left: 15px;
`;

const FIXED_HEIGHT = 100;

class InfintePage extends Component {
  state = {
    page: 1,
    list: [],
    hasNextPage: false,
    isLoading: false
  };

  async componentDidMount() {
    const { page } = this.state;
    await this.getFlickrByCat(page);
  }

  getFlickrByCat = async page => {
    const { list } = this.state;
    this.setState({
      isLoading: true
    });
    const { pages, photos } = await flickrSearchByTag("cat", page);
    this.setState({
      page,
      list: [...list, ...photos],
      hasNextPage: page < pages,
      isLoading: false
    });
  };

  render() {
    const { list, hasNextPage, isLoading } = this.state;
    return (
      <div>
        <h1>Infinite Scroll</h1>
        <InfinteList
          list={list}
          height={500}
          rowHeight={FIXED_HEIGHT}
          loadNextPage={this.loadNextPage}
          hasNextPage={hasNextPage}
          isNextPageLoading={isLoading}
          rowRenderer={this.rowRenderer}
          isRowLoaded={this.isRowLoaded}
        />
      </div>
    );
  }

  loadNextPage = async props => {
    const { page } = this.state;
    console.log(page);
    await this.getFlickrByCat(page + 1);
  };

  // Render a list item or a loading indicator.
  // required style 
  rowRenderer = ({ index, key, style }) => {
    const { list } = this.state;
    if (!this.isRowLoaded({ index })) {
      return (
        <div key={key} style={style}>
          "Loading..."
        </div>
      );
    }
    let { title, imageUrl } = list[index];
    return (
      <CatItemView key={key} style={style}>
        <img src={imageUrl} width="100" height={FIXED_HEIGHT} />
        <Title>{title}</Title>
      </CatItemView>
    );
  };

  isRowLoaded = ({ index }) => {
    const { list, hasNextPage } = this.state;
    return !hasNextPage || index < list.length;
  };
}

export default InfintePage;
