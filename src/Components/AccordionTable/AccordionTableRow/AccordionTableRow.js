import React, { useState, Fragment, useContext } from 'react';
import { BsFillArrowUpCircleFill, BsArrowDownCircle ,BsCheckCircle } from 'react-icons/bs';
                                    
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import TableRow from '@material-ui/core/TableRow';
import Collapse from '@material-ui/core/Collapse';
import './AccordionTableRow.scss';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import data from '../../../data.json';
import { MyContext } from '../../../context';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));


function Row({ index, user, startTime, updateDate }) {
  const [open, setOpen] = useState(index === 0);
  const myContext = useContext(MyContext);
  const classes = useStyles();
  // myContext.workProcessState
  return (
    <Fragment>
      {
        myContext.workProcessState === '' ? (
          <Fragment>
            <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <BsFillArrowUpCircleFill color='#5CD5C4' size={24} /> : <BsArrowDownCircle color='#5CD5C4' size={24} />}
          </IconButton>
        </TableCell>
        <TableCell align="right"><BsCheckCircle size={22} color='#5CD5C4' /></TableCell>
        <TableCell align="right">
          <bdi style={{direction: 'rtl'}}>
            <time dateTime={updateDate}>{`${updateDate.getDate()} ${myContext.arabicMonths[updateDate.getMonth()]} ${updateDate.getFullYear()} , ${myContext.formatAMPM(updateDate)}`}</time>
          </bdi>
        </TableCell>
        <TableCell align="right">
          <bdi style={{direction: 'rtl'}}>
            <time dateTime={startTime}>{`${startTime.getDate()} ${myContext.arabicMonths[startTime.getMonth()]} ${startTime.getFullYear()} , ${myContext.formatAMPM(startTime)}`}</time>
          </bdi>
        </TableCell>
        <TableCell align="right">{user.username.toLowerCase()}</TableCell>
        <TableCell align="right">{`id-${user.address.street.split(' ')[0].toLowerCase()}${user.address.zipcode.split('-')[0]}`}</TableCell>
        <TableCell align="right">{data.workProcess[index]}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} className='table_body' colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
              <div className='table_body_in'>
                <div className='table_body_code'>
                  <h4 className='table_body_title'>تشغيل سيرة العمل</h4>
                  <div className='code_box'>
                    <pre className='code'>
<span>{`#version 430 core`}</span>
{`
layout(local_size_x = 1, local_size_y = 1, local_size_z = 1) in;
struct Vert 
{
  vec4 position;
  vec4 normal;
  vec2 texCoord;
};
layout (std430, binding = 0)  buffer gOutput
{
  Vert verts[];
};
void main(void){
  //uint meshX =  gl_WorkGroupID.x * gl_WorkGroupSize.x + 
`}
                    </pre>
                  </div>
                </div>
                <div className='table_body_summery'>
                  <h4 className='table_body_title'>الملخص</h4>
                  <Timeline align="right">
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Paper elevation={3} className={classes.paper}>
                          <Typography variant="h6" component="span">
                            <time dateTime={startTime}>{`${myContext.englishMonths[startTime.getMonth()].slice(0, 3)} ${startTime.getDate()}, ${myContext.formatAMPM(startTime).split(' ')[0]} ${myContext.formatAMPM(startTime).split(' ')[1] === 'ص' ? 'am' : `pm`}`}</time>
                          </Typography>
                          <Typography>تم إدخال سير العمل من المعاملة</Typography>
                        </Paper>
                      </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Paper elevation={3} className={classes.paper}>
                          <Typography variant="h6" component="span">
                            <time dateTime={startTime}>{`${myContext.englishMonths[startTime.getMonth()].slice(0, 3)} ${startTime.getDate()}, ${myContext.formatAMPM(startTime).split(' ')[0]} ${myContext.formatAMPM(startTime).split(' ')[1] === 'ص' ? 'am' : `pm`}`}</time>
                          </Typography>
                          <Typography>تطابق كل شئ إخر الطريق</Typography>
                        </Paper>
                      </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Paper elevation={3} className={classes.paper}>
                          <Typography variant="h6" component="span">
                            <time dateTime={updateDate}>{`${myContext.englishMonths[updateDate.getMonth()].slice(0, 3)} ${updateDate.getDate()}, ${myContext.formatAMPM(updateDate).split(' ')[0]} ${myContext.formatAMPM(updateDate).split(' ')[1] === 'ص' ? 'am' : `pm`}`}</time>
                          </Typography>
                          <Typography>تم إنتهاء دون أخذ إجراء</Typography>
                        </Paper>
                      </TimelineContent>
                    </TimelineItem>
                  </Timeline>
                </div>
              </div>
          </Collapse>
        </TableCell>
      </TableRow>
          </Fragment>

        ) : myContext.workProcessState === data.workProcess[index] && (
          <Fragment>
            <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <BsFillArrowUpCircleFill color='#5CD5C4' size={24} /> : <BsArrowDownCircle color='#5CD5C4' size={24} />}
          </IconButton>
        </TableCell>
        <TableCell align="right"><BsCheckCircle size={22} color='#5CD5C4' /></TableCell>
        <TableCell align="right">
          <bdi style={{direction: 'rtl'}}>
            <time dateTime={updateDate}>{`${updateDate.getDate()} ${myContext.arabicMonths[updateDate.getMonth()]} ${updateDate.getFullYear()} , ${myContext.formatAMPM(updateDate)}`}</time>
          </bdi>
        </TableCell>
        <TableCell align="right">
          <bdi style={{direction: 'rtl'}}>
            <time dateTime={startTime}>{`${startTime.getDate()} ${myContext.arabicMonths[startTime.getMonth()]} ${startTime.getFullYear()} , ${myContext.formatAMPM(startTime)}`}</time>
          </bdi>
        </TableCell>
        <TableCell align="right">{user.username.toLowerCase()}</TableCell>
        <TableCell align="right">{`id-${user.address.street.split(' ')[0].toLowerCase()}${user.address.zipcode.split('-')[0]}`}</TableCell>
        <TableCell align="right">{data.workProcess[index]}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} className='table_body' colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
              <div className='table_body_in'>
                <div className='table_body_code'>
                  <h4 className='table_body_title'>تشغيل سيرة العمل</h4>
                  <div className='code_box'>
                    <pre className='code'>
<span>{`#version 430 core`}</span>
{`
layout(local_size_x = 1, local_size_y = 1, local_size_z = 1) in;
struct Vert 
{
  vec4 position;
  vec4 normal;
  vec2 texCoord;
};
layout (std430, binding = 0)  buffer gOutput
{
  Vert verts[];
};
void main(void){
  //uint meshX =  gl_WorkGroupID.x * gl_WorkGroupSize.x + 
`}
                    </pre>
                  </div>
                </div>
                <div className='table_body_summery'>
                  <h4 className='table_body_title'>الملخص</h4>
                  <Timeline align="right">
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Paper elevation={3} className={classes.paper}>
                          <Typography variant="h6" component="span">
                            <time dateTime={startTime}>{`${myContext.englishMonths[startTime.getMonth()].slice(0, 3)} ${startTime.getDate()}, ${myContext.formatAMPM(startTime).split(' ')[0]} ${myContext.formatAMPM(startTime).split(' ')[1] === 'ص' ? 'am' : `pm`}`}</time>
                          </Typography>
                          <Typography>تم إدخال سير العمل من المعاملة</Typography>
                        </Paper>
                      </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Paper elevation={3} className={classes.paper}>
                          <Typography variant="h6" component="span">
                            <time dateTime={startTime}>{`${myContext.englishMonths[startTime.getMonth()].slice(0, 3)} ${startTime.getDate()}, ${myContext.formatAMPM(startTime).split(' ')[0]} ${myContext.formatAMPM(startTime).split(' ')[1] === 'ص' ? 'am' : `pm`}`}</time>
                          </Typography>
                          <Typography>تطابق كل شئ إخر الطريق</Typography>
                        </Paper>
                      </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Paper elevation={3} className={classes.paper}>
                          <Typography variant="h6" component="span">
                            <time dateTime={updateDate}>{`${myContext.englishMonths[updateDate.getMonth()].slice(0, 3)} ${updateDate.getDate()}, ${myContext.formatAMPM(updateDate).split(' ')[0]} ${myContext.formatAMPM(updateDate).split(' ')[1] === 'ص' ? 'am' : `pm`}`}</time>
                          </Typography>
                          <Typography>تم إنتهاء دون أخذ إجراء</Typography>
                        </Paper>
                      </TimelineContent>
                    </TimelineItem>
                  </Timeline>
                </div>
              </div>
          </Collapse>
        </TableCell>
      </TableRow>
          </Fragment>
        )
      }
    </Fragment>
  )
}   

export default Row;
