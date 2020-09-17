import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
//import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
});

class AddLand extends React.Component {
  state = {
    username:this.props.username,
    address:this.props.address,
    tokenId: null,
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  saveInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="name-simple">Location</InputLabel>
          <Input id="location" name='location' placeholder='location' onChange={this.saveInput} />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="name-simple">Cost</InputLabel>
          <Input id="cost" name='cost' placeholder='cost' onChange={this.saveInput} />
        </FormControl>
        
        <Button
          variant="contained"
          component="label"
        >
          Upload File
          <input
            type="file"
            style={{ display: "none" }}
          />
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