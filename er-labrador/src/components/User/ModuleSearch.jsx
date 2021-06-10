import { AutoComplete } from 'antd';
import TopDrawer from './TopDrawer';
import React, { useState, useEffect} from 'react';
import {useSubscribe, usePublish, useUnsubscribe} from './UsePubSub';

function ModuleSearch(props) {
    // 自动补全所需value对象数组

    const publish = usePublish();
    const unsubscribe = useUnsubscribe();

    const [child, setChild] = useState(null);
    const [modules, setModules] = useState([]);
    const [moduleNames, setModuleNames] = useState([]);

    const update = useSubscribe('active_modules', (_, modules) => {
        setModules(modules)
        const moduleNames = [];
        for(let i in modules) {
            var temp = {};
            temp.value = modules[i].ModuleName;
            moduleNames.push(temp);
        }

        setModuleNames(moduleNames);
    });

    useEffect(() => () => {
        unsubscribe(update);
    }, [update]);

    const onRef = (ref) => {
        setChild(ref);
    }

    const showDrawer = (value, option) => {

        var desc = '';
        for(let i in {modules}.modules) {
            if(value === {modules}.modules[i].ModuleName) {
                desc = {modules}.modules[i].Description === null ? 'null' : {modules}.modules[i].Description
            }
        }

        child.showDrawer(value, desc)
    }

    const Complete = () => (
    <AutoComplete
        style={{
        width: 200,
        left: 25
        }}
        options={ moduleNames }
        placeholder="Search modules..."
        filterOption={(inputValue, option) =>
        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        onSelect={ showDrawer }
        allowClear
    />
    );

    return (
        <div>
            <TopDrawer onRef={ onRef }/>
            <Complete />
        </div>
    )
}

export default ModuleSearch;
