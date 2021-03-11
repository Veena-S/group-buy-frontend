/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocalStorage } from '@rehooks/local-storage';
import { useParams } from 'react-router';
import {
  GroupBuyContext, setDisplayListingMode, LISTING_VIEW_MODES,
  selectListingAction, selectListing, deleteListing,
} from '../../store.jsx';
import DetailedListingView from './DetailedListingView.jsx';
import QuantityPicker from './QuantityPicker.jsx';
import DisplayBreadcrumb from '../Breadcrumb/DisplayBreadcrumb.jsx';

export default function ViewListing() {
  const { store, dispatch } = useContext(GroupBuyContext);
  const {
    currentListViewDisplayMode, loggedInUserId, selectedListingData,
  } = store;
  const [disableBuy, setDisableBuy] = useState(true);
  const [localStoreDetailedListView] = useLocalStorage('detailedListView');
  const [localStoreListViewDisplayMode] = useLocalStorage('ListViewDisplayMode');
  const { listingId } = useParams();

  /**
   * Function to write the lisitings data into storage or to read it from storage
   */
  const handleSelectAndLocalStorage = () => {
    // Check whether the data received in the component is empty or not
    if (Object.keys(selectedListingData).length === 0) {
      // Empty ==> Page might have refreshed and data from the store is not avaialable.
      // Restore it from local storage

      if (localStoreDetailedListView
        && (Number(localStoreDetailedListView.id) === Number(listingId))) {
        dispatch(selectListingAction(localStoreDetailedListView));
        dispatch(setDisplayListingMode(localStoreListViewDisplayMode));
      }
      else {
        console.log('calling selectListing');
        selectListing(dispatch, listingId);
        // writeStorage('detailedListView', { ...selectedListingData });
      }
    }
    // If the data is received in the component, write it to the local storage
    else {
      selectListing(dispatch, listingId);
      // writeStorage('detailedListView', { ...selectedListingData });
    }
  };

  // Set the specified mode
  useEffect(() => {
    handleSelectAndLocalStorage();
    console.log(loggedInUserId, 'loggedInUserId in ViewListing');
    if (loggedInUserId === null) {
      // If no user is logged in just display the details of the item
      dispatch(setDisplayListingMode(LISTING_VIEW_MODES.DEFAULT_LISTING_VIEW)); }

    else if (loggedInUserId === selectedListingData.listerId)
    {
      // If the logged in user id is equal to the lister id,
    // the display mode is set as Lister's View
      dispatch(setDisplayListingMode(LISTING_VIEW_MODES.LISTER_LISTING_VIEW));
    }
    else
    {
      dispatch(setDisplayListingMode(LISTING_VIEW_MODES.BUYER_LISTING_VIEW));
    }
  }, [loggedInUserId]);

  const handleDelete = () => {
    // Delete the listing
    deleteListing(dispatch, listingId);
    selectListing(dispatch, listingId);
  };

  const handleDisplayePerMode = () => {
    const rowClasses = 'row mt-3 ml-3';
    const colClasses = 'col-3 m-1';
    switch (currentListViewDisplayMode)
    {
      case LISTING_VIEW_MODES.BUYER_LISTING_VIEW:
      {
        return (
          <div className={rowClasses}>
            <QuantityPicker />
            <div className={colClasses}>
              <LinkContainer to={disableBuy ? '#' : '/payment'}>
                <span className="btn btn-sm btn-warning">Buy</span>
              </LinkContainer>
            </div>
          </div>
        );
      }
      case LISTING_VIEW_MODES.LISTER_LISTING_VIEW:
      {
        return (
          // <div className={`${rowClasses} mb-3 justify-content-center`}>
          <div className="row mt-2 mb-3 justify-content-around">
            <div className={`${colClasses} mb-1 `}>
              <LinkContainer to={`/editListing/${listingId}`}>
                <span className="btn btn-sm  btn-warning">Edit Listing</span>
              </LinkContainer>
            </div>
            <div className={`${colClasses} mb-1 `}>
              <LinkContainer to="/" onClick={handleDelete}>
                <span className="btn btn-sm btn-warning">Delete Listing</span>
              </LinkContainer>
            </div>
            <div className={`${colClasses} mb-1 `}>
              <LinkContainer to={`/viewProgress/${listingId}`}>
                <span className="btn btn-sm btn-warning">View Progress</span>
              </LinkContainer>
            </div>
          </div>
        );
      }
      case LISTING_VIEW_MODES.DEFAULT_LISTING_VIEW:
      {
        return (<div />);
      }
      default:
      {
        return (<div />);
      }
    }
  };

  return (
    <div className="container mb-5">
      <DisplayBreadcrumb />
      <DetailedListingView setDisableBuy={setDisableBuy}>
        {handleDisplayePerMode()}
      </DetailedListingView>
    </div>
  );
}
