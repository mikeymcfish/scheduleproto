import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './webflow.css';
import './App.css';
import './Span-styles.css';
import './grid.css';
import $ from 'jquery';
import Day from './Day';
import Month from './Month';
import CheckIcon from './icons/CheckIcon';
import Event from './Event';
import EventContainers from "./EventContainer";


class App extends Component {

    toggleSeries() {

        this.setState({
            filterCamp:true,
            filterSeries:false,
            filterDropIn:true,
            filterSpecial:true
        });

    }

    toggleDropin() {
        // if (!this.state.filterDropIn) {
        //     this.setState({filterDropIn:true});
        // } else {
        //     this.setState({filterDropIn:false});
        // }
        this.setState({filterCamp:true});
        this.setState({filterSeries:true});
        this.setState({filterDropIn:false});
        this.setState({filterSpecial:true});

    }

    toggleCamp() {
        // if (!this.state.filterCamp) {
        //     this.setState({filterCamp:true});
        // } else {
        //     this.setState({filterCamp:false});
        // }
        this.setState({filterCamp:false});
        this.setState({filterSeries:true});
        this.setState({filterDropIn:true});
        this.setState({filterSpecial:true});

    }

    toggleSpecial() {
        // if (!this.state.filterSpecial) {
        //     this.setState({filterSpecial:true});
        // } else {
        //     this.setState({filterSpecial:false});
        // }
        this.setState({filterCamp:true});
        this.setState({filterSeries:true});
        this.setState({filterDropIn:true});
        this.setState({filterSpecial:false});

    }

    constructor() {
        super();

        this.toggleSeries = this.toggleSeries.bind(this);
        this.toggleDropin = this.toggleDropin.bind(this);
        this.toggleCamp = this.toggleCamp.bind(this);
        this.toggleSpecial = this.toggleSpecial.bind(this);
        this.state = {
            filterDropIn: true,
            filterSpecial: true,
            filterSeries: true,
            filterCamp: true
        };
        global.overlappingSeriesEvents = [];
        global.overlappingCampEvents = [];
        //LOAD ALL EVENTS HERE
        global.allEvents =
            {
                events : [
                    {
                        month:"September",
                        days:"12,26",
                        name:"Minecraft Mobs",
                        type:"series",
                        spanType:"six-weeks"
                    },
                    {
                        month:"October",
                        days:"4,25",
                        name:"Virtual Reality",
                        type:"series",
                        spanType:"six-weeks"
                    },
                    {
                        month:"October",
                        days:"4,25",
                        name:"Overlapping Event",
                        type:"series",
                        spanType:"six-weeks"
                    },
                    {
                        month:"September",
                        days:"2,14",
                        name:"Minecraft Mobs",
                        type:"series",
                        spanType:"six-weeks"
                    },
                    {
                        month:"September",
                        days:"11,15",
                        name:"Spring Break",
                        type:"camp",
                        spanType:"five-days"
                    },
                    {
                        month:"September",
                        days:"11,15",
                        name:"Other Camp Option",
                        type:"camp",
                        spanType:"five-days"
                    },
                    {
                        month:"September",
                        days:"18,22",
                        name:"Booger camp",
                        type:"camp",
                        spanType:"five-days"
                    },
                    {
                        month:"September",
                        days:"12,26",
                        name:"September Overlap",
                        type:"series",
                        spanType:"six-weeks"
                    }

                ]
            }
    }

    RenderDay(i, isclosed, dropinevents, specialevents, inCart) {
        //filters
        var dropInList = "";
        var specialList = "";
        if (isclosed) return <Day closed="true"/>
        if (!this.props.filterDropIn)
        {
            dropInList = dropinevents.toString();
        }
        if (!this.props.filterSpecial)
        {
            specialList = specialevents.toString();
        }

        return <Day month={this.props.name} value={i} dropinevents={dropInList} specialevents={specialList} incart={inCart}/>

        //RANDOM TESTING
        //
        // if (random1 >.8) return <Day month={this.props.name} value={i} dropinevents="Makerspace,Tournament" specialevents="Guest Pass"/>;
        // else if (random1 >.4) return <Day month={this.props.name}  value={i} dropinevents="Makerspace" specialevents="Guest Pass" inCart="true"/>;
        // else if (random1 >.2) return <Day month={this.props.name}  value={i} specialevents="Guest Pass"/>;
        // else return <Day month={this.props.name}  value={i}/>;
        //

        //
    }

    RenderAllDays(c) {

        var allDays = [];

        for (var i = 1; i < c; i++) {
            console.log("i = "+ i);

            allDays.push(
                this.RenderDay(i)
            );
        }
        return  (
            <div>
                {allDays.map(day =>  {day} )}
            </div>
        );

    }

    RenderWeekNames(i) {
        return (
            <div className="week-names">{i}</div>
        )
    }

    RenderEvent(name, type, startCol, colSpan, startRow, rowSpan) {

        var spanType;

        switch (type) {

            case 'six-weeks' :
                spanType = 'span-six-weeks series-color ';
                break;
            case 'five-days' :
                spanType = 'span-monday-friday camp-color';
                break;
            default :
                spanType = '';
                break;
        }



        return (

            <div className={spanType+ ' spanner selectable'} style={{

                gridColumn: "col " + startCol + " / span " + colSpan,
                gridRow: "row " + startRow + " / span " + rowSpan,
                zIndex: 100

            }}>
                <span className='label'>{name}</span>
            </div>
        )
    }

    componentDidMount() {


    }

    componentWillUpdate() {
        global.overlappingSeriesEvents = [];
        global.overlappingCampEvents = [];

    }

    componentDidMount() {
        // $("#calendar").append("<div class='spanner span-monday-friday camp-color camp-span-week-2 selectable'>" +
        //     "<div class='spanner-copy'> Spring Break Camp</div></div>");
        $("#calendar").css('display', 'none');
        $("#calendar").css('display', 'grid');
        this.runJquery();
    }

    componentDidUpdate() {
        this.runJquery();
    }

    runJquery() {
        $('div:has(> #no-day)').addClass('no-day');
        $('div:has(> #closed-day)').addClass('closed');

    }

    getMonth(numDays,numSkip) {
        var allDays = [];

        for (var i = 1; i <= numSkip; i++) {
            allDays.push(
                <div id="no-day"></div>
            );
        }

        for (var i = 1; i <= numDays; i++) {


            var dropinevents = [];
            var specialevents = [];
            var isclosed = false;
            var inCart = false;

            //RANDOM TESTING
            if (i%4==0) isclosed = true; //this breaks it. probably doesnt remove old id?
            else if (i%4==1) dropinevents = ["makerspace", "gaming"];
            else if (i%4==2) specialevents = ["minicamp"];
            else if (i%4==3) { dropinevents = ["makerspace", "gaming"]; specialevents = ["minicamp"]; inCart = true;}

            allDays.push(
                isclosed? <div id="closed-day" i={i}></div> : this.RenderDay(i, isclosed, dropinevents, specialevents, inCart)
            );
        }

        return allDays;
    }

    render() {

        var campFilterIcon = this.state.filterCamp ?  "" : <CheckIcon/>;
        var dropInFilterIcon = this.state.filterDropIn ? "" : <CheckIcon/>;
        var seriesFilterIcon = this.state.filterSeries ? "" : <CheckIcon/>;
        var specialFilterIcon = this.state.filterSpecial ? "" : <CheckIcon/>;



        var eventsList = [];
        var tempSeriesEventsList = [];
        var tempCampEventsList = [];

        var seriesDupeDates = [];
        var campDupeDates = [];


        if (!this.props.filterSeries) {
            //all series
            var holdingEvents = [];

            //add all dupes to an array (but originals are not there yet)
            for (var i=0; i < global.allEvents.events.length; i++) {
                if (global.allEvents.events[i].month == this.props.name && global.allEvents.events[i].type=="series") {
                    global.allEvents.events[i].skipDays =  this.props.skipDays;
                    if (holdingEvents.indexOf(global.allEvents.events[i].days)>=0) {

                        global.overlappingSeriesEvents.push(global.allEvents.events[i]);
                        seriesDupeDates.push(global.allEvents.events[i].days);

                    } else{
                        holdingEvents.push(global.allEvents.events[i].days);
                        tempSeriesEventsList.push(
                            global.allEvents.events[i]
                        );
                    }

                }
                else {

                }
            }
            //now go through again and add in the originals that caused the dupe.
            for (var i=0; i < tempSeriesEventsList.length; i++) {

                if (seriesDupeDates.indexOf(tempSeriesEventsList[i].days)>=0) {

                    global.overlappingSeriesEvents.push(tempSeriesEventsList[i]);

                } else{
                    eventsList.push(
                        tempSeriesEventsList[i]
                    );
                }
            }
            console.log("overlapping series count for month "+ this.props.name+" :" + global.overlappingSeriesEvents.length)


        }
        if (!this.props.filterCamp) {
            //all camp
            //all series
            var holdingEvents = [];


            //add all dupes to an array (but originals are not there yet)
            for (var i=0; i < global.allEvents.events.length; i++) {
                if (global.allEvents.events[i].month == this.props.name && global.allEvents.events[i].type=="camp") {
                    global.allEvents.events[i].skipDays =  this.props.skipDays;
                    if (holdingEvents.indexOf(global.allEvents.events[i].days)>=0) {

                        global.overlappingCampEvents.push(global.allEvents.events[i]);
                        campDupeDates.push(global.allEvents.events[i].days);

                    } else{
                        holdingEvents.push(global.allEvents.events[i].days);
                        tempCampEventsList.push(
                            global.allEvents.events[i]
                        );
                    }

                }
                else {

                }
            }
            //now go through again and add in the originals that caused the dupe.
            for (var i=0; i < tempCampEventsList.length; i++) {

                if (campDupeDates.indexOf(tempCampEventsList[i].days)>=0) {

                    global.overlappingCampEvents.push(tempCampEventsList[i]);

                } else{
                    eventsList.push(
                        tempCampEventsList[i]
                    );
                }
            }






            console.log("overlapping events count for month "+ this.props.name+" :" + global.overlappingCampEvents.length)


        }


        return (
            <div className="App">
                <div className="container w-container">
                    <h1 className="heading">Showing events for
                        <span className="editable-heading">anyone</span>
                        <span
                        className="editable-heading">age 7 to 9</span> in <span
                        className="editable-heading">Brooklyn</span></h1>
                    <div className="filters">
                        <div className="filter-circle-container" onClick={this.toggleSeries}>
                            <div className="filter-circle-filled series-color">
                                {seriesFilterIcon}
                            </div>
                            <div className="filter-circle-label">
                                Series
                            </div>
                        </div>
                        <div className="filter-circle-container" onClick={this.toggleCamp}>
                            <div className="filter-circle-filled camp-color">
                                {campFilterIcon}
                            </div>
                            <div className="filter-circle-label">
                                Camp
                            </div>
                        </div>
                        <div className="filter-circle-container" onClick={this.toggleDropin}>
                            <div className="filter-circle-filled drop-in-color">
                                {dropInFilterIcon}
                            </div>
                            <div className="filter-circle-label">
                                Drop-in
                            </div>
                        </div>
                        <div className="filter-circle-container" onClick={this.toggleSpecial}>
                            <div className="filter-circle-filled special-color">
                                {specialFilterIcon}
                            </div>
                            <div className="filter-circle-label">
                                Special
                            </div>
                        </div>
                    </div>
                    <div className="grid" >


                        <div className="week-names week-names-september">Sun</div>
                        <div className="week-names week-names-september">Sun</div>
                        <div className="week-names week-names-september">Sun</div>
                        <div className="week-names week-names-september">Sun</div>
                        <div className="week-names week-names-september">Sun</div>
                        <div className="week-names week-names-september">Sun</div>
                        <div className="week-names week-names-september">Sun</div>

                        {/*{this.getMonth(30,5).map((day, index) => <div className="day" key={index} > {day} </div>)}*/}

                        <div className="week-names week-names-october">Sun</div>
                        <div className="week-names week-names-october">Sun</div>
                        <div className="week-names week-names-october">Sun</div>
                        <div className="week-names week-names-october">Sun</div>
                        <div className="week-names week-names-october">Sun</div>
                        <div className="week-names week-names-october">Sun</div>
                        <div className="week-names week-names-october">Sun</div>


                        {/*{this.getMonth(31,0).map((day, index) => <div className="day" key={index} > {day} </div>)}*/}


                        {seriesDupeDates.map((container, index) => <EventContainers allDupes={global.overlappingSeriesEvents} thisDupe={container} skipDays={this.props.skipDays} type="series"/>)}
                        {campDupeDates.map((container, index) => <EventContainers allDupes={global.overlappingCampEvents} thisDupe={container} skipDays={this.props.skipDays} type="camp"/>)}

                        {eventsList.map((event, index) => <Event key={index} month={event.month} days={event.days} name={event.name} spanType={event.spanType} type={event.type} skipDays={event.skipDays} monthObject={this}/>)}



                        {/*<Month name="September" numDays="30" skipDays="5"*/}
                           {/*filterDropIn={this.state.filterDropIn}*/}
                           {/*filterSpecial={this.state.filterSpecial}*/}
                           {/*filterSeries={this.state.filterSeries}*/}
                           {/*filterCamp={this.state.filterCamp}*/}
                    {/*/>*/}
                    {/*<Month name="October" numDays="31" skipDays="0"*/}
                           {/*filterDropIn={this.state.filterDropIn}*/}
                           {/*filterSpecial={this.state.filterSpecial}*/}
                           {/*filterSeries={this.state.filterSeries}*/}
                           {/*filterCamp={this.state.filterCamp}*/}
                    {/*/>*/}
                    {/*<Month name="November" numDays="30" skipDays="3"*/}
                           {/*filterDropIn={this.state.filterDropIn}*/}
                           {/*filterSpecial={this.state.filterSpecial}*/}
                           {/*filterSeries={this.state.filterSeries}*/}
                           {/*filterCamp={this.state.filterCamp}*/}
                    {/*/>*/}
                    {/*<Month name="December" numDays="31" skipDays="5"*/}
                           {/*filterDropIn={this.state.filterDropIn}*/}
                           {/*filterSpecial={this.state.filterSpecial}*/}
                           {/*filterSeries={this.state.filterSeries}*/}
                           {/*filterCamp={this.state.filterCamp}*/}
                    {/*/>*/}
                    {/*</div>*/}

                </div>
                </div>
            </div>
        );
    };

}

export default App;
