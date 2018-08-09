import React, {Component} from 'react';

import './webflow.css';
import './App.css';
import './Span-styles.css';
import styles from './tracks-2.css';
import $ from 'jquery';
import Month from './Month';
import CheckIcon from './icons/CheckIcon';
import './carbon-components.css';
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
import MDSpinner from "react-md-spinner";
import './garland.css';
import './creeper.css';
import default_data from './json/data.json';


import Track from './Track';

import ListView from './calendar/list';

import isLive from "./isLive.js";
import TrackSelection from "./TrackSelection";


// TODO
// - look through all series (only get after # xxx)
// - filter by age

class App extends Component {

    constructor() {



        super();

        console.log("I am live? " + isLive);

        this.toggleSeries = this.toggleSeries.bind(this);
        this.toggleProSeries = this.toggleProSeries.bind(this);
        this.toggleDropin = this.toggleDropin.bind(this);
        this.toggleCamp = this.toggleCamp.bind(this);
        this.toggleSpecial = this.toggleSpecial.bind(this);
        this.changeAge = this.changeAge.bind(this);
        this.changeLocation = this.changeLocation.bind(this);
        this.changeDayOfWeek = this.changeDayOfWeek.bind(this);
        this.changeView = this.changeView.bind(this);
        this.openAlert = this.openAlert.bind(this);
        this.confirmAddToCart = this.confirmAddToCart.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.openFullDay = this.openFullDay.bind(this);
        this.closeFullDay = this.closeFullDay.bind(this);
        // this.setViewDay = this.setViewDay.bind(this);
        this.addASeriesOverlay = this.addASeriesOverlay.bind(this);
        this.hideSeriesOverlays = this.hideSeriesOverlays.bind(this);
        this.addToCart = this.addToCart.bind(this);

        this.listEvents = [];

        this.state = {
            filterDropIn: true,
            filterSpecial: false,
            filterSeries: false,
            filterProSeries: true,
            filterParties: true,
            filterCamp: false,
            filter7to9: false,
            filter9to11: true,
            filter12to14: true,
            filterAllAges: true,
            filterDayOfWeek: "Mondays",
            eventFilter: "events",
            filterLocation: "Brooklyn",
            currentLocation: "Brooklyn",
            currentAgeGroup: "age 7 to 9",
            currentView: "week",
            currentDayOfWeek: "Mondays",
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
                event: {},
                callback: null
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
            isJSONloaded: false,
            seriesDiscount: 0,
            proSeriesDiscount: 0,
            dropInDiscount: 0,
            miniCampDiscount: 0,
            cart: [],
            loggedInUserID: 0,
            pickups: {},
            warnedAboutPro: false,
            highlights: {
                roblox: {
                    fall: false,
                    winter: false,
                    spring: false
                },
                minecraft: {
                    fall: false,
                    winter: false,
                    spring: false
                }
            }

        }

        //global.allEvents = seriesJSON;
        //TODO 'DAYSTRING' for all
        //this.parseDateListToString(global.allEvents);
        //global.eventsByDay = this.convertEventsToByDay(global.allEvents.events);

        var that = this;



        /*

        1. Make sure no dummy data needed
        2. Call auth -
        2. If authed user, get member data then get all data
        3. If not, get all data
        4. Wait for all data to finish and then populate the page.


         */

        $.getJSON('api/v1/scheduler/auth'+(!isLive? ".json" : ""), function (data) {
            console.log("received auth user: " + data.user_id + " with access token: " + data.access_token);
            if (data.user_id>=0) {

                that.getMemberInfoFromAPI(data.user_id, data.access_token);
                that.setState({
                    loggedInUserID:data.user_id
                })
            } else {
                that.loadScheduleData();
                that.getCartCall();

            }

        });

    }

    loadScheduleData() {
        var _this = this;
        try {
            global.allEvents = sessionStorage.getItem('all_events');
            global.eventsByDay = sessionStorage.getItem('events_by_day');
            console.log("trying to use session data");
            this.allDataLoaded();
        } catch (e) {
            console.log("falling back on new data");
            if (isLive) {
                $.getJSON('api/v1/scheduler/all' + (!isLive ? ".json" : ""), function (data) {
                    global.allEvents = data;
                    //TODO 'DAYSTRING' for all
                    _this.parseDateListToString(global.allEvents);

                    //async
                    _this.convertEventsToByDay(global.allEvents.events);
                    _this.allDataLoaded();
                    sessionStorage.setItem('all_events', global.allEvents);
                    sessionStorage.setItem('events_by_day', global.eventsByDay);

                    // // _this.addHolidays();
                    //
                    // if (_this.state.loggedInUserID != 0) {
                    //     _this.logInMember("0");
                    // }

                });
            } else {
                    console.log("JSON - using default data");

                    global.allEvents = default_data;
                    _this.parseDateListToString(global.allEvents);
                    //async
                    _this.convertEventsToByDay(global.allEvents.events);
                    _this.allDataLoaded();
                    sessionStorage.setItem('all_events', global.allEvents);
                    sessionStorage.setItem('events_by_day', global.eventsByDay);


            }

        }
    }

    getMemberInfoFromAPI(userID, access_token) {
        var _this = this;
        if (isLive) {
            console.log("loading live member data");
            $.getJSON('api/v1/scheduler/members?user_id=' + userID+"&access_token="+access_token, function (data) {
                _this.setState(
                    {
                        members: data.members
                    }
                );
                //log in the first member
                _this.getCartCall();
                _this.loadScheduleData();
            });

        }
        else {

            //member test:

            console.log("loading test member data");
            $.getJSON('./api/v1/scheduler/members.json', function (data) {
                _this.setState(
                    {
                        // members: data.members
                    }
                );
                //TEMP SHOW BUTTON.
                _this.getCartCall();
                _this.loadScheduleData();

            });
        }
    }

    checkProSeriesForPreReqs (event) {
        //check for owning a makerspace or a series on the same day.
        /*
        0. confirm it's a pro-series
        1. get day of Pro series
        2. check all other events on that day to see if either
           a. in cart or
           b. owned

       if yes, reply true
       else reply false.
       */

        if (event.type != "pro-series" || this.state.warnedAboutPro==true) return true;
        var dayObj = this.getFirstDayFromFullString(event.daystring);
        var month = dayObj.find("[data-month]").attr("data-month");
        var day = dayObj.find("[data-daynum]").attr("data-daynum");
        console.log(dayObj, month, day);
        var allEventsOnThisDay = global.eventsByDay[month][day];
        for (var i = 0; i < allEventsOnThisDay.length; i++) {
            if (allEventsOnThisDay[i].type == "series") {

            // if (allEventsOnThisDay[i].type == "series" || allEventsOnThisDay[i].type == "drop-in") {
                console.log("!!! found a matching event");

                var willCheckForDoesOwn = [];
                this.state.selectedMemberKey!="" ? willCheckForDoesOwn = this.state.members[this.state.selectedMemberKey].ownedEvents : willCheckForDoesOwn = [];
                if (willCheckForDoesOwn.indexOf(allEventsOnThisDay[i].id)>=0) return true;
                if (this.state.cart.indexOf(allEventsOnThisDay[i].id)>=0) return true;
            }
        }


        this.openAlert(
            "You're adding a PRO series!",
            "Pro series are our newest workshops featureing" +
            "cutting-edge technology topics and small group size. Please keep in mind that " +
            "PRO series start at 5:45 p.m. Members that are not also scheduled for " +
            "early afternoon progamming (such as Makerspace or a 4 p.m. series) " +
            "should arrive no earlier than 5:30 p.m. If you want "+this.getLoggedInMember(true)+ " to " +
            "take advantage of school walk-over or to arrive and use Pixel technology before 5:30 p.m. " +
            "then you should also add an earlier series or makerspace to "+this.getLoggedInMember(true)+ "'s day.",
            null,
            "I UNDERSTAND",
            event
        );
        this.setState({
            warnedAboutPro : true
        });
        return false;

    }

    confirmAddToCart(event) {
        this.addInCart(event);
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

    isMemberLoggedIn() {
        return this.state.selectedMemberKey!="";
    }

    getLoggedInMember(firstNameOnly = false){
        if (!this.isMemberLoggedIn()) return null;
        if (firstNameOnly) return (this.state.members[this.state.selectedMemberKey].name.split(" ")[0]);
        return this.state.members[this.state.selectedMemberKey];
    }

    isSchoolAvail(school, location) {

        var avail_days = [];
        var pickups;
        // if (location == 'undefined') return [];
        console.log("location: "+location, "current: "+ this.state.currentLocation);
        if (location =="Brooklyn") {
            pickups = this.state.pickups.Brooklyn;
        } else {
            pickups = this.state.pickups.TriBeCa;
        }
        console.log("!! looking for days for "+school+" location " +location);
        if (pickups.mon.indexOf(school)>=0) avail_days.push("mon");
        if (pickups.tue.indexOf(school)>=0) avail_days.push("tue");
        if (pickups.wed.indexOf(school)>=0) avail_days.push("wed");
        if (pickups.thu.indexOf(school)>=0) avail_days.push("thu");
        if (pickups.fri.indexOf(school)>=0) avail_days.push("fri");
        return avail_days;
    }

    highlightAllPickUpDays(school, location) {
        console.log("about to check for days for location " + location);
        var pickupdays = this.isSchoolAvail(school, location);
        console.log("!! highlighting days for school "+school+". " +pickupdays);

        $(".day").removeClass("pick-up-available");

        if (pickupdays.indexOf("mon")>=0) {
            $(".day:not(.closed):not(.no-day)").each(function() {
                if ($(this).css("grid-column-start")== "2 col")
                    $(this).addClass("pick-up-available");
            });
        }
        if (pickupdays.indexOf("tue")>=0) {
            $(".day:not(.closed):not(.no-day)").each(function() {
                if ($(this).css("grid-column-start")== "3 col")
                    $(this).addClass("pick-up-available");
            });
        }
        if (pickupdays.indexOf("wed")>=0) {
            $(".day:not(.closed):not(.no-day)").each(function() {
                if ($(this).css("grid-column-start")== "4 col")
                    $(this).addClass("pick-up-available");
            });
        }
        if (pickupdays.indexOf("thu")>=0) {
            $(".day:not(.closed):not(.no-day)").each(function() {
                if ($(this).css("grid-column-start")== "5 col")
                    $(this).addClass("pick-up-available");
            });
        }
        if (pickupdays.indexOf("fri")>=0) {
            $(".day:not(.closed):not(.no-day)").each(function() {
                if ($(this).css("grid-column-start")== "6 col")
                    $(this).addClass("pick-up-available");
            });
        }

    }

    hideSeriesOverlays = () => {
        this.clearCalendar();
    }

    addASeriesOverlay = (thisDayFullString) => {
        //first remove all overlays

        var allDays = thisDayFullString.split(",");

        console.log("*** adding overlay " + thisDayFullString);

        this.clearCalendar();

        for (var i = 0; i < allDays.length; i++) {

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
                "<div class='big-num'>" + (i + 1) +
                "</div></div>"
            );

        }

        var firstDay = this.getFirstDayFromFullString(thisDayFullString);
        //this.scrollViewToCalendarDay(firstDay);

    }

    addToCart = (event) => {

        //check if OK


        if (!isLive) this.addInCart(event.id);
        this.clearCalendar();

        //add to hq
        this.sendToCartAPI(event);

    }

    rebuildCart(data) {
        console.log("rebuilding cart with "+data);
        try {
            if (data.length > 0) {
                this.setState({
                    cart: data
                });

                data.forEach((val, index) => {
                    this.addInCart(val);
                });

            }

        } catch (e) {
            console.log("problem updating cart.")
        }
    }

    async getCartCall() {

        var _this = this;
        try {
            $.getJSON('api/v1/scheduler/cart', function (data) {
                //let responseJson = await response.json();
                _this.rebuildCart(data);
            });
        } catch (error) {
            console.error(error);
        }
    }

    async sendToCartAPI(event) {

        var _this = this;
        try {
            // let response = await $.get('/api/v1/scheduler/add_to_cart?product_id=' + event.id +"&member_id=" +
            //     this.state.members[this.state.selectedMemberKey].id
            // );
            $.getJSON(
                '/api/v1/scheduler/add_to_cart?product_id=' + event.id +"&member_id=" +
                _this.state.members[this.state.selectedMemberKey].id
                , function (data) {
                //let responseJson = await response.json();
                _this.rebuildCart(data.cart);
                window.getUpdatedCart();
            });
            ///// update my cart with response.json.

            // this.getCartCall();
            // return responseJson.movies;
        } catch (error) {
            $.getJSON(
            '/api/v1/scheduler/add_to_cart?product_id=' + event.id,
                function (data) {
                //let responseJson = await response.json();
                _this.rebuildCart(data.cart);
                window.getUpdatedCart();
            });

        } finally  {
            console.log("api call did nothing.");
        }

        // try {
        //     let response = await fetch('/api/v1/scheduler/add_to_cart?product_id='+event.id);
        //     let responseJson = await response();
        //     // return response;
        // } catch(error) {
        //     console.error(error);
        // }
    }

    async convertEventsToByDay(events) {

        //this should update a progess bar to be good.

        console.log("converting all events...")
        var daysOfEvents = {};

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
        global.eventsByDay = daysOfEvents;
        await this.setState(
            {
                isJSONloaded: true
            }
        );

        console.log("done.");
    }

    allDataLoaded() {

        this.setState({
            pickups: global.allEvents.metaData.pickUpDays
        });
        if (this.state.loggedInUserID != 0) {
            this.logInMember("0");
        }
        this.getCartCall();
        $('body').click(function (event) {
            $(".filter-location").css("display", "none");
            $(".filter-age").css("display", "none");
            $(".filter-view").css("display", "none");

            if (!$(event.target).closest('.month-sidebar').length && !$(event.target).closest('.big-day').length) {
                _this.clearCalendar();
                // _this.setState({
                //     viewingDay: "none",
                //     viewingDayEvents: [],
                // });
            }
        });
        $('.change-age-btn').unbind("hover");
        $('.change-age-btn').hover(function () {
            $('.change-age-btn > .filtering-hover-text').css("color", "blue");
        }, function () {
            $('.change-age-btn > .filtering-hover-text').css("color", "#333");
        });
        $('.change-location-btn').unbind("hover");
        $('.change-location-btn').hover(function () {
            $('.change-location-btn > .filtering-hover-text').css("color", "blue");
        }, function () {
            $('.change-location-btn > .filtering-hover-text').css("color", "#333");
        });
        $('.change-day-of-week-btn').unbind("hover");
        $('.change-day-of-week-btn').hover(function () {
            $('.change-day-of-week-btn > .filtering-hover-text').css("color", "blue");
        }, function () {
            $('.change-day-of-week-btn> .filtering-hover-text').css("color", "#333");
        });
        $('.change-view-btn').unbind("hover");
        $('.change-view-btn').hover(function () {
            $('.change-view-btn > .filtering-hover-text').css("color", "blue");
        }, function () {
            $('.change-view-btn > .filtering-hover-text').css("color", "#333");
        });
        var _this = this;
        $('.day').not(".closed").not(".no-day").unbind("click");
        $('.day').not(".closed").not(".no-day")
            .click(function () {
                if ($(this).hasClass('highlighted')) {
                    $(this).removeClass("highlighted");
                    _this.clearCalendar();
                    // _this.setState({
                    //     viewingDay: "none",
                    //     viewingDayEvents: [],
                    // });
                } else {
                    var child = $(this).find("[data-month!='undefined']");
                    _this.clearCalendar();
                    $('.highlighted').removeClass("highlighted");
                    _this.addASeriesOverlay("");
                    $(this).addClass("highlighted");
                    // _this.setViewDay(child.attr("data-month"), child.attr("data-daynum"));
                    _this.scrollView($(this));
                }
            });
        this.addHolidays();
        this.runJquery();
        this.doHardCodedOpenHouses();
        $('.month-sidebar').show();
        this.setTracksToView();
    }

    //YouTube Production

    updateDayEvents() {

    }

    componentDidMount() {
        this.runJquery();
    }

    componentDidUpdate() {
        console.log("component did update, running rebuild of tooltips");
        //this.runJquery();
        ReactTooltip.rebuild();
        //this.runJquery();
        // if (global.isUpdating != true) this.runJquery();
        // this.setTracksToView();

    }

    runJquery() {
        global.isUpdating = true;
        console.log("jquery");
        $('div:has(> #no-day)')
            .addClass('no-day')
            .removeClass('pick-up-available');
        $('div:has(> .close-me)')
            .addClass('closed')
            .removeClass('pick-up-available');
        // this.addOwnedDays();
        var myThis = this;
        $('.view-day').unbind("click");
        global.isUpdating = false;

    }

    getDayObject(month, day) {
        var thisDay = $('.day:has(> [data-month="' + month + '"][data-daynum="' + day + '"])');
        return thisDay;
    }

    addMemberBirthday(member) {

        console.log("adding birthday for " + member.name);

        var birthday = member.birthday;
        var birthday_array = birthday.split("-");

        //TODO
        //Hack, temporary, remove me!
        //This hides birthdays

        if (parseInt(birthday_array[2]) < 9) return;

        var month = this.getMonthName(birthday_array[2]);

        var day = parseInt(birthday_array[1]);
        var year = parseInt(birthday_array[0]);
        var nextAge = parseInt(member.age) + 1;
        var dayObj = this.getDayObject(month, day);
        var firstName = member.name.split(" ")[0];
        $(".birthday").removeClass("birthday");
        dayObj
            .addClass("birthday")
            .attr("data-tip", "It's " + firstName + "'s " + nextAge + "th Birthday! Make it a memorable one with a premium Pixel Academy Birthday Experience!");
        ReactTooltip.rebuild();

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

    refreshOverlays(newLocation) {
        // var firstMember = this.getLoggedInMember();
        // this.highlightAllPickUpDays(firstMember.school, newLocation);
        // this.setState({
        //     viewingDay: "none",
        //     viewingDayEvents: []
        //
        // })

    }

    logInMember(memberKey) {

        console.log("changing member");
        if (this.state.members.length <0 ) {
            console.log("aborting no member list");
            return;
        }
        var firstMember = {};
        var firstKey;

        console.log("logging in the key " + memberKey);
        firstKey = memberKey;
        firstMember = this.state.members[memberKey];

        $(".birthday").removeClass("birthday");

        if (typeof firstMember == 'undefined'){
            console.log("Member for key " + memberKey + " Undefined. Aborting", this.state.members, this.state.members.length);
            return;
        }


        this.setState({
            loggedIn: true,
            currentAgeGroup: firstMember.name.split(" ")[0],
            currentLocation: firstMember.defaultLocation,
            filterLocation: firstMember.defaultLocation,
            selectedMemberKey: firstKey
        });
        this.setFilterAgeByAge(firstMember.age);
        this.setMembershipType(firstMember.memberType);
        this.addOwnedDays(firstMember.ownedEvents);
        this.addMemberBirthday(firstMember);
        this.highlightAllPickUpDays(firstMember.school, firstMember.defaultLocation);

    }

    toggleAllAges = () => {
        this.clearCalendar();
        if (this.state.filterAllAges) {
            this.setState({
                filterAllAges: !this.state.filterAllAges,
                filter7to9: false,
                filter9to11: false,
                filter12to14: false,
            });
        } else {
            this.setState({
                filterAllAges: !this.state.filterAllAges,
                filter7to9: true,
                filter9to11: true,
                filter12to14: true,
            });
            this.setFilterAgeByAge(this.state.members[this.state.selectedMemberKey].age);
        }
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

            filterDropIn: !this.state.filterDropIn

        });

    }

    toggleCamp() {
        this.clearCalendar();
        this.setState({

            filterCamp: !this.state.filterCamp

        });

    }

    toggleSpecial() {
        this.clearCalendar();
        this.setState({

            filterSpecial: !this.state.filterSpecial

        });

    }

    setFilterAgeByAge(age) {

        this.setState({
            currentSelectedMembersAge: age
        });
        this.clearCalendar();
        console.log("setting filter by age " + age);

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
        if (age == 9) {
            this.setState({
                filter7to9: false,
                filter9to11: false,
                filter12to14: true
            })
        }

        this.setTracksToView();

    }

    setFilterAgeByGroup(group) {
        this.clearCalendar();
        console.log("filter age by " + group);
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
        this.setTracksToView();

    }

    setMembershipType(type) {

        //
        //
        // Hardcoded discounts
        //
        //
        //

        if (type.toUpperCase() == "CLASSIC") {

            this.setState({
                seriesDiscount: 60,
                proSeriesDiscount: 50,
                dropInDiscount: 10,
                miniCampDiscount: 0.05,

            })

        } else if (type.toUpperCase() == "PREMIUM") {
            this.setState({
                seriesDiscount: 60,
                proSeriesDiscount: 50,
                dropInDiscount: 10,
                miniCampDiscount: 0.1,

            })
        } else {
            this.setState({
                seriesDiscount: 0,
                proSeriesDiscount: 0,
                dropInDiscount: 0,
                miniCampDiscount: 0,

            })
        }


    }

    changeAge = ({target}) => {

        if (this.state.cart.length > 0) {
            ReactTooltip.rebuild();
            return;
        }

        if (target.hasAttribute("data-age-group")) {

            $(".editable-age-group").css("color", "inherit");
            $(".editable-age-group").css("background-color", "inherit");

            this.setState(
                {
                    currentAgeGroup: $(target).attr("data-age-group")
                });
            $(".filter-age")
                .css("display", "none");
            //
            // Is it a member?
            //
            for (var member in Object.keys(this.state.members)) {
                if (this.state.members[member].name.split(" ")[0].toUpperCase() == $(target).attr("data-age-group").toUpperCase()) {
                    this.logInMember(member);
                    return;
                }
            }
            this.setFilterAgeByGroup($(target).attr("data-age-group"));


        } else {
            $(".filter-age")
                .css("display", "flex");
        }


    };

    changeDayOfWeek = ({target}) => {

        console.log("TRACKS changing day of week BEGIN");
        console.log("TRACKS clicked " + $(target).attr("data-day-of-week"));

        if (this.state.cart.length > 0) {
            ReactTooltip.rebuild();
            return;
        }

        if (target.hasAttribute("data-day-of-week")) {
            this.setState(
                {
                    currentDayOfWeek: $(target).attr("data-day-of-week"),
                    filterDayOfWeek: $(target).attr("data-day-of-week")
                });
            $(".filter-day-of-week")
                .css("display", "none");

            this.refreshOverlays($(target).attr("data-day-of-week"));

        } else {
            $(".filter-day-of-week")
                .css("display", "flex");
        }
        this.clearCalendar();
        console.log("TRACKS day is now " + this.state.filterDayOfWeek);
        console.log("TRACKS changing day of week END");

        this.setTracksToView(null,$(target).attr("data-day-of-week"),null);

    };

    changeLocation = ({target}) => {

        if (this.state.cart.length > 0) {
            ReactTooltip.rebuild();
            return;
        }

        if (target.hasAttribute("data-location")) {
            this.setState(
                {
                    currentLocation: $(target).attr("data-location"),
                    filterLocation: $(target).attr("data-location")
                });
            $(".filter-location")
                .css("display", "none");

            this.refreshOverlays($(target).attr("data-location"));

        } else {
            $(".filter-location")
                .css("display", "flex");
        }
        this.clearCalendar();
        this.setTracksToView(null,null,$(target).attr("data-location"));

    };

    changeView = ({target}) => {

        if (target.hasAttribute("data-view")) {
            this.setState(
                {
                    currentView: $(target).attr("data-view")
                })
            $(".filter-view")
                .css("display", "none");

        } else {
            $(".filter-view")
                .css("display", "flex");
        }

    };

    parseDateListToString(events) {

        for (var i = 0; i < Object.keys(global.allEvents.events).length; i++) {

            var newString = "";
            var thisEvent = global.allEvents.events[i];
            var theseDays = thisEvent.days;
            var monthNum = "";
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
                for (var j = 0; j < thisMonth.length; j++) {
                    if (newString != "") newString += ",";
                    newString += monthNum + "-" + thisMonth[j];
                }

            }

            thisEvent.daystring = newString;

            var priority = 4;
            if (thisEvent.type=="pro-series") priority = 2;
            if (thisEvent.type=="series") priority = 1;
            if (thisEvent.type=="drop-in") priority = 3;
            if (thisEvent.type=="special") priority = 0;

            thisEvent.priority = priority;


        }
    }

    openAlert(title, text, btn1, btn2, event, callback) {
        this.setState({
            open: !this.state.open,
            alert: {
                title: title,
                text: text,
                button1: btn1,
                button2: btn2,
                event: event,
                callback: callback
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
        var fullstring = "";
        //try long ones first
        if (element.find(".event-bar.pro-series-color").length)
            fullstring = element.find(".event-bar.pro-series-color").attr("data-days");
        else if (element.find(".event-bar.series-color").length)
            fullstring = element.find(".event-bar.series-color").attr("data-days");
        else
            fullstring = element.find(".event-bar").attr("data-days");

        console.log("$$" + fullstring);
        if (fullstring == null) return;
        var firstDay = this.getFirstDayFromFullString(fullstring);
        var t = firstDay.offset().top;
        console.log(t);

        var td = $("#day-start").offset().top;
        $("#day-start").css("top",(t-300)+"px");

        // $('html, body').animate({
        //         scrollTop: $("#day-start").offset().top
        // }, 250);

        this.scrollViewToCalendarDay(firstDay);
        //
        // //set this guy to start at the first occurance.
        // var td = $("#day-start").offset().top;
        // //$("#day-start").css("top",(t-200)+"px");
        //
        // //scroll it.
        // $('html, body').animate({
        //     scrollTop: $("#day-start").offset().top
        // }, 250);
        //
        // //lets scroll the calendar?
        // //
        // // $('html, body').animate({
        // //     scrollTop: $("#day-start").offset().top
        // // }, 250);


    }

    async scrollViewToCalendarDay(dayObj) {
        console.log("@@ scrolling");
        try {
            $('html, body').animate({
                scrollTop: dayObj.offset().top - 20
            }, 250);
        }
        catch (e) {
            console.log(e);
        }

    }

    doesAgeMatchEvent(ageGroup) {

        var myAge = this.state.currentSelectedMembersAge;

        if (ageGroup == "AGE 7 TO 9" && (myAge <= 9 && myAge >= 7)) {
            return true;
        }
        else if (ageGroup == "AGE 9 TO 11" && (myAge <= 11 && myAge >= 9)) {
            return true;
        }
        else if (ageGroup == "AGE 12 TO 14" && (myAge <= 14 && myAge >= 12)) {
            return true;
        }
        else if (ageGroup == "AGE 7 TO 14") {
            return true;
        }
        else {
            return false;
        }
    }

    setTracksToView(age=null, day=null, location=null)  {

        var ageToCheck = age;
        ageToCheck==null?  ageToCheck = this.state.currentAgeGroup : ageToCheck=ageToCheck;
        var dayToCheck = day;
        dayToCheck==null?  dayToCheck = this.state.filterDayOfWeek : dayToCheck=dayToCheck;
        var locationToCheck = location;
        locationToCheck==null?  locationToCheck = this.state.currentLocation : locationToCheck=locationToCheck;

        console.log("TRACKS - setting tracks to view")
        var thisDaysEvents = [];
        var thisDaysFilteredEvents = [];

        try {
            thisDaysEvents = global.allEvents.events;
            console.log("TRACKS - found " + thisDaysEvents.length + " total events");
            for (var i = 0; i < thisDaysEvents.length; i++) {

                // check age
                // console.log("TRACKS checking" + i);
                var ageMatched = false;
                if (this.state.loggedIn) {
                    ageMatched = this.doesAgeMatchEvent(thisDaysEvents[i].age.toUpperCase());
                } else {
                    ageMatched =
                        (
                            thisDaysEvents[i].age.toUpperCase() == ageToCheck.toUpperCase()
                            || thisDaysEvents[i].age.toUpperCase() == "AGE 7 TO 14"
                        );
                }
                // check location
                var locationMatched = false;
                if (thisDaysEvents[i].location.toUpperCase() == locationToCheck.toUpperCase()
                    && ageMatched) {
                    locationMatched = true;
                }
                // check day of week
                // split id by underscore, get index 1, check for match first three letters MON, TUE, etc.
                var dayOfWeekMatched = false;
                var firstThreeOfDay = thisDaysEvents[i].id.toUpperCase().split("_")[1].slice(0,2);
                if (firstThreeOfDay === dayToCheck.toUpperCase().slice(0,2))
                    dayOfWeekMatched = true;
                console.log("TRACKS - filtered day: " +  " - " + dayToCheck.toUpperCase().slice(0,2));
                ageMatched? console.log("TRACKS age matched") : "";
                locationMatched? console.log("TRACKS location matched") : "";
                dayOfWeekMatched? console.log("TRACKS day matched " + thisDaysEvents[i].id.toUpperCase().split("_")[1].slice(0,2)): "";


                if (ageMatched && locationMatched && dayOfWeekMatched) {
                    thisDaysFilteredEvents.push(thisDaysEvents[i]);
                    console.log('TRACKS - matched id ' + thisDaysEvents[i].length);
                }
            }


            thisDaysFilteredEvents.sort(function(a,b) {
                return a.priority - b.priority;
            });
            var firstEventDates = thisDaysFilteredEvents[0].daystring;
            var firstDay = this.getFirstDayFromFullString(firstEventDates);


        } catch (e) {
                console.log("TRACKS FAILED " + e);
        }

        //take all events and combine into tracks.
        //series ID last digits should be the same, split _ [2] and [3]

        var tracksListing = {
            "minecraft" : {
                "fall":{},
                "winter":{},
                "spring":{}
            },
            "roblox" : {
                "fall":{},
                "winter":{},
                "spring":{}
            },
            "video" : {
                "fall":{},
                "winter":{},
                "spring":{}
            },
            "fortnite" : {
                "fall":{},
                "winter":{},
                "spring":{}
            },
            "coding" : {
                "fall":{},
                "winter":{},
                "spring":{}
            },
            "hardware" : {
                "fall":{},
                "winter":{},
                "spring":{}
            },
            "UNKNOWN" : {
                "fall":{},
                "winter":{},
                "spring":{}
            }
         };
        for (i=0; i<thisDaysFilteredEvents.length; i++) {
            // var trackSeriesId = thisDaysFilteredEvents[i].id.split("_");
            // var endIDString = trackSeriesId[2] + "_" + trackSeriesId[3];
            var season;
            if (thisDaysFilteredEvents[i].name.toUpperCase().indexOf("SPRING")>0)
                season="spring";
            else if (thisDaysFilteredEvents[i].name.toUpperCase().indexOf("WINTER")>0)
                season="winter";
            else if (thisDaysFilteredEvents[i].name.toUpperCase().indexOf("FALL")>0)
                season="fall";
            else season = "UNKNOWN";

            console.log("TRACKS found season " + season);


            //check the name of the series
            var topic;
            if (thisDaysFilteredEvents[i].name.toUpperCase().indexOf("ROBLOX")>=0)
                topic="roblox";
            else if (thisDaysFilteredEvents[i].name.toUpperCase().indexOf("MINECRAFT")>=0)
                topic="minecraft";
            else if (thisDaysFilteredEvents[i].name.toUpperCase().indexOf("HARDWARE")>=0)
                topic="hardware";
            else if (thisDaysFilteredEvents[i].name.toUpperCase().indexOf("VIDEO")>=0)
                topic="video";
            else if (thisDaysFilteredEvents[i].name.toUpperCase().indexOf("FORTNITE")>=0)
                topic="fortnite";
            else if (thisDaysFilteredEvents[i].name.toUpperCase().indexOf("ADVANCED")>=0)
                topic="coding";
            else topic = "UNKNOWN";

            console.log("TRACKS found topic " + topic);
            if (this.showOrHide(topic)) {
                tracksListing[topic][season] = thisDaysFilteredEvents[i];
            }

        }

        //console.log("TRACKS-X-"+tracksListing.roblox.spring.name);
    //     title="Test"
    //     copy="test copy"
    //     ages="9-11"
    //


        var combinedSeasons = [];

        for (var topic in tracksListing) {
            console.log(topic);
            if (tracksListing[topic]['spring'].name===undefined) continue;
            combinedSeasons.push({
                topic: topic,
                title: tracksListing[topic]['spring'].name,
                copy: tracksListing[topic]['spring'].description,
                ages: tracksListing[topic]['spring'].age,
                dates: tracksListing[topic]['spring'].days,
                fallDates: tracksListing[topic]['fall'].datesString,
                winterDates: tracksListing[topic]['winter'].datesString,
                springDates: tracksListing[topic]['spring'].datesString,
                time: tracksListing[topic]['spring'].startTime,
                originalPrice:
                    this.calculateCost(tracksListing[topic]['spring']) +
                    this.calculateCost(tracksListing[topic]['winter']) +
                    this.calculateCost(tracksListing[topic]['fall'])
                ,
                price: tracksListing[topic]['spring'].price,
                trackPrice:
                    this.calculateCost(tracksListing[topic]['spring'],5) +
                    this.calculateCost(tracksListing[topic]['winter'],5) +
                    this.calculateCost(tracksListing[topic]['fall'],5)
                ,
                trackSpots: '0',
                trackInCart: -1,
                trackDoesOwn: -1,
                fallPrice: this.calculateCost(tracksListing[topic]['fall']),
                winterPrice: this.calculateCost(tracksListing[topic]['winter']),
                springPrice: this.calculateCost(tracksListing[topic]['spring']),
                trackPaymentPlanPrice: this.calculatePaymentPlanPrice(tracksListing[topic],6),
                fallSpots: tracksListing[topic]['fall'].spotsLeft,
                winterSpots: tracksListing[topic]['winter'].spotsLeft,
                springSpots: tracksListing[topic]['spring'].spotsLeft,
                fallInCart: -1,
                winterInCart: -1,
                springInCart: -1,
                fallDoesOwn: false,
                winterDoesOwn: false,
                springDoesOwn: false,

                doesOwn: false,
                isInCart: -1,
                spotsLeft: 0,
                addToCart: tracksListing[topic]['fall'].addToCart,
                memberName: "Mikey",
                fallWeeks: this.calculateWeeks(tracksListing[topic]['fall']),
                winterWeeks: this.calculateWeeks(tracksListing[topic]['winter']),
                springWeeks: this.calculateWeeks(tracksListing[topic]['spring']),
                location: this.state.filterLocation,
                dayOfWeek: this.state.filterDayOfWeek

            });
            // for (var season in tracksListing[topic]) {
            //     console.log(season);
            //     console.log("TRACKS-X-"+tracksListing[topic][season].name);
            // }
        }

        // console.log(combinedSeasons[0]);


        this.setState({
            viewingDayEvents: combinedSeasons
        });
    }

    // generateDatesList(days) {
    //     var dayString = "";
    //     // days.forEach((months, index) => {
    //     //     dayString+=months + ": ";
    //     //     for (var i=0; i<days[months].length; i++) {
    //     //         dayString+=days[months][i] +",";
    //     //     }
    //     //     dayString+=" ";
    //     //
    //     // });
    //     // var obj = JSON.parse(days);
    //     // obj.forEach((months, index) => {
    //     // console.log("DATES-X----");
    //     // });
    //     console.log(days);
    //
    //     Object.keys(days).forEach(function (key){
    //         console.log("DATES-X-: "+days.toString());
    //         console.log("DATES-X-: "+days[key]);
    //     });
    //     // Object.days.forEach(function (key){
    //     //     console.log("DATES-X-: "+key);
    //     // });
    //
    //
    //     // for (var i=0; i<days.length; i++) {
    //     //     console.log("DAYS - " + i);
    //     // }
    //     //
    //     // days.map(function(months, index){
    //     //     dayString += months;
    //     // });
    //     // dayString = days[0][0];
    //     // console.log(days);
    //     return dayString;
    //
    // }

    calculateCost(event, discount=0) {

        console.log("COST - number of days - " + (parseInt(event.price)/55));
        var roundedNum = 0;
        if (event.location=="Brooklyn") {
            roundedNum= ((parseInt(event.price)/55) * (55-discount));
        } else if (event.location=="TriBeCa") {
            roundedNum= ((parseInt(event.price)/65) * (65-discount));
        }
        return Math.round(roundedNum * 100) / 100;
    }

    calculateWeeks(event) {
        var roundedNum = 0;
        if (event.location=="Brooklyn") {
            roundedNum= ((parseInt(event.price)/55));
        } else if (event.location=="TriBeCa") {
            roundedNum= ((parseInt(event.price)/65));
        }
        return Math.round(roundedNum * 100) / 100;
    }

    calculatePaymentPlanPrice(event, months) {
        var trackCost =
        this.calculateCost(event['spring'],5) +
        this.calculateCost(event['winter'],5) +
        this.calculateCost(event['fall'],5);
        console.log("COST - payment plan for 6 months: " + Math.ceil(trackCost/months));
        return Math.round((trackCost/months) * 100) / 100;

    }

    addOverlay(day, month, addclass, color, title, subtitle) {
        console.log("$$ adding overlay " + addclass + " to", day);
        var thisRow = day.css("grid-row-start");
        var thisCol = day.css("grid-column-start");
        day.addClass("day-under-overlay " + addclass);
        var monthGrid = $('#year-calendar_' + month);
        monthGrid.append(
            "<div class='overlay " + addclass + "' style='background-color:" + color + ";grid-row:" + thisRow + ";grid-column: " + thisCol + "'>" +
            "<div class='title'>" + title +
            "</div><div class='sub-title'>" + subtitle +
            "</div>" +
            "</div>"
        );

    }

    doHardCodedOpenHouses() {

        var _this = this;
        $(".overlay.holiday")
            .click(function() {
                _this.state.currentLocation == "Brooklyn" ?
                window.open("https://www.eventbrite.com/e/fall-open-houses-at-pixel-academy-brooklyn-registration-37432156588","_blank")
                :
                window.open("https://www.eventbrite.com/e/fall-open-houses-at-pixel-academy-tribeca-registration-37432029207","_blank");

             })
            .attr("data-tip","Visit Pixel Academy's fall open houses and get an exclusive peek at the coolest tech we're using this fall after school! Kids (ages 7+) and their families are welcome to swing by, experience awesome technology like Virtual and Augmented Reality, and speak with our friendly staff about how to get started this fall.")
            .css("cursor","pointer");
        ReactTooltip.rebuild();

    }

    addHolidays() {
        console.log("adding holidays");
        //hardcoded minecon
        this.getDayObject("October", 31)
            .addClass("halloween")
            .attr("data-tip", "Boo! We're open for drop in on Halloween. Even if you're trick-or-treating, stop in and show us your costume for some candy!");

        // Winter break camp
        // this.getDayObject("December", 26)
        //     .addClass("Winter-Camp")
        //     .attr("data-tip", "On sale soon!");
        // this.getDayObject("December", 27)
        //     .addClass("Winter Camp")
        //     .attr("data-tip", "Boo! We're open for drop in on Halloween. Even if you're trick-or-treating, stop in and show us your costume for some candy!");
        // this.getDayObject("December", 28)
        //     .addClass("Winter Camp")
        //     .attr("data-tip", "Boo! We're open for drop in on Halloween. Even if you're trick-or-treating, stop in and show us your costume for some candy!");
        // this.getDayObject("December", 29)
        //     .addClass("Winter Camp")
        //     .attr("data-tip", "Boo! We're open for drop in on Halloween. Even if you're trick-or-treating, stop in and show us your costume for some candy!");
        //

        try{
            var holidays = global.allEvents.metaData.holidays;
            for (var i = 0; i < Object.keys(holidays).length; i++) {
                this.addOverlay(
                    this.getDayObject(holidays[i].month, holidays[i].day),
                    holidays[i].month,
                    "holiday",
                    holidays[i].backgroundColor,
                    holidays[i].title,
                    holidays[i].subTitle
                );
            }
        } catch (e) {
            console.log("holidays issue", e);
        }


    }

    addOwnedDays(eventIDs) {

        console.log("adding owned days");
        var ownedEvents = [];

        $(".circle").hide();
        ownedEvents = eventIDs;
        var allEvents = global.allEvents.events;
        for (var i = 0; i < ownedEvents.length; i++) {
            console.log("** i have " + ownedEvents.length + " events");
            for (var j = 0; j < Object.keys(allEvents).length; j++) {
                if (allEvents[j].id == ownedEvents[i]) {
                    //match
                    console.log("** match " + allEvents[j].daystring);

                    //check if its more than one day:
                    var thisDayFullString = allEvents[j].daystring;
                    var thisDayString = [];

                    if (thisDayFullString.indexOf(",") > 0) {

                        console.log("** multi day");

                        var multiDays = thisDayFullString.split(",");

                        for (var k = 0; k < multiDays.length; k++) {

                            this.printOwnedDay(multiDays[k], "MINE", allEvents[j].name + " (" + (k + 1) + " of " + multiDays.length + ")", allEvents[j].type, allEvents[j].startTime);

                        }


                    } else {
                        //its not multi day
                        this.printOwnedDay(thisDayFullString, "MINE", allEvents[j].name, allEvents[j].type, allEvents[j].startTime);
                    }
                    // $("[data-id='" + allEvents[j].id + "']").hide();

                    // continue;
                }
            }
        }
        ReactTooltip.rebuild();


    }

    printOwnedDay(thisDayFullString, title, subTitle, type, time) {
        var thisDayString = thisDayFullString.split("-");
        var thisMonth = this.getMonthName(thisDayString[0]);
        var thisDay = $('.day:has(> [data-month="' + thisMonth + '"][data-daynum="' + thisDayString[1] + '"])');
        if (thisDay.attr("data-tip") == "") thisDay.attr("data-tip", "You have multiple events scheduled for this day. Click to find out what if any add-ons are available for this day.");
        else thisDay.attr("data-tip", "RESERVED! You have " + subTitle + " scheduled for this day. Click to find out what if any add-ons are available for this day.");
        var rnd = Math.floor(Math.random() * 360);
        var rnd2 = (Math.random() / 5);
        thisDay.find(".circle")
            .css("transform", "scale(" + rnd2 + "," + rnd2 + ")")
            .css("transform", "rotate(" + rnd + "deg)")
            .css("display", "block");


        //disable overlay for circles
        // this.addOverlay(
        //     this.getDayObject(
        //         this.getMonthName(thisDayString[0]),
        //         thisDayString[1]
        //     ),
        //     this.getMonthName(thisDayString[0]),
        //     "owned",
        //     "",
        //     title,
        //     "",
        // );
    }

    //call this when confirmed added to cart
    addInCart(eventID) {
        var inCart = [];

        $("[data-event-id='" + eventID + "']").addClass("in-my-cart");
        // $(".inCartLabel").addClass("in-my-cart");


        var arr = this.state.cart;

        arr.push(eventID);
        this.setState({
            cart: arr
        });

        //not a member? they dont own anything

        var allEvents = global.allEvents.events;
        for (var j = 0; j < Object.keys(allEvents).length; j++) {
            if (allEvents[j].id == eventID) {
                //match
                console.log("match " + allEvents[j].daystring);

                //check if its more than one day:
                var thisDayFullString = allEvents[j].daystring;
                var thisDayString = [];

                if (thisDayFullString.indexOf(",") > 0) {

                    var multiDays = thisDayFullString.split(",");

                    for (var k = 0; k < multiDays.length; k++) {

                        this.printCartedDay(multiDays[k], "IN CART", allEvents[j].name + " (" + (k + 1) + " of " + multiDays.length + ")", allEvents[j].type, allEvents[j].startTime);

                    }


                } else {
                    this.printCartedDay(thisDayFullString, "IN CART", allEvents[j].name, allEvents[j].type, allEvents[j].startTime);
                }
                $("[data-id='" + allEvents[j].id + "']").hide();

                continue;
            }

        }

    }

    printCartedDay(thisDayFullString, title, subTitle, type, time) {
        var thisDayString = thisDayFullString.split("-");
        var thisMonth = this.getMonthName(thisDayString[0]);
        var thisDay = $('.day:has(> [data-month="' + thisMonth + '"][data-daynum="' + thisDayString[1] + '"])');
        var rnd = Math.floor(Math.random() * 360);
        var rnd2 = (Math.random() / 5);
        console.log("$$--" + rnd);
        // thisDay.find(".circle")
        //     .css("transform","scale("+rnd2+","+rnd2+")")
        //     .css("transform","rotate("+rnd+"deg)")
        //     .css("display","block");
        thisDay.find(".date-icon").show();


    }

    getDayTitleString(str) {

        var date = Moment(str, "MMMM D");

        return date.format("dddd, MMMM Do");

    }

    showOrHide(topic) {
        if (topic=="roblox") {
            if (this.state.filter9to11 && this.state.filter7to9) {
                return false;
            }
            return true;
        } else if (topic=="minecraft") {
            if (this.state.filter7to9) {
                return false;
            }
            return true;

        } else if (topic=="fortnite") {
            if (this.state.filter9to11 && this.state.filter12to14) {
                return false;
            }
            if (this.state.filterLocation=="Brooklyn") {
                return true;
            }
            return false;

        } else if (topic=="coding") {
            if (this.state.filter9to11 && this.state.filter12to14) {
                return false;
            }
            if (this.state.filterLocation=="Brooklyn") {
                return true;
            }
            return false;

        } else if (topic=="video") {
            if (this.state.filter7to9) {
                return false;
            }
            return true;

        } else if (topic=="hardware") {
            if (this.state.filter12to14) {
                return false;
            }
            if (this.state.filterLocation=="Brooklyn") {
                return true;
            }
            return false;

        }
    }

    showRoblox() {
        // if filtering then that means dont show that age, so you return false to now show it.
        //show only if either 9-11 ot 7-9 AND not 12-14.
        if (this.state.filter9to11 && this.state.filter7to9) {
            return false;
        }
        return true;
    }

    showMinecraft() {
        if (this.state.filter7to9) {
            return false;
        }
        return true;
    }

    showFortnite() {
        // Also need to check location
        if (this.state.filter9to11 && this.state.filter12to14) {
            return false;
        }
        if (this.state.filterLocation=="Brooklyn") {
            return true;
        }
        return false;
    }

    showCoding() {
        // Also need to check location, only in brooklyn
        if (this.state.filter9to11 && this.state.filter12to14) {
            return false;
        }
        if (this.state.filterLocation=="Brooklyn") {
            return true;
        }
        return false;
    }

    showVideo() {
        // Also need to check location, only in brooklyn
        if (this.state.filter7to9) {
            return false;
        }
        return true;
    }

    showHardware() {
        // Also need to check location, only in brooklyn
        if (this.state.filter12to14) {
            return false;
        }
        if (this.state.filterLocation=="Brooklyn") {
            return true;
        }
        return false;
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

    getMemberPricing(original, type) {
        var price = parseInt(original);
        console.log("%% original for " + type + " -" + price);
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
        //format it
        return Math.round(price*100)/100;
    }

    render() {

        //
        //HARDCODED TAGS
        //



        var allAgesFilterIcon = this.state.filterAllAges ? "" : <CheckIcon />;
        var campFilterIcon = this.state.filterCamp ? "" : <CheckIcon/>;
        var dropInFilterIcon = this.state.filterDropIn ? "" : <CheckIcon/>;
        var seriesFilterIcon = this.state.filterSeries ? "" : <CheckIcon/>;
        var specialFilterIcon = this.state.filterSpecial ? "" : <CheckIcon/>;
        var partiesFilterIcon = "";
        var proSeriesFilterIcon = this.state.filterProSeries ? "" : <CheckIcon/>;
        var pickupFilterIcon =
            (
            <svg width="30" height="30" version="1.1" viewBox="0 0 24 24" >
                <g fill="none">
                    <path d="M0,0h24v24h-24Z"></path>
                    <path fill="#000000" d="M7.5,4c1.1,0 2,-0.9 2,-2c0,-1.1 -0.9,-2 -2,-2c-1.1,0 -2,0.9 -2,2c0,1.1 0.9,2 2,2Zm-3.7,3.4l-2.8,14.1h2.1l1.8,-8l2.1,2v6h2v-7.5l-2.1,-2l0.6,-3c1.3,1.5 3.3,2.5 5.5,2.5v-2c-1.9,0 -3.5,-1 -4.3,-2.4l-1,-1.6c-0.4,-0.6 -1,-1 -1.7,-1c-0.3,0 -0.5,0.1 -0.8,0.1l-5.2,2.2v4.7h2v-3.4l1.8,-0.7" transform="translate(2, 0)"></path>
                </g>
            </svg>
            );

        var listOfAgeSelections = this.state.ageSelectionOptions;
        if (this.state.members.length > 0) {
            listOfAgeSelections = [];
            for (var member in Object.keys(this.state.members)) {
                listOfAgeSelections.push(this.state.members[member].name.split(" ")[0]);
            }
        }

        var thisDaysStuff = [];
        var willCheckForDoesOwn = [];
        var memberName = "";
        this.state.selectedMemberKey!="" ? memberName = this.state.members[this.state.selectedMemberKey].name : memberName = "";
        this.state.selectedMemberKey!="" ? willCheckForDoesOwn = this.state.members[this.state.selectedMemberKey].ownedEvents : willCheckForDoesOwn = [];
        this.listEvents = [];
        return (
            <div className="App">
                {isLive ? "" : <TopLinks></TopLinks>}
                <div className="full-page-container">
                    <div className="container w-container">

                        <h1 className="heading">
                            <div className="filtering-header">

                                <div className="change-age-btn" onClick={this.changeAge}
                                     data-tip={this.state.cart.length > 0 ? "You may only add items to the cart for one member at a time." : ""}>
                                    <div className="text-right"><span className="def-no-hover">
                                    {this.state.isJSONloaded ? "Showing" : "Loading"} events for </span><span
                                        className="editable-heading editable-age-group">{this.state.currentAgeGroup}</span>
                                    </div>
                                    <div className="text-right filtering-hover-text">
                                        <div className={this.state.selectedMemberKey != "" ? "member-type" : ""}>
                                            click to change
                                        </div>
                                    </div>
                                    <div className="filter-selection-box filter-age">
                                        {/*//ageSelectionOptions*/}
                                        {listOfAgeSelections.map((selection, index) =>
                                            <div className="filter-option set-age-btn"
                                                 data-age-group={selection}>{selection}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="text-center"> in</div>
                                <div className="change-location-btn" onClick={this.changeLocation}
                                     data-tip={this.state.cart.length > 0 ? "You may only add items to the cart for one location at a time." : ""}
                                >
                                    <div className="text-left"><span
                                        className="editable-heading">{this.state.currentLocation} </span></div>
                                    <div className="text-center filtering-hover-text">
                                        <div>click to change</div>
                                    </div>
                                    <div className="filter-selection-box filter-location">
                                        <div className="filter-option set-location-btn" data-location="Brooklyn">
                                            Brooklyn
                                        </div>
                                        <div className="filter-option set-location-btn" data-location="TriBeCa">
                                            TriBeCa
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center" style={{marginLeft: "10px"}}>  on</div>
                                <div className="change-day-of-week-btn" onClick={this.changeDayOfWeek}
                                     data-tip={this.state.cart.length > 0 ? "You may only add items to the cart for one location at a time." : ""}
                                >
                                    <div className="text-left"><span
                                        className="editable-heading">{this.state.currentDayOfWeek} </span></div>
                                    <div className="text-center filtering-hover-text">
                                        <div>click to change</div>
                                    </div>
                                    <div className="filter-selection-box filter-day-of-week">
                                        <div className="filter-option set-day-of-week-btn" data-day-of-week="Mondays">
                                            Mondays
                                        </div>
                                        <div className="filter-option set-day-of-week-btn" data-day-of-week="Tuesdays">
                                            Tuesdays
                                        </div>
                                        <div className="filter-option set-day-of-week-btn" data-day-of-week="Wednesdays">
                                            Wednesdays
                                        </div>
                                        <div className="filter-option set-day-of-week-btn" data-day-of-week="Thursdays">
                                            Thursdays
                                        </div>
                                        <div className="filter-option set-day-of-week-btn" data-day-of-week="Fridays">
                                            Fridays
                                        </div>
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
                                {this.state.selectedMemberKey != "" ?
                                    <div className="age-note">NOTE: We're showing you only events for members
                                        age {this.state.members[this.state.selectedMemberKey].age}. If this is
                                        not {this.state.members[this.state.selectedMemberKey].name}'s correct age <a
                                            href={"member/" + this.state.members[this.state.selectedMemberKey].id + "/pedit"}><span
                                            className="change-birthday">click here</span></a></div>
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
                                     callback={this.state.alert.callback}
                                     event={this.state.alert.event}
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
                            <div className="filters">
                                <div className="filter-circle-container" onClick={ this.toggleAllAges }>
                                    <div className="filter-circle-filled all-ages-color">{ allAgesFilterIcon }</div>
                                    <div className="filter-circle-label">All Ages</div>
                                </div>
                                <div className="filter-circle-container" onClick={this.toggleSeries}>
                                    <div className="filter-circle-filled series-color">
                                        {seriesFilterIcon}
                                    </div>
                                    <div className="filter-circle-label">
                                        Tracks
                                    </div>
                                </div>
                                {/*<div className="filter-circle-container">*/}
                                    {/*<div className="filter-circle-filled pro-series-color"*/}
                                         {/*onClick={this.toggleProSeries}>*/}
                                        {/*{proSeriesFilterIcon}*/}
                                    {/*</div>*/}
                                    {/*<div className="filter-circle-label">*/}
                                        {/*Pro Series*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                {/*<div className="filter-circle-container" onClick={this.toggleCamp}>*/}
                                    {/*<div className="filter-circle-filled camp-color">*/}
                                        {/*{campFilterIcon}*/}
                                    {/*</div>*/}
                                    {/*<div className="filter-circle-label">*/}
                                        {/*Camp*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                <div className="filter-circle-container" onClick={this.toggleDropin}>
                                    <div className="filter-circle-filled drop-in-color">
                                        {dropInFilterIcon}
                                    </div>
                                    <div className="filter-circle-label">
                                        Makerspace
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
                                { this.isMemberLoggedIn() ?
                                    this.isSchoolAvail(this.getLoggedInMember().school, this.state.currentLocation).length>0 ?

                                    <div className="filter-circle-container">
                                        <div className="">
                                            {pickupFilterIcon}
                                        </div>
                                        <div className="filter-circle-label">
                                            Pickups from<br/>{this.getLoggedInMember().school}
                                            <br/>
                                        </div>
                                    </div>

                                    :

                                    ""
                                    :

                                    ""

                                }

                                <div className="filter-circle-container disabled">
                                    <div className="filter-circle-filled parties-color disabled">
                                        {partiesFilterIcon}
                                    </div>
                                    <div className="filter-circle-label disabled">
                                        Weekends<br/><span style={{fontSize: "80%"}}>(coming soon)</span>
                                    </div>
                                </div>

                            </div>
                            <div className="page-container">

                                {/*TRACKS BEGIN*/}
                                <div className="allTracks">

                                    {this.state.viewingDayEvents.map(
                                        function(name, index) {
                                            console.log( "forEach:" + name );
                                            return (

                                                <Track
                                                    topic={name.topic}
                                                    title={name.title}
                                                    tags={
                                                        [
                                                            {text: "Code", tagType: "red"},
                                                            {text: "Fun", tagType: "blue"},
                                                            {text: "Magic", tagType: "green"}
                                                        ]
                                                    }
                                                    copy={name.copy}
                                                    ages={name.ages}
                                                    dates={name.dates}
                                                    time="no time"
                                                    originalPrice={name.originalPrice}
                                                    price={name.trackPrice}
                                                    trackPrice={name.trackPrice}
                                                    trackSpots="4"
                                                    trackInCart={-1}
                                                    trackDoesOwn={-1}
                                                    fallPrice={name.fallPrice}
                                                    winterPrice={name.winterPrice}
                                                    springPrice={name.springPrice}
                                                    trackPaymentPlanPrice = {name.trackPaymentPlanPrice}
                                                    fallSpots={name.fallSpots}
                                                    winterSpots={name.winterSpots}
                                                    springSpots={name.springSpots}
                                                    fallWeeks={name.fallWeeks}
                                                    winterWeeks={name.winterWeeks}
                                                    springWeeks={name.springWeeks}
                                                    fallInCart={-1}
                                                    winterInCart={-1}
                                                    springInCart={-1}
                                                    fallDoesOwn={false}
                                                    winterDoesOwn={false}
                                                    springDoesOwn={false}
                                                    fallDates={name.fallDates}
                                                    winterDates={name.winterDates}
                                                    springDates={name.springDates}
                                                    location={name.location}
                                                    dayOfWeek={name.dayOfWeek}

                                                    doesOwn={false}
                                                    isInCart={-1}
                                                    spotsLeft="5"
                                                    memberName = "Mikey"

                                                />

                                            );
                                        }
                                    )}

                                </div>


                                {/*Month sidebar:*/}
                                {/*

                                <div className="month-sidebar">
                                        <Month name="September" numDays="30" skipDays="6"
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
                                               pickups={this.state.filterLocation=="Brooklyn" ? this.state.pickups.Brooklyn : this.state.pickups.TriBeCa}
                                               events={this.state.isJSONloaded ? global.eventsByDay["September"] : []}
                                               listEvents={ this.listEvents }
                                        />
                                        <Month name="October" numDays="31" skipDays="1"
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
                                               pickups={this.state.filterLocation=="Brooklyn" ? this.state.pickups.Brooklyn : this.state.pickups.TriBeCa}
                                               events={this.state.isJSONloaded ? global.eventsByDay["October"]:[]}
                                               listEvents={ this.listEvents }
                                        />
                                        <Month name="November" numDays="30" skipDays="4"
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
                                               pickups={this.state.filterLocation=="Brooklyn" ? this.state.pickups.Brooklyn : this.state.pickups.TriBeCa}
                                               events={this.state.isJSONloaded ? global.eventsByDay["November"]:[]}
                                               listEvents={ this.listEvents }
                                        />
                                        <Month name="December" numDays="31" skipDays="6"
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
                                               pickups={this.state.filterLocation=="Brooklyn" ? this.state.pickups.Brooklyn : this.state.pickups.TriBeCa}
                                               events={this.state.isJSONloaded ? global.eventsByDay["December"]:[]}
                                               listEvents={ this.listEvents }
                                        />

                                        <Month name="January" numDays="31" skipDays="2"
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
                                               pickups={this.state.filterLocation=="Brooklyn" ? this.state.pickups.Brooklyn : this.state.pickups.TriBeCa}
                                               events={this.state.isJSONloaded ? global.eventsByDay["January"]:[]}
                                               listEvents={ this.listEvents }
                                        />
                                        <Month name="February" numDays="28" skipDays="5"
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
                                               pickups={this.state.filterLocation=="Brooklyn" ? this.state.pickups.Brooklyn : this.state.pickups.TriBeCa}
                                               events={this.state.isJSONloaded ? global.eventsByDay["February"]:[]}
                                               listEvents={ this.listEvents }
                                        />
                                        <Month name="March" numDays="31" skipDays="5"
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
                                               pickups={this.state.filterLocation=="Brooklyn" ? this.state.pickups.Brooklyn : this.state.pickups.TriBeCa}
                                               events={this.state.isJSONloaded ? global.eventsByDay["March"]:[]}
                                               listEvents={ this.listEvents }
                                        />
                                        <Month name="April" numDays="30" skipDays="1"
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
                                               pickups={this.state.filterLocation=="Brooklyn" ? this.state.pickups.Brooklyn : this.state.pickups.TriBeCa}
                                               events={this.state.isJSONloaded ? global.eventsByDay["April"]:[]}
                                               listEvents={ this.listEvents }
                                        />
                                        <Month name="May" numDays="31" skipDays="3"
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
                                               pickups={this.state.filterLocation=="Brooklyn" ? this.state.pickups.Brooklyn : this.state.pickups.TriBeCa}
                                               events={this.state.isJSONloaded ? global.eventsByDay["May"]:[]}
                                               listEvents={ this.listEvents }
                                        />
                                        <Month name="June" numDays="30" skipDays="6"
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
                                               pickups={this.state.filterLocation=="Brooklyn" ? this.state.pickups.Brooklyn : this.state.pickups.TriBeCa}
                                               events={this.state.isJSONloaded ? global.eventsByDay["June"]:[]}
                                               listEvents={ this.listEvents }
                                        />
                                        <Month name="July" numDays="31" skipDays="1"
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
                                               pickups={this.state.filterLocation=="Brooklyn" ? this.state.pickups.Brooklyn : this.state.pickups.TriBeCa}
                                               events={this.state.isJSONloaded ? global.eventsByDay["July"]:[]}
                                               listEvents={ this.listEvents }
                                        />
                                        <Month name="August" numDays="31" skipDays="4"
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
                                               pickups={this.state.filterLocation=="Brooklyn" ? this.state.pickups.Brooklyn : this.state.pickups.TriBeCa}
                                               events={this.state.isJSONloaded ? global.eventsByDay["August"]:[]}
                                               listEvents={ this.listEvents }
                                        />





                                    </div>

                                    */}



                                <div className="day-sidebar" id="day-start">
                                    <div className="big-day-title">

                                        {this.state.isJSONloaded ?
                                            this.state.viewingDay == "none" ? "" : ""


                                            :
                                            <div className="spinner-holder">

                                                <div className="fun-fact">Loading Pixel Experiences<br/>(this may take a few seconds)</div>

                                                <MDSpinner
                                                    color1="rgba(255, 77, 71, 1)"
                                                    color2="rgba(255, 154, 0, 1)"
                                                    color3="rgba(231, 30, 183,1)"
                                                    color4="rgba(255, 219, 0, 1)"
                                                    size={100}/>

                                            </div>


                                        }

                                    </div>

                                    <div className="big-day-container">


                                        {this.state.viewingDayEvents.map(
                                            function(name, index) {
                                                console.log( "forEach:" + name );
                                                return (

                                                    <TrackSelection
                                                        title={name.title}
                                                        tags={
                                                            [
                                                                {text: "Code", tagType: "red"},
                                                                {text: "Fun", tagType: "blue"},
                                                                {text: "Magic", tagType: "green"}
                                                            ]
                                                        }
                                                        copy={name.copy}
                                                        ages={name.ages}
                                                        dates={name.dates}
                                                        time="no time"
                                                        originalPrice={name.originalPrice}
                                                        price={name.trackPrice}
                                                        trackPrice={name.trackPrice}
                                                        trackSpots="4"
                                                        trackInCart={-1}
                                                        trackDoesOwn={-1}
                                                        fallPrice={name.fallPrice}
                                                        winterPrice={name.winterPrice}
                                                        springPrice={name.springPrice}
                                                        trackPaymentPlanPrice = {name.trackPaymentPlanPrice}
                                                        fallSpots="3"
                                                        winterSpots="3"
                                                        springSpots="3"
                                                        fallInCart={-1}
                                                        winterInCart={-1}
                                                        springInCart={-1}
                                                        fallDoesOwn={false}
                                                        winterDoesOwn={false}
                                                        springDoesOwn={false}

                                                        doesOwn={false}
                                                        isInCart={-1}
                                                        spotsLeft="5"
                                                        memberName = "Mikey"

                                                    />

                                                );
                                            }
                                        )}






                                    </div>

                                </div>
                            </div>

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
