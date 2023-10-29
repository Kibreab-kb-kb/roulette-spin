import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import './Wheel.css';
import options from '../choices.json';

const Wheel = (props) => {
  const [state, setState] = useState({
    spinAngleStart: Math.random() * 10 + 10,
    spinTimeTotal: Math.random() * 3 + 4 * 1000,
    startAngle: 0,
    spinTime: 0,
    arc: Math.PI / (options.length / 2),
    text: "",
  });

  const baseSize = 200;
  const spinTimer = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    drawRouletteWheel();
    // return stopRotateWheel;
  }, []);

  useEffect(()=>{
    if(state.spinTime===0){
      rotate();
    }
  },[state.spinTime])

  const drawRouletteWheel = () => {
    let { startAngle, arc } = state;
    const canvas = canvasRef.current;
    if (canvas && canvas.getContext) {
      const outsideRadius = baseSize - 25;
      const textRadius = baseSize - 45;
      const insideRadius = baseSize - 85;
      const innderOutline = baseSize - 125;
      const ctx = canvas.getContext('2d');
      ctx.font = '14px Helvetica, Arial';

      for (let i = 0; i < options.length; i++) {
        const angle = startAngle + i * arc;
        ctx.fillStyle = options[i].color;
        ctx.beginPath();
        ctx.arc(baseSize, baseSize, outsideRadius, angle, angle + arc, false);
        ctx.arc(baseSize, baseSize, insideRadius, angle + arc, angle, true);
        ctx.fill();
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.translate(baseSize + Math.cos(angle + arc / 2) * textRadius, baseSize + Math.sin(angle + arc / 2) * textRadius);
        ctx.rotate(angle + arc / 2 + Math.PI / 2);
        const text = options[i].number;
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
        ctx.restore();
      }

      // Arrow
      ctx.strokeStyle = 'yellow';
      ctx.lineWidth = 2;
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.lineTo(baseSize + 10, baseSize - (outsideRadius + 20));
      ctx.lineTo(baseSize, baseSize - (outsideRadius - 5));
      ctx.lineTo(baseSize - 10, baseSize - (outsideRadius + 20));
      ctx.fill();
      ctx.stroke();
    }
  };

  const spin = () => {
    spinTimer.current = null;
    setState({ ...state, spinTime: 0 });

  };

  useEffect(() => {
    if (state.spinTime === 0) {
      rotate();
    }
  }, [state.spinTime]);
  

  const rotate = () => {
    const { spinAngleStart, spinTime, startAngle, spinTimeTotal } = state;
    if (spinTime > 2800) {
      clearTimeout(spinTimer.current);
      stopRotateWheel();
    } else {
      const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
      const newStartAngle=startAngle+spinAngle*(Math.PI/180);
      const newSpinTime=spinTime+10;

      setState({
        ...state,
        startAngle: newStartAngle,
        spinTime: newSpinTime,
      });
  
      // // Schedule the next rotation
      // clearTimeout(spinTimer.current);
      // spinTimer.current = setTimeout(rotate, 30);
    
      
     
    }

  };

  


  const stopRotateWheel = () => {
    let { startAngle, arc } = state;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const degrees = startAngle * 180 / Math.PI + 90;
    const arcd = arc * 180 / Math.PI;
    const index = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();
    const text = options[index].number;
    setState({ text });
    ctx.restore();
    props.updateNum(state.text);
  };

  const easeOut = (t, b, c, d) => {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  };

  const handleOnClick = () => {
    spin();
    props.isSpinning(true);
  };

  const SpinButton = () => {
    return (
      <div>
        <input type="button" value='spin' className="btn btn-primary p-2 m-2" id="spin" onClick={handleOnClick} />
      </div>
    );
  };

  const renderNumber = () => {
    return (
      <h1 className="blinky-number display-4 pt-1 m-0">{state.text}</h1>
    );
  };

  const renderBtnText = () => {
    if (state.text !== "") {
      return <div>{renderNumber()}</div>;
    } else {
      return <h6 className="blink text-uppercase m-0">Put your bets and spin the wheel!</h6>;
    }
  };

  return (
    <React.Fragment>
      <div className="roulette-container  align-self-start">
        <canvas ref={canvasRef} width={baseSize * 2} height={baseSize * 2} className="roulette-canvas"></canvas>
        {props.arr.length !== 0 ? (
          <Button
            onClick={handleOnClick}
            className="m-2 spin-button"
            size="lg"
            block ="true"
            variant="danger"
          >
            <h5 className="blink text-uppercase m-0">Spin the wheel!</h5>
          </Button>
        ) : (
          <Button
            className="m-2 spin-button text-small"
            size="lg"
            block="true"
            variant="dark"
          >
            {renderBtnText()}
          </Button>
        )}
      </div>
    </React.Fragment>
  );
};

export default Wheel;
