import React, {Component} from 'react';
import getWeb3 from './utils/getWeb3';
import landToken from './contracts/landToken.json';
import LandCard from './LandCard';

class LandCards extends Component
{

    constructor(props)
    {
        super(props);
        this.state={
        landsForSale: [],
        purchasedLands: [],
        ltInstance: undefined,
        web3: undefined
        }
    }

    componentDidMount= async () =>{
        try {
          // Get network provider and web3 instance.
          
          /*const web3 = await getWeb3();
          console.log("Testtt")
          // Get the contract instance.
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = landToken.networks[networkId];
          const ltInstance = new web3.eth.Contract(
            landToken.abi,
           deployedNetwork && deployedNetwork.address,
          );
          this.setState({ ltInstance: ltInstance, web3: web3})
          const accounts=await web3.eth.getAccounts();
          console.log("testing")
          this.setState({ account: accounts[0] })
          const landCount = await ltInstance.methods.getLandcount().call();
          
            console.log('count',landCount)
            console.log('location',await ltInstance.methods.tokenLocation(1).call());
            console.log('cost',await ltInstance.methods.tokenCost(1).call());
            console.log('owner',await ltInstance.methods.ownerOf(1).call());
            console.log('acc',this.state.account);
            //console.log('avail',await ltInstance.methods.getAvailability(1));*/
            const accounts=await this.props.web3.eth.getAccounts();
            this.setState({account: accounts[0]});
            for(let i=1; i<=this.props.landCount; i++)
            {
                
                let owner=await this.props.ltInstance.methods.ownerOf(i).call();
                let location=await this.props.ltInstance.methods.tokenLocation(i).call();
                let cost=await this.props.ltInstance.methods.tokenCost(i).call();
                console.log("bool: "+await this.props.ltInstance.methods.ownerOf(i).call() ==  (this.state.account));
            
                if(await this.props.ltInstance.methods.ownerOf(i).call() ==  (this.state.account))
                {
                    console.log("HIII")
                    this.setState({
                    purchasedLands: [...this.state.purchasedLands, {owner: owner, location: location, cost: cost}]
                    })
                }
                if(await this.props.ltInstance.methods.getAvailability(i).call()===true)
                {
                    this.setState({
                    landsForSale: [...this.state.landsForSale, {owner: owner, location: location, cost: cost}]
                    })
                }
            
            }
            console.log('purchased',this.state.purchasedLands)
            //console.log('length',this.state.landsForSale.length)

            /*localStorage.setItem('ltInstance',this.state.ltInstance);
            localStorage.setItem('web3',this.state.web3);*/
    
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contracts. Check console for details.`
          );
          console.log("load",error);
        }
        // console.log("from User Registration:", this.state.umInstance)
        // console.log("from User Registration:", this.state.web3)
    }

    render(){
        return(
            <div>
                {this.props.menu==='Lands for sale' &&
                (
                    <div style={{display : 'flex',flexWrap: 'wrap',}}>
                        {
                            this.state.landsForSale.length > 0
                            ? (this.state.landsForSale.map((land, index) => {
                            return(
                            <span style={{padding: "1rem"}} key={index}>
                                <LandCard menu={this.props.menu} land={land} tokenId={index+1} ltInstance={this.props.ltInstance} web3={this.props.web3}/>
                            </span>)
                            }))
                            : <LandCard land={{owner: 'test',location: 'test-loc', cost:'test-cost'}}/>
                        }
                    </div>
                )}
                {this.props.menu==='Purchased Lands' &&
                (
                    <div style={{display : 'flex',flexWrap: 'wrap',}}>
                        {
                            this.state.purchasedLands.length > 0
                            ? (this.state.purchasedLands.map((land, index) => {
                            return(
                            <span style={{padding: "1rem"}} key={index}>
                                <LandCard menu={this.props.menu} land={land} tokenId={index+1} ltInstance={this.props.ltInstance} web3={this.props.web3}/>
                            </span>)
                            }))
                            : <div>You have not purchased any lands!!</div>
                        }
                    </div>
                )}
            </div>
            
            
            
        );
    }


}

export default LandCards;
