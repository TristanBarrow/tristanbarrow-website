import React from 'react';
import ExperienceSection from './ExperienceSection.jsx';
import LabeledText from './LabeledText.jsx';
import LabeledLink from './LabeledLink.jsx';
import '../styles/Resume.scss';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const resume = require('../../cradle/resume');

const Container = styled.div`
    position: relative;
    padding: 1.6rem;
    margin-top: 1.6rem;
    max-width: 800px;
    left: 50%;
    transform: translate(-50%);
    background-color: white;
    border-radius: .8rem;
    box-shadow: 0 0 30px #888;
    transition: .3s;

    @media only screen and (max-width: 635px) {
        min-width: 335px;
        left: 0;
        transform: none;
    }

    @media only screen and (max-width: 850px) {
        margin: 0;
        background-color:white;
        max-width: none;
        box-shadow: none;
        border-radius: 0;
        transition: .3s;
    }
`;

const Title = styled.div`
    font-size: 6rem;
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    @media only screen and (max-width: 635px) {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

    }
`;

const HeaderInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 50%;
    box-sizing: border-box;
    color: red;
    @media only screen and (max-width: 635px) {
        width: 100%;
    }
`;

const skillTitle = 'Skills Used: ';

const Resume = () => {
    return (
        <Container>
            <Title>Bob</Title>
            <Header>
                <HeaderInfo>
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
                    <div>
                        <span className='RESUME__HEADER__INFO-ITEM--LABEL'>
                                {'Website: '}
                        </span>
                        <Link to='/' className='RESUME__HEADER__INFO-ITEM'>
                            www.tristanbarrow.com
                        </Link>
                    </div>
                </HeaderInfo>
                <LabeledText 
                    className='RESUME__HEADER__SKILLS'
                    label={'Technologies Used: '}
                    value={' ' + Object.values(resume.skills).join(', ')}
                />
            </Header>
            {resume.sections.map((section, section_index) => {
                return (
                    <div>
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
                    </div>
                )
            })}
        </Container>
    );
}

export default Resume;