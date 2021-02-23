import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export default function PurchaseSummary({setMode, PAGE_NAMES}) {
  const handleBtnClick = () => {
    // save the state to the cookie
    // updateMode to switch to next page
    setMode(PAGE_NAMES.PAYMENT_INSTRUCTIONS);
  };

  return (
    <>
      <div className="row">
        <div className="col summary">
          {/* insert the summary of item purchased, qty, price per unit, and total price */}
        </div>
      </div>
      <div className="row">
        <div className="col terms-n-conditions">
          <div>
            By proceeding, you agree that you have read, and abide
            Group-Buy%apos;s terms and conditions.
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Button className="btn btn-primary" onClick={handleBtnClick}>
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

PurchaseSummary.propTypes = {
  setMode: PropTypes.func.isRequired,
  PAGE_NAMES: PropTypes.objectOf.isRequired,
};
