import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
//import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import Web3 from 'web3';
import {landToken_ABI, landToken_address} from './config';
import getWeb3 from './utils/getWeb3';
import landToken from './contracts/landToken.json';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
});

class AddLand extends Component {

  constructor(props)
  {
    super(props);
    this.state={
      username:this.props.username,
      address:this.props.address,
      tokenId: null,
      loading: true,
      ltInstance: undefined,
      web3: undefined
    }
    //this.loadBlockchainData();
  }

  /*componentDidMount= async () =>{
    try {
      // Get network provider and web3 instance.
      console.log("Tryyyyy")
      const web3 = await getWeb3();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = landToken.networks[networkId];
      const ltInstance = new web3.eth.Contract(
        landToken.abi,
       deployedNetwork && deployedNetwork.address,
      );
      this.setState({ ltInstance: ltInstance, web3: web3})
      
      console.log("web33",web3);
      console.log("ltInst",ltInstance);
      

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contracts. Check console for details.`
      );
      console.log("load",error);
      console.log("errrrrrr")
    }
    // console.log("from User Registration:", this.state.umInstance)
    // console.log("from User Registration:", this.state.web3)
  }*/

  componentDidMount=  () =>{
    this.setState({ ltInstance: this.props.ltInstance});
    console.log('ltIns',this.props.ltInstance)

  }
  

  /*loadBlockchainData = async()=>{
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
    console.log("landToken in AddLand",landToken);

    
    
    this.setState({loading:false});
    //console.log(this.state);
  }*/

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  saveInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit =async () => {
    try{
      console.log("web3_addLand", this.props.web3)
      //let accounts = await this.state.web3.eth.getAccounts()
      let accounts = await this.props.web3.eth.getAccounts()
    
    await this.props.ltInstance.methods.addLand(this.state.location, Number(this.state.cost))
    .send({from: accounts[0]})  
    .once('receipt', (receipt) => {
      this.setState({loading: false});
      this.props.lands.push({owner: this.state.address, location: this.state.location, cost: this.state.cost});
      console.log("SUCCESS");
    })
    }
    catch(error)
    {
      console.log("submit",error);
    }
  };

  render() {
    const { classes } = this.props;
    //console.log("ABI", JSON.parse(this.props.landToken));
    return (
      <div className={classes.container} style={{display : 'inline-block'}}>
        <div >
          <FormControl className={classes.formControl} >
            <InputLabel htmlFor="name-simple">Location</InputLabel>
            <Input id="location" name='location' placeholder='location' onChange={this.saveInput} required/>
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl} >
            <InputLabel htmlFor="name-simple">Cost</InputLabel>
            <Input id="cost" name='cost' placeholder='cost' onChange={this.saveInput} required/>
          </FormControl>
        </div>
        <br/>
        
        <Button
          variant="contained"
          component="label"
        >
          Upload File
          <input
            type="file"
            style={{ display: "none" }}
          />
        </Button><br/><br/>
        
        <Button
          type="submit"
          disabled={this.props.ltInstance===undefined}
          variant="contained"
          color="primary"
          
          onClick={this.handleSubmit}
        >
          Add Land
        </Button>
        <div>
          name: {this.state.username}<br/>
          address: {this.state.address}<br/>
          location: {this.state.location}<br/>
          cost: {this.state.cost}
        </div>
      </div>
      
    );
  }
}

AddLand.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddLand);