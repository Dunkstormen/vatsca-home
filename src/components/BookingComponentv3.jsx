import { useEffect, useState } from "react";
import bookingType from "../utils/bookingType";
import convertZulu from "../utils/convertZulu";
import fixNetworkTime from "../utils/fixNetworkTime";
import {ExternalLinkIcon} from './icons/ExternalLinkIcon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip"

import "../globals.css";

const BookingComponent = () => {
  const [SessionToday, setSessionToday] = useState([]);
  const [BookingsToday, setBookingsToday] = useState([]);
  const [bookingsNotToday, setBooingsNotToday] = useState([]);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const bookingApiFetch = await fetch(
          "https://cc.vatsim-scandinavia.org/api/bookings"
        );

        const BookingApiData = await bookingApiFetch.json();

        const networkApiFetch = await fetch(
          "https://data.vatsim.net/v3/vatsim-data.json"
        );

        const NetworkApiData = await networkApiFetch.json();

        var filterdSessions = [];

        const acceptedFIRs = ["EK", "EN", "EF", "ES", "BI", "BG"];

        for (const session of NetworkApiData.controllers) {
          if (acceptedFIRs.includes(session.callsign.slice(0, 2)) && session.facility > 0) {
            filterdSessions = [...filterdSessions, session];
          }
        }

        setSessionToday(filterdSessions);

        let filterdBookings = [];

        for (const session of BookingApiData.data) {
          if (
            new Date(session.time_start).toDateString() ==
            new Date().toDateString()
          ) {
            filterdBookings = [...filterdBookings, session];
          }
        }

        let noneFilterdBookings = [];

        for (const session of BookingApiData.data) {
          if (
            new Date(session.time_start).toDateString() !=
            new Date().toDateString()
          ) {
            noneFilterdBookings = [...noneFilterdBookings, session];
          }
        }

        // Group sessions by day
        const groupedSessions = {};
        const currentDate = new Date();
        const endDate = new Date(
          currentDate.getTime() + 6 * 24 * 60 * 60 * 1000
        ); // Get the date 6 days from now

        for (const session of noneFilterdBookings) {
          const sessionDate = new Date(session.time_start).toDateString();
          if (
            new Date(session.time_start) >= currentDate &&
            new Date(session.time_start) <= endDate
          ) {
            if (!groupedSessions[sessionDate]) {
              groupedSessions[sessionDate] = [];
            }
            groupedSessions[sessionDate].push(session);
          }
        }

        setBookingsToday(filterdBookings);
        setBooingsNotToday(groupedSessions);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBookingData();
  }, []);

  return (
    <table className="w-full h-full px-2">
      <tbody className="h-full">
        {SessionToday.length > 0 || BookingsToday.length > 0 ? (
          ""
        ) : (
          <tr className="h-12">
            <td colSpan={4}>
              <iframe src="https://lottie.host/embed/e516525c-74c1-4db5-b2b2-bb135366e103/W8AodEgALN.json" className="w-full h-full" />
            </td>
          </tr>
        )}

        {SessionToday.length > 0 || BookingsToday.length > 0 ? (
          <tr className="bg-snow dark:bg-secondary w-full h-6 font-bold text-black dark:text-white p-2 text-center">
            <td colSpan={4} className="w-full h-full text-center py-1" >
              Today
            </td>
          </tr>
        ) : (
          <></>
        )}
        {SessionToday.map((booking, index) => (
          <tr
            key={index}
            className="h-6 even:bg-gray-50 odd:bg-white dark:even:bg-tertiary dark:odd:bg-black"
          >
            <td className="pl-[4px] font-medium text-[#447b68]">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                  <span className="font-bold">● {booking.callsign}</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{booking.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </td>
            <td className="pl-[4px]"></td>
            <td className="pl-[4px]">
              {convertZulu(fixNetworkTime(booking.logon_time))}
            </td>
            <td className="pl-[4px]">-</td>
          </tr>
        ))}
        {BookingsToday.map((booking, index) => (
          <tr
            key={index}
            className="h-6 even:bg-gray-50 odd:bg-white dark:even:bg-tertiary dark:odd:bg-black"
          >
            <td className="pl-[4px]">○ {booking.callsign}</td>
            <td className="pl-[4px]">{bookingType(booking)}</td>
            <td className="pl-[4px]">{convertZulu(booking.time_start)}</td>
            <td className="pl-[4px]">{convertZulu(booking.time_end)}</td>
          </tr>
        ))}
        {Object.keys(bookingsNotToday).map((date, index) => (
          <>
            <tr className="bg-snow dark:bg-secondary w-full font-bold text-black dark:text-white py-4 text-center" key={index}>
              <td colSpan={4} className="py-1">
                {new Date(date).toLocaleString('en-us', {  weekday: 'long', month: 'long', day: 'numeric' })}
              </td>
            </tr>
            {bookingsNotToday[date].map((session, index) => (
              <tr
                key={index}
                className="h-6 even:bg-gray-50 odd:bg-white dark:even:bg-tertiary dark:odd:bg-black"
              >
                <td className="pl-[4px]">{session.callsign}</td>
                <td className="pl-[4px]">{bookingType(session)}</td>
                <td className="pl-[4px]">{convertZulu(session.time_start)}</td>
                <td className="pl-[4px]">{convertZulu(session.time_end)}</td>
              </tr>
            ))}
          </>
        ))}
        {bookingsNotToday ? (
          <tr className="bg-snow dark:bg-tertiary w-full font-bold text-black dark:text-white p-2 text-center h-12">
            <td colSpan={4}>
              <a href="cc.vatsim-scandinavia.org/bookings" target="_blank" className="underline hover:no-underline">
                See all bookings <ExternalLinkIcon width="0.75rem" marginLeft="0.3rem" />
              </a>
            </td>
          </tr>
        ) : (
          <></>
        )}
      </tbody>
    </table>
  );
};

export default BookingComponent;
