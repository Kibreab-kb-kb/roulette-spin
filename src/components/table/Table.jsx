import React, { useState, useEffect } from 'react';
import './Table.css';
import Chip from '../chips/HouseChips';
import { Overlay, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';

const RouletteTable = (props) => {
  const [state, setState] = useState({
    /* JSONS ROWS */
    firstRow: props.firstRow,
    firstBorder: props.firstBorder,
    secondRow: props.secondRow,
    secondBorder: props.secondBorder,
    thirdRow: props.thirdRow,
    thirdBorder: props.thirdBorder,
    fourthRow: props.fourthRow,
    fifthRow: props.fifthRow,
    columnLeft: props.columnLeft,
    columnRight: props.columnRight,
    disabled: false,
    /* END JSONS ROWS */
  });

  const disableTable = () => {
    if (props.spinning) {
      setState({ ...state, disabled: true });
    } else {
      setState({ ...state, disabled: false });
    }
  };

  // SELECTING BETS
  const numsSelectionHandler = (num, whichRow) => {
    // Checking if my props.arr is empty, if it is, leave it empty, if it is not, spread it
    const nums = props.arr.length === 0 ? [] : [...props.arr];

    // Saving in a variable the row from state with that name
    let row = [...state[whichRow]];

    let coins; // Variable for coins

    // Bets Deselect Handling Starts
    if (nums.indexOf(num) >= 0) {
      // If the number is present in the array, deselect and remove it from the array
      nums.splice(nums.indexOf(num), 1);

      // Giving back coins I bet on this number
      coins = props.coins + props.chip;

      // Tricky part: map each of the rows and check if the chip is visible, if it is, remove it
      const updatedRow = row.map((chip) => {
        if (chip.n === num) {
          chip.visible = false;
        }
        return chip;
      });

      props.updateRow(whichRow, updatedRow); // Passing back to Roulette.js component updated props

      setState({ ...state, [whichRow]: updatedRow }); // Setting the new state with removed chips from the rows

      // Bets Deselect Handling Ends

      // Bets Select Handling Starts
    } else if (nums.indexOf(num) === -1) {
      // If the number is NOT present in the array, select it and put the chip on it

      // Decrementing coins
      coins = props.coins - props.chip;

      nums.push(num); // Adding the selected number to the array of bets

      // Tricky part inverted: map each of the rows and check if the chip is NOT visible, if it is NOT, add it
      const updatedRow = row.map((chip) => {
        if (chip.n === num) {
          chip.visible = true;
        }
        return chip;
      });

      setState({ ...state, [whichRow]: updatedRow }); // Setting the new state with added chips to the rows
    }

    // Passing back to Roulette.js the updated array
    props.updateArr(nums);

    // Passing back to Roulette.js the updated coins count
    setState({ ...state, coins }, () => {
      props.updateCoins(coins);
    });
  };

  // Designing the whole table in pure CSS mapping JSON objects with numbers, borders, etc.
  return (
    <React.Fragment>
      <div className="d-flex flex-row align-items-start roulette-table">
        <div className="align-self-start">
          <ul className="list-unstyled pt-6">
            {state.columnLeft.map((num, index, arr) => (
              <li key={num.n + index + arr} className={num.className + " no-cursor"} value={num.n}>
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">No bets on {num.n}!</Tooltip>}>
                  <span className="d-inline-block">{num.n}</span>
                </OverlayTrigger>
              </li>
            ))}
          </ul>
        </div>
        <div className="align-self-start">
          <div className="table-divider"></div>
          {/* First row */}
          <ul className="d-flex list-unstyled">
            {state.firstRow.map((num, index, arr) => (
              <button
                key={num.n + index + arr}
                className={num.className}
                value={num.n}
                onMouseEnter={disableTable}
                disabled={state.disabled}
                onClick={() => numsSelectionHandler(num.n, "firstRow")}
              >
                <Chip id={num.n} active={num.visible} />
              </button>
            ))}
          </ul>
          {/* Between first and second rows borders */}
          <ul className="d-flex list-unstyled">
            {state.firstBorder.map((num, index, arr) => (
              <button
                key={num.n + index + arr}
                className={num.className}
                value={num.n}
                onMouseEnter={disableTable}
                disabled={state.disabled}
                onClick={() => numsSelectionHandler(num.n, "firstBorder")}
              >
                <Chip id={num.n} active={num.visible} />
              </button>
            ))}
          </ul>
          {/* Second row */}
          <ul className="d-flex list-unstyled">
            {state.secondRow.map((num, index, arr) => (
              <button
                key={num.n + index + arr}
                className={num.className}
                value={num.n}
                onMouseEnter={disableTable}
                disabled={state.disabled}
                onClick={() => numsSelectionHandler(num.n, "secondRow")}
              >
                <Chip id={num.n} active={num.visible} />
              </button>
            ))}
          </ul>
          {/* Between second and third rows borders */}
          <ul className="d-flex list-unstyled">
            {state.secondBorder.map((num, index, arr) => (
              <button
                key={num.n + index + arr}
                className={num.className}
                value={num.n}
                onMouseEnter={disableTable}
                disabled={state.disabled}
                onClick={() => numsSelectionHandler(num.n, "secondBorder")}
              >
                <Chip id={num.n} active={num.visible} />
              </button>
            ))}
          </ul>
          {/* Third row */}
          <ul className="d-flex list-unstyled">
            {state.thirdRow.map((num, index, arr) => (
              <button
                key={num.n + index + arr}
                className={num.className}
                value={num.n}
                onMouseEnter={disableTable}
                disabled={state.disabled}
                onClick={() => numsSelectionHandler(num.n, "thirdRow")}
              >
                <Chip id={num.n} active={num.visible} />
              </button>
            ))}
          </ul>
          {/* Between third and fourth rows borders */}
          <ul className="d-flex list-unstyled">
            {state.thirdBorder.map((num, index, arr) => (
              <button
                key={num.n + index + arr}
                className={num.className}
                value={num.n}
                onMouseEnter={disableTable}
                disabled={state.disabled}
                onClick={() => numsSelectionHandler(num.n, "thirdBorder")}
              >
                <Chip id={num.n} active={num.visible} />
              </button>
            ))}
          </ul>
          {/* Fourth row */}
          <ul className="d-flex list-unstyled">
            {state.fourthRow.map((num, index, arr) => (
              <button
                key={num.n + index + arr}
                className={num.className}
                value={num.n}
                onMouseEnter={disableTable}
                disabled={state.disabled}
                onClick={() => numsSelectionHandler(num.n, "fourthRow")}
              >
                <Chip id={num.n} active={num.visible} />
              </button>
            ))}
          </ul>
          <div className="table-divider"></div>
          {/* Fifth row */}
          <ul className="d-flex list-unstyled">
            {state.fifthRow.map((num, index, arr) => (
              <button
                key={num.n + index + arr}
                className={num.className}
                value={num.n}
                onMouseEnter={disableTable}
                disabled={state.disabled}
                onClick={() => numsSelectionHandler(num.n, "fifthRow")}
              >
                <Chip id={num.n} active={num.visible} />
              </button>
            ))}
          </ul>
          <div className="table-divider"></div>
        </div>
        <div className="align-self-start">
          <div className="table-divider"></div>
          <ul className="list-unstyled">
            {state.columnRight.map((num, index, arr) => (
              <li className={num.className} key={num.n + index + arr}>
                <button
                  className="blues"
                  value={num.n}
                  onMouseEnter={disableTable}
                  disabled={state.disabled}
                  onClick={() => numsSelectionHandler(num.n, "columnRight")}
                >
                  <Chip id={num.n} active={num.visible} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RouletteTable;
