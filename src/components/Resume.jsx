import React from 'react';
import ContactInfo from './ContactInfo.jsx';
import Skills from './Skills.jsx';
import ResumeSection from './ResumeSection.jsx';

const tempSkills = 'Skills Used: JavaScript, ES6, NodeJS, Ajax, ReactJS, Redux, Webpack, React Native, SCSS/CSS, C++, Cocos2d, Swift, Git, Ruby, Rails, Trigonometry';
const tempBullets = [
    'Simplified debugging developer tool resulting in same-day resolutions to customer complaints',
    'Constructed a chat bubble library using trigonometric equations plus dynamic SVGs for a better customer experience in ReactJS, resulting in natural-looking chat bubbles, not found in any libraries',
    'Utilized React’s conditional rendering and controlled input systems to respond to dynamically changing and unknown input form requirements',
]


const Resume = () => {
    return (
        <div>
            <div>Tristan Barrow</div>
            <div>
                <ContactInfo />
                <Skills />
            </div>
            <div>Work Experience</div>
            <ResumeSection
                title={'Frontend Developer'}
                dates={'Jan 2020 - Present'}
                org={'MX Technologies'}
                city={'Lehi, UT'}
                skills={tempSkills}
                bullets={tempBullets}

            />
        </div>

    );
}

export default Resume;