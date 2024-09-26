import MeetingPage from "@/pages/MeetingPage";

export default function Meet() {
    const res = fetch('/login', {
        method: "POST"
    })
    return (
        <div>
            <MeetingPage />
        </div>
    )
}