import React from 'react';

const HomePageRow = (props) => {
    return (
        <div className='HOME-PAGE-ROW'>
            <div className='HOME-PAGE-ROW__IMAGE'>img</div>
            <div className='HOME-PAGE-ROW__VERTICAL-RULE'>vr</div>
            <div className='HOME-PAGE-ROW__INFO'>
                <div className='HOME-PAGE-ROW__TITLE'>title</div>
                <div className='HOME-PAGE-ROW__BODY'>text</div>
            </div>
        </div>
    );
}

export default HomePageRow;
