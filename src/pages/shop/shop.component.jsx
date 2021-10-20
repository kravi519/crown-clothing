import React from 'react';
import { Route } from 'react-router';
import {connect} from 'react-redux';
import { fetchCollectionStart } from '../../redux/shop/shop.action';
import {CollectionsOverviewContainer} from '../../components/collections-overview/collections-overview.container';
import { CollectionContainer } from '../collection/collection.container';

class ShopPage extends React.Component {  

    componentDidMount(){        
        const {fetchCollectionStart} = this.props;      
        fetchCollectionStart();
    }

    render(){        
        const {match} = this.props;
        return (     
            <div className='shop-page'>
                < Route exact path={`${match.path}`} component={CollectionsOverviewContainer}/>
                < Route path={`${match.path}/:collectionId`} component={CollectionContainer}/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({    
    fetchCollectionStart: () =>  dispatch(fetchCollectionStart())
})
export default connect(null, mapDispatchToProps)(ShopPage);