import React, { useState, Fragment, useEffect, useContext } from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Collapse from '@material-ui/core/Collapse';
import './AccordionTableRowSm.scss';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { MyContext } from '../../../../context';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

function Row({ user, startTime, updateDate, open }) {
  const [openValue, setOpenValue] = useState(open);
  const myContext = useContext(MyContext);
  const classes = useStyles();

  useEffect(() => setOpenValue(open), [open]);

  return user !== undefined && Object.keys(user).length > 0 ? (
    <Fragment>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} className='table_body' colSpan={1}>
          <Collapse in={openValue} timeout="auto" unmountOnExit>
              <div className='table_body_in_sm'>
                <ul className='show_list'>
                  <li>
                    <span className='text'>{`id-${user.address.street.split(' ')[0].toLowerCase()}${user.address.zipcode.split('-')[0]}`}</span>
                    <span className='show_list_title'>كيان</span>
                  </li>
                  <li>
                    <span className='text'>{user.username.toLowerCase()}</span>
                    <span className='show_list_title'>إجراء</span>
                  </li>
                  <li>
                    <span className='text'>
                    <bdi style={{direction: 'rtl'}}>
                      <time dateTime={startTime}>{`${startTime.getDate()} ${myContext.arabicMonths[startTime.getMonth()]} ${startTime.getFullYear()} , ${myContext.formatAMPM(startTime)}`}</time>
                    </bdi>
                    </span>
                    <span className='show_list_title'>بداية الوقت</span>
                  </li>
                  <li>
                    <span className='text'>
                    <bdi style={{direction: 'rtl'}}>
                      <time dateTime={updateDate}>{`${updateDate.getDate()} ${myContext.arabicMonths[updateDate.getMonth()]} ${updateDate.getFullYear()} , ${myContext.formatAMPM(updateDate)}`}</time>
                    </bdi>
                    </span>
                    <span className='show_list_title'>أخر تحديث</span>
                  </li>
                  <li>
                    <span className='text'><BsCheckCircle size={22} color='#5CD5C4' /></span>
                    <span className='show_list_title'>الحالة</span>
                  </li>
                </ul>

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
                <div className='table_body_code'>
                  <h4 className='table_body_title'>تشغيل سيرة العمل</h4>
                  <div className='code_box'>
                    <pre className='code'>
<span>{`#version 430 core`}</span>
{`
layout(local_size_x = 1, local_size_y = 1,
local_size_z = 1) in;
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
  //uint meshX =  gl_WorkGroupID.x *
  gl_WorkGroupSize.x + 
}`}
                    </pre>
                  </div>
                </div>
              </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  ) : null;
}   

export default Row;
