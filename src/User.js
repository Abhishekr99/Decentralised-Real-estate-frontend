//import React ,{ useEffect, useState }from 'react';
import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import AddBoxIcon from '@material-ui/icons/AddBox';
import ApartmentIcon from '@material-ui/icons/Apartment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { withStyles } from '@material-ui/core/styles';
import AddLand from './AddLand';

import { Redirect } from "react-router-dom";

import LandCards from './LandCards';

import getWeb3 from './utils/getWeb3';
import landToken from './contracts/landToken.json';

const drawerWidth = 240;

const styles =theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
});

/*const loadBlockchain = () =>{
  const [ltInstance, setLt] = useState([]);
  useEffect(async()=>{
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
     setLt(ltInstance);
      
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
  }, [])
  
  // console.log("from User Registration:", this.state.umInstance)
  // console.log("from User Registration:", this.state.web3)
}*/



class User extends Component {
  /*const classes = useStyles();
  const [menu, setMenu] = useState('Lands for sale');*/
  //const [ltInstance, setLt] = useState([]);
  constructor(props)
  {
    super(props);
    this.state={
      username:this.props.username,
      address:this.props.address,
      tokenId: null,
      loading: true,
      ltInstance: undefined,
      web3: undefined,
      menu: 'Lands for sale'
    }
    //this.loadBlockchainData();
  }


  componentDidMount= async () =>{
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
      const landCount = await ltInstance.methods.getLandcount().call();
      this.setState({landCount: landCount});
      
      console.log("web33",web3);
      console.log("ltInst",this.state.ltInstance);
      

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
  }

  render()
  {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Permanent drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar} />
          <Divider />
          <List>
            {['Add Land', 'Lands for sale'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <AddBoxIcon /> : <ApartmentIcon />}</ListItemIcon>
                <ListItemText primary={text} name={text} onClick={() => this.setState({menu: text})}/>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Purchased Lands'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon><AssignmentTurnedInIcon /></ListItemIcon>
                <ListItemText primary={text} onClick={() => this.setState({menu: text})}/>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Sign out'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                <ListItemText primary={text} onClick={() => this.setState({menu: text})}/>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {/*<Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
            facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
            gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
            donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
            adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
            Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
            imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
            arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </Typography>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
            facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
            tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
            consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
            vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
            hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
            tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
            nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
            accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
          </Typography>*/}
          {this.state.menu === 'Add Land' ?
          
          <AddLand 
           //landToken={this.props.location.state.landToken}
           username={this.props.location.state.username} 
           address={this.props.location.state.address}
           lands={this.props.location.state.landsForSale}
           ltInstance={this.state.ltInstance}
           web3={this.state.web3}
           />
          : null}
          {this.state.menu === 'Lands for sale' ?
            <LandCards 
            menu={this.state.menu} 
            ltInstance={this.state.ltInstance} 
            web3={this.state.web3}
            landCount={this.state.landCount}>
            </LandCards>
          
          : null}
  
          {this.state.menu === 'Purchased Lands' ?
            <LandCards menu={this.state.menu} ltInstance={this.state.ltInstance} web3={this.state.web3} landCount={this.state.landCount}></LandCards>
          
          : null}
  
          
  
          {this.state.menu === 'Sign out' ?
          <Redirect to="/" />
          : null}
        </main>
      </div>
    );
  }
  
}

export default withStyles(styles)(User);