import React from 'react';
import MenuItem from '../menu-item/menu-item.component';
import {connect} from 'react-redux';
import { selectDirecotrySection } from '../../redux/directory/directory.selector';
import {DirectoryMenuContainer} from '../directory/directory.style';
import { createStructuredSelector } from 'reselect';

const directory = ({sections}) => (        
  <DirectoryMenuContainer>
    {
      sections.map(({id, ...otherSectionProps}) =>(
        <MenuItem key={id} {...otherSectionProps}/>
        )
      )
    }
  </DirectoryMenuContainer>   
)

const mapStateToProps = createStructuredSelector({
  sections: selectDirecotrySection
})

export default connect(mapStateToProps)(directory);