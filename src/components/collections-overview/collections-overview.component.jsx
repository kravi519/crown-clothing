import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCollectionPreview } from "../../redux/shop/shop.selector";
import CollectionPreview from "../preview-collection/collection-preview.component";
import './collections-overview.style.scss';

const CollectionsOverview = ({collections}) =>{    
    return (    
    <div className='collections-overview'>
        {
             collections.map(({id, ...otherCollectionProps}) => (                 
                <CollectionPreview key={id} {...otherCollectionProps}/>
            ))
        }            
    </div>      
)}

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionPreview
})
export default connect(mapStateToProps)(CollectionsOverview);