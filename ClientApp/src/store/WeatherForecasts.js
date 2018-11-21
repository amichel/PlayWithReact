const requestWeatherForecastsType = 'REQUEST_WEATHER_FORECASTS';
const receiveWeatherForecastsType = 'RECEIVE_WEATHER_FORECASTS';
const initialState = { data: [], totalCount: 0, pageSize: 5, currentPage: 0, isLoading: false };

export const actionCreators = {
    requestWeatherForecasts: (currentPage, pageSize) => async (dispatch, getState) => {
        if (currentPage === getState().weatherForecasts.currentPage && pageSize === getState().weatherForecasts.pageSize) {
            // Don't issue a duplicate request (we already have or are loading the requested data)
            return;
        }

        dispatch({ type: requestWeatherForecastsType, currentPage, pageSize });

        const url = `api/SampleData/WeatherForecasts?currentPage=${currentPage}&pageSize=${pageSize}`;
        const response = await fetch(url);
        const forecasts = await response.json();

        dispatch({ type: receiveWeatherForecastsType, currentPage, pageSize, data: forecasts.data, totalCount: forecasts.totalCount });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestWeatherForecastsType) {
        return {
            ...state,
            currentPage: action.currentPage,
            pageSize: action.pageSize,
            isLoading: true
        };
    }

    if (action.type === receiveWeatherForecastsType) {
        return {
            ...state,
            currentPage: action.currentPage,
            pageSize: action.pageSize,
            data: action.data,
            totalCount: action.totalCount,
            isLoading: false
        };
    }

    return state;
};
