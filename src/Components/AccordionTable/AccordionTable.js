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
            return dataUsers.length !== undefined && dataUsers.length > 0 && data.StartDates.map((date, index) => (
                <Row key={index} index={index} user={dataUsers[index]} startTime={new Date(date)} updateDate={new Date(data.endDates[index])} />
            ))

        } else if(myContext.startTimeContext !== '' && myContext.endTimeContext !== '') {
            return (
                <>
                    {data.StartDates.filter(e => new Date(myContext.startTimeContext) <= new Date(e)).map((date,index) => <Row key={index} index={index} user={dataUsers[index]} startTime={new Date(date)} updateDate={new Date(data.endDates[index])} />)}
                    {data.endDates.filter(e => new Date(myContext.endTimeContext) >= new Date(e)).map((date,index) => <Row key={index} index={index} user={dataUsers[index]} startTime={new Date(date)} updateDate={new Date(data.endDates[index])} />)}
                </>
            )
        } else if(myContext.startTimeContext !== '' && myContext.endTimeContext === '') {
            return (
                <>
                    {data.StartDates.filter(e => new Date(myContext.startTimeContext) <= new Date(e)).map((date,index) => <Row key={index} index={index} user={dataUsers[index]} startTime={new Date(date)} updateDate={new Date(data.endDates[index])} />)}
                    {data.endDates.filter(e => new Date(myContext.endTimeContext) >= new Date(e)).map((date,index) => <Row key={index} index={index} user={dataUsers[index]} startTime={new Date(date)} updateDate={new Date(data.endDates[index])} />)}
                </>
            )
            
        } else if(myContext.startTimeContext === '' && myContext.endTimeContext !== '') {
            return (
                <>
                    {data.StartDates.filter(e => new Date(myContext.startTimeContext) <= new Date(e)).map((date,index) => <Row key={index} index={index} user={dataUsers[index]} startTime={new Date(date)} updateDate={new Date(data.endDates[index])} />)}
                    {data.endDates.filter(e => new Date(myContext.endTimeContext) >= new Date(e)).map((date,index) => <Row key={index} index={index} user={dataUsers[index]} startTime={new Date(date)} updateDate={new Date(data.endDates[index])} />)}
                </>
            )
        } else {
            return dataUsers.length !== undefined && dataUsers.length > 0 && data.StartDates.map((date, index) => (
                <Row key={index} index={index} user={dataUsers[index]} startTime={new Date(date)} updateDate={new Date(data.endDates[index])} />
            ))
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
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default AccordionTable
