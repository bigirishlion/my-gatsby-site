import React, { Component } from 'react'
import Helmet from 'react-helmet'

import stars from '../images/stars-in-the-night-sky.jpg';

class CanvasClockComponent extends Component {

    state = {
        showBedTimeInput: false
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
    }

    initCanvas() {
        this.canvas = this.refs.canvas;
        this.canvas.addEventListener('click', this.canvasClicked.bind(this), false);
        this.ctx = this.canvas.getContext("2d");
        setInterval(this.drawClock.bind(this), 1000);

        window.addEventListener('resize', this.drawClock.bind(this), false);
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
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        //hour
        hour = hour % 12;
        hour = (hour * Math.PI / 6) +
            (minute * Math.PI / (6 * 60)) +
            (second * Math.PI / (360 * 60));

        this.drawHand(ctx, hour, radius * 0.5, radius * 0.07);
        //minute
        minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
        this.drawHand(ctx, minute, radius * 0.8, radius * 0.07);
        // second
        second = (second * Math.PI / 30);
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

        ctx.globalCompositeOperation = 'source-over';

        // center circle
        ctx.beginPath();
        this.bedTimeButtonY = -radius * .5;
        this.bedTimeButtonRadius = radius * 0.15;
        ctx.arc(
            0,                          // x
            this.bedTimeButtonY,        // y
            this.bedTimeButtonRadius,   // r
            0,                          // sAngle
            2 * Math.PI,                // eAngle
            true
        );
        ctx.fillStyle = '#d4d485';
        ctx.fill();

        ctx.globalCompositeOperation = 'source-atop';

        // center circle
        ctx.beginPath();
        this.bedTimeButtonY = -radius * .5;
        this.bedTimeButtonRadius = radius * 0.15;
        ctx.arc(
            this.bedTimeButtonRadius / 2,                          // x
            this.bedTimeButtonY,        // y
            this.bedTimeButtonRadius,   // r
            0,                          // sAngle
            2 * Math.PI,                // eAngle
            true
        );
        ctx.fillStyle = '#fff';
        ctx.fill();

        ctx.globalCompositeOperation = 'source-over';

        if (this.state.showBedTime) {
            var startTime = this.state.startBedTimeHour - 3;
            var finishTime = this.state.endBedTimeHour - 3;
            var startAngle = (startTime * Math.PI / 6)
            var endAngle = (finishTime * Math.PI / 6)
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, radius * 0.98, startAngle, endAngle);
            ctx.globalAlpha = 0.85;
            var pattern = ctx.createPattern(this.img, 'repeat');
            ctx.fillStyle = pattern;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    showBedTime() {
        this.setState({ showBedTime: true, showBedTimeInput: false });
    }

    clearBedTime() {
        this.setState({ showBedTime: false, showBedTimeInput: false });
    }

    drawClock() {
        this.setCanvasDimensions();
        this.drawFace();
        this.drawBedTime();
        this.drawNumbers();
        this.drawTime();
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
        this.setState({ startBedTimeHour: e.target.value });
    }

    bedTimeAmPmStartChanged(e) {
        this.setState({ startBedTimeAmPm: e.target.value });
    }

    bedTimeHourEndChanged(e) {
        this.setState({ endBedTimeHour: e.target.value });
    }

    bedTimeAmPmEndChanged(e) {
        this.setState({ endBedTimeAmPm: e.target.value });
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
                    
                    .bedTimeInputPopup .box {
                        background: #292c35;
                        width: 100%;
                        margin: 0 auto;
                        font-size: calc(3vw + 3vh);
                        height: 100%;
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        flex-direction: column;
                        padding: 0;
                    }
                    
                    .bedTimeInputPopup .box > div {
                        height: 33%;
                        border-bottom: 1px solid #a0a0a0;
                        color: #fff;
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    
                    .bedTimeInputPopup .box > div .col {
                        width: 50%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        padding: 3%;
                        box-sizing: border-box;
                    }

                    .bedTimeInputPopup .box > div .col label{
                        font-size: calc(3vw + 3vh);
                        font-weight: normal;
                        font-family: Arial;
                    }
                    
                    .bedTimeInputPopup .box > div .col:nth-child(2) {
                        background: #586567;
                        justify-content: flex-start;
                    }
                    
                    .bedTimeInputPopup .box > div:nth-child(3) {
                        flex-direction: column-reverse;
                    }
                    
                    .bedTimeInputPopup .box > div:nth-child(3) .col {
                        flex-direction: column-reverse;
                        width: 100%;
                        justify-content: center;
                        padding: 0;
                    }
                    
                    .bedTimeInputPopup .box > div:nth-child(3) button {
                        width: 100%;
                        height: 100%;
                        background: transparent;
                        border: none;
                        font-size: calc(3vw + 3vh);
                        color: #fff;
                        padding: 0;
                        border-radius: 0px;
                    }
                      
                `}} />
                <div className="bedTimeInputPopup" style={this.state.showBedTimeInput ? {} : { display: 'none' }}>
                    <div className="box">
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
                                <select onSelect={this.bedTimeAmPmStartChanged.bind(this)} >
                                    <option value="0">AM</option>
                                    <option value="1" selected="selected">PM</option>
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
                                <select onSelect={this.bedTimeAmPmEndChanged.bind(this)} >
                                    <option value="0" selected="selected">AM</option>
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
                <canvas ref="canvas" id="myc" width={300} height={300} />
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
