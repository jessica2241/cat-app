import React, {} from "react";
import '@vkontakte/vkui/dist/vkui.css';
import bridge from '@vkontakte/vk-bridge'
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner";
import Home from "./panels/Home";
import Api from "./Api";
const {useEffect} = require("react");
const {useState} = require("react");

const App = () => {
    // eslint-disable-next-line
    const [User, setUser] = useState(null);
    const idApp: number = 7509105
// eslint-disable-next-line
    const [popout, setPopout] = useState(<ScreenSpinner size='large'/>);


    useEffect(() => {
        bridge.subscribe(({detail: {type, data}}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
                document.body.attributes.setNamedItem(schemeAttribute);
            }
        })
        let api: Api = new Api(idApp)
        if (User === null) {
            api.vkApi.getUserInfo().then(userInfo => {
                setUser(userInfo)
            });
        }
    }, []);


    return (
        <Home User={User}/>
    );
}

export default App;