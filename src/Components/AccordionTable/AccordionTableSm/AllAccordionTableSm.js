import React, { useContext } from 'react';
import AccordionTableSm from './AccordionTableSm';
import data from '../../../data.json';
import { MyContext } from '../../../context';

function AllAccordionTableSm({ dataUsers, workProcess }) {
    const myContext = useContext(MyContext);
    
    function showAccor() {
        if(myContext.startTimeContext === '' && myContext.endTimeContext === '') {
            return dataUsers.length !== undefined && dataUsers.length > 0 && data.StartDates.map((date, index) => (
                <AccordionTableSm key={index} index={index} user={dataUsers[index]} startTime={new Date(date)} updateDate={new Date(data.endDates[index])} />
            ))

        } else if(myContext.startTimeContext !== '' && myContext.endTimeContext !== '') {
            return (
                <>
                    {data.StartDates.filter(e => new Date(myContext.startTimeContext) <= new Date(e)).map((date,index) => <AccordionTableSm key={index} index={index} user={dataUsers[index]} startTime={new Date(date)} updateDate={new Date(data.endDates[index])} />)}
                    {data.endDates.filter(e => new Date(myContext.endTimeContext) >= new Date(e)).map((date,index) => <AccordionTableSm key={index} index={index} user={dataUsers[index]} startTime={new Date(date)} updateDate={new Date(data.endDates[index])} />)}
                </>
            )
        } else if(myContext.startTimeContext !== '' && myContext.endTimeContext === '') {
            return (
                <>
                    {data.StartDates.filter(e => new Date(myContext.startTimeContext) <= new Date(e)).map((date,index) => <AccordionTableSm key={index} index={index} user={dataUsers[index]} startTime={new Date(date)} updateDate={new Date(data.endDates[index])} />)}
                    {data.endDates.filter(e => new Date(myContext.endTimeContext) >= new Date(e)).map((date,index) => <AccordionTableSm key={index} index={index} user={dataUsers[index]} startTime={new Date(date)} updateDate={new Date(data.endDates[index])} />)}
                </>
            )
            
        } else if(myContext.startTimeContext === '' && myContext.endTimeContext !== '') {
            return (
                <>
                    {data.StartDates.filter(e => new Date(myContext.startTimeContext) <= new Date(e)).map((date,index) => <AccordionTableSm key={index} index={index} user={dataUsers[index]} startTime={new Date(date)} updateDate={new Date(data.endDates[index])} />)}
                    {data.endDates.filter(e => new Date(myContext.endTimeContext) >= new Date(e)).map((date,index) => <AccordionTableSm key={index} index={index} user={dataUsers[index]} startTime={new Date(date)} updateDate={new Date(data.endDates[index])} />)}
                </>
            )
        } else {
            return dataUsers.length !== undefined && dataUsers.length > 0 && data.StartDates.map((date, index) => (
                <AccordionTableSm key={index} index={index} user={dataUsers[index]} startTime={new Date(date)} updateDate={new Date(data.endDates[index])} />
            ))
        }
    }

    return (
        <div className='all_accprdion_table'>
            {showAccor()}
        </div>
    )
}

export default AllAccordionTableSm
