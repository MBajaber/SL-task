import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';
import './WebhooksList.scss';

function WebhooksList({ id, name, desc }) {
    const [randomValue] = useState(Math.ceil(Math.random() * 19))
    const [isChecked, setIsChecked] = useState(randomValue > 5)
    return (
        <div className='webhooks_list'>
            <div className='list_name_column'>
                <span className='list_name'>{name}</span>
                <div className='list_desc_small'>
                    <span>نوع الحدث:</span>
                    <p>{desc !== undefined && desc.length > 0 &&  id === 9 ? '' : desc.length < 19 ? desc : `${desc.slice(0, 20)}...`}</p>
                </div>
            </div>
            <div className='list_desc_switch_column'>
                <p className='list_desc'>{desc !== undefined && desc.length > 0 &&  id === 9 ? '' : desc.length < 19 ? desc : `${desc.slice(0, 20)}...`}</p>
                <div className='list_switch'>
                    <Switch
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </div>
            </div>
        </div>
    )
}

export default WebhooksList
