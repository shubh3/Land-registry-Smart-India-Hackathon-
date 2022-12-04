import React, { Component } from "react";
import Web3 from "web3";
import Identicon from "identicon.js";
import "./App.css";
import SocialNetwork from "./contracts/Land.json";
import Dashboard from "./dashboard";
import Main from "./Main";
import Elect from "./Elect";
import Loan from "./Loan";
import Water from "./Water";
import Govt from "./Govt";
import Land from "./Land";
import Change from "./change";
import Dobw from "./Dobw";
import Dobe from "./Dobe";
import Dobb from "./Dobb";
import Changa from "./Changa";
import Pp from "./Pp";
import Available from "./Available";
import Home from "./Home";
import Sidebar from "../src/components/Sidebar";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Benificiary from "./components/benificiary";
import Authority from "./components/authority";
import ThirdPartyService from "./components/thirdParty";
import Settings from "./components/settings";
import Auth from "./components/auth";
const particleopt = {
  particles: {
    number: {
      value: 250,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};
class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.confirm(
        "You are almost there.Press ok and install metamask ADD-ON .(ALERT : This website not available on mobile as you cannot install metamask on mobile.)",
        "_blank"
      );

      window.location.href = "https://metamask.io/";
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    var userpost = 0;
    var nocontract = 0;
    var time = 0;
    var owepost = 0;
    var inowepost = 0;
    const accounts = await web3.eth.getAccounts();

    this.setState({ account: accounts[0] });
    // Network ID
    const networkId = await web3.eth.net.getId();
    const networkData = SocialNetwork.networks[networkId];
    if (networkData) {
      const socialNetwork = new web3.eth.Contract(
        SocialNetwork.abi,
        networkData.address
      );
      this.setState({ socialNetwork });
      const postCount = await socialNetwork.methods.postCount().call();
      this.setState({ postCount });

      // this.setState({ postCount })
      // Load Posts
      for (var i = 1; i <= postCount; i++) {
        const post = await socialNetwork.methods.posts(i).call();
        console.log(post)

        this.setState({
          posts: [...this.state.posts, post],
        });

      }
      //post
      for (var i = 1; i <= postCount; i++) {
        const post = await socialNetwork.methods.posts(i).call();

        if (!post.water) {
          this.setState({
            water: [...this.state.water, post],
          });
        }
      }
      for (var i = 1; i <= postCount; i++) {
        const post = await socialNetwork.methods.posts(i).call();

        if (!post.bank) {
          this.setState({
            bank: [...this.state.bank, post],
          });
        }
      }
      for (var i = 1; i <= postCount; i++) {
        const post = await socialNetwork.methods.posts(i).call();

        if (!post.elec) {
          this.setState({
            elec: [...this.state.elec, post],
          });
        }
      }

      for (var i = 1; i <= postCount; i++) {
        const post = await socialNetwork.methods.posts(i).call();
        // console.log(userpost);

        if (this.state.account === post.owner) {
          userpost++;
          this.setState({
            my: [...this.state.my, post],
          });
          this.setState({ userpost });
        }
      }
      //contract

      this.setState({ loading: false });
    } else {
      window.alert("SocialNetwork contract not deployed to detected network.");
    }
  }
 govtransfer(tokenId,no,name,state,district,village) {
    this.setState({ loading: true })
    this.state.socialNetwork.methods.govtransfer(tokenId,no,name,state,district,village).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }
    

  isavailable(land, valid) {
    this.setState({ loading: true });
    this.state.socialNetwork.methods
      .isavailable(land, valid)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  }

  waterbill(land, valid) {
    this.setState({ loading: true });
    this.state.socialNetwork.methods
      .waterbill(land, valid)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  }
  electric(land, valid) {
    this.setState({ loading: true });
    this.state.socialNetwork.methods
      .electric(land, valid)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  }
  loan(land, valid) {
    this.setState({ loading: true });
    this.state.socialNetwork.methods
      .loan(land, valid)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  }
  mint(land) {
    this.setState({ loading: true });
    this.state.socialNetwork.methods
      .mint(land)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  }
  change(change) {
    this.setState({ loading: true });
    this.state.socialNetwork.methods
      .change(change)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  }
  transfer(land, to, no, fname, lname) {
    this.setState({ loading: true });
    this.state.socialNetwork.methods
      .transfer(this.state.account, to, land, no, fname, lname)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  }
  isallclear(land) {
    this.setState({ loading: true });
    this.state.socialNetwork.methods
      .isallclear(land)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  }
  wateradmin(valid) {
    this.setState({ loading: true });
    this.state.socialNetwork.methods
      .wateradmin(valid)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  }
  elecadmin(valid) {
    this.setState({ loading: true });
    this.state.socialNetwork.methods
      .elecadmin(valid)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  }
  bankadmin(valid) {
    this.setState({ loading: true });
    this.state.socialNetwork.methods
      .bankadmin(valid)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  }
  changeadmin(valid) {
    this.setState({ loading: true });
    this.state.socialNetwork.methods
      .changeadmin(valid)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      socialNetwork: null,
      flag: true,

      posts: [],
      bank: [],
      elec: [],
      water: [],
      my: [],

      loading: true,
      mode: true,
      loggedIn: false,
    };

    this.setState({ isloggedIn: false });

    this.govtransfer = this.govtransfer.bind(this);
    this.isallclear = this.isallclear.bind(this);
    this.change = this.change.bind(this);
    this.mint = this.mint.bind(this);
    this.isavailable = this.isavailable.bind(this);
    this.waterbill = this.waterbill.bind(this);
    this.electric = this.electric.bind(this);
    this.loan = this.loan.bind(this);
    this.wateradmin = this.wateradmin.bind(this);

    this.transfer = this.transfer.bind(this);

    this.elecadmin = this.elecadmin.bind(this);
    this.bankadmin = this.bankadmin.bind(this);
    this.changeadmin = this.changeadmin.bind(this);
  }

  render() {
    return (
      <div>
        <Router>
          <Dashboard></Dashboard>
          {/* <NavigationBar /> */}

          {/* <Sidebar /> */}

          <Route path="/auth" exact render={(props) => <Auth />} />

          <Route
            path="/beneficiary"
            exact
            render={(props) => (
              <Benificiary
                {...props}
                mint={this.mint}
                posts={this.state.posts}
                account={this.state.account}
              />
            )}
          />

          <Route
            path="/main"
            exact
            render={(props) => (
              <Main
                {...props}
                mint={this.mint}
                posts={this.state.posts}
                account={this.state.account}
              />
            )}
          />
          <Route
            path="/thirdparty"
            exact
            render={(props) => (
              <ThirdPartyService
                {...props}
                mint={this.mint}
                posts={this.state.posts}
                account={this.state.account}
              />
            )}
          />
          <Route
            path="/settings"
            exact
            render={(props) => (
              <Settings
                {...props}
                mint={this.mint}
                posts={this.state.posts}
                account={this.state.account}
              />
            )}
          />

          <Route
            path="/authority"
            exact
            render={(props) => (
              <Authority
                {...props}
                mint={this.mint}
                posts={this.state.posts}
                account={this.state.account}
              />
            )}
          />

          <Route
            path="/available"
            exact
            render={(props) => (
              <Available
                {...props}
                account={this.state.account}
                isavailable={this.isavailable}
                my={this.state.my}
              />
            )}
          />

          <Route
            path="/water"
            exact
            render={(props) => (
              <Water
                {...props}
                waterbill={this.waterbill}
                water={this.state.water}
                account={this.state.account}
              />
            )}
          />

          <Route
            path="/loan"
            exact
            render={(props) => (
              <Loan
                {...props}
                account={this.state.account}
                bank={this.state.bank}
                loan={this.loan}
              />
            )}
          />

          <Route
            path="/elect"
            exact
            render={(props) => (
              <Elect
                {...props}
                account={this.state.account}
                elec={this.state.elec}
                isallclear={this.isallclear}
                electric={this.electric}
              />
            )}
          />

          <Route
            path="/govt"
            exact
            render={(props) => (
              <Govt
                {...props}
                account={this.state.account}
                posts={this.state.posts}
                govtransfer={this.govtransfer}
              />
            )}
          />

          <Route
            path="/records"
            exact
            render={(props) => (
              <Land
                {...props}
                account={this.state.account}
                posts={this.state.posts}
              />
            )}
          />

          <Route
            path="/change"
            exact
            render={(props) => (
              <Change
                {...props}
                account={this.state.account}
                posts={this.state.posts}
                change={this.change}
              />
            )}
          />

          <Route
            path="/p2p"
            exact
            render={(props) => (
              <Pp
                {...props}
                isallclear={this.isallclear}
                account={this.state.account}
                transfer={this.transfer}
              />
            )}
          />

          <Route
            path="/votewa"
            exact
            render={(props) => (
              <Dobw
                {...props}
                account={this.state.account}
                wateradmin={this.wateradmin}
              />
            )}
          />

          <Route
            path="/voteel"
            exact
            render={(props) => (
              <Dobe
                {...props}
                account={this.state.account}
                elecadmin={this.elecadmin}
              />
            )}
          />

          <Route
            path="/voteba"
            exact
            render={(props) => (
              <Dobb
                {...props}
                account={this.state.account}
                bankadmin={this.bankadmin}
              />
            )}
          />

          <Route
            path="/changead"
            exact
            render={(props) => (
              <Changa
                {...props}
                account={this.state.account}
                changeadmin={this.changeadmin}
              />
            )}
          />

          <Route path="/" exact render={(props) => <Home />} />
        </Router>
      </div>
    );
  }
}

export default App;
