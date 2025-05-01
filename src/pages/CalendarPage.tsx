// import { useState } from "react";
// import Calendar, {CalendarProps} from "react-calendar";
// import "react-calendar/dist/Calendar.css"; // 기본 스타일 적용

// const CalendarPage = () => {
//   const [date, setDate] = useState(new Date());

//   const handleDateChange: CalendarProps["onChange"] = (value) => {
//     if (value instanceof Date) {
//       setDate(value);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">📅 Calendar</h1>
//       <Calendar onChange={handleDateChange} value={date} />
//       <p className="mt-4">✅ 선택한 날짜: <strong>{date.toDateString()}</strong></p>
//     </div>
//   );
// };

// export default CalendarPage;

// -------------------------------------------------------------------------------------------------------------------------
/* import { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";

type Schedule = {
  date: string; // YYYY-MM-DD 형식
  event: string; // 일정 이름
  color: string; // 일정 색상
};

const CalendarPage = () => {
  const [date, setDate] = useState<Date>(new Date()); // ✅ 명확한 타입 지정

  // ✅ 일정 데이터 (날짜별 이벤트)
  const schedules: Schedule[] = [
    { date: "2025-03-23", event: "토익 시험", color: "green" },
    { date: "2025-03-25", event: "회의", color: "blue" },
    { date: "2025-04-01", event: "친구 생일", color: "red" },
  ];

  // ✅ 특정 날짜에 해당하는 일정 가져오기
  const getTileContent: CalendarProps["tileContent"] = ({ date }) => {
    const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD 형식으로 변환
    const schedule = schedules.find((s) => s.date === formattedDate);

    return schedule ? (
      <div
        style={{
          marginTop: "5px",
          fontSize: "12px",
          backgroundColor: schedule.color,
          color: "white",
          borderRadius: "5px",
          padding: "2px 4px",
        }}
      >
        {schedule.event}
      </div>
    ) : null;
  };

  // ✅ `onChange` 핸들러 수정 (event 포함)
  const handleDateChange: CalendarProps["onChange"] = (value, event) => {
    if (value instanceof Date) {
      setDate(value);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📅 캘린더 일정</h1>
      <Calendar 
        onChange={handleDateChange} // ✅ 수정된 핸들러 적용
        value={date} 
        tileContent={getTileContent} // ✅ 날짜 아래 일정 추가
      />
      <p className="mt-4">✅ 선택한 날짜: <strong>{date.toDateString()}</strong></p>
    </div>
  );
};

export default CalendarPage; */
// -------------------------------------------------------------------------------------------------------------------------








/* import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput } from "@fullcalendar/core";

const CalendarPage = () => {
  const [events, setEvents] = useState<EventInput[]>([
    { id: "1", title: "토익 시험", date: "2025-03-23", color: "pink" },
    { id: "2", title: "회의", date: "2025-03-25", color: "blue" }
  ]);

  // ✅ 날짜 클릭 시 일정 추가
  const handleDateClick = (info: any) => {
    const title = prompt("일정 내용을 입력하세요:");
    if (title) {
      setEvents([...events, { id: String(events.length + 1), title, date: info.dateStr }]);
    }
  };

  // ✅ 일정 클릭 시 수정 또는 삭제
  const handleEventClick = (info: any) => {
    const action = window.prompt(
      `"${info.event.title}" 일정을 수정하거나 삭제할 수 있어요.\n\n수정하려면 새로운 제목을 입력하고, 삭제하려면 '삭제'라고 입력하세요.`,
      info.event.title
    );
  
    if (action === null) return; // 취소
  
    if (action === "삭제") {
      if (window.confirm(`"${info.event.title}" 일정을 삭제할까요?`)) {
        setEvents(events.filter((event) => event.id !== info.event.id));
      }
    } else if (action.trim() !== "") {
      setEvents(
        events.map((event) =>
          event.id === info.event.id ? { ...event, title: action } : event
        )
      );
    }
  };
  

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📅 Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick} // ✅ 날짜 클릭 시 일정 추가
        eventClick={handleEventClick} // ✅ 일정 클릭 시 삭제
        height="auto"
      />
    </div>
  );
};

export default CalendarPage; */

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput } from "@fullcalendar/core";

const CalendarPage = () => {
  const [events, setEvents] = useState<EventInput[]>([
    { id: "1", title: "토익 시험", date: "2025-03-23", color: "pink" },
    { id: "2", title: "회의", date: "2025-03-25", color: "blue" }
  ]);

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedEvent, setSelectedEvent] = useState<EventInput | null>(null);
  const [titleInput, setTitleInput] = useState("");

  // 날짜 클릭 시 새 일정 추가 준비
  const handleDateClick = (info: any) => {
    setSelectedDate(info.dateStr);
    setSelectedEvent(null); // 수정 모드 해제
    setTitleInput(""); // 입력 초기화
  };

  // 일정 클릭 시 수정 준비
  const handleEventClick = (info: any) => {
    setSelectedDate(info.event.startStr);
    setSelectedEvent({
      id: info.event.id,
      title: info.event.title,
      date: info.event.startStr,
    });
    setTitleInput(info.event.title);
  };

  // 일정 저장 (추가 or 수정)
  const handleSave = () => {
    if (!titleInput || !selectedDate) return;

    if (selectedEvent) {
      // 수정
      setEvents(events.map(event =>
        event.id === selectedEvent.id ? { ...event, title: titleInput, date: selectedDate } : event
      ));
    } else {
      // 추가
      setEvents([
        ...events,
        {
          id: String(Date.now()), // 고유 ID
          title: titleInput,
          date: selectedDate
        }
      ]);
    }

    resetForm();
  };

  // 일정 삭제
  const handleDelete = () => {
    if (selectedEvent) {
      setEvents(events.filter(event => event.id !== selectedEvent.id));
      resetForm();
    }
  };

  // 폼 초기화
  const resetForm = () => {
    setSelectedDate("");
    setSelectedEvent(null);
    setTitleInput("");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📅 Calendar</h1>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        height="auto"
      />

      {/* 📌 일정 관리 UI */}
      {selectedDate && (
        <div className="mt-6 border p-4 rounded-lg shadow-md bg-gray-50">
          <h2 className="text-lg font-semibold mb-2">
            {selectedEvent ? "🛠 일정 수정" : "➕ 새 일정 추가"}
          </h2>
          <p className="mb-2 text-sm text-gray-600">날짜: {selectedDate}</p>
          <input
            type="text"
            className="border px-2 py-1 rounded w-full mb-2"
            placeholder="일정 제목 입력"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
          />
          <div className="space-x-2">
            <button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
            >
              저장
            </button>
            {selectedEvent && (
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
              >
                삭제
              </button>
            )}
            <button
              onClick={resetForm}
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-1 rounded"
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;

