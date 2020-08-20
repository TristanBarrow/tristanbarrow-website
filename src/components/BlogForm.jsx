import React from 'react';
import { useState } from 'react';

const BlogFrom = (props) => {
    const [blogText, setBlogText] = useState('');

    return (
        <textarea value={blogText} />
    );
}

