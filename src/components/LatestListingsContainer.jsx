import React, { useContext } from 'react';
import moment from 'moment';
import { GroupBuyContext } from '../store.jsx';
import LatestListingsListCard from './LatestListingsListCard.jsx';

export default function LatestListingsContainer() {
  const { store, dispatch } = useContext(GroupBuyContext);
  const { sortedListingsByCreatedDate } = store;

  return (
    <div className="container-sm mt-4">
      <div className="row ml-auto ">
        <div className="col-8">
          <h6>Latest Listings</h6>
        </div>
        <div className="col-2 mr-auto text-right">
          <button type="button" className="btn btn-sm">more</button>
        </div>
      </div>
      {/* <div className="row"> */}
      {sortedListingsByCreatedDate.map((singleListing) => (
        <LatestListingsListCard singleListing={singleListing} />
      ))}
      {/* </div> */}
    </div>
  );
}
