import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './webflow.css';
import './App.css';
import './Span-styles.css';
import $ from 'jquery';
import Day from './Day';
import Month from './Month';


class App extends Component {

    toggleSeries() {
        console.log("here");
        if (!this.props.filterSeries) {
            this.props = {filterSeries: true};
            $(".filter-circle-filled.series-color").addClass('filter-circle-empty');
            $(".series-color").hide();
            $(".filter-circle-filled.series-color").show();
        } else {
            this.props = {filterSeries: false};
            $(".filter-circle-filled.series-color").removeClass('filter-circle-empty');
            $(".series-color").show();
        }

    }

    toggleDropin() {
        console.log("here");
        if (!this.props.filterDropIn) {
            this.props = {filterDropIn: true};
            $(".filter-circle-filled.drop-in-color").addClass('filter-circle-empty');
            $(".drop-in-color").hide();
            $(".filter-circle-filled.drop-in-color").show();
        } else {
            this.props = {filterDropIn: false};
            $(".filter-circle-filled.drop-in-color").removeClass('filter-circle-empty');
            $(".drop-in-color").show();
        }

    }

    toggleCamp() {
        console.log("here");
        if (!this.props.filterCamp) {
            this.props = {filterCamp: true};
            $(".filter-circle-filled.camp-color").addClass('filter-circle-empty');
            $(".camp-color").hide();
            $(".filter-circle-filled.camp-color").show();
        } else {
            this.props = {filterCamp: false};
            $(".filter-circle-filled.camp-color").removeClass('filter-circle-empty');
            $(".camp-color").show();
        }

    }

    toggleSpecial() {
        console.log("here");
        if (!this.props.filterSpecial) {
            this.props = {filterSpecial: true};
            $(".filter-circle-filled.special-color").addClass('filter-circle-empty');
            $(".special-color").hide();
            $(".filter-circle-filled.special-color").show();
        } else {
            this.props = {filterSpecial: false};
            $(".filter-circle-filled.special-color").removeClass('filter-circle-empty');
            $(".special-color").show();
        }

    }


    constructor() {
        super();

        this.toggleSeries = this.toggleSeries.bind(this);
        this.props = {filterSeries: false};
        this.toggleDropin = this.toggleDropin.bind(this);
        this.props = {filterSeries: false};
        this.toggleCamp = this.toggleCamp.bind(this);
        this.props = {filterSeries: false};
        this.toggleSpecial = this.toggleSpecial.bind(this);
        this.props = {filterSeries: false};
    }


    componentDidMount() {
        // $("#calendar").append("<div class='spanner span-monday-friday camp-color camp-span-week-2 selectable'>" +
        //     "<div class='spanner-copy'> Spring Break Camp</div></div>");
        $("#calendar").css('display', 'none');
        $("#calendar").css('display', 'grid');
        $('div:has(> #no-day)').addClass('no-day');
    }

    render() {

        return (
            <div className="App">
                <div className="container w-container">
                    <h1 className="heading">Showing <span className="editable-heading">all</span> all events <span
                        className="editable-heading">ages 7 to 9</span> in <span
                        className="editable-heading">Brooklyn</span></h1>
                    <div className="filters">
                        <div className="filter-circle-container" onClick={this.toggleSeries}>
                            <div className="filter-circle-filled series-color">
                            </div>
                            <div className="filter-circle-label">
                                Series
                            </div>
                        </div>
                        <div className="filter-circle-container" onClick={this.toggleCamp}>
                            <div className="filter-circle-filled camp-color">
                            </div>
                            <div className="filter-circle-label">
                                Camp
                            </div>
                        </div>
                        <div className="filter-circle-container" onClick={this.toggleDropin}>
                            <div className="filter-circle-filled drop-in-color">
                            </div>
                            <div className="filter-circle-label">
                                Drop-in
                            </div>
                        </div>
                        <div className="filter-circle-container" onClick={this.toggleSpecial}>
                            <div className="filter-circle-filled special-color">
                            </div>
                            <div className="filter-circle-label">
                                Special
                            </div>
                        </div>
                    </div>

                    <Month name="September" numDays="30" skipDays="5"/>
                    <Month name="October" numDays="31" skipDays="0"/>
                    <Month name="November" numDays="30" skipDays="3"/>
                    <Month name="December" numDays="31" skipDays="5"/>

                </div>
            </div>
        );
    };

}

export default App;
