import React, { Component } from 'react'
import money from './icon/money.png'
import money2 from './icon/money2.png'
import film from './icon/film.png'
import travel from './icon/travel.png'
import business from './icon/business.png'
import tech from './icon/tech.png'
import sns from './icon/sns.png'

export default class CategoryContainer extends Component {
    state = {
        helloText: ''
    }

    handleClick = (category) => { 
        this.setState(()=>{
            return {helloText: category}
        })
    }

    render() {
        return (
            <div>
                <div style={{width: '100%', height: '170px', boxShadow: "10px 5px 5px rgba(0, 0, 0, 0.1)", backgroundColor: "rgba(255, 255, 255,)"}}>
                    <h2 style={{fontFamily: 'Lucida Std'}}>Commute Better</h2>
                    <div className='category'>
                        <label style={{fontFamily: 'Lucida Std'}}>Money<button onClick={(e)=>this.handleClick('Money')} style={{border: 'none', background: 'none'}}><img src={money} alt="Money" style={{width: '75px'}}/></button></label>
                        <label style={{fontFamily: 'Lucida Std'}}>Film<button onClick={(e)=>this.handleClick('Film')}style={{border: 'none', background: 'none'}}><img src={film} alt="Film" style={{width: '75px'}}/></button></label>
                        <label style={{fontFamily: 'Lucida Std'}}>Travel<button style={{border: 'none', background: 'none'}}><img src={travel} alt="Travel" style={{width: '75px'}}/></button></label>
                        <label style={{fontFamily: 'Lucida Std'}}>Tech<button style={{border: 'none', background: 'none'}}><img src={tech} alt="Technology" style={{width: '75px'}}/></button></label>
                        <label style={{fontFamily: 'Lucida Std'}}>Social Media<button style={{border: 'none', background: 'none'}}><img src={sns} alt="SNS" style={{width: '75px'}}/></button></label>
                        <label style={{fontFamily: 'Lucida Std'}}>Business<button style={{border: 'none', background: 'none'}}><img src={business} alt="Business" style={{width: '75px'}}/></button></label>
                    </div>
                </div>
                <div>
                    <h1>Article</h1>
                    {this.state.helloText}

                </div>
            </div>
        )
    }
}
