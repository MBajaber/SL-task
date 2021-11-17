import React, { useState, createContext } from 'react';

export const MyContext = createContext();

function ContextCompo({ children }) {
    const [arabicMonths] = useState(['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']);
    const [englishMonths] = useState(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);
    const [workProcessState, setWorkProcessState] = useState('');
    const [startTimeContext, setStartTimeContext] = useState('');
    const [endTimeContext, setEndTimeContext] = useState('');

    // function afterDates(num) {
    //     if(typeof num === 'number') {
    //         const someDate = new Date();
    //         return new Date(someDate.setTime(someDate.getTime() +  (num * 24 * 60 * 60 * 1000)));
    //     }
    //     return '';
    // }
    
    // function beforeDates(num) {
    //     if(typeof num === 'number') {
    //         const someDate = new Date();
    //         return new Date(someDate.setTime(someDate.getTime() -  (num * 24 * 60 * 60 * 1000)));
    //     } 
    //     return '';
    // }

    function afterDates(num) {
        const someDate = new Date();
        return new Date(someDate.setTime(someDate.getTime() +  (num * 24 * 60 * 60 * 1000)));
    }

    function beforeDates(num) {
        const someDate = new Date();
        return new Date(someDate.setTime(someDate.getTime() -  (num * 24 * 60 * 60 * 1000)));
    }
    
    
    function formatAMPM(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'م' : 'ص';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    
    return (
        <MyContext.Provider value={{
            arabicMonths,
            englishMonths,
            afterDates,
            beforeDates,formatAMPM,
            workProcessState,
            setWorkProcessState: (val) => setWorkProcessState(val),
            startTimeContext,
            endTimeContext,
            setStartTimeContext: (val) => setStartTimeContext(val),
            setEndTimeContext:  (val) => setEndTimeContext(val)
        }}>
            {children}
        </MyContext.Provider>
    )
}

export default ContextCompo;
