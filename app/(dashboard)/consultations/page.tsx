import { CalendarDays, Clock, User, Video } from "lucide-react";

export default function ConsultationsPage() {
  const slots = [
    {
      id: "slot-1",
      topic: "SMA 2104 Office Hour: Spectral Decomposition",
      lecturer: "Dr. J. Kimani",
      time: "Today • 2:00 PM - 3:30 PM",
      status: "Upcoming",
      room: "Room PAM-302 / Online Meet",
    },
    {
      id: "slot-2",
      topic: "ICS 2105 Lab Q&A: Self-Balancing Trees",
      lecturer: "Prof. N. Ombati",
      time: "Tomorrow • 10:00 AM - 11:30 AM",
      status: "Open for Booking",
      room: "CS Lab 3",
    },
  ];

  return (
    <div className="flex flex-col flex-1 h-full bg-surface-1 select-none overflow-hidden">
      <header className="h-14 px-6 border-b border-border-subtle flex items-center justify-between bg-surface-1 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-surface-2 border border-border-strong flex items-center justify-center text-indigo">
            <CalendarDays size={16} />
          </div>
          <div>
            <h1 className="text-xs font-semibold text-txt-main">
              Faculty Consultation Hours
            </h1>
            <p className="text-[10px] font-mono-code text-txt-muted">
              Book one-on-one appointments and join live academic office hours
            </p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 bg-canvas/30">
        <div className="max-w-3xl mx-auto space-y-4">
          {slots.map((slot) => (
            <div
              key={slot.id}
              className="p-4 rounded-lg bg-surface-1 border border-border-subtle hover:border-border-strong transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono-code text-[10px] font-semibold text-indigo bg-indigo-surface px-1.5 py-0.5 rounded">
                  {slot.status}
                </span>
                <span className="font-mono-code text-[11px] text-txt-muted flex items-center gap-1">
                  <Clock size={12} />
                  {slot.time}
                </span>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-txt-main">
                  {slot.topic}
                </h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-txt-sub">
                  <span className="flex items-center gap-1">
                    <User size={12} className="text-txt-muted" />
                    {slot.lecturer}
                  </span>
                  <span className="flex items-center gap-1 font-mono-code text-[11px] text-txt-muted">
                    <Video size={12} />
                    {slot.room}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-border-subtle flex justify-end">
                <button className="h-7 px-3 rounded text-xs font-medium bg-txt-main text-canvas hover:opacity-90 transition-opacity">
                  Reserve Slot
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
