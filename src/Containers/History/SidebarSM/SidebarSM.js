import React, { useContext } from 'react'
import { FiFilter } from 'react-icons/fi';
import data from '../../../data.json';
import List from '@material-ui/core/List';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { BsCalendarEvent } from 'react-icons/bs';
import { MyContext } from '../../../context';



function SidebarSM({ changeHandler, workProcess, startTime, endTime, checked }) {
    const myContext = useContext(MyContext);

    const list = (anchor) => (
    <div role="presentation">
        <List>
            <div className='sidebar_title'>
                <div className='title'>
                    <h6><FiFilter size={18} color='#444' /> فرز سجل العمليات حسب</h6>
                </div>
            </div>
            <FormControl className='formControl'>
                <NativeSelect value={workProcess} onChange={(event) => changeHandler({name:'setWorkProcess', value: event.target.value}) } name="work process" inputProps={{ 'aria-label': 'work process' }} >
                <option value=''>سير العمل</option>
                {
                    [...new Set([...data.allDates.map(work => work.workProcess)])].map(e => <option key={e} value={e}>{e}</option>)
                }
                </NativeSelect>
                <MdKeyboardArrowDown className='down_arrow' color='#444' />
            </FormControl>
            <FormControl className='formControl start_time'>
                <NativeSelect value={startTime} onChange={(event) => changeHandler({name:'setStartTime', value: event.target.value})} name="start time" inputProps={{ 'aria-label': 'start time' }} >
                <option value=''>بداية الوقت</option>
                {
                    data.allDates.map(date => (
                    <option key={date.startTime} value={date.startTime}>
                        {`${new Date(date.startTime).getDate()} ${myContext.arabicMonths[new Date(date.startTime).getMonth()]} ${new Date(date.startTime).getFullYear()} , ${myContext.formatAMPM(new Date(date.startTime))}`}
                    </option>
                    ))
                }
                </NativeSelect>
                <MdKeyboardArrowDown className='down_arrow' color='#444' />
                <BsCalendarEvent className='calendar' color='#444' />
            </FormControl>
            <div className='to'>إلى</div>
            <FormControl className='formControl'>
                <NativeSelect value={endTime} onChange={(event) => changeHandler({name:'setEndTime', value: event.target.value})} name="end time" inputProps={{ 'aria-label': 'end time' }} >
                <option value=''>نهاية الوقت</option>
                {
                    data.allDates.map(date => (
                    <option key={date.endTime} value={date.endTime}>
                        {`${new Date(date.endTime).getDate()} ${myContext.arabicMonths[new Date(date.endTime).getMonth()]} ${new Date(date.endTime).getFullYear()} , ${myContext.formatAMPM(new Date(date.endTime))}`}
                    </option>
                    ))
                }
                </NativeSelect>
                <MdKeyboardArrowDown className='down_arrow' color='#444' />
                <BsCalendarEvent className='calendar' color='#444' />
            </FormControl>
            <div className='checkbox_btn'>
                <FormControlLabel
                control={
                    <Checkbox checked={checked} onChange={event => changeHandler({name:'setChecked', value: event.target.checked})} inputProps={{ 'aria-label': 'primary checkbox' }}/>
                }
                label="الإخطاء فقط"
                />
            </div>
        </List>
    </div>
);
      

    return (
        <div className='sidebar'>
          {list('left')}
        </div>
    )
}

export default SidebarSM
