import React, { useContext } from 'react';
import AccordionTableSm from './AccordionTableSm';
import data from '../../../data.json';
import { MyContext } from '../../../context';
import './AllAccordionTableSm.scss'

import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';


function AllAccordionTableSm({ dataUsers, workProcess }) {
    const myContext = useContext(MyContext);
    
    function showAccor() {
        if(myContext.startTimeContext === '' && myContext.endTimeContext === '') {
            if(myContext.workProcessState === '') {
                return data.allDates
                .map((date,index) => <AccordionTableSm key={date.startTime} index={index} user={dataUsers[index]} startTime={new Date(date.startTime)} updateDate={new Date(date.endTime)} workProcess={date.workProcess} />)
            } else {
                return data.allDates
                .filter(e => e.workProcess === myContext.workProcessState)
                .map((date,index) => <AccordionTableSm key={date.startTime} index={index} user={dataUsers[index]} startTime={new Date(date.startTime)} updateDate={new Date(date.endTime)} workProcess={date.workProcess} />)
            }

        } else if(myContext.startTimeContext !== '' && myContext.endTimeContext !== '') {
            if(myContext.workProcessState === '') {
                return data.allDates
                .filter(e => new Date(myContext.startTimeContext) <= new Date(e.startTime))
                .filter(e => new Date(myContext.endTimeContext) >= new Date(e.endTime))
                .map((date,index) => <AccordionTableSm key={date.startTime} index={index} user={dataUsers[index]} startTime={new Date(date.startTime)} updateDate={new Date(date.endTime)} workProcess={date.workProcess} />)
            } else {
                return data.allDates
                .filter(e => new Date(myContext.startTimeContext) <= new Date(e.startTime))
                .filter(e => new Date(myContext.endTimeContext) >= new Date(e.endTime))
                .filter(e => e.workProcess === myContext.workProcessState)
                .map((date,index) => <AccordionTableSm key={date.startTime} index={index} user={dataUsers[index]} startTime={new Date(date.startTime)} updateDate={new Date(date.endTime)} workProcess={date.workProcess} />)
            }

        } else if(myContext.startTimeContext !== '' && myContext.endTimeContext === '') {
            if(myContext.workProcessState === '') {
                return data.allDates
                .filter(e => new Date(myContext.startTimeContext) <= new Date(e.startTime))
                .map((date,index) => <AccordionTableSm key={date.startTime} index={index} user={dataUsers[index]} startTime={new Date(date.startTime)} updateDate={new Date(date.endTime)} workProcess={date.workProcess} />)
            } else {
                return data.allDates
                .filter(e => new Date(myContext.startTimeContext) <= new Date(e.startTime))
                .filter(e => e.workProcess === myContext.workProcessState)
                .map((date,index) => <AccordionTableSm key={date.startTime} index={index} user={dataUsers[index]} startTime={new Date(date.startTime)} updateDate={new Date(date.endTime)} workProcess={date.workProcess} />)
            }
            
        } else if(myContext.startTimeContext === '' && myContext.endTimeContext !== '') {
            if(myContext.workProcessState === '') {
                return data.allDates
                .filter(e => new Date(myContext.endTimeContext) >= new Date(e.endTime))
                .map((date,index) => <AccordionTableSm key={date.startTime} index={index} user={dataUsers[index]} startTime={new Date(date.startTime)} updateDate={new Date(date.endTime)} workProcess={date.workProcess} />)
                
            } else {
                return data.allDates
                .filter(e => new Date(myContext.endTimeContext) >= new Date(e.endTime))
                .filter(e => e.workProcess === myContext.workProcessState)
                .map((date,index) => <AccordionTableSm key={date.startTime} index={index} user={dataUsers[index]} startTime={new Date(date.startTime)} updateDate={new Date(date.endTime)} workProcess={date.workProcess} />)
            }
        } else {
            return data.allDates
            .map((date,index) => <AccordionTableSm key={date.startTime} index={index} user={dataUsers[index]} startTime={new Date(date.startTime)} updateDate={new Date(date.endTime)} workProcess={date.workProcess} />)
        }
    }

    return (
        <div className='all_accprdion_table'>
            {showAccor()}
            {showAccor().length === 0 &&  (
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow className='second_cell'>
                                <TableCell align="right" className='taple_title no_item'>لا يوجد عناصر...</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    )
}

export default AllAccordionTableSm
