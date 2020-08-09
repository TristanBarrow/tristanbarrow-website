const SK = require('./skills.js');
module.exports = {
    name: "Tristan Barrow",
    personalInfo: [
        {
            label: 'Phone: ',
            value: '(425) 420-8903'
        },
        {
            label: 'Email: ',
            value: 'tristanmarkbarrow@gmail.com'
        },
        {
            label: 'Github: ',
            value: 'github.com/TristanBarrow'
        },
        {
            label: 'LinkedIn: ',
            value: 'www.linkedin.com/in/tristanmbarrow'
        },
        {
            label: 'Website: ',
            value: 'www.tristanbarrow.com'
        },
    ],
    skills: SK,
    sections: [
        {
            name: 'Work Experience',
            experiences: [
                {
                    title: 'Frontend Developer',
                    org: 'MX Technologies',
                    dates: 'Jan 2020 - Present',
                    city: 'Lehi, UT',
                    skills: [
                        SK.JAVASCRIPT,
                        SK.ES6,
                        SK.NODEJS,
                        SK.AJAX,
                        SK.REACTJS,
                        SK.REACT_NATIVE,
                        SK.REDUX,
                        SK.WEBPACK,
                        SK.SCSS,
                        SK.CPP,
                        SK.COCOS_2D,
                        SK.SWIFT,
                        SK.GIT,
                        SK.RUBY,
                        SK.RAILS,
                        SK.TRIG
                    ],
                    bullets: [
                        'Simplified debugging developer tool resulting in same-day resolutions to customer complaints',
                        'Constructed a chat bubble library using trigonometric equations plus dynamic SVGs for a better customer experience in ReactJS, resulting in natural-looking chat bubbles, not found in any libraries',
                        'Utilized React’s conditional rendering and controlled input systems to respond to dynamically changing and unknown input form requirements'
                    ]
                },
                {
                    title: 'Frontend Developer Intern',
                    org: 'Walmart Labs',
                    dates: 'May 2019 - Aug 2019',
                    city: 'Bentonville, AR',
                    skills: [
                        SK.JAVASCRIPT,
                        SK.ES6,
                        SK.REACTJS,
                        SK.REACT_NATIVE,
                        SK.NODEJS,
                        SK.REDUX,
                        SK.SAGAS,
                        SK.YOGA,
                        SK.WEBPACK,
                    ],
                    bullets: [
                        'Trained full-time developers who were new to React Native producing improved productivity for the team',
                        'Implemented analytics UI enabling accelerated customer feedback to employees on the retail floor'
                    ]
                },
                {
                    title: 'Frontend Developer Intern',
                    org: 'Basemap Inc',
                    dates: 'Jan 1018 - Apr 2018',
                    city: 'Bothell, WA',
                    skills: [
                        SK.JAVASCRIPT,
                        SK.ES6,
                        SK.NODEJS,
                        SK.SCSS,
                        SK.REACTJS,
                        SK.JMETER,
                        SK.BASH,
                        SK.LINUX,
                        SK.DOCKER
                    ],
                    bullets: [
                        'Built dynamic automated regression tests based on geolocation to retain the integrity of a GIS Server',
                        'Refactored 2000 lines of inline styles with configurable styles for fluid iteration with UX'
                    ]
                },
                {
                    title: 'Calculus Tutor',
                    org: 'BYU-Idaho Tutoring Center',
                    dates: 'Jan 2017 - Apr 2017',
                    city: 'Rexburg, ID',
                    skills: [
                        SK.CALCULUS,
                        SK.LINEAR_ALGEBRA,
                        SK.TRIG,
                        SK.GEOMETRY,
                        SK.PROBABILITY,
                        SK.STATISTICS
                    ],
                    bullets: [
                        'Boosted student morale by explaining concepts that students previously believed were difficult'
                    ]
                }
            ]
        },
        {
            name: 'Education',
            experiences: [
                {
                    title: 'Bachelor of Science (Software Engineering)',
                    org: 'BYU-Idaho',
                    dates: '2016 - 2019',
                    city: 'Rexburg, ID',
                },
                {
                    title: 'Accociate Degree',
                    org: 'Cascadia College',
                    dates: '2016 - 2019',
                    city: 'Bothell, WA',
                    bullets: [ 'Completed with High School' ]
                },
            
            ]
        },

    ]



}