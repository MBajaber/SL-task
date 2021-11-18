import React,{ useContext } from 'react';
import './AccordionTable.scss';
import Row from './AccordionTableRow/AccordionTableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import data from '../../data.json';
import { MyContext } from '../../context';

function AccordionTable({ dataUsers }) {
    const myContext = useContext(MyContext);

    function showAccor() {
        if(myContext.startTimeContext === '' && myContext.endTimeContext === '') {
            if(myContext.workProcessState === '') {
                return data.allDates
                .map((date,index) => <Row key={date.startTime} index={index} user={dataUsers[index]} startTime={new Date(date.startTime)} updateDate={new Date(date.endTime)} workProcess={date.workProcess} />)
            } else {
                return data.allDates
                .filter(e => e.workProcess === myContext.workProcessState)
                .map((date,index) => <Row key={date.startTime} index={index} user={dataUsers[index]} startTime={new Date(date.startTime)} updateDate={new Date(date.endTime)} workProcess={date.workProcess} />)
            }

        } else if(myContext.startTimeContext !== '' && myContext.endTimeContext !== '') {
            if(myContext.workProcessState === '') {
                return data.allDates
                .filter(e => new Date(myContext.startTimeContext) <= new Date(e.startTime))
                .filter(e => new Date(myContext.endTimeContext) >= new Date(e.endTime))
                .map((date,index) => <Row key={date.startTime} index={index} user={dataUsers[index]} startTime={new Date(date.startTime)} updateDate={new Date(date.endTime)} workProcess={date.workProcess} />)
            } else {
                return data.allDates
                .filter(e => new Date(myContext.startTimeContext) <= new Date(e.startTime))
                .filter(e => new Date(myContext.endTimeContext) >= new Date(e.endTime))
                .filter(e => e.workProcess === myContext.workProcessState)
                .map((date,index) => <Row key={date.startTime} index={index} user={dataUsers[index]} startTime={new Date(date.startTime)} updateDate={new Date(date.endTime)} workProcess={date.workProcess} />)
            }

        } else if(myContext.startTimeContext !== '' && myContext.endTimeContext === '') {
            if(myContext.workProcessState === '') {
                return data.allDates
                .filter(e => new Date(myContext.startTimeContext) <= new Date(e.startTime))
                .map((date,index) => <Row key={date.startTime} index={index} user={dataUsers[index]} startTime={new Date(date.startTime)} updateDate={new Date(date.endTime)} workProcess={date.workProcess} />)
            } else {
                return data.allDates
                .filter(e => new Date(myContext.startTimeContext) <= new Date(e.startTime))
                .filter(e => e.workProcess === myContext.workProcessState)
                .map((date,index) => <Row key={date.startTime} index={index} user={dataUsers[index]} startTime={new Date(date.startTime)} updateDate={new Date(date.endTime)} workProcess={date.workProcess} />)
            }
            
        } else if(myContext.startTimeContext === '' && myContext.endTimeContext !== '') {
            if(myContext.workProcessState === '') {
                return data.allDates
                .filter(e => new Date(myContext.endTimeContext) >= new Date(e.endTime))
                .map((date,index) => <Row key={date.startTime} index={index} user={dataUsers[index]} startTime={new Date(date.startTime)} updateDate={new Date(date.endTime)} workProcess={date.workProcess} />)
                
            } else {
                return data.allDates
                .filter(e => new Date(myContext.endTimeContext) >= new Date(e.endTime))
                .filter(e => e.workProcess === myContext.workProcessState)
                .map((date,index) => <Row key={date.startTime} index={index} user={dataUsers[index]} startTime={new Date(date.startTime)} updateDate={new Date(date.endTime)} workProcess={date.workProcess} />)
            }
        } else {
            return data.allDates
            .map((date,index) => <Row key={date.startTime} index={index} user={dataUsers[index]} startTime={new Date(date.startTime)} updateDate={new Date(date.endTime)} workProcess={date.workProcess} />)
        }
    }

    return (
        <div className='history_accordion'>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right" /> 
                            <TableCell align="right">الحالة</TableCell>
                            <TableCell align="right">أخر تحديث</TableCell>
                            <TableCell align="right">بداية الوقت</TableCell>
                            <TableCell align="right">إجراء</TableCell>
                            <TableCell align="right">كيان</TableCell>
                            <TableCell align="right">سير العمل</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {showAccor()}
                    {showAccor().length === 0 && (<tr><td></td><td></td><td></td><td className='no_item'>...لا يوجد عناصر</td><td></td><td></td><td></td></tr>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default AccordionTable
