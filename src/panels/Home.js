import React, {useState} from "react";
import {
    Alert,
    Button,
    Caption,
    Cell,
    Div,
    Group,
    InfoRow,
    ModalCard,
    ModalRoot,
    Panel,
    Progress, Text,
    View,
    Header,
    Gallery,
    PanelHeader, ModalPageHeader, PanelHeaderButton, ModalPage, CellButton
} from "@vkontakte/vkui";
import Api from "../Api";
import VkApi from '../VkApi'
import FormLayoutGroup from "@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import List from "@vkontakte/vkui/dist/components/List/List";
import Icon24Add from '@vkontakte/icons/dist/24/add';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel'
import Icon56LockOutline from '@vkontakte/icons/dist/56/lock_outline';
import Icon28MessagesOutline from '@vkontakte/icons/dist/28/messages_outline';
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner";

const json = require('./packs')
const Home = (User) => {



    const [popout, setPopout] = useState(null);
    const [status, setStatus] = useState(false);
    let [count, setCount] = useState(0);
    let [maxCount, setMaxCount] = useState(0);
    let [modal, setModal] = useState(null);

    let [bonus, setBonus] = useState(false);



    const idGroup: number = 194561673
    const idApp: number = 7509105
    let api: Api = new Api(idApp)
    const http = new XMLHttpRequest()







    const ClickInfo = (event: React.MouseEvent) => {
        setModal("info")
    }

    // eslint-disable-next-line no-extend-native
    Array.prototype.remove = function() {
        var what, a = arguments, L = a.length, ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    };




    async function t() {
        await sleep(200)
    }
    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }


    // eslint-disable-next-line no-unused-vars
    function pause() {
        return new Promise(resolve => setTimeout(() => {
            console.log(``);
            resolve();
        }, 1500));
    }


    function ClickStory() {

        api.vkApi.getAccessToken(api.idApp, 'stories').then(
            data => {
                console.log(data)
                const vk = new VkApi(data.accessToken);
                setPopout(<ScreenSpinner size='large'/>)                //TODO: LINK
                vk.request("stories.getPhotoUploadServer", "add_to_news=1&link_url=https://vk.com/app7509105").then(
                    data => {
                        let uurl = data['response']['upload_url']
                        let url = 'https://help-please.mooo.com:81/story?id=' + User.User.id.toString()+'&url='+uurl
                        http.open("GET", url)
                        http.send()
                        http.onreadystatechange = function () {
                            if (this.readyState === 4 && this.status === 200) {
                                const data = JSON.parse(this.responseText);
                                console.log(data)
                                setPopout(null)
                                setBonus(true)
                                if (data === true) {
                                    setPopout(
                                        <Alert
                                            onClose={function () {
                                                setPopout(null)
                                            }}
                                        >
                                            <h2>Круто!</h2>
                                            <p> Вы успешно опубликовали историю! Спасибо!</p>
                                        </Alert>)
                                } else {
                                    console.log(data);
                                    setPopout(
                                        <Alert
                                            actions={[{
                                                title: 'Отмена',
                                                autoclose: true,
                                                mode: 'cancel'
                                            }, {
                                                title: 'Повторить',
                                                autoclose: true,
                                            }]}
                                            onClose={function () {
                                                setPopout(null)
                                            }}
                                        >
                                            <h2>Ошибка запроса #003</h2>
                                            <p> {data} </p>
                                        </Alert>)
                                }
                            } else {
                                setPopout(
                                    <Alert
                                        actions={[{
                                            title: 'Отмена',
                                            autoclose: true,
                                            mode: 'cancel'
                                        }, {
                                            title: 'Повторить',
                                            autoclose: true,
                                        }]}
                                        onClose={function () {
                                            setPopout(null)
                                        }}
                                    >
                                        <h2>Ошибка #2023</h2>
                                        <p>Временно недоступно. Попробуйте позже.</p>
                                    </Alert>)
                            }
                        }
                    },
                    err => {
                        console.log(err)
                        setPopout(
                            <Alert
                                actions={[{
                                    title: 'Отмена',
                                    autoclose: true,
                                    mode: 'cancel'
                                }, {
                                    title: 'Повторить',
                                    autoclose: true,
                                }]}
                                onClose={function () {
                                    setPopout(null)
                                    ClickStory()
                                }}
                            >
                                <h2>Ошибка #113</h2>
                                <p>Временно недоступно. Попробуйте позже.</p>
                            </Alert>)
                    }
                )
            })
    }



    return (
                <View modal={
                    <ModalRoot
                    activeModal={modal}
                    onClose={() => setModal(null)}>

                        <ModalPage
                            id="info"
                            header={
                                <ModalPageHeader

                                    right={<PanelHeaderButton > <Icon24Cancel/> </PanelHeaderButton>}
                                >
                                    Подробная информация
                                </ModalPageHeader>
                            }
                        >
                            <Text weight="regular" style={{ marginBottom: 16 }}>
                                Всем доброго времени суток. Хочу поделиться своей проблемой, у меня заболела моя кошка Туся.. Я никому ничего не навязываю, просто ситуация сложная, возможно у кого-то есть желaние помочь..
                                Всё было хорошо, но на днях моя кошка Туся стала плохо есть, пить и перестала ходить в туалет. Ко всему прочему, я обнаружила опухоль размером с детский кулак у Туси на животе.
                                В четверг Тусю срочно повезла в клинику, где ей сделали УЗИ, поставили диагноз "нефрит" и рекомендовали сдать кровь и консультацию хирурга.
                                Вчера я пошла с ней на приём к врачу, ей сделали рентген врач, прощупала грыжу и взяла анализы крови. Грыжа большая и периодически происходит её защемление, из - за чего у Туськи пропадает аппетит и ей становится не сходить в туалет.. Надо срочно делать операцию, иначе это может плохо кончится ((
                                С операцией медлить было нельзя и я оставила Тусю в клинике в стационаре, где ей сразу поставили капельницу, чтобы она поела хоть внутривенно. В 20.00 СЕГОДНЯ У ТУСИ ОПЕРАЦИЯ! На операции будут убирать грыжу и смотреть, что там ещё внутри требует вмешательства. Сегодня я отдала за анализы и рентген 1940 руб. После самой операции Тусю оставят на несколько дней в стационаре на капельницах. Думаю, что общий счёт будет порядка 10-15 тысяч рублей! Мне эту сумму не осилить совсем, ПРОШУ ВАШЕЙ ПОМОЩИ!
                            </Text>
                            <Button size="xl"  target="_blank" href="https://vk.com/app6471849_-194401399" mode="commerce" >Помочь финансово</Button>
                        <Text weight="semibold" style={{ marginBottom: 20}} aria-setsize="3" >Прошу Вас, не проходите мимо! :(</Text>
                        </ModalPage>

                </ModalRoot>} popout={popout} activePanel="div">
                    <Panel id="div">

                        <Div>
                            <PanelHeader>Помощь Тусе</PanelHeader>
                            <Group>

                                    <div> <img src="img/files/file%20(3).jpg"
                                               width="350" height="350" alt="lorem"/></div>



                                <Text weight="regular" style={{ marginBottom: 16 }}>Тусе срочно нужна операция!</Text>

                                    <Button size="xl" onClick={ClickInfo} mode="secondary" >Подробнее</Button>
                                    <Button size="xl"  target="_blank" href="https://vk.com/app6471849_-194401399" mode="commerce" >Помочь финансово</Button>
                                <Button size="xl" disabled={bonus} className={"bonus"} onClick={ClickStory} mode="primary" >Поделиться в истории</Button>


                                <div className="progress">
                                <Caption  level="1" weight="bold" style={{marginBottom: 16}}> </Caption>
                                <InfoRow header={"Собрано " + count.toString() + "руб. "+maxCount.toString()+" руб!"}>
                                    <Progress value={count*10}/>
                                </InfoRow></div>

                                <div>  <img src="img/files/file%20(5).jpg"
                                            width="350" height="250" alt="lorem"/></div>
                                <div> <img src="img/files/file%20(4).jpg"
                                           width="189" height="300" alt="lorem"/></div>


                                <Button size="xl" onClick={ClickInfo} mode="secondary" >Подробнее</Button>
                                <Button size="xl"  target="_blank" href="https://vk.com/app6471849_-194401399" mode="commerce" >Помочь финансово</Button>
                                <Button size="xl" disabled={bonus} className={"bonus"} onClick={ClickStory} mode="primary" >Поделиться в истории</Button>


                            </Group>
                        </Div>
                    </Panel>
                </View>

            )
        }

        export default Home

