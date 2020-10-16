import React,{Component} from 'react';
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';

const faces = [
  "http://i.pravatar.cc/300?img=1",
  "http://i.pravatar.cc/300?img=2",
  "http://i.pravatar.cc/300?img=3",
  "http://i.pravatar.cc/300?img=4"
];

const styles = muiBaseTheme => ({
  card: {
    maxWidth: 300,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  media: {
    paddingTop: "56.25%"
  },
  content: {
    textAlign: "left",
    padding: muiBaseTheme.spacing.unit * 3
  },
  divider: {
    margin: `${muiBaseTheme.spacing.unit * 3}px 0`
  },
  heading: {
    fontWeight: "bold"
  },
  subheading: {
    lineHeight: 1.8
  },
  avatar: {
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: -muiBaseTheme.spacing.unit
    }
  }
});


class LandCard extends Component{
 
  handleBuy =async () => {
    try{
      //console.log("web3_addLand", this.props.web3)
      //let accounts = await this.state.web3.eth.getAccounts()
      console.log('val: ',Number(this.props.land.cost)* (10**18))
      let accounts = await this.props.web3.eth.getAccounts()
      /*await this.props.ltInstance.methods.visited(this.props.tokenId)
      .send({from: accounts[0]})  
      .once('receipt', (receipt) => {
        this.setState({loading: false});
        this.props.lands.push({owner: this.state.address, location: this.state.location, cost: this.state.cost});
        console.log("SUCCESS");
      })*/
      console.log('ACC',accounts[0]);
      console.log('tok',this.props.tokenId);
    await this.props.ltInstance.methods.buyLand(Number(this.props.tokenId))
    .send({from: accounts[0], value: Number(this.props.land.cost)* (10**18)})  
    }
    catch(error)
    {
      console.log("submit",error);
      console.log("msg",error.message);
    }
  };

  handleVisit =async () => {
    try{
      //console.log("web3_addLand", this.props.web3)
      //let accounts = await this.state.web3.eth.getAccounts()
      console.log('val: ',Number(this.props.land.cost)* (10**18))
      let accounts = await this.props.web3.eth.getAccounts()
      await this.props.ltInstance.methods.visited(this.props.tokenId)
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


  render(){
    const { classes } = this.props;
    return(
      <div>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={
              "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
            }
          />
          <CardContent className={classes.content}>
            <Typography
              className={"MuiTypography--heading"}
              variant={"h6"}
              gutterBottom
            >
              Owner: {this.props.land.owner}
            </Typography>
            <Typography
              className={"MuiTypography--heading"}
              variant={"h6"}
              gutterBottom
            >
              Location: {this.props.land.location}
            </Typography>

            <Divider className={classes.divider} light />
            
            <Typography
              className={"MuiTypography--heading"}
              variant={"h6"}
              gutterBottom
            >
              Cost: {this.props.land.cost}
            </Typography>

            <Divider className={classes.divider} light />
            {this.props.menu!=='Purchased Lands' &&
            <Button
              type="submit"
              
              variant="contained"
              color="primary"
              
              onClick={this.handleBuy}
            >
              Buy Land
            </Button>}
            {this.props.menu!=='Purchased Lands' &&
            <Button
              type="submit"
              style={{float:'right'}}
              variant="contained"
              color="primary"
              
              onClick={this.handleVisit}
            >
              Visit Land
            </Button>}
            <div>
              <Typography
                className={"MuiTypography--subheading"}
                variant={"caption"}
                gutterBottom
              >
                Some additional description about the land
              </Typography>
            </div>
            

            {/*<Typography
              className={"MuiTypography--subheading"}
              variant={"caption"}
            >
              We are going to learn different kinds of species in nature that live
              together to form amazing environment.
            </Typography>
            <Divider className={classes.divider} light />
            {faces.map(face => (
              <Avatar className={classes.avatar} key={face} src={face} />
            ))}*/}
          </CardContent>
        </Card>

      </div>
    );
  }
}

export default withStyles(styles)(LandCard);