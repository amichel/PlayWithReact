import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/WeatherForecasts';
import ReactTable from "react-table";
import 'react-table/react-table.css';

class FetchData extends Component {
    componentWillMount() {
        // This method runs when the component is first added to the page
        //this.props.requestWeatherForecasts(1,5);
    }

    //componentWillReceiveProps(nextProps) {
    //  // This method runs when incoming props (e.g., route params) change
    //  const currentPage = parseInt(nextProps.match.params.currentPage, 10) || 0;
    //  this.props.requestWeatherForecasts(currentPage);
    //}

    render() {
        return (
            <div>
                <h1>Weather forecast</h1>
                <p>This component demonstrates fetching data from the server and working with URL parameters.</p>

                {renderReactTable(this.props)}
            </div>
        );
    }
}


function renderReactTable(props) {
    const columns = [
        {
            Header: 'Date',
            accessor: 'dateFormatted',
            width: 100
        }, {
            Header: 'Temp. (C)',
            accessor: 'temperatureC',
            width: 100
        }, {
            Header: 'Temp. (F)',
            accessor: 'temperatureF',
            width: 100
        }, {
            Header: 'Summary',
            accessor: 'summary'
        }
    ];
    
    return (
        <div
            style={{
                borderRadius: "5px",
                overflow: "hidden",
                padding: "5px",
                width: "600px"
            }}
        >
            <ReactTable
                data={props.data}
                columns={columns}
                defaultPageSize={5}
                className="-striped -highlight"
                width={600}
                manual
                loading={props.isLoading}
                pages={Math.ceil(props.totalCount / props.pageSize)}
                onFetchData={(state, instance) => {
                    const currentPage = state.page + 1;
                    props.requestWeatherForecasts(currentPage, state.pageSize);
                }}
            /></div>);
}

export default connect(
    state => state.weatherForecasts,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(FetchData);
