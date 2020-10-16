import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
//import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
//import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
//import MenuItem from '@material-ui/core/MenuItem';
//import Select from '@material-ui/core/MenuItem';
//import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
//import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import {withStyles} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import Web3Utils, { isUserEthereumAddressInBloom } from 'web3-utils';
import Web3 from 'web3';

import {landToken_ABI, landToken_address} from './config';

import landToken from './contracts/landToken.json';
import getWeb3 from './utils/getWeb3';
//import { Redirect } from "react-router-dom";

const styles = theme => ({
  
  root: {
    height: '100vh',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  image: {
    backgroundImage: 'url(https://news.bitcoin.com/wp-content/uploads/2018/01/shutterstock_780312286.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends Component {
  state={
    role:"",
    account: '',
    landToken: null,
    purchasedLands: [],
    lanndsForSale: [],
    loading: false
    
  };

  constructor(props){
    super(props);
    this.state={
      role:"",
      account: '',
      landToken: null,
      purchasedLands: [],
      lanndsForSale: [],
      loading: false
    }
    //this.loadBlockchainData();

  }

  /*componentDidMount= async () =>{
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = landToken.networks[networkId];
      const ltInstance = new web3.eth.Contract(
        landToken.abi,
       deployedNetwork && deployedNetwork.address,
      );
      //this.setState({ ltInstance: ltInstance, web3: web3})
      //this.setState({web3: web3})

      const landCount = await ltInstance.methods.getLandcount().call();
    console.log("count",landCount)
   
    const location = await ltInstance.methods.tokenLocation(1).call();
    console.log('loc: ',location);

    /*for(let i=1; i<=landCount; i++)
    {
      let owner=await ltInstance.methods.ownerOf(i).call();
      let location=await ltInstance.methods.tokenLocation(i).call();
      let cost=await ltInstance.methods.tokenCost(i).call();
      if(ltInstance.methods.ownerOf(i).call() === this.state.address)
      {
        this.setState({
          purchasedLands: [...this.state.purchasedLands, {owner: owner, location: location, cost: cost}]
        })
      }
      if(ltInstance.methods.getAvailability(i)===true)
      {
        this.setState({
          landsForSale: [...this.state.landsForSale, {owner: owner, location: location, cost: cost}]
        })
      }
      
    }
      

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contracts. Check console for details.`
      );
      console.log("load",error);
    }
    // console.log("from User Registration:", this.state.umInstance)
    // console.log("from User Registration:", this.state.web3)

    
  }*/

  loadBlockchainData = async()=>{
    await window.ethereum.enable();//this is a new feature as now a/c are not exposed directly
    const web3=new Web3("http://localhost:7545" || Web3.givenProvider);
    //const web3=new Web3(Web3.givenProvider);
    const network=await web3.eth.net.getNetworkType();
    const accounts=await web3.eth.getAccounts();
    this.setState({ account: accounts[0] })
    console.log("accounts: ",accounts.length);
    console.log("n/w: ",network);

    const landToken = new web3.eth.Contract(landToken_ABI, landToken_address);
    //this.setState({landToken: JSON.stringify(landToken)});
    //localStorage.setItem('landToken', landToken);
    console.log("landToken",landToken);

    const landCount = await landToken.methods.getLandcount().call();
    this.setState({landCount: landCount});
    console.log("landCount",landCount);

    const name = await landToken.methods.name().call();
    console.log("name",name);
    /*for(let i=1; i<=landCount; i++)
    {
      let owner=await landToken.methods.ownerOf(i).call();
      let location=await landToken.methods.tokenLocation(i).call();
      let cost=await landToken.methods.tokenCost(i).call();
      if(landToken.methods.ownerOf(i).call() === this.state.address)
      {
        this.setState({
          purchasedLands: [...this.state.purchasedLands, {owner: owner, location: location, cost: cost}]
        })
      }
      if(landToken.methods.getAvailability(i)===true)
      {
        this.setState({
          landsForSale: [...this.state.landsForSale, {owner: owner, location: location, cost: cost}]
        })
      }
      
    }*/
    this.setState({loading:false});
    //console.log(this.state);
  }

  saveInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit=() =>{
    /*console.log("value: "+Web3Utils.isAddress(this.state.address));*/
    //console.log('dadadad')
    this.setState({loading:true});
    console.log("SUBMIT",this.state);
    this.props.history.push({
          pathname: "/user",
          state: this.state,
          
        });
    /*if(Web3Utils.isAddress(this.state.address))
    {
      if(this.state.role==='buyer')
      {
        this.props.history.push({
          pathname: "/buyer",
          state: this.state,
          
        });
      }
      else
      {
        this.props.history.push({
          pathname: "/seller",
          state: this.state,
          
        });
      }
      
    }
    else
    {
      window.alert("Please enter a valid Eth address!!")
    }*/
    //this.loadBlockchainData();
  }
    render() {
        const { classes } = this.props;
        
        return (
          /*this.state.loading 
          ? <CircularProgress /> 
          :*/
          <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <form className={classes.form} >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="User name"
                    name="username"
                    autoComplete="username"
                    onChange={this.saveInput}
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="address"
                    label="Eth Address"
                    type="text"
                    id="address"
                    autoComplete="address"
                   onChange={this.saveInput}
                  />
                  {/*<FormControl component="fieldset" required>
                    
                    <RadioGroup aria-label="role" name="role" onChange={this.saveInput}>
                      <FormControlLabel value="buyer" control={<Radio />} label="Buyer" />
                      <FormControlLabel value="seller" control={<Radio />} label="Seller" />
                      
                    </RadioGroup>
                   </FormControl>*/}
                  {this.state.loading
                  ? <Button> <CircularProgress /> </Button>
                  : <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.handleSubmit}
                  >
                    Sign In
                  </Button>}
                  
                </form>
              </div>
            </Grid>
        {/*<div>Account: {this.state.account}</div>*/}
          </Grid>
        );
    }
}

export default withStyles(styles)(Login);