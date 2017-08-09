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
        }
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

    render() {

        var campFilterIcon = this.state.filterCamp ?  "" : <CheckIcon/>;
        var dropInFilterIcon = this.state.filterDropIn ? "" : <CheckIcon/>;
        var seriesFilterIcon = this.state.filterSeries ? "" : <CheckIcon/>;
        var specialFilterIcon = this.state.filterSpecial ? "" : <CheckIcon/>;


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

                    <Month name="September" numDays="30" skipDays="5"
                           filterDropIn={this.state.filterDropIn}
                           filterSpecial={this.state.filterSpecial}
                           filterSeries={this.state.filterSeries}
                           filterCamp={this.state.filterCamp}
                    />
                    <Month name="October" numDays="31" skipDays="0"
                           filterDropIn={this.state.filterDropIn}
                           filterSpecial={this.state.filterSpecial}
                           filterSeries={this.state.filterSeries}
                           filterCamp={this.state.filterCamp}
                    />
                    <Month name="November" numDays="30" skipDays="3"
                           filterDropIn={this.state.filterDropIn}
                           filterSpecial={this.state.filterSpecial}
                           filterSeries={this.state.filterSeries}
                           filterCamp={this.state.filterCamp}
                    />
                    <Month name="December" numDays="31" skipDays="5"
                           filterDropIn={this.state.filterDropIn}
                           filterSpecial={this.state.filterSpecial}
                           filterSeries={this.state.filterSeries}
                           filterCamp={this.state.filterCamp}
                    />

                </div>
            </div>
        );
    };

}

export default App;
