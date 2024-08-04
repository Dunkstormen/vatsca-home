import React, { useEffect, useState } from 'react';

const Events = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://events.vatsim-scandinavia.org/api/calendars/1/events', {
                    headers: {
                        Authorization: 'Bearer 83e0745f-486d-4f73-8184-40c98930380c' // Replace with your valid bearer token
                    }
                });
                const data = await response.json();
                setEvents(data.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
    
        fetchData();
    }, []);

    function dateConverter(start, end) {
        const startDate = new Date(start);
        const endDate = new Date(end);

        if (startDate.getDate() == endDate.getDate()) {
            return startDate.toLocaleString('en-uk', {  weekday: 'long', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })+" - "+endDate.toLocaleString('en-uk', {  hour: 'numeric', minute: 'numeric' });
        } else {
            return startDate.toLocaleString('en-uk', {  weekday: 'long', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })+" - "+endDate.toLocaleString('en-uk', {  weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })
        }
    }
    
    return (
        <div class="flex flex-col gap-2 w-full md:min-w-[900px] h-fit"> 
            {events.slice(0,5).map((item, index) => (
                <>
                {index < 2 ? 
                    <div key={index} className='flex col-span-3 gap-4 relative w-full flex-col md:flex-row'>
                        <a target='_blank'  href={item.link} className='h-fit aspect-video'>
                            <img src={item.image} className={`w-full md:w-96 h-fit aspect-video rounded-sm absolute'}`} />
                        </a>
                        <div className='flex flex-col justify-between'>
                            <div className='w-fit'>
                            <h2 className='font-semibold text-xl text-secondary dark:text-white'>{item.title}</h2>
                            <p className='text-grey font-bold pb-4 dark:text-gray-300'>{events.length != 0 ? dateConverter(item.start_date, item.end_date)  : ""}</p>
                            <p className={`line-clamp-6 mb-1`}>{item.short_description}</p>
                            <a href={item.link} class={`bg-snow p-3 text-center text-black dark:text-white hover:brightness-[95%] d-block inline-block mt-2 text-sm rounded-sm`} target='_blank'>
                                Read more
                            </a>
                            </div>

                        </div>
                    </div>
                    : 
                    ""
                    }
                </>
            ))}
            <div className='flex overflow-hidden overflow-x-scroll'>
                {events.slice(2,9).map((item, index) => (
                    <a key={index} className='flex flex-col rounded pr-1 pb-1 pt-1' target='_blank'  href={item.link}>
                        <img src={item.image} className={`w-64 h-fit aspect-video rounded-sm absolute'}`} />
                    </a>
                ))}
            </div>

        </div>
    );
};

export default Events;
