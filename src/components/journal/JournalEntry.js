import React from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { activeNote } from '../../actions/notes';

export const JournalEntry = ({ id, date, title, body, url }) => {

    const dispatch = useDispatch();

    // console.log(id, date, title, body, url);
    const noteDate = moment( date );

    const handleEntryClick = () => {

        const active = { date, title, body, url };
        
        dispatch( activeNote( id, active ) );

    }
    
    return (
        <div
            className="journal__entry pointer"
            onClick={ handleEntryClick }
        >

            {
                url &&
                <div
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url(${url})`    // https://freesvg.org/img/computers.png
                }}
                ></div>
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title mb-1">
                    { title }
                </p>
                <p className="journal__entry-content">
                    { body }
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{ noteDate.format('dddd') }</span>
                <h4>{ noteDate.format('Do') }</h4>
            </div>
            
        </div>
    )
}
