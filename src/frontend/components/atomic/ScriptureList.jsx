import React, { useState, useEffect} from 'react';
import {
    Switch,
    Link,
    Route,
    useRouteMatch,
    useParams
} from 'react-router-dom';
import getScriptureData from '../../fetch-req/scriptures/getScriptureData';
import '../styles/ScriptureList.scss';
const clean = require('../util/cleanScriptureName.js');

const ScriptureList = (props) => {
    const [data, setData] = useState([]);
    const [oldUrl, setOldUrl] = useState('base');
    let { path, url } = useRouteMatch();
    let { id } = useParams();
    const arr = url.split('/');
    const isLeaf = (arr[2] === 'dnc' && arr.length === 5)|| arr.length === 6;

    useEffect(() => {
        if (oldUrl !== url) {
            if (isLeaf) {
                getScriptureData(url, (newData) => {
                    setData(newData);
                    setOldUrl(url);
                });
            } else {
                getScriptureData(url + '/keys', (newData) => {
                    setData(newData);
                    setOldUrl(url);
                });
            }
           
            
        }
    });

    
    return (
        <div className='SCRIPTURE-LIST'>
            <div className='SCRIPTURE-LIST__ROW'>
    {isLeaf && <div className='SCRIPTURE-LIST__ITEM'>{`${id}. ${data.text}`}</div>}
                {!isLeaf && data.map((dataItem) => {

                    if (dataItem === 'heading') return null;
                    return (
                        
                        <Link className={`SCRIPTURE-LIST__ITEM`} key={dataItem} to={`${url}/${dataItem}`}>
                            {clean(dataItem)}
                        </Link>
                    );
                })}
            </div>
            
            <Switch>
                <Route path={`${url}/:id`}>
                    <ScriptureList />
                </Route>                
            </Switch>
        </div>
    );
}

export default ScriptureList;