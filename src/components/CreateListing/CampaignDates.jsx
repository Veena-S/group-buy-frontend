/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useContext } from 'react';
import moment from 'moment';
import { writeStorage } from '@rehooks/local-storage';
import { Form, Button } from 'react-bootstrap';
import { DateRangePicker, SingleDatePicker } from 'react-dates';
import { CreateListingContext, CREATE_LISTING_FORM, formModes } from '../../createListingStore.jsx';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import Asterisk from './Asterisk.jsx';

export default function CampaignDates({ setMode }) {
  // constant field names
  const START_DATE = 'startDate';
  const END_DATE = 'endDate';
  const DELIVERY_DATE = 'deliveryDate';

  const { FORM_STEP, TERMS_AND_CONDITIONS, QTY_AND_PRICE } = formModes;

  const {
    formStore, dispatchListingForm, handleOnChange, formLocalStorage,
  } = useContext(CreateListingContext);
  const {
    startDate, endDate, deliveryDate,
  } = formStore;

  // Focus states for dateRangePicker and singleDatePicker
  const [rangeFocus, setRangeFocus] = useState(false);
  const [deliveryFocus, setDeliveryFocus] = useState(false);

  const handleDatesChange = ({ startDate, endDate }) => {
    if (startDate) {
      dispatchListingForm({
        field: START_DATE,
        value: startDate,
      });
      writeStorage(CREATE_LISTING_FORM, { ...formLocalStorage, [START_DATE]: startDate });
    }
    if (endDate) {
      dispatchListingForm({
        field: END_DATE,
        value: endDate,
      });
      writeStorage(CREATE_LISTING_FORM, { ...formLocalStorage, [END_DATE]: endDate });
    }
  };

  const handleDeliveryDateChange = (newDeliveryDate) => {
    dispatchListingForm({
      field: DELIVERY_DATE,
      value: newDeliveryDate,
    });
    writeStorage(CREATE_LISTING_FORM, { ...formLocalStorage, [DELIVERY_DATE]: newDeliveryDate });
  };

  const handleNextPage = () => {
    setMode(TERMS_AND_CONDITIONS);
    writeStorage(FORM_STEP, TERMS_AND_CONDITIONS);
  };

  const handlePrevPage = () => {
    setMode(QTY_AND_PRICE);
    writeStorage(FORM_STEP, QTY_AND_PRICE);
  };

  const validationToProceed = () => formLocalStorage.startDate && formLocalStorage.endDate && formLocalStorage.deliveryDate && formLocalStorage.deliveryMode;

  return (
    <Form>
      <div className="col payment-form-progress-bar  d-flex flex-row justify-content-start">
        <button type="button" onClick={handlePrevPage}>?????? </button>
        <div className="create-listing-header ml-2">Campaign Dates (3/4)</div>
      </div>
      <Form.Group className="ml-3 mt-3" controlId="qtyAvailable">
        <Form.Label>
          Campaign Start and End Date
          <Asterisk />
        </Form.Label>
        <div>
          <DateRangePicker
            startDate={formLocalStorage.startDate ? moment(formLocalStorage.startDate) : startDate}
            startDateId={`${startDate}id`}
            endDate={formLocalStorage.endDate ? moment(formLocalStorage.endDate) : endDate}
            endDateId={`${endDate}id`}
            onDatesChange={handleDatesChange}
            focusedInput={rangeFocus}
            onFocusChange={(focus) => setRangeFocus(focus)}
            verticalHeight={370}
            orientation="vertical"
            numberOfMonths={1}
          />
        </div>
      </Form.Group>

      <Form.Group className="ml-3 mt-3" controlId="minOrderQty">
        <Form.Label>
          Delivery Date
          <Asterisk />
        </Form.Label>
        <div>
          <SingleDatePicker
            date={formLocalStorage.deliveryDate ? moment(formLocalStorage.deliveryDate) : deliveryDate}
            onDateChange={handleDeliveryDateChange}
            focused={deliveryFocus}
            onFocusChange={({ focused }) => {
              setDeliveryFocus(focused); }}
            id="delivery-dates"
            verticalHeight={370}
            orientation="vertical"
            numberOfMonths={1}
          />
        </div>
      </Form.Group>
      <Form.Group className="ml-3 mt-3" controlId="usualPrice">
        <Form.Label>
          Delivery Mode
          <Asterisk />
        </Form.Label>
        <div>
          <div>
            <input
              inline
              className="ml-1"
              name="deliveryMode"
              value="pickup"
              type="radio"
              id="pickup"
              checked={(formLocalStorage.deliveryMode === 'pickup' || formStore.deliveryMode === 'pickup')}
              onClick={handleOnChange}
            />
            <label className="ml-2" htmlFor="pickup">
              Pick Up
            </label>
          </div>

          <input
            inline
            className="ml-1"
            name="deliveryMode"
            value="electronic"
            type="radio"
            id="electronic"
            checked={(formLocalStorage.deliveryMode === 'electronic' || formStore.deliveryMode === 'electronic')}
            onClick={handleOnChange}
          />
          <label className="ml-2" htmlFor="electronic">
            Electronic
          </label>

        </div>
      </Form.Group>
      <div className="d-flex flex-row justify-content-center">
        {/* <Button variant="primary" onClick={handleNextPage}>
          Next
        </Button> */}
        {
          validationToProceed()
            ? (<Button variant="primary" onClick={handleNextPage}> Next </Button>)
            : (<Button variant="primary" disabled> Next </Button>)
        }

      </div>
    </Form>
  );
}
