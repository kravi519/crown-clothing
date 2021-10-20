import {connect} from "react-redux";
import WithSpinner from "../with-spinner/with-spinner.component";
import CollectionsOverview from "./collections-overview.component";

import {selectShopIsFetching} from "../../redux/shop/shop.selector";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

const mapStateToProps = createStructuredSelector({
    isLoading: selectShopIsFetching
})

export const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview)