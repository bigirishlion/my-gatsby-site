import React, { Component } from 'react'
import Helmet from 'react-helmet'

import stars from '../images/stars-in-the-night-sky.jpg';
import moon from '../images/moon.svg';
import clockSound from '../sounds/clock-strikes-twelve.mp3';

class CanvasClockComponent extends Component {

    state = {
        showBedTimeInput: false,
        startBedTimeHour: 1,
        startBedTimeMinute: 0,
        startBedTimeAmPm: 1,
        endBedTimeHour: 1,
        endBedTimeMinute: 0,
        endBedTimeAmPm: 0,
        splitBedAndWakeTime: true
    }

    componentDidMount() {
        this.siteTitle = this.props.data.site.siteMetadata.title
        this.siteDescription = this.props.data.site.siteMetadata.description
        this.setState({ showBedTime: false })
        this.color = '#000';
        this.img = new Image();
        this.img.src = stars;
        this.img.onload = () => {
            this.initCanvas();
        };
        this.clockSound = new Audio(clockSound);
    }

    playBedTimeAudio() {
        this.clockSound.play();
    }

    initCanvas() {
        this.canvas = this.refs.canvas;
        this.canvas.addEventListener('click', this.canvasClicked.bind(this), false);
        this.ctx = this.canvas.getContext("2d");
        setInterval(this.drawClock.bind(this), 1000);

        window.addEventListener('resize', this.drawClock.bind(this), false);
    }

    drawClock() {
        this.setCanvasDimensions();
        this.drawFace();
        this.drawBedTime();
        this.drawNumbers();
        this.drawTime();
    }

    setCanvasDimensions() {
        var canvasSize = window.innerWidth;
        if (window.innerWidth > window.innerHeight) {
            canvasSize = window.innerHeight;
        }

        this.canvas.width = canvasSize;
        this.canvas.height = canvasSize;
        this.originalRadius = this.canvas.width / 2;
        this.ctx.translate(this.originalRadius, this.originalRadius);
        this.radius = this.originalRadius * 0.90
    }

    drawFace() {
        // body
        var ctx = this.ctx;
        var radius = this.radius;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();

        ctx.strokeStyle = this.color;
        ctx.lineWidth = radius * 0.05;
        ctx.stroke();
    }

    drawNumbers() {
        var ang,
            num,
            ctx = this.ctx,
            radius = this.radius;

        ctx.font = radius * 0.15 + "px arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        for (num = 1; num < 13; num++) {
            ang = num * Math.PI / 6;
            ctx.rotate(ang);
            ctx.translate(0, -radius * 0.85);
            ctx.rotate(-ang);
            ctx.fillStyle = this.color;
            ctx.fillText(num.toString(), 0, 0);
            ctx.rotate(ang);
            ctx.translate(0, radius * 0.85);
            ctx.rotate(-ang);
        }

        for (let line = 1; line < 61; line++) {
            ang = line * Math.PI / 30;
            ctx.rotate(ang);
            ctx.translate(0, -radius * 0.98);
            ctx.fillStyle = this.color;
            var fillWidth = radius * 0.02;
            var fillHeight = radius * 0.03;
            if (line % 5 === 0) {
                fillHeight = radius * 0.05;
            }
            ctx.fillRect(0, 0, fillWidth, fillHeight);
            ctx.translate(0, radius * 0.98);
            ctx.rotate(-ang);
        }
    }

    drawTime() {
        var ctx = this.ctx,
            radius = this.radius;

        // center circle
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();

        var now = new Date();
        this.hour = now.getHours();
        this.minute = now.getMinutes();
        this.second = now.getSeconds();
        //hour
        var hour = this.hour % 12;
        hour = (hour * Math.PI / 6) +
            (this.minute * Math.PI / (6 * 60)) +
            (this.second * Math.PI / (360 * 60));

        this.drawHand(ctx, hour, radius * 0.5, radius * 0.07);
        //minute
        var minute = (this.minute * Math.PI / 30) + (this.second * Math.PI / (30 * 60));
        this.drawHand(ctx, minute, radius * 0.8, radius * 0.07);
        // second
        var second = (this.second * Math.PI / 30);
        this.drawHand(ctx, second, radius * 0.9, radius * 0.02);
    }

    drawHand(ctx, pos, length, width) {
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.lineCap = "round";

        ctx.moveTo(0, 0);
        ctx.rotate(pos);
        ctx.lineTo(0, -length);
        ctx.fillStyle = '#333';
        ctx.stroke();
        ctx.rotate(-pos);
    }

    drawBedTime() {
        var ctx = this.ctx;
        var radius = this.radius;

        if (this.state.showBedTime) {
            var twentyFourHourStartTime = this.state.startBedTimeAmPm === 1 ? this.state.startBedTimeHour + 12 : this.state.startBedTimeHour;
            if (this.hour === twentyFourHourStartTime) {
                this.playBedTimeAudio();
            }

            const arcStartTime = 3;
            var startBedTimeHour = this.state.startBedTimeHour;
            var endBedTimeHour = this.state.endBedTimeHour;

            // add more logic and tests
            if (
                this.state.startBedTimeAmPm === 1 &&
                this.state.endBedTimeAmPm === 0 &&
                this.hour < twentyFourHourStartTime) {
                endBedTimeHour = 12;
            }

            var startTime = (startBedTimeHour + (this.state.startBedTimeMinute / 100)) - arcStartTime;
            var finishTime = (endBedTimeHour + (this.state.endBedTimeMinute / 100)) - arcStartTime;
            var startAngle = (startTime * Math.PI / 6)
            var endAngle = (finishTime * Math.PI / 6)
            if (startTime === finishTime) {
                startAngle = 0;
                endAngle = 2 * Math.PI;
            }

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, radius * 0.98, startAngle, endAngle);
            ctx.globalAlpha = 0.85;
            var pattern = ctx.createPattern(this.img, 'repeat');
            ctx.fillStyle = pattern;
            ctx.translate(this.canvas.width, this.canvas.height);
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.restore();
        }

        this.drawMoon();
    }

    drawMoon() {
        var ctx = this.ctx,
        radius = this.radius;

        this.bedTimeButtonY = -radius * .5;
        this.bedTimeButtonRadius = radius * 0.15;

        // https://www.svgrepo.com/vectors/Moon/2
        ctx.beginPath();
        ctx.drawImage(
            this.refs.moon,                                     // img
            0 - this.bedTimeButtonRadius,                       // x
            this.bedTimeButtonY - this.bedTimeButtonRadius,     // y
            this.bedTimeButtonRadius * 2,                       // width    
            this.bedTimeButtonRadius * 2                        // height
        );
    }

    showBedTime() {
        this.setState({ showBedTime: true, showBedTimeInput: false });
    }

    clearBedTime() {
        this.setState({ showBedTime: false, showBedTimeInput: false });
    }

    canvasClicked({ clientX, clientY }) {
        var rect = this.canvas.getBoundingClientRect();
        var x = clientX - rect.left;
        var y = clientY - rect.top - (this.originalRadius - this.radius);

        if (this.isBedTimeClicked(x, y)) {
            var showBedTimeInput = this.state.showBedTimeInput !== true;
            this.setState({ showBedTimeInput });
        }
    }

    isBedTimeClicked(x, y) {
        var bedTimeButtonX = this.canvas.width / 2;
        return this.pointInCircle(x, y, bedTimeButtonX, Math.abs(this.bedTimeButtonY), this.bedTimeButtonRadius);
    }

    pointInCircle(x, y, cx, cy, radius) {
        return (((x - cx) * (x - cx)) + ((y - cy) * (y - cy))) <= (radius * radius);
    }

    bedTimeHourStartChanged(e) {
        this.setState({ startBedTimeHour: parseInt(e.target.value) });
    }

    bedTimeMinuteStartChanged(e) {
        this.setState({ startBedTimeMinute: parseInt(e.target.value) });
    }

    bedTimeAmPmStartChanged(e) {
        this.setState({ startBedTimeAmPm: parseInt(e.target.value) });
    }

    bedTimeHourEndChanged(e) {
        this.setState({ endBedTimeHour: parseInt(e.target.value) });
    }

    bedTimeMinuteEndChanged(e) {
        this.setState({ endBedTimeMinute: parseInt(e.target.value) });
    }

    bedTimeAmPmEndChanged(e) {
        this.setState({ endBedTimeAmPm: parseInt(e.target.value) });
    }

    closeBedTimeInput() {
        this.setState({ showBedTimeInput: false });
    }

    render() {
        return (
            <div>
                <Helmet>
                <title>{this.siteTitle}</title>
                <meta name="description" content={this.siteDescription} />
                </Helmet>
                <style dangerouslySetInnerHTML={{__html: `
                    body: {
                        background: #282c34;
                    }
                    #wrapper.page {
                        padding: 0;
                    }
                    #bg {
                        display:none;
                    }
                    #wrapper.page > div {
                        //background-color: #282c34;
                        min-height: 100vh;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        font-size: calc(10px + 2vmin);
                        color: white;
                        max-width: initial !important;
                    }
                    
                    .bedTimeInputPopup {
                        position: absolute;
                        top: 0;
                        width: 100%;
                        left: 0;
                        height: 100%;
                      }
                      
                      .bedTimeInputPopup .popup-container {
                        background: #292c35;
                        width: 100%;
                        margin: 0 auto;
                        height: 100%;
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        flex-direction: column;
                      }
                      
                      .bedTimeInputPopup .popup-container > div {
                        height: 33%;
                        border-bottom: 1px solid #a0a0a0;
                        color: #fff;
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-sizing: content-box;
                      }
                      
                      .bedTimeInputPopup .popup-container > div .col {
                        width: 50%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        padding: 3%;
                        box-sizing: border-box;
                      }

                      .bedTimeInputPopup .popup-container > div .col label {
                        font-size: calc(3vw + 3vh);
                        margin: 0;
                        font: inherit;
                      }
                      
                      .bedTimeInputPopup .popup-container > div .col:nth-child(2) {
                        background: #586567;
                        justify-content: flex-start;
                      }
                      
                      .bedTimeInputPopup .popup-container > div:nth-child(3) {
                        flex-direction: column-reverse;
                      }
                      
                      .bedTimeInputPopup .popup-container > div:nth-child(3) .col {
                        flex-direction: column-reverse;
                        width: 100%;
                        justify-content: center;
                        padding: 0;
                      }
                      
                      .bedTimeInputPopup .popup-container > div:nth-child(3) button {
                        width: 100%;
                        height: 100%;
                        background: transparent;
                        border: none;
                        font-size: calc(3vw + 3vh);
                        color: #fff;
                        box-shadow: none;
                        font: inherit;
                      }
                      
                `}} />
                <div className="bedTimeInputPopup" style={this.state.showBedTimeInput ? {} : { display: 'none' }}>
                    <div className="popup-container">
                        <div>
                            <div className="col">
                                <label>Bed Time</label>
                            </div>
                            <div className="col">
                                <select onChange={this.bedTimeHourStartChanged.bind(this)} >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                                <select onChange={this.bedTimeMinuteStartChanged.bind(this)} >
                                    <option value="0">00</option>
                                    <option value="25">15</option>
                                    <option value="50">30</option>
                                    <option value="75">45</option>
                                </select>
                                <select defaultValue="1" onChange={this.bedTimeAmPmStartChanged.bind(this)} >
                                    <option value="0">AM</option>
                                    <option value="1">PM</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div className="col">
                                <label>Wake Time</label>
                            </div>
                            <div className="col">
                                <select onChange={this.bedTimeHourEndChanged.bind(this)} >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                                <select onChange={this.bedTimeMinuteEndChanged.bind(this)} >
                                    <option value="0">00</option>
                                    <option value="25">15</option>
                                    <option value="50">30</option>
                                    <option value="75">45</option>
                                </select>
                                <select defaultValue="0" onChange={this.bedTimeAmPmEndChanged.bind(this)} >
                                    <option value="0">AM</option>
                                    <option value="1">PM</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div className="col">
                                <button onClick={this.clearBedTime.bind(this)}>Clear</button>
                            </div>
                            <div className="col">
                                <button onClick={this.showBedTime.bind(this)}>Set</button>
                            </div>
                        </div>
                    </div>
                </div>
                <img src={moon} ref="moon" width={100} height={100} alt="moon" style={{display: 'none'}} />
                <canvas ref="canvas" width={300} height={300} />
            </div>
        );
    }
}

export default CanvasClockComponent;

export const pageQuery = graphql`
  query CanvasClockComponent {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
