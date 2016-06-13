import React from 'react';
import AddFishForm from './AddFishForm';
import h from '../helpers';
import autobind from 'autobind-decorator';
import Firebase from 'firebase';
const ref = new Firebase ('https://catch-of-the-day-957b8.firebaseio.com/');
/*
  Inventory
  <Inventory/>
*/
@autobind
class Inventory extends React.Component{
  constructor() {
    super();
    this.state = {
      uid : ''
    }
  }
  authenticate(provider){
    console.log('Tring to auth with ' + provider);
    ref.authWithOAuthPopup(provider, function(err, authData){
      console.log(authData);
    });
  }
  renderLogin(){
    return(
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="github" onClick={this.authenticate.bind(this, 'github')}> Log In with Github</button>
        <button className="facebook" onClick={this.authenticate.bind(this, 'facebook')}> Log In with Facebook</button>
      </nav>
    )
  }

  renderInventory (key){
  var linkState = this.props.linkState;
    return(
      <form className="fish-edit" key={key}>
      <input type="text" valueLink={linkState('fishes.'+ key + '.name')}/>
      <input type="text" valueLink={linkState('fishes.'+ key + '.price')}/>
      <select valueLink={linkState('fishes.'+ key + '.status')}>
        <option value="unavailable">Sold Out!</option>
        <option value="available">Fresh!</option>
      </select>

      <textarea type="text" valueLink={linkState('fishes.'+ key + '.desc')}></textarea>
      <input type="text" valueLink={linkState('fishes.'+ key + '.image')}/>
      <button onClick={this.props.removeFish.bind(null, key)}>- Remove fish </button>



      </form>
    )
  }

  render() {
    let logoutButton = <button>Log Out! </button>
    //first check Login
    if(!this.state.uid){
      return(
        <div>
          {this.renderLogin()}
        </div>
      )
    }
    //check ownership
    if(this.state.uid !== this.state.owner){
      return(
        <div>
          <p> Sorry, you are not the owner of this store
            {logoutButton}
          </p>
      </div>
      )
    }
    return (
      <div>
      <h2>Inventory</h2>
      {logoutButton}

      {Object.keys(this.props.fishes).map(this.renderInventory)}

      <AddFishForm {...this.props} />
      <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
};

Inventory.propTypes={
  addFish : React.PropTypes.func.isRequired,
  loadSamples : React.PropTypes.func.isRequired,
  fishes : React.PropTypes.object.isRequired,
  linkState : React.PropTypes.func.isRequired,
  removeFish : React.PropTypes.func.isRequired,
};
export default Inventory;
