import React, { useState, useEffect, useContext } from 'react';
import './History.scss';
import { CgBox } from 'react-icons/cg';
import AccordionTable from '../../Components/AccordionTable/AccordionTable';
import AllAccordionTableSm from '../../Components/AccordionTable/AccordionTableSm/AllAccordionTableSm';
import { FiFilter } from 'react-icons/fi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { BsCalendarEvent } from 'react-icons/bs';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Loader from '../../Components/Loader/Loader';
import data from '../../data.json';
import { MyContext } from '../../context';



function History() {
  const [workProcess, setWorkProcess] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [checked, setChecked] = useState(true);
  const [dataUsers, setDataUsers] = useState([]);
  const [isLoader, setIsLoader] = useState(false)
  const [drawer, setDrawer] = useState({left: false});
  const myContext = useContext(MyContext);


  useEffect(() => {
    let mount = true;
    setIsLoader(true);
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(responseJson => {
      if(mount) {
        setIsLoader(false);
        setDataUsers(responseJson)
      }
    })
    .catch(error => {
      setIsLoader(false);
      alert(error)
    });

    return () => {
      if(mount) {
        mount = false
      }
    }
}, []);

  const toggleDrawer = (open) => (event) => {
  if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    return;
  }
  setDrawer({ left: open });
};

  const resultsHandler = () => {
    myContext.setWorkProcessState(workProcess);
    myContext.setStartTimeContext(startTime);
    myContext.setEndTimeContext(endTime);
    setDrawer({ left: false })
  }

  const resetHandler = () => {
    setWorkProcess('');
    setStartTime('');
    setEndTime('');
    myContext.setWorkProcessState('');
    myContext.setStartTimeContext('');
    myContext.setEndTimeContext('');
    setDrawer({ left: false })
  }

const list = (anchor) => (
  <div role="presentation">
    <List>
      <div className='sidebar_title'>
        <div className='title'>
          <h6><FiFilter size={18} color='#444' /> فرز سجل العمليات حسب</h6>
          <AiOutlineCloseCircle color='#f55157' size={24} onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} />
        </div>
      </div>
      <FormControl className='formControl'>
        <NativeSelect value={workProcess} onChange={(event) => setWorkProcess(event.target.value)} name="work process" inputProps={{ 'aria-label': 'work process' }} >
          <option value=''>سير العمل</option>
          {
            [...new Set([...data.workProcess])].map(e => <option key={e} value={e}>{e}</option>)
          }
        </NativeSelect>
        <MdKeyboardArrowDown className='down_arrow' color='#444' />
      </FormControl>
      <FormControl className='formControl start_time'>
        <NativeSelect value={startTime} onChange={(event) => setStartTime(event.target.value)} name="start time" inputProps={{ 'aria-label': 'start time' }} >
          <option value=''>بداية الوقت</option>
          {
            data.StartDates.map(startTime => (
              <option key={startTime} value={startTime}>
                {`${new Date(startTime).getDate()} ${myContext.arabicMonths[new Date(startTime).getMonth()]} ${new Date(startTime).getFullYear()} , ${myContext.formatAMPM(new Date(startTime))}`}
              </option>
            ))
          }
        </NativeSelect>
        <MdKeyboardArrowDown className='down_arrow' color='#444' />
        <BsCalendarEvent className='calendar' color='#444' />
      </FormControl>
      <div className='to'>إلى</div>
      <FormControl className='formControl'>
        <NativeSelect value={endTime} onChange={(event) => setEndTime(event.target.value)} name="end time" inputProps={{ 'aria-label': 'end time' }} >
        <option value=''>نهاية الوقت</option>
        {
            data.endDates.map(endTime => (
              <option key={endTime} value={endTime}>
                {`${new Date(endTime).getDate()} ${myContext.arabicMonths[new Date(endTime).getMonth()]} ${new Date(endTime).getFullYear()} , ${myContext.formatAMPM(new Date(endTime))}`}
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
            <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} inputProps={{ 'aria-label': 'primary checkbox' }}/>
          }
          label="الإخطاء فقط"
        />
      </div>
      <div className='btns_box'>
        <Button onClick={resultsHandler} variant="contained" className='results' color="primary">عرض النتائج</Button>
        <Button onClick={resetHandler} variant="contained" className='reset' color="primary">إعادة تعين</Button>
      </div>
    </List>
  </div>
  );

  return (
    <div className='history'>
      <Drawer left={'left'} open={drawer['left']} onClose={toggleDrawer(false)} className='sidebar'>
        {list('left')}
      </Drawer>
      <div className='filter'>
        <Button onClick={toggleDrawer(true)}>
          <FiFilter color='444' size={20} />
          <span>تصفية</span>
        </Button>
      </div>
      <div className='history_boxes' style={isLoader ? {minHeight: '300px'} : {minHeight: 'auto'}}>
        <h3 className='history_title'><CgBox size={18} /><span>سجل العمليات</span></h3>
        <div className='sidebar'>
          {list('left')}
        </div>
        {isLoader && <Loader smallSize={45} />}
        {
          !isLoader && dataUsers !== undefined && dataUsers.length > 0 && (
            <>
              <AccordionTable dataUsers={dataUsers} workProcess={workProcess} />
              <AllAccordionTableSm dataUsers={dataUsers} workProcess={workProcess} />
            </>
          )
        }
      </div>
    </div>
  )
}

export default History