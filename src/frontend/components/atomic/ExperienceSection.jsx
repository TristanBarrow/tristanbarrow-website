import React from 'react';
import LabeledText from './LabeledText.jsx';
import '../styles/ExperienceSection.scss';

const ExperienceSection = (props) => {
    return (
        <div className='EXPERIENCE-SECTION'>
            <div className='EXPERIENCE-SECTION__HEADER'>
                <div className='EXPERIENCE-SECTION__HEADER__ROW'>
                    <div className='EXPERIENCE-SECTION__HEADER__TITLE'>{props.title}</div>
                    <div className='EXPERIENCE-SECTION__HEADER__DATES'>{props.dates}</div>
                </div>
                <div className='EXPERIENCE-SECTION__HEADER__ROW'>
                    <div className='EXPERIENCE-SECTION__HEADER__ORG'>{props.org}</div>
                    <div className='EXPERIENCE-SECTION__HEADER__CITY'>{props.city}</div>
                </div>
            </div>
            {props.skills && <LabeledText 
                className='EXPERIENCE-SECTION__SKILLS'
                label={props.skillTitle}
                value={props.skills.join(', ')}
            />}
            {props.bullets && <ul className='EXPERIENCE-SECTION__LIST'>
                {props.bullets.map((bullet, index) => {
                    return <li key={index} className='EXPERIENCE-SECTION__BULLETS'>{bullet}</li>;
                })}
            </ul>}
        </div>
    )
}

export default ExperienceSection;