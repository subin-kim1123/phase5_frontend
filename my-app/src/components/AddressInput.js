import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

export default class AddressInput extends Component {
    state={
        startingPoint: '',
        destination: ''
    }
    
    // handleClose = (event) => {
    //     if (anchorRef.current && anchorRef.current.contains(event.target)) {
    //       return;
    //     }
    
    //     setOpen(false);
    //   };
    
    // handleListKeyDown(event) {
    //     if (event.key === 'Tab') {
    //       event.preventDefault();
    //       setOpen(false);
    //     }
    //   }

    render() {
        return (
            <div>
                <div style={{width: '100%', height: '170px', boxShadow: "10px 5px 5px rgba(0, 0, 0, 0.1)"}}>
                    <h2 style={{fontFamily: 'Lucida Std'}}>Commute Better</h2>
                    <form onSubmit={this.handleSubmit} style={{display:'block'}}>
                        <div>
                            <label style={{color: '#00d563'}}>Enter your location<input style={{padding: '0px 15px',border: '1.5px solid #00d563', color: '#8e8e8e', borderRadius: '4px', width: '25%', height: '40px', marginBottom: '20px'}} type ='text' name='startingPoint' id='startingPoint' value={this.state.username} onChange={this.handleChange} placeholder='Starting point'/></label>
                            <label style={{color: '#00d563'}}>Enter destination<input style={{padding: '0px 15px',border: '1.5px solid #00d563', color: '#8e8e8e', borderRadius: '4px', width: '25%', height: '40px', marginBottom: '20px'}} type ='text' name='destination' id='destination' value={this.state.username} onChange={this.handleChange} placeholder='Destination'/></label>
                            <Button type='submit'style={{color:'white', backgroundColor: '#1a1617', fontFamily: 'Lucida Std', textTransform: 'none', width: '200px', marginTop: '20px'}}>Save</Button>
                            <img src={"./profile-user.png"}/>
                        </div>
                    </form>
                </div>
            <div>
                <Paper>
                {/* <ClickAwayListener onClickAway={handleClose}> */}
                  <MenuList 
                //   autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}
                  >
                    <MenuItem>My Article</MenuItem>
                    <MenuItem>Log out</MenuItem>
                  </MenuList>
                  {/* onClick={handleClose} */}
                {/* </ClickAwayListener> */}
              </Paper>
                </div>
            </div>
        )
    }
}
