import React from 'react';
import ExperienceSection from './ExperienceSection.jsx';
import LabeledText from './LabeledText.jsx';
import '../styles/Resume.scss';
const resume = require('../cradle/resume');

const tempSkills = 'JavaScript, ES6, NodeJS, Ajax, ReactJS, Redux, Webpack, React Native, SCSS/CSS, C++, Cocos2d, Swift, Git, Ruby, Rails, Trigonometry';
const tempBullets = [
    'Simplified debugging developer tool resulting in same-day resolutions to customer complaints',
    'Constructed a chat bubble library using trigonometric equations plus dynamic SVGs for a better customer experience in ReactJS, resulting in natural-looking chat bubbles, not found in any libraries',
    'Utilized React’s conditional rendering and controlled input systems to respond to dynamically changing and unknown input form requirements',
]

const Resume = () => {
    return (
        <div className='RESUME'>
            <div className='RESUME__TITLE'>Tristan Barrow</div>
            <div className='RESUME__HEADER'>
                <div className='RESUME__HEADER__INFO'>
                    {resume.personalInfo.map((info, info_index) => {
                        return (
                            <LabeledText 
                                className='RESUME__HEADER__INFO-ITEM'
                                label={info.label}
                                value={info.value}
                            />
                        );
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
                                    skillTitle={'Skills Used: '}
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