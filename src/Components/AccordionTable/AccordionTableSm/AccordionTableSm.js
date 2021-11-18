import React, { useState } from 'react';
import './AccordionTableSm.scss';
import RowSM from './AccordionTableRowSm/AccordionTableRowSm';
import { BsFillArrowUpCircleFill, BsArrowDownCircle } from 'react-icons/bs';
import IconButton from '@material-ui/core/IconButton';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';

function AccordionTableSm({ index, user, startTime, updateDate, workProcess }) {
    const [open, setOpen] = useState(index === 0);
    return (
        <div className='history_accordion_sm'>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow className='second_cell'>
                            <TableCell align="right" className='taple_title with_icon'>
                                <h4>{workProcess}</h4>
                                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                                    {open ? <BsFillArrowUpCircleFill color='#5CD5C4' size={24} /> : <BsArrowDownCircle color='#5CD5C4' size={24} />}
                                </IconButton>
                            </TableCell>
                            <TableCell align="right" className='taple_title'>سير العمل</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    <RowSM index={index} user={user} startTime={startTime} updateDate={updateDate} open={open} />
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default AccordionTableSm;