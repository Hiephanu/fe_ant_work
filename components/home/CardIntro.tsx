type CardIntroProp = {
    content: string;
    title: string;
    url:string
}
export default function CardIntro(props : CardIntroProp) {
    return (
        <div className="text-center w-[80%] mx-auto">
            <div className="w-1/3 mx-auto">
                <img src={props.url} alt="" />
            </div>
            <div className="font-bold text-lg">
                {props.title}
            </div>
            <div>
                {props.content}
            </div>
        </div>
    )
}