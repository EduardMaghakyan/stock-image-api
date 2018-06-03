import React, { Component } from "react";

class SearchForm extends Component {
  state = {
    query: ""
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSearch(e.target.query.value);
  };

  handleChange = e => {
    this.setState({
      query: e.target.value
    });
  };

  render() {
    const { query } = this.state;
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
          className="form-inline justify-content-center align-items-center"
        >
          <div className="form-group mx-sm-3 mb-2">
            <label htmlFor="query" className="sr-only">
              Keyword
            </label>
            <input
              type="text"
              id="query"
              name="query"
              value={query}
              onChange={this.handleChange}
              className="form-control"
              placeholder="Search"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary mb-2"
            id="search-submit"
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default SearchForm;
