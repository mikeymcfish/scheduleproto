import React, {Component} from 'react';

import ReactDOM from 'react-dom';
import logo from './logo.svg';
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
        this.changeAge = this.changeAge.bind(this);
        this.changeLocation = this.changeLocation.bind(this);
        this.state = {
            filterDropIn: true,
            filterSpecial: true,
            filterSeries: true,
            filterCamp: true,

            selectedEvent: ""
        }
    }


    componentDidMount() {
        // $("#calendar").append("<div class='spanner span-monday-friday camp-color camp-span-week-2 selectable'>" +
        //     "<div class='spanner-copy'> Spring Break Camp</div></div>");
        $("#calendar").css('display', 'none');
        $("#calendar").css('display', 'grid');
        this.runJquery();

    }

    changeAge() {
        $(".filter-age").css("display","flex");
    }

    changeLocation() {
        $(".filter-location").css("display","flex");
    }

    componentDidUpdate() {
        console.log("did update");
        this.runJquery();
    }

    runJquery() {
        console.log("jquery");
        $('div:has(> #no-day)').addClass('no-day');
        $('div:has(> #closed-day)').addClass('closed');
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
        })

        $('body').click(function () {
            $(".filter-location").css("display","none");
            $(".filter-age").css("display","none");
        })

        // .mouseover(function (e) {
        //     console.log("hover");
        //
        //     $("[data-id="+$(this).attr('data-id')+"]").trigger(e.type);
        //     console.log($("[data-id="+$(this).attr('data-id')+"]"), e.type);
        //
        // });
        //
        // a=document.getElementsByTagName('input')
    }

    render() {


        var campFilterIcon = this.state.filterCamp ?  "" : <CheckIcon/>;
        var dropInFilterIcon = this.state.filterDropIn ? "" : <CheckIcon/>;
        var seriesFilterIcon = this.state.filterSeries ? "" : <CheckIcon/>;
        var specialFilterIcon = this.state.filterSpecial ? "" : <CheckIcon/>;


        return (
            <div className="App">

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
                            <div className="text-right"><span class="def-no-hover">Showing events for </span><span className="editable-heading">age 7 to 9</span></div>
                            <div className="text-right filtering-hover-text">
                                <div>click to change</div>
                            </div>
                            <div className="filter-selection-box filter-age">
                                <div className="filter-option">age 7 to 9</div>
                                <div className="filter-option">age 9 to 11</div>
                                <div className="filter-option">age 12 to 14</div>
                            </div>
                        </div>
                        <div className="text-center"> in </div>
                        <div className="change-location-btn" onClick={this.changeLocation}>
                            <div className="text-left"><span className="editable-heading">Brooklyn</span></div>
                            <div className="text-center filtering-hover-text">
                                <div>click to change</div>
                            </div>
                            <div className="filter-selection-box filter-location">
                                <div className="filter-option">Brooklyn</div>
                                <div className="filter-option">TriBeCa</div>
                            </div>
                        </div>
                    </div>
                    </h1>
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
