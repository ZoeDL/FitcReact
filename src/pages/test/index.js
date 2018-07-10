import React from 'react';
import Timer from '../../components/Timer';

class DatePicker extends React.PureComponent {

    render() {
        return (
            <div>
                <Timer 
                    ms={-10000} 
                    increase={true}
                    minValue={-10000}
                />
            </div>
        )
    }
}

export default DatePicker;