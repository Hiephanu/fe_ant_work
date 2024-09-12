type OptionMeetingModelProps = {
    icon:any,
    title:string
}
export default function OptionMeetingModel( {props} : {props : OptionMeetingModelProps}) {
    return (
        <div className="flex justify-around items-center">
            {props.icon}
            <p className="">{props.title}</p>
            <input type="checkbox" />
        </div>
    )
}