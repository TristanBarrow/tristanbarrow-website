import React from 'react'; 
import '../styles/ResumeSection.scss';

const ResumeSection = (props) => {
    return (
        <div className='RESUME-SECTION'>
            {/* Resume Section */}
            <div className='RESUME-SECTION__HEADER'>
                <div className='RESUME-SECTION__HEADER__TITLE'>{props.title}</div>
                <div className='RESUME-SECTION__HEADER__DATES'>{props.dates}</div>
                <div className='RESUME-SECTION__HEADER__ORG'>{props.org}</div>
                <div className='RESUME-SECTION__HEADER__CITY'>{props.city}</div>
            </div>
            <div className='RESUME-SECTION__SKILLS'>{props.skills}</div>
             {props.bullets.map(bullet => {
                return <div className='RESUME-SECTION__BULLETS'>{bullet}</div>;
            })}
        </div>
    )
}

export default ResumeSection;