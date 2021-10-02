import React from 'react';
import CollectionItem from '../collection-item/collection-item.component';
import { withRouter } from 'react-router';
import {
    CollectionPreviewContainer,
    TitleContainer,
    PreviewContainer
  } from '../collection-preview/coleection-preview.style';
const CollectionPreview = ({title, items, routeName, history, match}) =>{  
    return (
    <CollectionPreviewContainer>
        <TitleContainer onClick={() => history.push(`${match.url}/${routeName}`)}>{title.toUpperCase()}</TitleContainer>
        <PreviewContainer>
            {items
            .filter((item, idx) => idx < 4)
            .map((item) =>(
                <CollectionItem key={item.id} item={item}/>
            ))
            }
        </PreviewContainer>
    </CollectionPreviewContainer>
)}

export default withRouter(CollectionPreview);