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


class App extends Component {

    toggleSeries() {
        console.log("here");
        if (!this.props.filterSeries) {
            this.props = {filterSeries: true};
            //$(".filter-circle-filled.series-color").addClass('filter-circle-empty');
            $(".series-color").hide();
            $(".filter-circle-filled.series-color").show();
        } else {
            this.props = {filterSeries: false};
            //$(".filter-circle-filled.series-color").removeClass('filter-circle-empty');
            $(".series-color").show();
        }

    }

    toggleDropin() {
        console.log("here");
        if (!this.state.filterDropIn) {
            this.setState({filterDropIn:true});

        } else {
            this.setState({filterDropIn:false});

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
        if (!this.state.filterSpecial) {
            this.setState({filterSpecial:true});
        } else {
            this.setState({filterSpecial:false});
        }

    }


    constructor() {
        super();

        this.toggleSeries = this.toggleSeries.bind(this);
        this.props = {filterSeries: false};
        this.toggleDropin = this.toggleDropin.bind(this);
        this.props = {filterDropIn: false};
        this.toggleCamp = this.toggleCamp.bind(this);
        this.props = {filterCamp: false};
        this.toggleSpecial = this.toggleSpecial.bind(this);
        this.props = {filterSpecial: false};
        this.state = {
            filterDropIn: false,
            filterSpecial: false
        }
    }


    componentDidMount() {
        // $("#calendar").append("<div class='spanner span-monday-friday camp-color camp-span-week-2 selectable'>" +
        //     "<div class='spanner-copy'> Spring Break Camp</div></div>");
        $("#calendar").css('display', 'none');
        $("#calendar").css('display', 'grid');
        $('div:has(> #no-day)').addClass('no-day');
        $('div:has(> #closed-day)').addClass('closed');
    }

    render() {

        var campFilterIcon = this.props.filterCamp ? <CheckIcon/> : "";
        var dropInFilterIcon = this.state.filterDropIn ? "" : <CheckIcon/>;
        var seriesFilterIcon = this.props.filterSeries ? <CheckIcon/> : "";
        var specialFilterIcon = this.state.filterSpecial ? "" : <CheckIcon/>;


        return (
            <div className="App">
                <div className="container w-container">
                    <h1 className="heading">Showing <span className="editable-heading">all</span> all events <span
                        className="editable-heading">ages 7 to 9</span> in <span
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

                    <Month name="September" numDays="30" skipDays="5"
                           filterDropIn={this.state.filterDropIn}
                           filterSpecial={this.state.filterSpecial}
                    />
                    <Month name="October" numDays="31" skipDays="0"/>
                    <Month name="November" numDays="30" skipDays="3"/>
                    <Month name="December" numDays="31" skipDays="5"/>

                </div>
            </div>
        );
    };

}

export default App;
