import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import SearchForm from "./form/SearchForm";
import ImageGrid from "./image-grid/ImageGrid";

class App extends Component {
  state = {
    images: []
  };

  getImages = value => {
    let url = `http://localhost:8080/api/images/${value}`;
    axios.get(url).then(response => {
      this.setState({
        images: response.data || []
      });
    });
  };

  render() {
    const { images } = this.state;
    return (
      <main role="main">
        <section className="jumbotron text-center">
          <div className="container">
            <h1 className="jumbotron-heading">
              Stock photos from different public sources
            </h1>
            <SearchForm handleSearch={this.getImages} />
          </div>
        </section>
        <div className="album py-5 bg-light">
          <ImageGrid images={images} />
        </div>
      </main>
    );
  }
}

export default App;
