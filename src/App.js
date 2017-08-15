import React, {Component} from 'react';

import './webflow.css';
import './App.css';
import './Span-styles.css';
import $ from 'jquery';
import Day from './Day';
import Month from './Month';
import CheckIcon from './icons/CheckIcon';
import { Modal } from 'carbon-components';
import './carbon-components.css';
import MyModal from './Modal';
import { StickyContainer, Sticky } from 'react-sticky';
import AlertDialog from "./AlertDialog";
import Button from 'material-ui/Button';
import TopLinks from "./TopLinks";
import ViewDay from "./ViewDay";

class App extends Component {

    testLogIn() {
        //should probably put owned events in these member details.
        this.setState({
            loggedIn:true,
            members:global.allEvents.members,
            currentAgeGroup: "(click to select)"

        });
        // $(".editable-age-group").css("color","rgb(150,150,150");
        // $(".editable-age-group").css("background-color","#333");

        console.log(this.state.loggedIn);
        // this.setState({
        //     currentAgeGroup: this.state.members[0].name,
        //     ageSelectionOptions: this.state.members
        // });
        this.openAlert("Test Login", "This is a test of the login. You are now fake logged in as a parent with two members. One is 11 with a default location of Brooklyn and one is 8 with a default location of Tribeca.", "OK","i guess",null,null);
     }


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
        this.setState({
            filterCamp:true,
            filterSeries:true,
            filterDropIn:false,
            filterSpecial:true
        });

    }

    toggleCamp() {
        this.setState({
            filterCamp:false,
            filterSeries:true,
            filterDropIn:true,
            filterSpecial:true
        });

    }

    toggleSpecial() {
        this.setState({
            filterCamp:true,
            filterSeries:true,
            filterDropIn:true,
            filterSpecial:false
        });

    }

    setFilterAgeByAge(age) {
        console.log("setting filter by age "+ age);

        if (age < 7) {

        }
        if (age <= 9) {
            this.setState({
                filter7to9: false,
                filter9to11: true,
                filter12to14: true
            })
        }
        else if (age <= 11) {
            this.setState({
                filter7to9: true,
                filter9to11: false,
                filter12to14: true
            })
        }
        else if (age <= 14) {
            this.setState({
                filter7to9: true,
                filter9to11: true,
                filter12to14: false
            })
        }
        if (age==9) {
            this.setState({
                filter7to9: false,
                filter9to11: false,
                filter12to14: true
            })
        }

    }

    setFilterAgeByGroup (group) {
        console.log("filter age by "+group);
        if (group == "age 7 to 9") {
            this.setState({
                filter7to9: false,
                filter9to11: true,
                filter12to14: true
            })
        }
        else if (group == "age 9 to 11") {
            this.setState({
                filter7to9: true,
                filter9to11: false,
                filter12to14: true
            })
        }
        else if (group == "age 12 to 14") {
            this.setState({
                filter7to9: true,
                filter9to11: true,
                filter12to14: false
            })
        }
    }


    constructor() {
        super();

        this.toggleSeries = this.toggleSeries.bind(this);
        this.toggleDropin = this.toggleDropin.bind(this);
        this.toggleCamp = this.toggleCamp.bind(this);
        this.toggleSpecial = this.toggleSpecial.bind(this);
        this.changeAge = this.changeAge.bind(this);
        this.changeLocation = this.changeLocation.bind(this);
        this.openAlert = this.openAlert.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.testLogIn = this.testLogIn.bind(this);
        this.openFullDay = this.openFullDay.bind(this);
        this.closeFullDay = this.closeFullDay.bind(this);

        this.state = {
            filterDropIn: true,
            filterSpecial: true,
            filterSeries: true,
            filterCamp: true,
            filter7to9: false,
            filter9to11: true,
            filter12to14: true,
            filterLocation: "Brooklyn",
            currentLocation: "Brooklyn",
            currentAgeGroup: "age 7 to 9",
            ageSelectionOptions: [
                "age 7 to 9",
                "age 9 to 11",
                "age 12 to 14"
            ],
            selectedEvent: "",
            loggedIn: false,
            members: [],
            selectedMemberKey: "",
            alert: {
                title: "",
                text: "",
                button1: "cancel",
                button2: "ok",
                id: 0,
                spotsLeft: 0
            },
            viewOpen: false,
            view: {
                title: "",
                text: "",
                button1: "close",
                button2: "ok",
                id: 0
            }
        }
    }



    openAlert(title, text, btn1, btn2, spots, id) {
        this.setState({
            open: !this.state.open,
            alert: {
                title: title,
                text: text,
                button1: btn1,
                button2: btn2,
                spotsLeft: spots,
                id: id
            }
        });
    }

    closeAlert() {
        this.setState({
            open: false
        })
        console.log("closing alert");
    }

    openFullDay(title, text, btn1, btn2, id) {
        this.setState({
            viewOpen: !this.state.viewOpen,
            view: {
                title: title,
                text: text,
                button1: btn1,
                button2: btn2,
                id: id
            }
        });
        console.log("opened");

    }

    closeFullDay() {
        this.setState({
            viewOpen: false
        })
    }


    componentDidMount() {
        // $("#calendar").append("<div class='spanner span-monday-friday camp-color camp-span-week-2 selectable'>" +
        //     "<div class='spanner-copy'> Spring Break Camp</div></div>");
        $("#calendar").css('display', 'none');
        $("#calendar").css('display', 'grid');

        $('body').click(function () {
            $(".filter-location").css("display","none");
            $(".filter-age").css("display","none");
        });
        $('.change-age-btn').unbind("hover");
        $('.change-age-btn').hover(function () {
            $('.change-age-btn > .filtering-hover-text').css("color","blue");
        }, function () {
            $('.change-age-btn > .filtering-hover-text').css("color","#333");
        });
        $('.change-location-btn').unbind("hover");
        $('.change-location-btn').hover(function () {
            $('.change-location-btn > .filtering-hover-text').css("color","blue");
        }, function () {
            $('.change-location-btn > .filtering-hover-text').css("color","#333");
        });

        this.runJquery();
        this.addHolidays();
        this.addOwnedDays();

    }

    addHolidays() {
        console.log("adding holidays");

        var holidays = global.allEvents.metaData.holidays;
        for (var i = 0 ; i < Object.keys(holidays).length; i++) {
            console.log(holidays[i].month, holidays[i].day);
            var thisHoliday;
            thisHoliday = $('.day:has(> [data-month="' + holidays[i].month + '"][data-daynum="' + holidays[i].day + '"])');
            console.log(thisHoliday);
            var thisHolidayRow = thisHoliday.css("grid-row-start");
            var thisHolidayCol = thisHoliday.css("grid-column-start");
            thisHoliday.addClass("day-under-overlay");
            var monthGrid = $('#calendar_' + holidays[i].month);
            console.log("grid location: "+ thisHolidayRow+"," +thisHolidayCol);
            monthGrid.append(
                "<div class='overlay' style='background-color:"+holidays[i].backgroundColor+";grid-row:"+thisHolidayRow+";grid-column: "+thisHolidayCol+"; transform: rotateZ("+(Math.floor(Math.random()*10)-5)+"deg)'>" +
                "<div class='title'>" + holidays[i].title +
                "</div><div class='sub-title'>" + holidays[i].subTitle +
                "</div></div>"
            );
        }
    }

    addOwnedDays() {
        var ownedEvents = [];

        //not a member? they dont own anything
        if (!this.state.members[this.state.selectedMemberKey]) return;

        //remove previous overlays
        $(".owned-day").remove();
        $(".day-under-overlay").removeClass("day-under-overlay");
        ownedEvents = this.state.members[this.state.selectedMemberKey].ownedEvents;
        var allEvents = global.allEvents.events;
        for (var i = 0 ; i < ownedEvents.length; i++) {
            console.log("i have " + ownedEvents.length + " events");
            for (var j = 0; j < Object.keys(allEvents).length; j++) {
                if (allEvents[j].id == ownedEvents[i]) {
                    //match
                    console.log("match "+allEvents[j].daystring);

                    //check if its more than one day:
                    var thisDayFullString = allEvents[j].daystring;
                    var thisDayString = [];

                    if (thisDayFullString.indexOf(",")>0) {

                        var multiDays = thisDayFullString.split(",");

                        for (var k = 0; k < multiDays.length; k++) {

                            this.printOwnedDay(multiDays[k],"RESERVED",allEvents[j].name+" ("+(k+1)+" of "+multiDays.length+")",allEvents[j].type,allEvents[j].startTime);

                        }


                    } else {
                        this.printOwnedDay(thisDayFullString,"RESERVED",allEvents[j].name,allEvents[j].type,allEvents[j].startTime);
                    }
                    $("[data-id='"+allEvents[j].id+"']").hide();

                    continue;
                }

            }


        }

    }
    printOwnedDay(thisDayFullString,title,subTitle,type,time) {
        var thisDayString = thisDayFullString.split("-");
        var thisMonth = this.getMonthName(thisDayString[0]);
        console.log(thisMonth, thisDayString[1]);
        var thisDay = $('.day:has(> [data-month="' + thisMonth + '"][data-daynum="' + thisDayString[1] + '"])');
        var thisDayRow = thisDay.css("grid-row-start");
        var thisDayCol = thisDay.css("grid-column-start");
        thisDay.addClass("day-under-overlay");
        var monthGrid = $('#calendar_' + thisMonth);
        monthGrid.append(
            "<div class='overlay owned-day' style='grid-row:" + thisDayRow + ";grid-column: " + thisDayCol + "; transform: rotateZ(" + (Math.floor(Math.random() * 8) - 4) + "deg)'>" +
            "<div class='title'>" + title +
            "</div><div class='sub-title'>"+subTitle+". Starts at "+time+"<br/>" +
            "<span class='view-day' data-month='"+thisMonth+"' data-day='"+thisDayString[1]+"'>view this day</span>" +
            "</div></div>"
        );

    }

    getMonthName(num) {
        num = parseInt(num);
        switch (num) {
            case 1:
                return "January";
            case 2:
                return "February";
            case 3:
                return "March";
            case 4:
                return "April";
            case 5:
                return "May";
            case 6:
                return "June";
            case 7:
                return "July";
            case 8:
                return "August";
            case 9:
                return "September";
            case 10:
                return "October";
            case 11:
                return "November";
            case 12:
                return "December";
            default:
                return "NoIdea";
        }
    }


    changeAge = ({ target }) => {

        if (target.hasAttribute("data-age-group")) {
            this.setState(
                {
                    currentAgeGroup: $(target).attr("data-age-group")
                });
            $(".filter-age")
                .css("display","none");
            // is it a member?
            for (var member in Object.keys(this.state.members)) {
                if (this.state.members[member].name.split(" ")[0] == $(target).attr("data-age-group")) {
                    this.setState({
                        currentLocation: this.state.members[member].defaultLocation,
                        selectedMemberKey: member
                    });
                    this.setFilterAgeByAge(this.state.members[member].age);
                }
            }
            this.setFilterAgeByGroup($(target).attr("data-age-group"));


        } else {
            $(".filter-age")
                .css("display","flex");
        }
        $(".editable-age-group").css("color","inherit");
        $(".editable-age-group").css("background-color","inherit");

    };

    changeLocation = ({ target }) => {

        if (target.hasAttribute("data-location")) {
            this.setState(
                {
                    currentLocation: $(target).attr("data-location"),
                    filterLocation: $(target).attr("data-location")
                });
            $(".filter-location")
                .css("display","none");

        } else {
            $(".filter-location")
                .css("display","flex");
        }

    };


    componentDidUpdate() {
        console.log("did update");
        //this.runJquery();
        if (global.isUpdating!=true) this.runJquery();
    }

    runJquery() {
        global.isUpdating=true;
        console.log("jquery");
        $('div:has(> #no-day)').addClass('no-day');
        $('div:has(> .close-me)').addClass('closed');
        this.addOwnedDays();
        var myThis = this;
        $('.view-day').unbind("click");
        $('.view-day')
            .click(function () {
                myThis.openFullDay("Viewing date: " + $(this).attr("data-month") + "/" + $(this).attr("data-day")
                    ,"Here is where all the info and more buying options are","close","checkout",0);
            });
        $('.selectable').unbind("click");
        $('.selectable').unbind("mouseenter");
        $('.selectable').unbind("mouseleave");

        $('.selectable')
            .click(function () {

                var myColor;
                $(this).is(".drop-in-color,.special-color,.camp-color,.series-color") ?
                    myColor = $(this).css("background-color") : myColor = $(this).parent(".drop-in-color,.special-color,.camp-color,.series-color").css("background-color");
                myThis.openAlert($(this).attr("data-name"),$(this).attr("data-description"), "cancel", "add for $"+$(this).attr("data-price"),$(this).attr("data-spotsleft"), $(this).attr("data-id"));
            });

        $('.selectable')
            .mouseenter(function () {
                //console.log("clicked");
                $("[data-id="+$(this).attr('data-id')+"]").addClass('selectable-hover');

            })
            .mouseleave(function () {
                //console.log("clicked");
                $("[data-id="+$(this).attr('data-id')+"]").removeClass('selectable-hover');
            });
        $('.event-container-series, .event-container-pro-series')
            .mouseenter(function () {
                //console.log("clicked");
                $(this).addClass('container-hover');

            })
            .mouseleave(function () {
                //console.log("clicked");
                $(this).removeClass('container-hover');
            });


        global.isUpdating=false;


    }

    render() {


        var campFilterIcon = this.state.filterCamp ?  "" : <CheckIcon/>;
        var dropInFilterIcon = this.state.filterDropIn ? "" : <CheckIcon/>;
        var seriesFilterIcon = this.state.filterSeries ? "" : <CheckIcon/>;
        var specialFilterIcon = this.state.filterSpecial ? "" : <CheckIcon/>;
        var listOfAgeSelections = this.state.ageSelectionOptions;
        if (this.state.members.length>0) {
            listOfAgeSelections=[];
            for (var member in Object.keys(this.state.members)) {
                listOfAgeSelections.push(this.state.members[member].name.split(" ")[0]);
            }
        }

        return (
            <div className="App">
                <TopLinks onLogin={this.testLogIn}/>
                <div className="container w-container">
                    {/*<button className="bx--btn bx--btn--secondary" type="button" data-modal-target="#nofooter">Passive</button>*/}

                    {/*<MyModal ref={this.state.selectedEvent}*/}
                             {/*modalid="myspecialmodal"*/}
                             {/*title={this.state.selectedEventName}*/}
                             {/*description={this.state.selectedEventDescription}*/}
                             {/*type={this.state.selectedEventType}*/}
                             {/*eventId={this.state.selectedEventID}*/}
                             {/*location={this.state.selectedEventLocation}*/}
                             {/*ages={this.state.selectedEventAges}*/}
                             {/*price = {this.state.selectedEventPrice}*/}
                             {/*color = {this.state.selectedEventColor}*/}
                    {/*/>*/}
                    <h1 className="heading">
                    <div className="filtering-header">

                        <div className="change-age-btn" onClick={this.changeAge}>
                            <div className="text-right"><span class="def-no-hover">Showing events for </span><span className="editable-heading editable-age-group">{this.state.currentAgeGroup}</span></div>
                            <div className="text-right filtering-hover-text">
                                <div>click to change</div>
                            </div>
                            <div className="filter-selection-box filter-age">
                                {/*//ageSelectionOptions*/}
                                {listOfAgeSelections.map((selection, index) =>
                                    <div className="filter-option set-age-btn" data-age-group={selection}>{selection}</div>
                                )}
                                {/*<div className="filter-option set-age-btn" data-age-group="age 7 to 9">age 7 to 9</div>*/}
                                {/*<div className="filter-option set-age-btn" data-age-group="age 9 to 11">age 9 to 11</div>*/}
                                {/*<div className="filter-option set-age-btn" data-age-group="age 12 to 14">age 12 to 14</div>*/}
                            </div>
                        </div>
                        <div className="text-center"> in </div>
                        <div className="change-location-btn" onClick={this.changeLocation}>
                            <div className="text-left"><span className="editable-heading">{this.state.currentLocation}</span></div>
                            <div className="text-center filtering-hover-text">
                                <div>click to change</div>
                            </div>
                            <div className="filter-selection-box filter-location">
                                <div className="filter-option set-location-btn" data-location="Brooklyn">Brooklyn</div>
                                <div className="filter-option set-location-btn" data-location="TriBeCa">TriBeCa</div>
                            </div>
                        </div>
                    </div>
                    </h1>
                    {/*<Button onClick={this.openAlert.bind(this)}>Open alert dialog</Button>*/}

                    <AlertDialog open={this.state.open}
                                 onClose={this.closeAlert}
                                 title={this.state.alert.title}
                                 text={this.state.alert.text}
                                 button1={this.state.alert.button1}
                                 button2={this.state.alert.button2}
                                 spotsLeft={this.state.alert.spotsLeft}
                                 id={this.state.alert.id}
                    />
                    <ViewDay open={this.state.viewOpen}
                             onClose={this.closeFullDay}
                             title={this.state.view.title}
                             text={this.state.view.text}
                             button1={this.state.view.button1}
                             button2={this.state.view.button2}
                             id={this.state.view.id}
                    />
                    <StickyContainer style={{ background:'transparent'}}>
                        <Sticky topOffset={-20}>
                            {
                                ({
                                     style,
                                     isSticky,
                                     wasSticky,
                                     distanceFromTop,
                                     distanceFromBottom,
                                     calculatedHeight
                                 }) => { return(
                                    <div className="filters" style={style}>
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
                                    )
                                }
                            }
                            </Sticky>


                    <Month name="September" numDays="30" skipDays="5"
                           filterDropIn={this.state.filterDropIn}
                           filterSpecial={this.state.filterSpecial}
                           filterSeries={this.state.filterSeries}
                           filterCamp={this.state.filterCamp}
                           filterAge7to9={this.state.filter7to9}
                           filterAge9to11={this.state.filter9to11}
                           filterAge12to14={this.state.filter12to14}
                           filterLocation={this.state.filterLocation}
                           myApp = {this}
                    />
                    <Month name="October" numDays="31" skipDays="0"
                           filterDropIn={this.state.filterDropIn}
                           filterSpecial={this.state.filterSpecial}
                           filterSeries={this.state.filterSeries}
                           filterCamp={this.state.filterCamp}
                           filterAge7to9={this.state.filter7to9}
                           filterAge9to11={this.state.filter9to11}
                           filterAge12to14={this.state.filter12to14}
                           filterLocation={this.state.filterLocation}
                           myApp = {this}
                    />
                    <Month name="November" numDays="30" skipDays="3"
                           filterDropIn={this.state.filterDropIn}
                           filterSpecial={this.state.filterSpecial}
                           filterSeries={this.state.filterSeries}
                           filterCamp={this.state.filterCamp}
                           filterAge7to9={this.state.filter7to9}
                           filterAge9to11={this.state.filter9to11}
                           filterAge12to14={this.state.filter12to14}
                           filterLocation={this.state.filterLocation}
                           myApp = {this}
                    />
                    <Month name="December" numDays="31" skipDays="5"
                           filterDropIn={this.state.filterDropIn}
                           filterSpecial={this.state.filterSpecial}
                           filterSeries={this.state.filterSeries}
                           filterCamp={this.state.filterCamp}
                           filterAge7to9={this.state.filter7to9}
                           filterAge9to11={this.state.filter9to11}
                           filterAge12to14={this.state.filter12to14}
                           filterLocation={this.state.filterLocation}
                           myApp = {this}
                    />

                    </StickyContainer>


                </div>

            </div>
        );
    };

}

export default App;
