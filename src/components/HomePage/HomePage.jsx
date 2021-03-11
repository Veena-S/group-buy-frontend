/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { useLocalStorage, deleteFromStorage } from '@rehooks/local-storage';
import {
  GroupBuyContext, loadListings, setTotalQuantityOrdered as setTotalQuantityOrderedAction,
  sortListingsByEndDateAction, sortAndFilterListingsByCreatedDate,
} from '../../store.jsx';
import CategoriesContainer from './CategoriesContainer.jsx';
import EndingSoonContainer from './EndingSoonContainer.jsx';
import LatestListingsContainer from './LatestListingsContainer.jsx';

export default function HomePage() {
  const { store, dispatch } = useContext(GroupBuyContext);

  const [getDetailedListView, setDetailedListView, deleteDetailedListView] = useLocalStorage('detailedListView');
  const [getListViewDisplayMode, setListViewDisplayMode, deleteListViewDisplayMode] = useLocalStorage('ListViewDisplayMode');
  const [getTotalQuantityOrdered, setTotalQuantityOrdered, deleteTotalQuantityOrdered] = useLocalStorage('totalQuantityOrdered');
  const [getEditedListingData, setEditedListingData, deleteEditedListingData] = useLocalStorage('editedListingData');

  // Manage the states for the categories to be displayed
  const [allCategories, setAllCategories] = useState([]);
  const [btnArray, setBtnArray] = useState([]);
  const [endingSoonListings, setEndingSoonListings] = useState([]);
  const [latestListings, setLatestListings] = useState([]);

  const selectCategoryProps = {
    btnArray, setBtnArray, setEndingSoonListings, setLatestListings,
  };

  useEffect(() => {
    loadListings(dispatch, setAllCategories, setBtnArray);
    dispatch(setTotalQuantityOrderedAction(0));
    deleteDetailedListView();
    deleteListViewDisplayMode();
    deleteTotalQuantityOrdered();
    deleteEditedListingData();
  }, []);

  useEffect(() => {
    if ( // endingSoonListings.length === 0 ||
      (endingSoonListings.length !== store.listings.length)) {
      setEndingSoonListings(store.listings);
    }
    if ( // latestListings.length === 0 ||
      (latestListings.length !== store.sortedListingsByCreatedDate.length)) {
      setLatestListings(store.sortedListingsByCreatedDate);
    }
  });

  return (
    <div>
      <CategoriesContainer selectCategoryProps={selectCategoryProps} />
      <EndingSoonContainer endingSoonListings={endingSoonListings} />
      <LatestListingsContainer latestListings={latestListings} />
    </div>
  );
}
