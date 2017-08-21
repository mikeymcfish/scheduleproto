import React, {Component} from 'react';

import './webflow.css';
import './App.css';
import './Span-styles.css';
import $ from 'jquery';
import Day from './Day';
import Month from './Month';
import Week from './Week';
import CheckIcon from './icons/CheckIcon';
import { Modal } from 'carbon-components';
import './carbon-components.css';
import MyModal from './Modal';
import { StickyContainer, Sticky } from 'react-sticky';
import AlertDialog from "./AlertDialog";
import Button from 'material-ui/Button';
import TopLinks from "./TopLinks";
import ViewDay from "./ViewDay";
import ReactTooltip from 'react-tooltip'
import seriesJSON from "./series.json";
import BigDay from "./BigDay";
import Moment from "moment";
import './AltViews.css';
import Divider from 'material-ui/Divider';

class App extends Component {


    constructor() {
        super();

        this.toggleSeries = this.toggleSeries.bind(this);
        this.toggleProSeries = this.toggleProSeries.bind(this);
        this.toggleDropin = this.toggleDropin.bind(this);
        this.toggleCamp = this.toggleCamp.bind(this);
        this.toggleSpecial = this.toggleSpecial.bind(this);
        this.changeAge = this.changeAge.bind(this);
        this.changeLocation = this.changeLocation.bind(this);
        this.changeView = this.changeView.bind(this);
        this.openAlert = this.openAlert.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.testLogIn = this.testLogIn.bind(this);
        this.openFullDay = this.openFullDay.bind(this);
        this.closeFullDay = this.closeFullDay.bind(this);
        this.setViewDay = this.setViewDay.bind(this);
        this.addASeriesOverlay = this.addASeriesOverlay.bind(this);
        this.addToCart = this.addToCart.bind(this);

        this.state = {
            filterDropIn: false,
            filterSpecial: false,
            filterSeries: false,
            filterProSeries: false,
            filterParties: true,
            filterCamp: false,
            filter7to9: false,
            filter9to11: true,
            filter12to14: true,
            eventFilter: "events",
            filterLocation: "Brooklyn",
            currentLocation: "Brooklyn",
            currentAgeGroup: "age 7 to 9",
            currentView: "week",
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
            },
            viewingDay: "none",
            viewingDayEvents: [],
            highlightedDays: "",
            currentSelectedMembersAge: 0,
            isJSONloaded : false,
            seriesDiscount : 0,
            proSeriesDiscount : 0,
            dropInDiscount : 0,
            miniCampDiscount : 0,


        }

        global.allEvents = seriesJSON;
        //TODO 'DAYSTRING' for all
        this.parseDateListToString(global.allEvents);
        global.eventsByDay = this.convertEventsToByDay(global.allEvents.events);

        var that = this;

        $.getJSON('/api/data.json', function(data){
            global.allEvents = data;
            //TODO 'DAYSTRING' for all
            that.parseDateListToString(global.allEvents);
            global.eventsByDay = that.convertEventsToByDay(global.allEvents.events);
            that.setState(
                {
                    isJSONloaded:true
                }
            );
            that.addHolidays();
            that.addOwnedDays();
        });
        $.getJSON('/api/member-info.json', function(data){
            that.setState(
                {
                    members:data.members
                }
            );
            //TEMP SHOW BUTTON.
            $(".member-log-in").show();

            //NON TEMP, RUN LOGIN FUNCTION.
            //that.logInMember();

        });
    }

    clearCalendar() {
        console.log("$$ clearing overlays");
        $(".overlay")
            .not(".holiday")
            .not(".birthday")
            .not(".in-cart")
            .remove();

        $(".highlighted").removeClass("highlighted");

        $(".in-cart,.owned,.series-list").removeClass(".day-under-overlay");
    }

    addASeriesOverlay = (thisDayFullString) => {
        //first remove all overlays

        var allDays = thisDayFullString.split(",");

        console.log("*** adding overlay " + thisDayFullString);

        this.clearCalendar();

        for (var i=0; i<allDays.length; i++) {

            var thisDayString = allDays[i].split("-");
            var thisMonth = this.getMonthName(thisDayString[0]);
            console.log(thisMonth, thisDayString[1]);
            var thisDay = $('.day:has(> [data-month="' + thisMonth + '"][data-daynum="' + thisDayString[1] + '"])');
            var thisDayRow = thisDay.css("grid-row-start");
            var thisDayCol = thisDay.css("grid-column-start");
            thisDay.addClass("day-under-overlay series-list");
            var monthGrid = $('#year-calendar_' + thisMonth);
            monthGrid.append(
                "<div class='overlay' style='grid-row:" + thisDayRow + ";grid-column: " + thisDayCol + ";'>" +
                    "<div class='big-num'>" + (i+1) +
                "</div></div>"
            );

        }

        var firstDay = this.getFirstDayFromFullString(thisDayFullString);
        this.scrollViewToCalendarDay(firstDay);


    }

    addToCart = (event) => {

        this.addInCart(event.id);
        this.sendToCartAPI(event);

    }

    async sendToCartAPI (event) {

        $.get('/api/v1/scheduler/add_to_cart?product_id='+event.id);
        try {
            let response = await $.get('/api/v1/scheduler/add_to_cart?product_id='+event.id);
            //let responseJson = await response.json();
            window.getUpdatedCart();
            // return responseJson.movies;
        } catch(error) {
            console.error(error);
        }


        // try {
        //     let response = await fetch('/api/v1/scheduler/add_to_cart?product_id='+event.id);
        //     let responseJson = await response();
        //     // return response;
        // } catch(error) {
        //     console.error(error);
        // }
    }

    convertEventsToByDay(events) {

        var daysOfEvents= {};

        for (var i = 0; i < Object.keys(events).length; i++) {

            var event = events[i];

            for (var month in event.days) {

                for (var day in month) {

                    daysOfEvents[month] ?
                        daysOfEvents[month] = daysOfEvents[month]
                        : daysOfEvents[month] = new Array(31);
                    daysOfEvents[month][event.days[month][day]] ?
                        daysOfEvents[month][event.days[month][day]] = daysOfEvents[month][event.days[month][day]]
                        : daysOfEvents[month][event.days[month][day]] = [];
                    daysOfEvents[month][event.days[month][day]].push(event);
                }

            }


        }
        return daysOfEvents;

    }

    updateDayEvents() {

    }

    componentDidMount() {
        // $("#calendar").append("<div class='spanner span-monday-friday camp-color camp-span-week-2 selectable'>" +
        //     "<div class='spanner-copy'> Spring Break Camp</div></div>");
        $("#calendar").css('display', 'none');
        $("#calendar").css('display', 'grid');

        $('body').click(function () {
            $(".filter-location").css("display","none");
            $(".filter-age").css("display","none");
            $(".filter-view").css("display","none");
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
        $('.change-view-btn').unbind("hover");
        $('.change-view-btn').hover(function () {
            $('.change-view-btn > .filtering-hover-text').css("color","blue");
        }, function () {
            $('.change-view-btn > .filtering-hover-text').css("color","#333");
        });
        var _this = this;
        $('.day').not(".closed").not(".no-day").unbind("click");
        $('.day').not(".closed").not(".no-day")
            .click(function () {
                var child = $(this).find("[data-month!='undefined']");
                _this.clearCalendar();
                $('.highlighted').removeClass("highlighted");
                _this.addASeriesOverlay("");
                $(this).addClass("highlighted");
                _this.setViewDay(child.attr("data-month"),child.attr("data-daynum"));
                _this.scrollView($(this));
                // _this.updateDayEvents();
                // console.log("day click "+ child.attr("data-month"));
            });

        this.runJquery();

        //try and hide


    }

    componentDidUpdate() {
        console.log("did update");
        //this.runJquery();
        ReactTooltip.rebuild();
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

    getDayObject(month, day) {
        var thisDay = $('.day:has(> [data-month="' + month + '"][data-daynum="' + day + '"])');
        return thisDay;
    }

    addMemberBirthday(member) {
        // $('#birthday-overlay').remove();
        // if (!this.state.loggedIn) return;
        // if (!this.state.selectedMemberKey=="") return;
        // var member = this.state.members[this.state.selectedMemberKey];
        var birthday = member.birthday;
        var birthday_array = birthday.split("-");
        var month = this.getMonthName(birthday_array[0]);
        var day = birthday_array[1];
        var year = birthday_array[2];
        var nextAge = parseInt(member.age)+1;
        var dayObj = this.getDayObject(month, day);
        $(".birthday").removeClass("birthday");
        dayObj.addClass("birthday");

        // var firstName = member.name.split(" ")[0];
        // console.log("$$ "+month, day, nextAge);
        // // dayObj.find(".circle").show();
        // this.addOverlay(dayObj,
        //     month,
        //     "birthday",
        //     "white",
        //     firstName + "'s " + nextAge + "th Birthday!",
        //     "");
    }

    testLogIn() {
        //should probably put owned events in these member details.


        this.setState({
            loggedIn:true,
            members:global.allEvents.members,
            currentAgeGroup: "select member"

        });
        // $(".editable-age-group").css("color","rgb(150,150,150");
        // $(".editable-age-group").css("background-color","#333");
        $(".birthday").removeClass("birthday");
        // $(".owned").remove();
        this.addHolidays();
        this.addOwnedDays();
        console.log(this.state.loggedIn);
        // this.setState({
        //     currentAgeGroup: this.state.members[0].name,
        //     ageSelectionOptions: this.state.members
        // });
        this.openAlert("Test Login", "This is a test of the login. You are now fake logged in as a parent with two members. One is 11 with a default location of Brooklyn and one is 8 with a default location of Tribeca.", "OK","i guess",null,null);
     }

    logInMember() {

        this.setState({
            loggedIn: true,
            currentAgeGroup: "select member"
        });
        $(".birthday").removeClass("birthday");
        this.addHolidays();
        this.addOwnedDays();

    }

    toggleSeries() {

        this.clearCalendar();
        this.setState({

            filterSeries: !this.state.filterSeries

        });

    }

    toggleProSeries() {

        this.clearCalendar();
        this.setState({

            filterProSeries: !this.state.filterProSeries

        });

    }

    toggleDropin() {
        // if (!this.state.filterDropIn) {
        this.clearCalendar();
        this.setState({

            filterDropIn:!this.state.filterDropIn

        });

    }

    toggleCamp() {
        this.clearCalendar();
        this.setState({

            filterCamp:!this.state.filterCamp

        });

    }

    toggleSpecial() {
        this.clearCalendar();
        this.setState({

            filterSpecial:!this.state.filterSpecial

        });

    }

    setFilterAgeByAge(age) {

        this.setState({
                currentSelectedMembersAge: age
            });
        this.clearCalendar();
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
        this.clearCalendar();
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

    setMembershipType (type) {

        //
        //
        // Hardcoded discounts
        //
        //
        //

        if (type.toUpperCase()=="CLASSIC") {

            this.setState({
                seriesDiscount : 60,
                proSeriesDiscount : 50,
                dropInDiscount : 10,
                miniCampDiscount : 0.05,

            })

        } else if (type.toUpperCase()=="PREMIUM") {
            this.setState({
                seriesDiscount : 60,
                proSeriesDiscount : 50,
                dropInDiscount : 10,
                miniCampDiscount : 0.1,

            })
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
            //
            // Is it a member?
            //
            for (var member in Object.keys(this.state.members)) {
                if (this.state.members[member].name.split(" ")[0] == $(target).attr("data-age-group")) {
                    this.setState({
                        currentLocation: this.state.members[member].defaultLocation,
                        filterLocation: this.state.members[member].defaultLocation,
                        selectedMemberKey: member
                    });
                    this.setFilterAgeByAge(this.state.members[member].age);
                    this.addMemberBirthday(this.state.members[member]);
                    this.setMembershipType(this.state.members[member].memberType);
                }
            }
            this.setFilterAgeByGroup($(target).attr("data-age-group"));


        } else {
            $(".filter-age")
                .css("display","flex");
        }
        $(".editable-age-group").css("color","inherit");
        $(".editable-age-group").css("background-color","inherit");
        // $('.change-age-btn').unbind("hover");
        // $('.change-age-btn').hover(function () {
        //     $('.change-age-btn > .filtering-hover-text').css("color","blue");
        // }, function () {
        //     $('.change-age-btn > .filtering-hover-text').css("color","#333");
        // });

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

    changeView = ({ target }) => {

        if (target.hasAttribute("data-view")) {
            this.setState(
                {
                    currentView: $(target).attr("data-view")
                })
            $(".filter-view")
                .css("display","none");

        } else {
            $(".filter-view")
                .css("display","flex");
        }

    };

    parseDateListToString(events) {

        for (var i = 0; i < Object.keys(global.allEvents.events).length; i++ ) {


            var newString = "";
            var thisEvent = global.allEvents.events[i];
            var theseDays = thisEvent.days;
            var monthNum="";
            var thisMonth;
            for (var month in theseDays) {
                switch (month) {
                    case "September" :
                        monthNum = "9";
                        thisMonth = theseDays.September;
                        break;
                    case "October" :
                        monthNum = "10";
                        thisMonth = theseDays.October;
                        break;
                    case "November" :
                        monthNum = "11";
                        thisMonth = theseDays.November;
                        break;
                    case "December" :
                        monthNum = "12";
                        thisMonth = theseDays.December;
                        break;
                    case "January" :
                        monthNum = "1";
                        thisMonth = theseDays.January;
                        break;
                    case "February" :
                        monthNum = "2";
                        thisMonth = theseDays.February;
                        break;
                    case "March" :
                        monthNum = "3";
                        thisMonth = theseDays.March;
                        break;
                    case "April" :
                        monthNum = "4";
                        thisMonth = theseDays.April;
                        break;
                    case "May" :
                        monthNum = "5";
                        thisMonth = theseDays.May;
                        break;
                    case "June" :
                        monthNum = "6";
                        thisMonth = theseDays.June;
                        break;
                    case "July" :
                        monthNum = "7";
                        thisMonth = theseDays.July;
                        break;
                    case "August" :
                        monthNum = "8";
                        thisMonth = theseDays.August;
                        break;
                    default:
                        monthNum = "FAIL";
                        thisMonth = theseDays.September;
                }
                for (var j=0; j< thisMonth.length; j++) {
                    if (newString != "") newString+=",";
                    newString+= monthNum + "-" + thisMonth[j];
                }

            }

            thisEvent.daystring = newString;

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

    getFirstDayFromFullString(fullString) {
        var thisDayString = fullString.split(",")[0].split("-");
        var thisMonth = this.getMonthName(thisDayString[0]);
        console.log(thisMonth, thisDayString[1]);
        var thisDay = $('.day:has(> [data-month="' + thisMonth + '"][data-daynum="' + thisDayString[1] + '"])');
        return (thisDay);

    }

    scrollView(element) {

        //find the first event-bar

        var fullstring = element.find(".event-bar").attr("data-days");
        console.log("$$"+fullstring);
        if (fullstring==null) return;
        var firstDay = this.getFirstDayFromFullString(fullstring);
        var t = firstDay.offset().top;
        console.log(t);

        //set this guy to start at the first occurance.
        var td = $("#day-start").offset().top;
        //$("#day-start").css("top",(t-200)+"px");

        //scroll it.
        // $('html, body').animate({
        //     scrollTop: $("#day-start").offset().top
        // }, 250);

        //lets scroll the calendar?

        $('html, body').animate({
                scrollTop: $("#day-start").offset().top
        }, 250);


    }

    async scrollViewToCalendarDay (dayObj) {
        console.log("@@ scrolling");
        $('html, body').animate({
            scrollTop: dayObj.offset().top
        }, 250);
    }

    doesAgeMatchEvent (ageGroup) {
        var myAge = this.state.currentSelectedMembersAge;
        // "age 7 to 9",
        //     "age 9 to 11",
        //     "age 12 to 14"
        if (ageGroup=="age 7 to 9" && 7<=myAge<=9) {
            return true;
        }
        else if (ageGroup=="age 9 to 11" && 9<=myAge<=11) {
            return true;
        }
        else if (ageGroup=="age 12 to 14" && 12<=myAge<=14) {
            return true;
        }
        else if (ageGroup=="age 7 to 14") {
            return true;
        }
        else {
            return false;
        }
    }

    setViewDay(month,day) {

        var thisDaysEvents = [];
        var thisDaysFilteredEvents = [];

        try {
            thisDaysEvents = global.eventsByDay[month][day];
            for (var i=0; i<thisDaysEvents.length; i++ ) {
                console.log("found " + thisDaysEvents.length + " events on the selected day");
                var ageMatched = false;
                if (this.state.loggedIn) {
                    ageMatched = this.doesAgeMatchEvent(thisDaysEvents[i].age) ;
                } else {
                    ageMatched = (thisDaysEvents[i].age.toUpperCase() == this.state.currentAgeGroup.toUpperCase()
                    || thisDaysEvents[i].age.toUpperCase() == "AGE 7 TO 14");
                }
                if (thisDaysEvents[i].location.toUpperCase() == this.state.currentLocation.toUpperCase()
                    && ageMatched) {
                    thisDaysFilteredEvents.push(thisDaysEvents[i]);
                }
            }
            var firstEventDates = thisDaysFilteredEvents[0].daystring;
            var firstDay = this.getFirstDayFromFullString(firstEventDates);


        } catch(e) {

        }

        this.setState({
            viewingDay: month + " " + day,
            viewingDayEvents: thisDaysFilteredEvents

        })


    }

    addOverlay(day,month,addclass,color,title,subtitle) {
        console.log("$$ adding overlay "+addclass+" to",day);
        var thisRow = day.css("grid-row-start");
        var thisCol = day.css("grid-column-start");
        day.addClass("day-under-overlay " +addclass);
        var monthGrid = $('#year-calendar_' + month);
        console.log(day.attr("data-month"));

        monthGrid.append(
            "<div class='overlay "+addclass+"' style='background-color:"+color+";grid-row:"+thisRow+";grid-column: "+thisCol+"'>" +
            "<div class='title'>" + title +
            "</div><div class='sub-title'>" + subtitle +
            "</div>" +
            "</div>"
        );

    }

    addHolidays() {
        console.log("adding holidays");
        var holidays = global.allEvents.metaData.holidays;
        for (var i = 0 ; i < Object.keys(holidays).length; i++) {
            this.addOverlay(
                this.getDayObject(holidays[i].month, holidays[i].day),
                holidays[i].month,
                "holiday",
                holidays[i].backgroundColor,
                holidays[i].title,
                holidays[i].subTitle
            );
        }
        //hardcoded minecon
        this.getDayObject("November",18).addClass("minecon");
        this.getDayObject("October",31).addClass("halloween");

    }

    addOwnedDays() {
        var ownedEvents = [];

        //not a member? they dont own anything
        if (!this.state.members[this.state.selectedMemberKey]) return;

        //remove previous overlays
        // $(".owned-day").remove();
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

                            this.printOwnedDay(multiDays[k],"MINE",allEvents[j].name+" ("+(k+1)+" of "+multiDays.length+")",allEvents[j].type,allEvents[j].startTime);

                        }


                    } else {
                        this.printOwnedDay(thisDayFullString,"MINE",allEvents[j].name,allEvents[j].type,allEvents[j].startTime);
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
        var thisDay = $('.day:has(> [data-month="' + thisMonth + '"][data-daynum="' + thisDayString[1] + '"])');
        this.addOverlay(
            this.getDayObject(
                this.getMonthName(thisDayString[0]),
                thisDayString[1]
            ),
            this.getMonthName(thisDayString[0]),
            "owned",
            "",
            title,
            "",
        );
    }

    addInCart(eventID) {
        var inCart = [];

        //not a member? they dont own anything

        var allEvents = global.allEvents.events;
            for (var j = 0; j < Object.keys(allEvents).length; j++) {
                if (allEvents[j].id == eventID) {
                    //match
                    console.log("match "+allEvents[j].daystring);

                    //check if its more than one day:
                    var thisDayFullString = allEvents[j].daystring;
                    var thisDayString = [];

                    if (thisDayFullString.indexOf(",")>0) {

                        var multiDays = thisDayFullString.split(",");

                        for (var k = 0; k < multiDays.length; k++) {


                            this.printCartedDay(multiDays[k],"IN CART",allEvents[j].name+" ("+(k+1)+" of "+multiDays.length+")",allEvents[j].type,allEvents[j].startTime);

                        }


                    } else {
                        this.printCartedDay(thisDayFullString,"IN CART",allEvents[j].name,allEvents[j].type,allEvents[j].startTime);
                    }
                    $("[data-id='"+allEvents[j].id+"']").hide();

                    continue;
                }

            }


        }

    printCartedDay(thisDayFullString,title,subTitle,type,time) {
        var thisDayString = thisDayFullString.split("-");
        var thisMonth = this.getMonthName(thisDayString[0]);
        var thisDay = $('.day:has(> [data-month="' + thisMonth + '"][data-daynum="' + thisDayString[1] + '"])');
        var rnd = Math.floor(Math.random()*360);
        var rnd2 = (Math.random()/5);
        console.log("$$--"+rnd);
        thisDay.find(".circle")
            .css("transform","scale("+rnd2+","+rnd2+")")
            .css("transform","rotate("+rnd+"deg)")
            .css("display","block");


        //disabled the overlay

        this.addOverlay(
            this.getDayObject(
                this.getMonthName(thisDayString[0]),
                thisDayString[1]
            ),
            this.getMonthName(thisDayString[0]),
            "owned",
            "",
            "CART",
            ""
        );

    }

    getDayTitleString(str) {

        var date = Moment(str, "MMMM D");

        return date.format("dddd, MMMM Do");

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

    getMemberPricing (original, type) {
        var price = parseInt(original);
        console.log("%% original for "+type+ " -" +price );
        if (this.state.loggedIn) {
            if (type.toLowerCase() == "drop-in") {
                price -= this.state.dropInDiscount;
            }
            else if (type.toLowerCase() == "series") {
                price -= this.state.seriesDiscount;
            }
            else if (type.toLowerCase() == "pro-series") {
                price -= this.state.proSeriesDiscount;
            }
            else if (type.toLowerCase() == "mini-camp" || type.toLowerCase() == "special") {
                price *= (1 - this.state.miniCampDiscount);
            }
        }
        console.log("%% discount " + price);
        return price;
    }

    render() {


        var campFilterIcon = this.state.filterCamp ?  "" : <CheckIcon/>;
        var dropInFilterIcon = this.state.filterDropIn ? "" : <CheckIcon/>;
        var seriesFilterIcon = this.state.filterSeries ? "" : <CheckIcon/>;
        var specialFilterIcon = this.state.filterSpecial ? "" : <CheckIcon/>;
        var partiesFilterIcon = "";
        var proSeriesFilterIcon = this.state.filterProSeries ? "" : <CheckIcon/>;

        var listOfAgeSelections = this.state.ageSelectionOptions;
        if (this.state.members.length>0) {
            listOfAgeSelections=[];
            for (var member in Object.keys(this.state.members)) {
                listOfAgeSelections.push(this.state.members[member].name.split(" ")[0]);
            }
        }

        var thisDaysStuff = [];
        return (
            <div className="App">
                <TopLinks onLogin={this.testLogIn}/>
                <div className="full-page-container">
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
                                <div className="text-right"><span className="def-no-hover">Showing events for </span><span className="editable-heading editable-age-group">{this.state.currentAgeGroup}</span></div>
                                <div className="text-right filtering-hover-text">
                                    <div className={this.state.selectedMemberKey!="" ? "member-type" : ""}>
                                        {this.state.selectedMemberKey!="" ? this.state.members[this.state.selectedMemberKey].memberType.toUpperCase(): "click to change"}
                                    </div>
                                </div>
                                <div className="filter-selection-box filter-age">
                                    {/*//ageSelectionOptions*/}
                                    {listOfAgeSelections.map((selection, index) =>
                                        <div className="filter-option set-age-btn" data-age-group={selection}>{selection}</div>
                                    )}
                                </div>
                            </div>
                            <div className="text-center"> in </div>
                            <div className="change-location-btn" onClick={this.changeLocation}>
                                <div className="text-left"><span className="editable-heading">{this.state.currentLocation} </span></div>
                                <div className="text-center filtering-hover-text">
                                    <div>click to change</div>
                                </div>
                                <div className="filter-selection-box filter-location">
                                    <div className="filter-option set-location-btn" data-location="Brooklyn">Brooklyn</div>
                                    <div className="filter-option set-location-btn" data-location="TriBeCa">TriBeCa</div>
                                </div>
                            </div>

                            {/*<div className="change-view-btn space-me-5" onClick={this.changeView}>*/}
                                {/*<div className="text-left"> for the <span className="editable-heading">{this.state.currentView}</span></div>*/}
                                {/*<div className="text-item-center filtering-hover-text">*/}
                                    {/*<div>click to change</div>*/}
                                {/*</div>*/}
                                {/*<div className="filter-selection-box filter-view">*/}
                                    {/*<div className="filter-option set-view-btn" data-view="year">year</div>*/}
                                    {/*<div className="filter-option set-view-btn" data-view="week">week</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        </div>
                        <div className="age-notification">
                            { this.state.selectedMemberKey!="" ?
                                <div className="age-note">NOTE: We're showing you only events for members age {this.state.members[this.state.selectedMemberKey].age}. If this is not {this.state.members[this.state.selectedMemberKey].name}'s correct age <span className="change-birthday">click here</span></div>
                                :
                                ""
                            }
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
                            <div className="filters">
                                <div className="filter-circle-container" onClick={this.toggleSeries}>
                                    <div className="filter-circle-filled series-color">
                                        {seriesFilterIcon}
                                    </div>
                                    <div className="filter-circle-label">
                                        Series
                                    </div>
                                </div>
                                <div className="filter-circle-container">
                                    <div className="filter-circle-filled pro-series-color" onClick={this.toggleProSeries}>
                                        {proSeriesFilterIcon}
                                    </div>
                                    <div className="filter-circle-label">
                                        Pro Series
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
                                        Special events
                                    </div>
                                </div>
                                <div className="filter-circle-container disabled">
                                    <div className="filter-circle-filled parties-color disabled">
                                        {partiesFilterIcon}
                                    </div>
                                    <div className="filter-circle-label disabled">
                                        Parties<br/><span style={{fontSize:"80%"}}>(coming soon)</span>
                                    </div>
                                </div>

                            </div>
                            <div className="page-container">
                                <div className="month-sidebar">
                                    <Month name="September" numDays="30" skipDays="5"
                                           filterDropIn={this.state.filterDropIn}
                                           filterSpecial={this.state.filterSpecial}
                                           filterSeries={this.state.filterSeries}
                                           filterProSeries={this.state.filterProSeries}
                                           filterParties={this.state.filterParties}
                                           filterCamp={this.state.filterCamp}
                                           filterAge7to9={this.state.filter7to9}
                                           filterAge9to11={this.state.filter9to11}
                                           filterAge12to14={this.state.filter12to14}
                                           filterLocation={this.state.filterLocation}
                                           events = {global.eventsByDay["September"]}
                                    />
                                    <Month name="October" numDays="31" skipDays="0"
                                           filterDropIn={this.state.filterDropIn}
                                           filterSpecial={this.state.filterSpecial}
                                           filterSeries={this.state.filterSeries}
                                           filterProSeries={this.state.filterProSeries}
                                           filterParties={this.state.filterParties}
                                           filterCamp={this.state.filterCamp}
                                           filterAge7to9={this.state.filter7to9}
                                           filterAge9to11={this.state.filter9to11}
                                           filterAge12to14={this.state.filter12to14}
                                           filterLocation={this.state.filterLocation}
                                           events = {global.eventsByDay["October"]}
                                    />
                                    <Month name="November" numDays="30" skipDays="3"
                                           filterDropIn={this.state.filterDropIn}
                                           filterSpecial={this.state.filterSpecial}
                                           filterSeries={this.state.filterSeries}
                                           filterProSeries={this.state.filterProSeries}
                                           filterParties={this.state.filterParties}
                                           filterCamp={this.state.filterCamp}
                                           filterAge7to9={this.state.filter7to9}
                                           filterAge9to11={this.state.filter9to11}
                                           filterAge12to14={this.state.filter12to14}
                                           filterLocation={this.state.filterLocation}
                                           events = {global.eventsByDay["November"]}
                                    />
                                    <Month name="December" numDays="31" skipDays="5"
                                           filterDropIn={this.state.filterDropIn}
                                           filterSpecial={this.state.filterSpecial}
                                           filterSeries={this.state.filterSeries}
                                           filterProSeries={this.state.filterProSeries}
                                           filterParties={this.state.filterParties}
                                           filterCamp={this.state.filterCamp}
                                           filterAge7to9={this.state.filter7to9}
                                           filterAge9to11={this.state.filter9to11}
                                           filterAge12to14={this.state.filter12to14}
                                           filterLocation={this.state.filterLocation}
                                           events = {global.eventsByDay["December"]}
                                           />
                                    <Month name="January" numDays="31" skipDays="1"
                                           filterDropIn={this.state.filterDropIn}
                                           filterSpecial={this.state.filterSpecial}
                                           filterSeries={this.state.filterSeries}
                                           filterProSeries={this.state.filterProSeries}
                                           filterParties={this.state.filterParties}
                                           filterCamp={this.state.filterCamp}
                                           filterAge7to9={this.state.filter7to9}
                                           filterAge9to11={this.state.filter9to11}
                                           filterAge12to14={this.state.filter12to14}
                                           filterLocation={this.state.filterLocation}
                                           events = {global.eventsByDay["January"]}
                                    />
                                    <Month name="February" numDays="28" skipDays="4"
                                           filterDropIn={this.state.filterDropIn}
                                           filterSpecial={this.state.filterSpecial}
                                           filterSeries={this.state.filterSeries}
                                           filterProSeries={this.state.filterProSeries}
                                           filterParties={this.state.filterParties}
                                           filterCamp={this.state.filterCamp}
                                           filterAge7to9={this.state.filter7to9}
                                           filterAge9to11={this.state.filter9to11}
                                           filterAge12to14={this.state.filter12to14}
                                           filterLocation={this.state.filterLocation}
                                           events = {global.eventsByDay["February"]}
                                    />
                                    <Month name="March" numDays="31" skipDays="4"
                                           filterDropIn={this.state.filterDropIn}
                                           filterSpecial={this.state.filterSpecial}
                                           filterSeries={this.state.filterSeries}
                                           filterProSeries={this.state.filterProSeries}
                                           filterParties={this.state.filterParties}
                                           filterCamp={this.state.filterCamp}
                                           filterAge7to9={this.state.filter7to9}
                                           filterAge9to11={this.state.filter9to11}
                                           filterAge12to14={this.state.filter12to14}
                                           filterLocation={this.state.filterLocation}
                                           events = {global.eventsByDay["March"]}
                                    />
                                    <Month name="April" numDays="30" skipDays="0"
                                           filterDropIn={this.state.filterDropIn}
                                           filterSpecial={this.state.filterSpecial}
                                           filterSeries={this.state.filterSeries}
                                           filterProSeries={this.state.filterProSeries}
                                           filterParties={this.state.filterParties}
                                           filterCamp={this.state.filterCamp}
                                           filterAge7to9={this.state.filter7to9}
                                           filterAge9to11={this.state.filter9to11}
                                           filterAge12to14={this.state.filter12to14}
                                           filterLocation={this.state.filterLocation}
                                           events = {global.eventsByDay["April"]}
                                    />
                                    <Month name="May" numDays="31" skipDays="2"
                                           filterDropIn={this.state.filterDropIn}
                                           filterSpecial={this.state.filterSpecial}
                                           filterSeries={this.state.filterSeries}
                                           filterProSeries={this.state.filterProSeries}
                                           filterParties={this.state.filterParties}
                                           filterCamp={this.state.filterCamp}
                                           filterAge7to9={this.state.filter7to9}
                                           filterAge9to11={this.state.filter9to11}
                                           filterAge12to14={this.state.filter12to14}
                                           filterLocation={this.state.filterLocation}
                                           events = {global.eventsByDay["May"]}
                                    />
                                    <Month name="June" numDays="30" skipDays="5"
                                           filterDropIn={this.state.filterDropIn}
                                           filterSpecial={this.state.filterSpecial}
                                           filterSeries={this.state.filterSeries}
                                           filterProSeries={this.state.filterProSeries}
                                           filterParties={this.state.filterParties}
                                           filterCamp={this.state.filterCamp}
                                           filterAge7to9={this.state.filter7to9}
                                           filterAge9to11={this.state.filter9to11}
                                           filterAge12to14={this.state.filter12to14}
                                           filterLocation={this.state.filterLocation}
                                           events = {global.eventsByDay["June"]}
                                    />

                                </div>
                                <div className="day-sidebar" id="day-start">

                                    <div className="big-day-title">
                                        {this.state.viewingDay=="none" ?

                                            "Select a day on the left to view all of Pixel's offerings for that day."

                                            :

                                            this.getDayTitleString(this.state.viewingDay)

                                        }
                                    </div>
                                    <div className="big-day-container">

                                        {this.state.viewingDayEvents.map((event, index) =>

                                            <BigDay
                                                title = {event.name}
                                                tags={
                                                    [
                                                        {text: "Code", tagType:"red"},
                                                        {text: "Fun", tagType:"blue"},
                                                        {text: "Magic", tagType:"green"}
                                                    ]
                                                }
                                                copy = {event.description}
                                                ages = {event.age}
                                                dates = {event.daystring}
                                                time = {event.startTime}
                                                price = {this.getMemberPricing(event.price, event.type)}
                                                spotsLeft = {event.spotsLeft}
                                                eventObj = {event}
                                                type = {event.type}
                                                addOverlay = {this.addASeriesOverlay}
                                                addToCart = {this.addToCart}

                                            />

                                        )}

                                    </div>

                                </div>
                            </div>

                        </StickyContainer>
                        <ReactTooltip class='tip-class' delayHide={100} place="right" type="dark" effect="solid"/>


                    </div>
                    <div className="cart-placeholder">
                    </div>
                </div>
            </div>
        );
    };

}

export default App;
