import React from 'react';
import MenuItem from '../menu-item/menu-item.component';
import {connect} from 'react-redux';
import { selectDirecotrySection } from '../../redux/directory/directory.selector';
import './directory.style.scss';
import { createStructuredSelector } from 'reselect';
const directory = ({sections}) => (        
  <div className='directory-menu'>
    {
      sections.map(({id, ...otherSectionProps}) =>(
        <MenuItem key={id} {...otherSectionProps}/>
        )
      )
    }
  </div>   
)

const mapStateToProps = createStructuredSelector({
  sections: selectDirecotrySection
})

export default connect(mapStateToProps)(directory);