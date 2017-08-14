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




class App extends Component {

    testLogIn() {
        //should probably put owned events in these member details.
        this.setState({
            loggedIn:true,
            members:global.allEvents.members,
            currentAgeGroup: "(choose)"

        });
        console.log(this.state.loggedIn);
        // this.setState({
        //     currentAgeGroup: this.state.members[0].name,
        //     ageSelectionOptions: this.state.members
        // });
        this.openAlert("Test Login", "This is a test of the login. You are now fake logged in as a parent with two members. One is 11 with a default location of Brooklyn and one is 8 with a default location of Tribeca.");
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

        //this.setAgeTo = this.setAgeTo.bind(this);
        this.state = {
            filterDropIn: true,
            filterSpecial: true,
            filterSeries: true,
            filterCamp: true,
            filter7to9: true,
            filter9to11: true,
            filter12to14: true,
            filterBrooklyn: true,
            filterTribeca: true,
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
                text: ""
            }
        }
    }



    openAlert(title, text) {
        this.setState({
            open: !this.state.open,
            alert: {
                title: title,
                text: text
            }
        });
    }

    closeAlert() {
        this.setState({
            open: false
        })
        console.log("closing alert");
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
        this.runJquery();
        this.addHolidays();
        this.addOwnedDays();

    }

    addHolidays() {
        var holidays = global.allEvents.metaData.holidays;
        for (var i = 0 ; i < Object.keys(holidays).length; i++) {
            console.log(holidays[i].month, holidays[i].day);
            var thisHoliday = $('.day:has(> [data-month="' + holidays[i].month + '"][data-daynum="' + holidays[i].day + '"])');
            var thisHolidayRow = thisHoliday.css("grid-row");
            var thisHolidayCol = thisHoliday.css("grid-column");
            thisHoliday.addClass("day-under-overlay");
            var monthGrid = $('#calendar_' + holidays[i].month);
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

                            this.printOwnedDay(multiDays[k],"RESERVED",allEvents[j].name+" ("+(k+1)+" of "+multiDays.length+")");

                        }


                    } else {
                        this.printOwnedDay(thisDayFullString,"RESERVED",allEvents[j].name);
                    }

                    continue;
                }

            }


        }

    }
    printOwnedDay(thisDayFullString,title,subTitle) {
        var thisDayString = thisDayFullString.split("-");
        var thisMonth = this.getMonthName(thisDayString[0]);
        console.log(thisMonth, thisDayString[1]);
        var thisDay = $('.day:has(> [data-month="' + thisMonth + '"][data-daynum="' + thisDayString[1] + '"])');
        var thisDayRow = thisDay.css("grid-row");
        var thisDayCol = thisDay.css("grid-column");
        thisDay.addClass("day-under-overlay");
        var monthGrid = $('#calendar_' + thisMonth);
        monthGrid.append(
            "<div class='overlay owned-day' style='grid-row:" + thisDayRow + ";grid-column: " + thisDayCol + "; transform: rotateZ(" + (Math.floor(Math.random() * 8) - 4) + "deg)'>" +
            "<div class='title'>" + title +
            "</div><div class='sub-title'>"+subTitle+"</div></div>"
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
                }
            }


        } else {
            $(".filter-age")
                .css("display","flex");
        }

    };

    changeLocation = ({ target }) => {

        if (target.hasAttribute("data-location")) {
            this.setState(
                {
                    currentLocation: $(target).attr("data-location")
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
        if (global.isUpdating=true) this.runJquery();
    }

    runJquery() {
        global.isUpdating=true;
        console.log("jquery");
        $('div:has(> #no-day)').addClass('no-day');
        $('div:has(> .close-me)').addClass('closed');
        this.addOwnedDays();
        var myThis = this;
        $('.selectable')
            .click(function () {
                //console.log("clicked");
                myThis.setState(
                    {
                        selectedEvent: $(this),
                        selectedEventName: $(this).attr("data-name"),
                        selectedEventPrice: $(this).attr("data-price"),
                        selectedEventType: $(this).attr("data-type"),
                        selectedEventDescription: $(this).attr("data-description"),
                        selectedEventID: $(this).attr("data-id"),
                        selectedEventAges: $(this).attr("data-ages"),
                        selectedEventLocation: $(this).attr("data-location"),
                        selectedEventColor: $(this).css("background-color")
                    }
                );
                var myColor;
                $(this).is(".drop-in-color,.special-color,.camp-color,.series-color") ?
                    myColor = $(this).css("background-color") : myColor = $(this).parent(".drop-in-color,.special-color,.camp-color,.series-color").css("background-color");
                console.log("color: " + $(this).is(".drop-in-color,.special-color,.camp-color,.series-color"));

                $(".bx--modal-container").css("border-color", myColor);
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

        $('.change-age-btn').hover(function () {
            $('.change-age-btn > .filtering-hover-text').css("color","blue");
        }, function () {
            $('.change-age-btn > .filtering-hover-text').css("color","#333");
        });

        $('.change-location-btn').hover(function () {
            $('.change-location-btn > .filtering-hover-text').css("color","blue");
        }, function () {
            $('.change-location-btn > .filtering-hover-text').css("color","#333");
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

                    <MyModal ref={this.state.selectedEvent}
                             modalid="myspecialmodal"
                             title={this.state.selectedEventName}
                             description={this.state.selectedEventDescription}
                             type={this.state.selectedEventType}
                             eventId={this.state.selectedEventID}
                             location={this.state.selectedEventLocation}
                             ages={this.state.selectedEventAges}
                             price = {this.state.selectedEventPrice}
                             color = {this.state.selectedEventColor}
                    />
                    <h1 className="heading">
                    <div className="filtering-header">

                        <div className="change-age-btn" onClick={this.changeAge}>
                            <div className="text-right"><span class="def-no-hover">Showing events for </span><span className="editable-heading">{this.state.currentAgeGroup}</span></div>
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

                    <AlertDialog open={this.state.open} onClose={this.closeAlert} title={this.state.alert.title} text={this.state.alert.text}/>
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
                           myApp = {this}
                    />
                    <Month name="October" numDays="31" skipDays="0"
                           filterDropIn={this.state.filterDropIn}
                           filterSpecial={this.state.filterSpecial}
                           filterSeries={this.state.filterSeries}
                           filterCamp={this.state.filterCamp}
                           myApp = {this}
                    />
                    <Month name="November" numDays="30" skipDays="3"
                           filterDropIn={this.state.filterDropIn}
                           filterSpecial={this.state.filterSpecial}
                           filterSeries={this.state.filterSeries}
                           filterCamp={this.state.filterCamp}
                           myApp = {this}
                    />
                    <Month name="December" numDays="31" skipDays="5"
                           filterDropIn={this.state.filterDropIn}
                           filterSpecial={this.state.filterSpecial}
                           filterSeries={this.state.filterSeries}
                           filterCamp={this.state.filterCamp}
                           myApp = {this}
                    />

                    </StickyContainer>


                </div>

            </div>
        );
    };

}

export default App;
