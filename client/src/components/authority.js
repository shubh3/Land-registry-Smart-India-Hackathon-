import React, { Component } from "react";
import Identicon from "identicon.js";


import { HopscotchContext, StartButton } from "react-guided-tour";
class Authority extends Component {
  render() {
    return (
      <div>
        <div className="container-fluid mt-5">
          <div className="row">
            <main
              role="main"
              className="col-lg-12 ml-auto mr-auto"
              style={{ maxWidth: "850px" }}
            >
              <div className="content mr-auto ml-auto">
                <p>&nbsp;</p>

                <div align="center">
                  <h1 id="ab">Authority Module</h1>
                  <br />
                </div>

                <br />
                <br />
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const landno = this.land.value;

                    // this.props.mint(landno)
                  }}
                >
                  <div id="abde" className="form-group mr-sm-2">
                    <input
                      id="land"
                      type="text"
                      ref={(input) => {
                        this.land = input;
                      }}
                      className="form-control"
                      placeholder="land no."
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-block">
                    Mint it
                  </button>
                </form>

                <p>&nbsp;</p>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}
export default Authority;
