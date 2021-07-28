import React, { Component } from 'react'
import CategoryContainer from './CategoryContainer'
import List from '@material-ui/core/List';
import { withRouter } from 'react-router-dom';

class Category extends Component {
    render() {
        // console.log('hi')
        // console.log(this.props.recipes)
        const arrOfComponents = this.props.categories.map(articleObj=>{
            return <CategoryContainer key={articleObj.id} 
            articleObj={articleObj} 
            logOut={this.props.logOut}/>
        })
        return (
                {arrOfComponents}
         )
    
}
}

export default withRouter(Category)

