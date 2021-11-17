import React, { useEffect, useState } from 'react';
import './Webhooks.scss';
import { AiOutlineFork } from 'react-icons/ai';
import { CgBox } from 'react-icons/cg';
import WebhooksList from '../../Components/WebhooksList/WebhooksList';
import Loading from '../../Components/Loader/Loader';
import { Link } from 'react-router-dom';

function Webhooks() {
    const [data, setData] = useState([])
    const [isLoader, setIsLoader] = useState(false)
    
    useEffect(() => {
        let mounted = true;
        setIsLoader(true);
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(responseJson => {
            if(mounted) {
                setIsLoader(false);
                setData(responseJson)
            }
        })
        .catch(error => {
            setIsLoader(false);
            alert(error)
        })

        return () => { mounted = false }
    }, []);

    return (
        <div className='webhooks'>
            <section className='add_new_history'>
                <button className='add_new_btn'> <AiOutlineFork size={20} /> إضافة جديد</button>
                <div className='history_btn'>
                    <Link to='/history'><CgBox size={18} /><span>سجل العمليات</span></Link>
                </div>
            </section>
            <section className='webhooks_options' style={isLoader ? {height: '250px'} : null}>
                <h3 className='webhooks_title'><AiOutlineFork size={22} /> <span>webhooks</span></h3>
                {isLoader && <Loading smallSize={45} />}
                {data.length > 0 && (
                    <div className='options'>
                        <div className='options_header'>
                            <div className='name_column'>
                                <span className='event_name'>اسم الحدث</span>
                            </div>
                            <div className='type_switch_column'>
                                <span className='event_type'>نوع الحدث</span>
                                <span className='event_switch'>تفعيل/تعطيل</span>
                            </div>
                        </div>
                        <div className='options_list'>
                            { data.length > 0 &&  data.slice(0, 9).map(user => <WebhooksList key={user.id} id={user.id} checkedValue={false} name={user.name} desc={user.company.catchPhrase} />)}
                        </div>
                    </div>
                )}
            </section>
        </div>
    )
}

export default Webhooks
