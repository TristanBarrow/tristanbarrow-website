import React from 'react';
import ExperienceSection from './ExperienceSection.jsx';
import LabeledText from './LabeledText.jsx';
import LabeledLink from './LabeledLink.jsx';
import '../styles/Resume.scss';
const resume = require('../cradle/resume');

const skillTitle = 'Skills Used: ';

const Resume = () => {
    return (
        <div className='RESUME'>
            <div className='RESUME__TITLE'>Tristan Barrow</div>
            <div className='RESUME__HEADER'>
                <div className='RESUME__HEADER__INFO'>
                    {resume.personalInfo.map((info, info_index) => {

                        if (info.link) {
                            return (    
                                <LabeledLink
                                    key={info_index}
                                    className='RESUME__HEADER__INFO-ITEM'
                                    label={info.label}
                                    value={info.value}
                                    link={info.link}
                                />
                            );
                        } else {
                            return (
                                <LabeledText
                                    key={info_index}
                                    className='RESUME__HEADER__INFO-ITEM'
                                    label={info.label}
                                    value={info.value}
                                />  
                            );
                        }
                        
                    })}
                </div>
                <LabeledText 
                    className='RESUME__HEADER__SKILLS'
                    label={'Technologies Used: '}
                    value={' ' + Object.values(resume.skills).join(', ')}
                />
            </div>
            {resume.sections.map((section, section_index) => {
                return (
                    <React.Fragment key={section_index}>
                        <div className='RESUME__SECTION-NAME'>{section.name}</div>
                        {section.experiences.map((experience, experience_index) => {
                            return (
                                <ExperienceSection
                                    key={experience_index}
                                    title={experience.title}
                                    dates={experience.dates}
                                    org={experience.org}
                                    city={experience.city}
                                    skillTitle={skillTitle}
                                    skills={experience.skills}
                                    bullets={experience.bullets}
                                />
                            );
                        })}
                    </React.Fragment>
                )
            })}
            

            
        </div>

    );
}

export default Resume;