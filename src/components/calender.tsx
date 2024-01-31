import { Calendar, CalendarProps, dateFnsLocalizer, momentLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
// import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// const localizer = momentLocalizer(moment);

const locales = {
    'en-US': enUS,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

export default function Calender(props: Omit<CalendarProps, 'localizer'>) {
    return (
        <div className=''>
            <Calendar
                localizer={localizer}
                {...props}
                views={['month', 'day']}
                startAccessor="start"
                endAccessor="end"
            />

        </div>
    )
}
