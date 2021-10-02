import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCollectionPreview } from "../../redux/shop/shop.selector";
import CollectionPreview from "../collection-preview/collection-preview.component";
import {CollectionsOverviewContainer} from '../collections-overview/collections-overview.style';

const CollectionsOverview = ({collections}) =>{    
    return (    
    <CollectionsOverviewContainer>
        {
             collections.map(({id, ...otherCollectionProps}) => (                 
                <CollectionPreview key={id} {...otherCollectionProps}/>
            ))
        }            
    </CollectionsOverviewContainer>      
)}

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionPreview
})
export default connect(mapStateToProps)(CollectionsOverview);