import React, { useState, useEffect } from 'react';
import './App.css';

import Wheel from './components/Wheel/Wheel';
import RouletteTable from './components/table/Table';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { GiDiamonds } from 'react-icons/gi';

import firstRow from './components/table/rows/FirstRow.json';
import firstBorder from './components/table/rows/FirstBorder.json';
import secondRow from './components/table/rows/SecondRow.json';
import secondBorder from './components/table/rows/SecondBorder.json';
import thirdRow from './components/table/rows/ThirdRow.json';
import thirdBorder from './components/table/rows/ThirdBorder.json';
import fourthRow from './components/table/rows/FourthRow.json';
import fifthRow from './components/table/rows/FifthRow.json';
import columnLeft from './components/table/rows/ColumnLeft.json';
import columnRight from './components/table/rows/ColumnRight.json';

function App() {
  const [num, setNum] = useState('');
  const [arr, setArr] = useState([]);
  const [count, setCount] = useState(0);
  const [wins, setWins] = useState(0);
  const [chip] = useState(10);
  const [coins, setCoins] = useState(100000);
  const [losses, setLosses] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState('Put your bets and spin the wheel!');
  const [extArr, setExtArr] = useState([]);
  const [firstRowState, setFirstRow] = useState(firstRow.map(num => ({ ...num, visible: false }))); 
  const [firstBorderState, setFirstBorder] = useState(firstBorder.map(num => ({ ...num, visible: false })));
  const [secondRowState, setSecondRow] = useState(secondRow.map(num => ({ ...num, visible: false })));
  const [secondBorderState, setSecondBorder] = useState(secondBorder.map(num => ({ ...num, visible: false })));
  const [thirdRowState, setThirdRow] = useState(thirdRow.map(num => ({ ...num, visible: false })));
  const [thirdBorderState, setThirdBorder] = useState(thirdBorder.map(num => ({ ...num, visible: false })));
  const [fourthRowState, setFourthRow] = useState(fourthRow.map(num => ({ ...num, visible: false })));
  const [fifthRowState, setFifthRow] = useState(fifthRow.map(num => ({ ...num, visible: false })));
  const [columnLeftState, setColumnLeft] = useState(columnLeft.map(num => ({ ...num, visible: false })));
  const [columnRightState, setColumnRight] = useState(columnRight.map(num => ({ ...num, visible: false })));

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);
  const [data6, setData6] = useState([]);
  const [data7, setData7] = useState([]);
  const [data8, setData8] = useState([]);
  const [data9, setData9] = useState([]);
  const [data10, setData10] = useState([]);


  // declaring your combinations
  const twoByOneFirst = ["3", "6", "2", "12", "15", "18", "21", "24", "27", "30", "33", "36"];
  const twoByOneSecond = ["2", "5", "8", "11", "14", "17", "20", "23", "26", "29", "32", "35"];
  const twoByOneThird = ["1", "4", "7", "10", "13", "16", "19", "22", "25", "28", "31", "34"];
  const firstTwelves = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  const secondTwelves = ["13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"];
  const thirdTwelves = ["25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36"];
  const oneToEighteen = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"];
  const nineteenToThirtySix = ["19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36"];
  const black = ["2", "4", "6", "8", "10", "11", "13", "15", "17", "20", "22", "24", "26", "28", "29", "31", "33", "35"];
  const red = ['1', '3', '5', '7', '9', '12', '14', '16', '18', '19', '21', '23', '25', '27', '30', '32', '34', '36'];
  const even = ["2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22", "24", "26", "28", "30", "32", "34", "36"];
  const odd = ['1', '3', '5', '7', '9', '11', '13', '15', '17', '19', '21', '23', '25', '27', '29', '31', '33', '35'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response1, response2, response3,response4,response5,response6,response7,response8,response9,response10] = await Promise.all([
          fetch('src/components/table/rows/ColumnLeft.json'),
          fetch('src/components/table/rows/ColumnRight.json'),
          fetch('src/components/table/rows/FifthRow.json'),
          fetch('src/components/table/rows/FirstBorder.json'),
          fetch('src/components/table/rows/FirstRow.json'),
          fetch('src/components/table/rows/FourthRow.json'),
          fetch('src/components/table/rows/SecondBorder.json'),
          fetch('src/components/table/rows/SecondRow.json'),
          fetch('src/components/table/rows/ThirdBorder.json'),
          fetch('src/components/table/rows/ThirdRow.json'),



        ]);
  
        const [json1, json2, json3,json4,json5,json6,json7,json8,json9,json10] = await Promise.all([
          response1.json(),
          response2.json(),
          response3.json(),
          response4.json(),
          response5.json(),
          response6.json(),
          response7.json(),
          response8.json(),
          response9.json(),
          response10.json()
        ]);
  
        setData1(json1);
        setData2(json2);
        setData3(json3);
        setData4(json4);
        setData5(json5);
        setData6(json6);
        setData7(json7);
        setData8(json8);
        setData9(json9);
        setData10(json10);
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  const isSpinning = (isspinning) => {
    setSpinning(isspinning);
  }

  // Handling losing
  const userLost = () => {
    // Update state for message and losses
    setMessage(`No luck this time!`);
    setLosses(losses + 1);

    // Create an object to send to MongoDB here and reset the game
    resetGame();
  }

  // Handling winning
  const userWin = (multi) => {
    // Update state for message, wins, and coins
    setMessage(`You win ${multi * parseInt(chip)} coins!`);
    setWins(wins + 1);
    setCoins(coins + (multi * parseInt(chip)));

   
    resetGame();
  }

  // Reset game function
  const resetGame = () => {
    setArr([]);
    setSpinning(false);
    setNum('');
    setFirstRow(firstRow.map(num => ({ ...num, visible: false })));
    setFirstBorder(firstBorder.map(num => ({ ...num, visible: false })));
    setSecondRow(secondRow.map(num => ({ ...num, visible: false })));
    setSecondBorder(secondBorder.map(num => ({ ...num, visible: false })));
    setThirdRow(thirdRow.map(num => ({ ...num, visible: false })));
    setThirdBorder(thirdBorder.map(num => ({ ...num, visible: false })));
    setFourthRow(fourthRow.map(num => ({ ...num, visible: false })));
    setFifthRow(fifthRow.map(num => ({ ...num, visible: false })));
    setColumnLeft(columnLeft.map(num => ({ ...num, visible: false })));
    setColumnRight(columnRight.map(num => ({ ...num, visible: false })));
  }

  // Finding out if the winning number is in any of the arrays
  const determineValidBets = (length, element, num, multiplier) => {
    let extArr = [...extArr];
    let lunghezza = element.length;
    if (lunghezza === length) {
      let filtering = element.filter(isItMyNum => isItMyNum === num);
      if (filtering === num) {
        extArr.push(num);
        setExtArr(extArr);
        userWin(multiplier);
        console.log(extArr);
      }
    }
  }

  // A little different here, checking by name and not the length of the array
  const determineValidBetsColFive = (name, element, arrName, num, multiplier) => {
    let extArr = [...extArr];
    if (element === name) {
      let filtered = arrName.filter(item => item === num);
      if (filtered === num) {
        extArr.push(num);
        setExtArr(extArr);
        userWin(multiplier);
        console.log(extArr);
      }
    }
  }

  // Function to update the winning number
  const updateNum = (num) => {
    setNum(num);
    setCount(count + 1);

    // Map the array of bets
    arr.map(item => {
      if (item === num) {
        userWin(35);
      }

      if (typeof item !== "string") {
        determineValidBets(2, item, num, 17);
        determineValidBets(3, item, num, 11);
        determineValidBets(4, item, num, 8);
        determineValidBets(6, item, num, 5);
      } else {
        determineValidBetsColFive("Even", item, even, num, 1);
        determineValidBetsColFive("Odd", item, odd, num, 1);
        determineValidBetsColFive("Black", item, black, num, 1);
        determineValidBetsColFive("Red", item, red, num, 1);
        determineValidBetsColFive("1 to 18", item, oneToEighteen, num, 1);
        determineValidBetsColFive("19 to 36", item, nineteenToThirtySix, num, 1);
        determineValidBetsColFive("3rd 12", item, thirdTwelves, num, 1);
        determineValidBetsColFive("2nd 12", item, secondTwelves, num, 1);
        determineValidBetsColFive("1st 12", item, firstTwelves, num, 1);
        determineValidBetsColFive("2:1:1", item, twoByOneFirst, num, 2);
        determineValidBetsColFive("2:1:2", item, twoByOneSecond, num, 2);
        determineValidBetsColFive("2:1:3", item, twoByOneThird, num, 2);
      }
    });

    if (extArr.length === 0) {
      userLost();
    }
  }

  // Function to update the array of bets
  const updateArr = (arr) => {
    setArr(arr);
  }

  // Function to update the number of coins
  const updateCoins = (coins) => {
    setCoins(coins);
  }

  // Function to update the rows
  const updateRow = (row, val) => {
    if (row === 'firstRow') {
      setFirstRow(val);
    } else if (row === 'firstBorder') {
      setFirstBorder(val);
    } else if (row === 'secondRow') {
      setSecondRow(val);
    } else if (row === 'secondBorder') {
      setSecondBorder(val);
    } else if (row === 'thirdRow') {
      setThirdRow(val);
    } else if (row === 'thirdBorder') {
      setThirdBorder(val);
    } else if (row === 'fourthRow') {
      setFourthRow(val);
    } else if (row === 'fifthRow') {
      setFifthRow(val);
    } else if (row === 'columnLeft') {
      setColumnLeft(val);
    } else if (row === 'columnRight') {
      setColumnRight(val);
    }
  }

  return (
    <Container>
      <Row className="justify-items-center pt-2">
        <Image src="resources/KB1.jpg" className="img-fluid mx-auto logo" />
        <Container fluid className="table">
          <Row>
            <Col className="mx-5">
              <RouletteTable
                // ROWS //
                firstRow={firstRowState}
                firstBorder={firstBorderState}
                secondRow={secondRowState}
                secondBorder={secondBorderState}
                thirdRow={thirdRowState}
                thirdBorder={thirdBorderState}
                fourthRow={fourthRowState}
                fifthRow={fifthRowState}
                columnLeft={columnLeftState}
                columnRight={columnRightState}
                // END ROWS //
                updateRow={updateRow}
                updateArr={updateArr}
                updateCoins={updateCoins}
                num={num}
                arr={arr}
                count={count}
                coins={coins}
                chip={chip}
                spinning={spinning}
              />
              <Row className="bg-red bg-verdict align-items-center">
                <Col md={4} className="d-flex align-items-center coins-col justify-content-center">
                  <h4 className="m-0">${coins}</h4>
                </Col>
                <Col md={8}>
                  <div className="text-center">
                    <h6 className="text-uppercase">{message}</h6>
                  </div>
                  <div className="text-center">
                    <div className="divider-line divider-line-center divider-line-linear-gradient w-100 mx-auto my-4">
                      <GiDiamonds className="diamond-line-icon" />
                    </div>
                    <ul className="list-inline ">
                      <li className="list-inline-item">Spins: {count}</li>
                      <li className="list-inline-item">Wins: {wins}</li>
                      <li className="list-inline-item">Losses: {losses}</li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col className="align-self-center">
              <Wheel
                isSpinning={isSpinning}
                updateNum={updateNum}
                num={num}
                arr={arr}
                count={count}
              />
            </Col>
          </Row>
        </Container>
        <Container fluid className="table">
          <Row>
            <Col className="text-light-gold">
              Your bets: {arr.join(", ")}
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
}

export default App;
