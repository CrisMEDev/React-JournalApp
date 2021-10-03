import React from 'react';

export const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">

            <div
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://freesvg.org/img/computers.png)'
                }}
            ></div>

            <div className="journal__entry-body">
                <p className="journal__entry-title mb-1">
                    Aprendiendo a conocerme
                </p>
                <p className="journal__entry-content">
                    Aute pariatur aliquip proident ex laborum elit tempor officia ut pariatur ullamco.
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>28</h4>
            </div>
            
        </div>
    )
}
