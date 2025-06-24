import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import { EventApi } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput } from "@fullcalendar/core";
import { createUserSchedule, updateUserSchedule, deleteUserSchedule } from "@/api/user";
import axiosInstance from "@/api/axios";

type ScheduleItem = {
  userScheduleId: string;
  scheduleContent: string;
  startDate: string;
  endDate: string;
  isFinish: boolean;
};

const CalendarPage = () => {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedEvent, setSelectedEvent] = useState<EventInput | null>(null);
  const [titleInput, setTitleInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("mainUserId");

  // 전체 일정 조회
  useEffect(() => {
    if (!userId) return;
    const fetchUserSchedules = async () => {
      try {
        const res = await axiosInstance.get(`/user/schedule/all/${userId}`);
        if (res.data.success && Array.isArray(res.data.userScheduleList)) {
          setEvents(
            res.data.userScheduleList.map((item: ScheduleItem) => ({
              id: item.userScheduleId,
              title: item.scheduleContent,
              date: item.startDate,
              end: item.endDate,
              color: item.isFinish ? "gray" : "green",
            }))
          );
        }
      } catch {
        setError("일정 전체 조회 실패");
      }
    };
    fetchUserSchedules();
  }, [userId]);

  // 날짜 클릭 시 새 일정 추가 준비
  const handleDateClick = (info: { dateStr: string }) => {
    setSelectedDate(info.dateStr);
    setEndDate(info.dateStr);
    setSelectedEvent(null); // 수정 모드 해제
    setTitleInput(""); // 입력 초기화
    setError(null);
  };

  // 일정 클릭 시 수정 준비
  const handleEventClick = (info: { event: EventApi }) => {
    setSelectedDate(info.event.startStr);
    setEndDate(info.event.endStr || info.event.startStr);
    setSelectedEvent({
      id: info.event.id,
      title: info.event.title,
      date: info.event.startStr,
    });
    setTitleInput(info.event.title);
    setError(null);
  };

  // 일정 저장 (추가 or 수정)
  const handleSave = async () => {
    if (!titleInput || !selectedDate || !endDate) return;
    setError(null);
    if (selectedEvent && selectedEvent.id) {
      // 수정 (서버에도 저장)
      setLoading(true);
      try {
        const res = await updateUserSchedule({
          userScheduleId: selectedEvent.id,
          scheduleContent: titleInput,
          startDate: selectedDate,
          endDate: endDate,
        });
        if (res.success) {
          setEvents(events.map(event =>
            event.id === selectedEvent.id
              ? { ...event, title: titleInput, date: selectedDate, end: endDate }
              : event
          ));
          resetForm();
        } else {
          setError(res.message || "일정 수정에 실패했습니다.");
        }
      } catch {
        setError("일정 수정 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    } else {
      // 추가 (서버에도 저장)
      if (!userId) {
        setError("로그인이 필요합니다.");
        return;
      }
      setLoading(true);
      try {
        const res = await createUserSchedule({
          userId,
          scheduleContent: titleInput,
          startDate: selectedDate,
          endDate: endDate,
        });
        if (res.success) {
          setEvents([
            ...events,
            {
              id: res.userScheduleId,
              title: titleInput,
              date: selectedDate,
              end: endDate,
              color: "green"
            }
          ]);
          resetForm();
        } else {
          setError(res.message || "일정 등록에 실패했습니다.");
        }
      } catch {
        setError("일정 등록 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }
  };

  // 일정 삭제
  const handleDelete = async () => {
    if (selectedEvent && selectedEvent.id) {
      setLoading(true);
      try {
        const res = await deleteUserSchedule({ userScheduleId: selectedEvent.id });
        if (res.success) {
          setEvents(events.filter(event => event.id !== selectedEvent.id));
          resetForm();
        } else {
          setError(res.message || "일정 삭제에 실패했습니다.");
        }
      } catch {
        setError("일정 삭제 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }
  };

  // 폼 초기화
  const resetForm = () => {
    setSelectedDate("");
    setEndDate("");
    setSelectedEvent(null);
    setTitleInput("");
    setError(null);
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">📅 Calendar</h1>

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
        <div className="p-4 mt-6 bg-gray-50 rounded-lg border shadow-md">
          <h2 className="mb-2 text-lg font-semibold">
            {selectedEvent ? "🛠 일정 수정" : "➕ 새 일정 추가"}
          </h2>
          <p className="mb-2 text-sm text-gray-600">시작일: {selectedDate}</p>
          <div className="mb-2">
            <label className="mr-2 text-sm">종료일:</label>
            <input
              type="date"
              className="px-2 py-1 rounded border"
              value={endDate}
              min={selectedDate}
              onChange={(e) => setEndDate(e.target.value)}
              disabled={loading}
            />
          </div>
          <input
            type="text"
            className="px-2 py-1 mb-2 w-full rounded border"
            placeholder="일정 제목 입력"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            disabled={loading}
          />
          {error && <div className="mb-2 text-sm text-red-500">{error}</div>}
          <div className="space-x-2">
            <button
              onClick={handleSave}
              className="px-4 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "저장 중..." : "저장"}
            </button>
            {selectedEvent && (
              <button
                onClick={handleDelete}
                className="px-4 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                disabled={loading}
              >
                삭제
              </button>
            )}
            <button
              onClick={resetForm}
              className="px-4 py-1 text-black bg-gray-300 rounded hover:bg-gray-400"
              disabled={loading}
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
