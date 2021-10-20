import {connect} from "react-redux";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import CollectionPage from '../collection/collection.component';
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { selectIsCollectionLoaded } from '../../redux/shop/shop.selector';

const mapStateToProps = createStructuredSelector({
    isLoading: state => !selectIsCollectionLoaded(state)
})
export const CollectionContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionPage)