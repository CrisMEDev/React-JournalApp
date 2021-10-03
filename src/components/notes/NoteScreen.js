import React from 'react';

import { NotesAppbar } from './NotesAppbar';

export const NoteScreen = () => {
    return (
        <div className="notes__main-content">
            
                <NotesAppbar />

                <div className="notes__content">

                    <input
                        type="text"
                        placeholder="Some good title"
                        className="notes__title_input"
                        autoComplete="off"
                    />

                    <textarea
                        placeholder="What do you need to write today?"
                        className="notes__textarea"
                    ></textarea>

                    <div className="notes__image">
                        <img
                            src="https://i.pinimg.com/474x/cf/8c/9d/cf8c9d075a37c13302f0cb5f6379a508.jpg"
                            alt="Cannot show"
                        />
                    </div>

                </div>

        </div>
    )
}
