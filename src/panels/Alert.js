import * as React from "react";
import {Alert} from "@vkontakte/vkui";
import {useState} from "react";


const AlertPanel = () => {

    const [popout, setPopout] = useState(null);


    function closePopout () {
        setPopout(null);
    }

        return (
            <Alert
                actions={[{
                    title: 'Отмена',
                    autoclose: true,
                    mode: 'cancel'
                }, {
                    title: 'Повторить',
                    autoclose: true,
                }]}
                onClose={closePopout}
            >
                <h2>Подтвердите действие</h2>
                <p>Повторить пользователю право на модерацию контента.</p>
            </Alert>
        )
    }

export default AlertPanel;