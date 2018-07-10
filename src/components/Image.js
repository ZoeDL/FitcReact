import React from 'react';
import PropTypes from 'prop-types';

class Image extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            width: '',
            height: ''
        }
    }

  
    adjustSize = (e) => {
        var h = e.target.height;
        var w = e.target.width;
        switch(this.props.type){
            case 'contain':
                if(w/h > this.props.rate){
                    h = 'auto';
                    w = '100%';
                }else{
                    w = 'auto';
                    h = '100%';
                }
                break;
            case 'auto':
                w = '100%';
                break;
            default:
                w = '100%';
                h = '100%';
                break;
        }
        this.setState({
            width: w,
            height: h
        })
        
    }


    render(){
        return(
                <img src={this.props.url}
                    style={{ width: this.state.width, height: this.state.height, display: 'inline-block', verticalAlign: 'middle' }} alt="图" 
                    onLoad={this.adjustSize}/>
        )
    }
}

Image.propTypes = {
    type: PropTypes.oneOf(['contain', 'cover', 'auto'])
}

export default Image;